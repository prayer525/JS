fnList.pageLogin = function(){
	var loginErrMsg = {
		"LOGIN-ERR-0":"C1_8",
		"LOGIN-ERR-1":"C1_9",
		"LOGIN-ERR-2":"S1_5",
		"LOGIN-OK-1":"V1_5",
		"LOGIN-OK-2":"V1_15",
		"LOGIN-OK-5":"V1_5",
		"PARAM-CUSTOMERID":"Y2_19",
		"PARAM-SAPCODE":"Y2_20"
	}

	if(Data.get('targetServer') == ''){
		checkServer();
	}

	Data.set('isFirstRun', false);

	getApi('GetToken', null, fnSetToken);

	$('#email').attr('placeholder', i18n('C1_1', 'text'));
	$('#pwd').attr('placeholder', i18n('C1_2', 'text'));

	$('#email, #pwd').on('keyup', function(e){
		if(e.keyCode == 13){
			$('#login').trigger('click')
		}
	})

	$("#email").on("input",function(){
		var val=$(this).val();
		if (val) {
			$("#resetEmail").show();
		} else {
			$("#resetEmail").hide();
		}
	});

	$("#resetEmail").on('click', function(){
		$('#email').val('');
		$(this).hide();
	});

	$('#login').click(loginValidate);

	$('#membership_link').click(function(){
		var options = "location=yes,zoom=no";
		var reg = cordova.InAppBrowser.open(i18n('W0_URL','text'), "_blank", options)
        return false;
	})

	function loginValidate(){
		var email=$('#email').val(),
			pwd=$('#pwd').val(),
			check=$('#autoLogin').is(':checked');

		if(!email){
			modal({
				type: 'error',
				text: i18n('S1_9', 'text'),
				closeClick: false
			});

			return false;
		}else if(!pwd){
			modal({
				type: 'error',
				text: i18n('S1_10', 'text'),
				closeClick: false
			});

			return false;
		}else if(validateEmail(email)==false){
			modal({
				type: 'error',
				text: i18n('S1_11', 'text'),
				closeClick: false
			});
			$('#email').val('');
			$('#pwd').val('');
			return;
		}
		function validateEmail(email) {
			return Define.EmailTestRegExp.test(email);
		}

		fnGoLogin();
	}

	function fnSetToken(data){
		Data.setData('Token', data.Token)

		Token = data.Token;

		Data.put();

		// Mobile Device
		try{
			exRHMEncrypt.set(Token, function(d){
				d.key = CryptoJS.enc.Utf8.parse(d.key);
				d.iv = CryptoJS.enc.Utf8.parse(d.iv);
				Data.setData('Key', d);
			});
		}
		// Web
		catch(e){
			createKey.set(Token, function(d){
				d.key = CryptoJS.enc.Utf8.parse(d.key);
				d.iv = CryptoJS.enc.Utf8.parse(d.iv);
				Data.setData('Key', d);
			});
		}
	}

	function fnGoLogin(){
		var params = {
			"Email":dataEncode($('#email').val()),
			"Password":dataEncode($('#pwd').val())
		}

		getApi('Login', params, fnAfterLogin);
	}

	function fnAfterLogin(data){
		// data.ResponseMessage check
		// To do
		if(data.responseCode == 0){
			modal({
				type: 'error',
				text: loginErrMsg[data.ResponseMessage],
				closeClick: false
			});

			return false;
		}

		Data.setData('Login', data);
		Data.set('cultureCode', data.CultureCode);

		if(data.Agreement){
			var params = {
				'CultureCode':data.CultureCode
			};
			getApi('GetLegalNotice', params, function(data){
				Data.setData('GetLegalNotice', data);
				$.mobile.changePage( "loading.html", { transition: "slide"} );
			})
		}else{
			if(Data.get('cultureCode') == data.CultureCode){
				var params = {
					'CustomerId' : data.CustomerId
				}
				
				getApi('PutLegalNoticeAgreement', params, function(){
					$.mobile.changePage( "loading.html", { transition: "slide"} );
				});
			}else{
				$.mobile.changePage( "legal_notice.html", { transition: "slide"} );
			}
		}
	}

	var createKey = {
		set:function(t, k){
			var keyMatrix = [91,69,75,38,39,100,2,98,105,91,6,53,111,102,48,124,112,8,122,47,68,99,7,76,60,39,80,83,34,36,107,106];
			var ivMatrix = [17,63,95,42,6,111,3,87,106,88,19,53,126,57,84,102]
			var keyStr = '';
			var ivStr = '';
			var token = t;

			function makeKey(m){
				var str = '';
				$.each(m, function(k, v){
					str += token.charAt(v-1);
				})
				return str;
			}

			keyStr = makeKey(keyMatrix);
			ivStr = makeKey(ivMatrix);

			k({"key":keyStr, "iv":ivStr});
		}
	}
	window.createKey = createKey;
}



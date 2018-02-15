fnList.pageLegalNotice = function(){

	var params = {
		'CultureCode':Data.get('LanguageCode')
	}

	function fnInitPage(data){
		var target = $("#legalIframe");

		target.html(data.LegalLanding).css({wordWrap: 'break-word'});

		var _targetH = target.height() - 1000;

		$('.scroll').scroll(function(){
			if($(this).scrollTop() > _targetH){
				$('.btn-confirm-legal-notice').removeClass('off');
				$('.btn-confirm-legal-notice').prop('disabled',false);
			}
		});

		$('.btn-confirm-legal-notice').click(fnLegalConfirm);
	}

	function fnLegalConfirm(){
		if (Data.getData('Login') != '') {
			// if users login
			var params = {
				'CultureCode':Data.get('cultureCode')
			};
			
			getApi('PutLegalNoticeAgreement', params, function(){
				$.mobile.changePage( "loading.html", { transition: "slide"} );
			})
		}else{
			$.mobile.changePage( "login.html", { transition: "slide"} );
		}
	}

	getApi('GetLegalNotice', params, fnInitPage);
}
fnList.pageLogin = function(){
	console.log('page login');

	var pageLogin = fnList.pageLogin;

	// after loding - show login form;
	setTimeout(function(){
		$('.login-wrap').addClass('show');
	},1500)

	pageLogin.bindEvent = function(){
		$('.login-form .btn-show-password').off('click').on('click', function(){
			if($(this).hasClass('on')){
				$('.login-form #user-pw').attr('type', 'password');
				$(this).removeClass('on')
			}else{
				$('.login-form #user-pw').attr('type', 'text');
				$(this).addClass('on')
			}
		});

		$('.login-form #user-country').off('click').on('click', function(){
			$('.back-pannel').show();
			$('.sel-country-list').addClass('show');
		})

		$('.back-pannel, .sel-country-list li').off('click').on('click', function(){
			$('.back-pannel').hide();
			$('.sel-country-list').removeClass('show');

			fnSetCountry();
		});

		function fnSetCountry(){
			var selCountry = $('.sel-country-list input[name=select-country]:checked');

			$('.login-form #user-country').val(selCountry.next('label').text())
			$('.login-form .selected-country-flag').attr('src', selCountry.next('label').find('img').attr('src'));
		}
	}

	pageLogin.bindEvent();
}
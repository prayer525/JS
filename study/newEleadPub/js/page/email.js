fnList.pageEmail = function(){
	console.log('pageEmail');

	/**
	 * select country & email template
	 */
	$('.email-template-list-wrap').off('click', 'input').on('click', 'input', function(){
		console.log($(this).is(':checked'))
		var _this = $(this);

		if(_this.is(':checked')){
			$.each($('input[name=email-template]'), function(idx, item){
				$(item).prop('checked', false);
			})

			_this.prop('checked', true);

			$('.popup-footer-btn button').removeClass('disabled');
		}else{
			$('.popup-footer-btn button').addClass('disabled');

			$('.email-select-country').removeClass('hide');
			$('.email-template-list-wrap').removeClass('hide');
			$('#pageEmail .popup-footer-btn').removeClass('twice');
			$('#pageEmail .popup-footer-btn button').addClass('disabled').show();
		}
		
		// if($(this).is(':checked')){
		// 	$(this).siblings('input').prop('checked', false)
		// 	$('.popup-footer-btn button').removeClass('disabled');
		// }else{
		// 	$('.popup-footer-btn button').addClass('disabled');
		// }
		// $('.popup-footer-btn button').removeClass('disabled');
	});

	$('#pageEmail').off('click', '.btn-next').on('click', '.btn-next', function(){
		if(!$(this).hasClass('disabled')){
			$(this).hide();
			$('.email-select-country').addClass('hide');
			$('.email-template-list-wrap').addClass('hide');
			$('#pageEmail .popup-footer-btn').addClass('twice');
			$('#pageEmail .popup-footer-btn button').addClass('disabled')
		}
	})

	// after loading
	$.singlePage.preloadPage()
}
fnList.pageOutcomeUpdate = function(){
	console.log('pageOutcomeUpdate');

	$('.switch-select input').on('change', function(){
		if($(this).is(':checked')){
			$(this).parent('li').parent('ul').addClass('selected')
		}else{
			$(this).parent('li').parent('ul').removeClass('selected')
		}
	})

	setTimeout(function(){
		$.singlePage.preloadPage()
	}, 1000)
}
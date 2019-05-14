fnList.pageOutcomeUpdate = function(){
	console.log('pageOutcomeUpdate');

	$('.switch-select input').on('change', function(){
		if($(this).is(':checked')){
			$(this).parent('li').parent('ul').addClass('selected');
			$(this).parent('li').addClass('on');
		}else{
			$(this).parent('li').parent('ul').removeClass('selected');
			$(this).parent('li').removeClass('on');
		}
	})

	$('.plan-next-activity-form .sel-next-activity-vehicle').off('click').on('click', function(e){
		fnList.selLayerVehicle();
	})

	$('.plan-next-activity-form .sel-next-activity-schedule').off('click').on('click', function(e){
		fnList.selLayerSchedule();
	})

	$('.plan-next-activity-form .sel-next-activity-brochure').off('click').on('click', function(e){
		fnList.selLayerBrochure();
	})
	

	setTimeout(function(){
		$.singlePage.preloadPage()
	}, 1000)
}
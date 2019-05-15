fnList.pageOutcomeUpdate = function(){
	console.log('pageOutcomeUpdate');

	$('.tab-select').changeTab();
	
	// outcome type select
	$('.switch-select input').on('change', function(){

		// schedule 선택 가능한 outcome인경우
		var _target = $(this).data('change');

		if($(this).is(':checked')){
			$(this).parent('li').parent('ul').addClass('selected');
			$(this).parent('li').addClass('on');

			$('.outcome-form-wrap').show();
			$('.outcome-form-wrap .outcome-comment-wrap').show();

			// shcedule 선택 가능한 outcome일 경우 추가 이벤트
			if(_target != undefined){
				$('.outcome-form-wrap').find('.'+_target).show();
				$('.outcome-form-wrap .outcome-comment-wrap').hide();
			}
		}else{
			$(this).parent('li').parent('ul').removeClass('selected');
			$(this).parent('li').removeClass('on');

			$('.outcome-form-wrap').hide();
			$('.outcome-form-wrap .outcome-comment-wrap').hide();

			if(_target != undefined){
				$('.outcome-form-wrap').find('.'+_target).hide();
			}
		}
	});

	// Plan Next Activity type 선택시
	$('.outcome-sel-next-activity').off('change', 'input').on('change', 'input', function(){
		if($(this).data('activity') == 'testdrive'){
			$('.plan-next-activity-form').show();
		}else{
			$('.plan-next-activity-form').hide();
		}

		$('.outcome-form-wrap .outcome-comment-wrap').show();
	})

	$('.sel-schedule-form .sel-vehicle-layer').off('click').on('click', function(e){
		fnList.selLayerVehicle();
	})

	$('.sel-schedule-form .sel-schedule-layer').off('click').on('click', function(e){
		fnList.selLayerSchedule();
	})

	$('.sel-schedule-form .sel-brochure-layer').off('click').on('click', function(e){
		fnList.selLayerBrochure();
	})

	// after loading
	$.singlePage.preloadPage()
}
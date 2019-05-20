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

	// open layer event bind
	fnList.fnBindLayer();

	// after loading
	$.singlePage.preloadPage()


	var hourArr = ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'];
	var minArr = ['00','05','10','15','20','25','30','35','40','45','50','55'];
	var scroller = $('#demo-inline').mobiscroll().scroller({
		display: 'inline',
		theme:'ios',
		layout: 'liquid',
		showLabel:false,
		wheels: [
			[{
				label: 'From Hours',
				data: hourArr
			},{
				label: 'From Minutes',
				data: minArr
			},{
				label: 'To Hours',
				data: hourArr
			},{
				label: 'To Minute',
				data: minArr
			}]
		]
	});
}
fnList.selLayerSchedule = function(param){
	$('.select-layer-wrap #selectLayerSchedule').remove();

	var selLayer = null;

	var layer = $('<div></div>').load('../html/layer/select_layer_schedule.html #selectLayerSchedule', function(data){
		console.log('request layer');
		selLayer = $( $(this).html() );
		layer.dataBind(selLayer);
	});

	layer.dataBind = function(){
		console.log('dataBind selLayer')

		layer.eventBind();
	}

	layer.eventBind = function(){
		$('.select-layer-wrap').append(selLayer);

		$('#selectLayerSchedule .btn-select-layer-confirm').off('click').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				layer.hide();
			}
		});

		fnCreateCalendar();
		
		setTimeout(function(){
			layer.show()
		},30);
	}

	layer.show = function(){
		console.log('show')
		$('.back-pannel').addClass('show');
		$('.select-layer-wrap #selectLayerSchedule').addClass('show');
	}

	layer.hide = function(){
		console.log('hide')
		$('.back-pannel').removeClass('show');
		$('.select-layer-wrap #selectLayerSchedule').removeClass('show');
	}

	function fnCreateCalendar(){
		mobiscroll.settings = {
			lang: 'de',
			theme: 'material',
			dateText:'D'
		};

		$('#sel-schedule-calendar').mobiscroll().calendar({
			display: 'inline',
			weeks: 1
		})
	}

}
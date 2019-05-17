fnList.selLayerSchedule = function(param){
	console.log('selLayerSchedule')

	var createLayerParam = {
		id : '#selectLayerSchedule',
		page : 'select_layer_schedule',
		bindEvent : function(layer){
			var btnConfirm = layer.selLayer.find('.btn-select-layer-confirm')
			// confirm layer
			btnConfirm.off('click').on('click', function(){
				if($(this).hasClass('disabled')){
					return false;
				}else{
					layer.hide();
				}
			});
	
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

	fnList.fnCreateLayer(createLayerParam)
}
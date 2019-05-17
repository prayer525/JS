fnList.selLayerVehicle = function(param){
	console.log('selLayerVehicle')
	
	var createLayerParam = {
		id : '#selectLayerVehicle',
		page : 'select_layer_vehicle',
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
	
			$('#selectLayerVehicle input[name=sel-vehicle]').off('change').on('change', function(){
				if($('input[name=sel-vehicle]:checked').val() != null){
					btnConfirm.removeClass('disabled');
				}
			})
		}
	}

	fnList.fnCreateLayer(createLayerParam)
}
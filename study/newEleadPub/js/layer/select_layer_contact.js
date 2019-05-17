fnList.selLayerContact = function(param){
	console.log('selLayerContact')
	
	var createLayerParam = {
		id : '#selectLayerContact',
		page : 'select_layer_contact',
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

			layer.selLayer.find('.preferred-channel li div').on('click', function(){
				layer.hide();
			});
		}
	}

	fnList.fnCreateLayer(createLayerParam);

}
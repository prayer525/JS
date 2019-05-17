fnList.selLayerOffer = function(){
	console.log('selLayerOffer')
	
	var createLayerParam = {
		id : '#selectLayerOffer',
		page : 'select_layer_offer',
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
	
			layer.selLayer.find('input[name=sel-offer]').off('change').on('change', function(){
				if($('input[name=sel-offer]:checked').val() != null){
					btnConfirm.removeClass('disabled');
				}
			})
		}
	}

	fnList.fnCreateLayer(createLayerParam)
}
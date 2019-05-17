fnList.selLayerOffer = function(param){
	$('.select-layer-wrap #selectLayerOffer').remove();

	var selLayer = null;

	var layer = $('<div></div>').load('../html/layer/select_layer_offer.html #selectLayerOffer', function(data){
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

		$('#selectLayerOffer .btn-select-layer-confirm').off('click').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				layer.hide();
			}
		});

		$('#selectLayerOffer input[name=sel-offer]').off('change').on('change', function(){
			if($('input[name=sel-offer]:checked').val() != null){
				$('#selectLayerOffer .btn-select-layer-confirm').removeClass('disabled');
			}
		})
		
		setTimeout(function(){
			layer.show()
		},30);
	}

	layer.show = function(){
		console.log('show')
		$('.back-pannel').addClass('show');
		$('.select-layer-wrap #selectLayerOffer').addClass('show');
	}

	layer.hide = function(){
		console.log('hide')
		$('.back-pannel').removeClass('show');
		$('.select-layer-wrap #selectLayerOffer').removeClass('show');
	}

}
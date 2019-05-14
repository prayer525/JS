fnList.selLayerVehicle = function(param){
	$('.select-layer-wrap #selectLayerVehicle').remove();

	var selLayer = null;

	var layer = $('<div></div>').load('../html/layer/select_layer_vehicle.html #selectLayerVehicle', function(data){
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

		$('#selectLayerVehicle .btn-select-layer-confirm').off('click').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				layer.hide();
			}
		});

		$('#selectLayerVehicle input[name=sel-vehicle]').off('change').on('change', function(){
			if($('input[name=sel-vehicle]:checked').val() != null){
				$('#selectLayerVehicle .btn-select-layer-confirm').removeClass('disabled');
			}
		})
		
		setTimeout(function(){
			layer.show()
		}, 30);
	}

	layer.show = function(){
		console.log('show')
		$('.back-pannel').addClass('show');
		$('.select-layer-wrap #selectLayerVehicle').addClass('show');
	}

	layer.hide = function(){
		console.log('hide')
		$('.back-pannel').removeClass('show');
		$('.select-layer-wrap #selectLayerVehicle').removeClass('show');
	}

}
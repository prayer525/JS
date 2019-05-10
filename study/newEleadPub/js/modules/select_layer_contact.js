fnList.selLayerContact = function(param){
	$('.select-layer-wrap #selectLayerContact').remove();

	var selLayer = null;

	var layer = $('<div></div>').load('../html/layer/select_layer_contact.html #selectLayerContact', function(data){
		console.log('request layer');
		selLayer = $( $(this).html() );
		layer.dataBind(selLayer);
	});

	layer.dataBind = function(){
		console.log('dataBind selLayer')

		layer.eventBind();
	}

	layer.eventBind = function(){
		selLayer.find('.preferred-channel li:last-child div').on('click', function(){
			layer.hide();

			$.singlePage.goPage('outcome_update.html', {'preload':'true'});
		});
		
		$('.select-layer-wrap').append(selLayer);

		setTimeout(function(){
			layer.show()
		}, 30);
	}

	layer.show = function(){
		console.log('show')
		$('.back-pannel').addClass('show');
		$('.select-layer-wrap #selectLayerContact').addClass('show');
	}

	layer.hide = function(){
		console.log('hide')
		$('.back-pannel').removeClass('show');
		$('.select-layer-wrap #selectLayerContact').removeClass('show');
	}

}
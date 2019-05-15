fnList.selLayerBrochure = function(param){
	$('.select-layer-wrap #selectLayerBrochure').remove();

	var selLayer = null;

	var layer = $('<div></div>').load('../html/layer/select_layer_brochure.html #selectLayerBrochure', function(data){
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

		// confirm layer
		$('#selectLayerBrochure .btn-select-layer-confirm').off('click').on('click', function(){
			if($(this).hasClass('disabled')){
				return false;
			}else{
				layer.hide();
			}
		});

		// brochure list width
		var liWidth = 0;
		$.each($('.layer-brochure-list-wrap li'), function(idx, item){
			liWidth += $(item).outerWidth()
		});
		$('.layer-brochure-list-wrap ul').css('width', liWidth+'px');

		// select brochure list
		var selTemp = $('<li><span></span><button><i class="fas fa-times-circle"></i></button></li>');

		$('.layer-brochure-list input').off('change').on('change', function(){
			if($(this).is(':checked')){
				var temp = selTemp.clone();

				temp.find('span').text($(this).next('label').text())
				temp.addClass($(this).attr('id'));
				$('.layer-selected-brochure-list').append(temp)
			}else{
				$('.layer-selected-brochure-list').find('.'+$(this).attr('id')).remove();
			}

			if($('.layer-selected-brochure-list li').length > 0){
				$('#selectLayerBrochure .btn-select-layer-confirm').removeClass('disabled')
			}else{
				$('#selectLayerBrochure .btn-select-layer-confirm').addClass('disabled')
			}
		})

		$('.layer-selected-brochure-list').off('click', 'button').on('click', 'button', function(){
			var _li = $(this).parent('li')
			var _class = _li.attr('class')
			$('.layer-brochure-list').find('#'+_class).prop('checked', false);

			_li.remove();
		})
		
		setTimeout(function(){
			layer.show()
		},30);
	}

	layer.show = function(){
		console.log('show')
		$('.back-pannel').addClass('show');
		$('.select-layer-wrap #selectLayerBrochure').addClass('show');
	}

	layer.hide = function(){
		console.log('hide')
		$('.back-pannel').removeClass('show');
		$('.select-layer-wrap #selectLayerBrochure').removeClass('show');
	}

}
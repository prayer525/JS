fnList.selLayerBrochure = function(param){
	var createLayerParam = {
		id : '#selectLayerBrochure',
		page : 'select_layer_brochure',
		bindEvent : function(layer){
			console.log('layer : ' , layer)
			var btnConfirm = layer.selLayer.find('.btn-select-layer-confirm');
			// confirm layer
			btnConfirm.off('click').on('click', function(){
				if($(this).hasClass('disabled')){
					return false;
				}else{
					layer.hide();
				}
			})

			// borchure list
			var brochureList = {
				width : 0,
				ul : $('.layer-brochure-list'),
				li : $('.layer-brochure-list li'),
				list : $('.layer-selected-brochure-list'),
				temp : $('<li><span></span><button><i class="fas fa-times-circle"></i></button></li>'),
				init : function(){
					$.each(brochureList.li, function(idx, item){
						brochureList.width += $(item).outerWidth();
					})

					brochureList.ul.css('width', brochureList.width + 'px');

					brochureList.ul.find('input').off('change').on('change', function(){
						if($(this).is(':checked')){
							var temp = brochureList.temp.clone();
		
							temp.find('span').text($(this).next('label').text())
							temp.addClass($(this).attr('id'));
							brochureList.list.append(temp)
						}else{
							brochureList.list.find('.'+$(this).attr('id')).remove();
						}

						brochureList.fnCheckValidate();
					})

					brochureList.list.off('click', 'button').on('click', 'button', function(){
						var _li = $(this).parent('li');
						var _class = _li.attr('class');

						brochureList.ul.find('#'+_class).prop('checked', false);
		
						_li.remove();

						brochureList.fnCheckValidate();
					})
				},
				fnCheckValidate : function(){
					if(brochureList.list.find('>li').length > 0){
						btnConfirm.removeClass('disabled')
					}else{
						btnConfirm.addClass('disabled')
					}
				}
			}

			brochureList.init();
		}
	}

	fnList.fnCreateLayer(createLayerParam);
}
var fnList = {
	initTabEvent:function(){
		// prevent tab touch start 
		$('.lead-list, .first-contact-summary-wrap, .dashboard-lead-list-wrap').on('touchstart', function(){
			fnList.pageMain.mainSwipeLoop.freez();
		}).off('touchend').on('touchend', function(){
			fnList.pageMain.mainSwipeLoop.unfreez();
		})

		// toggle event button in lead item
		var listSwipe = Swiped.init({
			query: '.lead-list li a',
			list: true,
			right: 65
		});
		$('.lead-list li').off('click', 'button').on('click', 'button', function(e){
			$.each(listSwipe, function(idx, item){
				item.close(true);
			})
		})

		// acordian menu with user name
		$('.lead-list-wrap li').off('click', '>h3').on('click', '>h3', function(){
			$(this).parent('li').toggleClass('show');
		})

		// page scroll event
		$('.scroll-wrap').scroll(function(event){
			fnList.hasScrolled($(this).scrollTop());
		}).resize(function(){
			console.log($(this).outerHeight())
		});
	},
	hasScrolled:function(st){
		var lastScrollTop = 0;
		var delta = 5;
		var navbarHeight = 50;
		
		// Make sure they scroll more than delta
		if (st > lastScrollTop && st > navbarHeight){
			$('.controll-btn-wrap, .main-swipe-cont .tit-h2').addClass('nav-up');
		} else {
			if(st + $('.scroll-wrap').height() < $(document).height()) {
				$('.controll-btn-wrap, .main-swipe-cont .tit-h2').removeClass('nav-up');
			}
		}

		lastScrollTop = st;
	},
	fnMainTab:{
		tab : [
			{
				page : 'dashboard', 
				fnName : 'pageDashboard'
			},{
				page : 'open_lead', 
				fnName : 'pageOpenLead'
			},{
				page : 'my_task', 
				fnName : 'pageMyTask'
			},{
				page : 'performance', 
				fnName : 'pagePerformance'
			}
		],
		change:function(idx){
			var _this = this;
			$('<div></div>').load('../html/'+_this.tab[idx].page + '.html #'+_this.tab[idx].fnName, function(data){
				selLayer = $( $(this).html() );
	
				console.log('selLayer : ' , selLayer, idx)
	
				$('.main-swipe-cont>li').eq(idx).html(selLayer.html());
	
				fnList[_this.tab[idx].fnName]();
			});
		}
	},
	fnBindLayer:function(){
		$('.sel-vehicle-layer').off('click').on('click', function(e){
			fnList.selLayerVehicle();
		})
	
		$('.sel-schedule-layer').off('click').on('click', function(e){
			fnList.selLayerSchedule();
		})
	
		$('.sel-brochure-layer').off('click').on('click', function(e){
			fnList.selLayerBrochure();
		})
	
		$('.sel-offer-layer').off('click').on('click', function(e){
			fnList.selLayerOffer();
		})
	},
	fnCreateLayer:function(param){
		$('.select-layer-wrap').find(param.id).remove();

		var layer = {
			selLayer : null,
			dataBind : function(){
				$('.select-layer-wrap').append(layer.selLayer);
				

				layer.selLayer.off('click', '.btn-select-layer-close').on('click', '.btn-select-layer-close', function(){
					layer.hide();
				})
	
				param.bindEvent(layer);

				setTimeout(function(){
					layer.show()
				},30);
			},
			show : function(){
				$('body').addClass('block-scroll');
				$('.select-layer-wrap').find(param.id).addClass('show');
			},
			hide : function(){
				$('body').removeClass('block-scroll');
				$('.select-layer-wrap').find(param.id).removeClass('show');
			}
		}

		$('<div></div>').load('../html/layer/'+param.page+'.html ' + param.id, function(data){
			layer.selLayer = $( $(this).html() );
			layer.dataBind();
		});
	}
};
var Data = {
	data:{
	},
	apiData:{
	},
	set:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.data[k] = v;
	},
	get:function(k){
		if(Data.data[k] === undefined){
			return '';
		}else{
			return Data.data[k];
		}
	},
	setData:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.apiData[k] = v;
		Data.put();
	},
	getData:function(k){
		if(Data.apiData[k] === undefined){
			return '';
		}else{
			return Data.apiData[k];
		}
	},
	getItem:function(k, v){
		if(Data.apiData[k] === undefined || Data.apiData[k][v] === undefined){
			return '';
		}else{
			return Data.apiData[k][v];
		}
	},
	put:function(callBack){
		window.localStorage.setItem("data", JSON.stringify(Data.data));
		window.localStorage.setItem("apiData", JSON.stringify(Data.apiData));
		if(callBack !== undefined){
			callBack();
		}
	},
	withdraw:function(callBack){
		var _data = window.localStorage.getItem("data");

		if(_data != undefined){
			Data.data = JSON.parse(_data);

			var _apiData = window.localStorage.getItem("apiData");

			if(_apiData != undefined){
				Data.apiData = JSON.parse(_apiData);

				if(callBack !== undefined){
					callBack();
				}
			}
		}
	}
}
window.Data = Data;
Data.withdraw();

// 공통 이벤트 바인드
$(function(){
	/********************************************************************************************
	 * - detail popup - comment show more
	 * - detail popup - comment show more : comment 영역을 클릭해도 보여지게 수정
	 ********************************************************************************************/ 
	$(document).off('click', '.lead-comment button').on('click', '.lead-comment button', function(){
		$(this).parent('div').toggleClass('show');
	}).off('click', '.lead-comment .comment').on('click', '.lead-comment .comment', function(){
		if($(this).next('button').css('display') != 'none'){
			$(this).next('button').trigger('click');
		}
	});

	/********************************************************************************************
	 * Comment length count
	 ********************************************************************************************/
	$(document).off('keyup', 'textarea').on('keyup', 'textarea', function(){
		var _length = $(this).val().length;

		$(this).prev('.max-comment-length').find('.cnt').text(_length);
	})

	$.fn.changeTab = function(){
		var _this = this;
		var _id = _this.attr('id');
	
		console.log('changeTab : ' , _this, _id)
	
		_this.find('a').off('click').on('click', function(){
			var _idx = $(this).parent('li').index();
			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
			$('.'+_id).eq(_idx).show().siblings('.'+_id).hide();
	
			return false;
		});
	}
})
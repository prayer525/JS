'use strict';


$(function(){
	//design select box
	//var newSelect = new SelectBox('select-default');
	//var newSelectBasic = new SelectBox('select-basic');
	//var newSelectDark = new SelectBox('select-dark');

	if(!isMobile && !isTablet){
		$('body').addClass('desktop');
	}
});



var moveTopFn = new moveTop('.section-bottom .btn-default.ico-top');

var alert = function(msg,callback,btnText){
	$.alerts.alert(msg,callback,btnText);
};

var confirm = function(msg,callback,text1,text2){
	if(!text1) var text1 = '濡쒓렇��';
	$.alerts.confirm(msg,callback,text1,text2);
};

//full size layer load
var viewFullLayer = function(btnId,layerId,loadHtml,callback){
	$(btnId).on(userEvents,function(event){
		event.preventDefault();
		var url = loadHtml+' '+layerId, $div = $('<div />');
		
		$div.load(url,function(rs,status,xhr){
			if(status==='success'){
				//if( $(layerId).height() >$(window).height()){
				//	$(layerId).css({
				//		'position':'absolute'
				//	});
				//}else{
					console.log($(layerId).html());
					$(layerId).css({
						'position':'fixed',
						'overflow':'auto'
					});
					$('html,body').css('overflow','hidden');
				//}

				$(this).find('.btn-close').on('click',function(){
					$div.remove();
					$('html,body').css('overflow','auto');
				});
				if(callback) callback();
			}
		}).appendTo('body');
	});
}

//由ъ뒪�� �ㅽ��� �덉씠�� �좉�
var toggleListLayer = function($link,$layer){
	var speed = 200;
	$link.off().on('click',function(event){
		event.preventDefault();
		if($layer.is(':visible')){
			$layer.slideUp(speed);
		}else{
			$layer.slideDown(speed);
		}
	});
}

//�듯빀寃��� �곷떒 �덉씠�� �좉�
var toggleLayer = function(btn,layer,cls){
	if(typeof btn=='object'){
		var $btn = btn;
	}else if(typeof btn=='string'){
		var $btn = $(btn);
	}
	if(typeof layer=='object'){
		var $layer = layer;
	}else if(typeof layer=='string'){
		var $layer = $(layer);
	}
	$btn.off().on(userEvents,function(event){
		event.preventDefault();
		if($layer.hasClass(cls)){
			$layer.removeClass(cls);
		}else{
			$layer.addClass(cls);
		}
	});
}

//湲곕낯�ㅽ��� �덉씠�� �좉�
var ToggleUiLayer = function(layer){
	var time =300,
		btn = '.fn-btn',
		target = '.area-detail',
		classExpand = 'expand',
		classCollapse = 'collapse',
		classBlind = 'blind',
		expanding = function($layer){
			$layer.find(target).slideDown(time,function(){
				$layer.removeClass(classCollapse);
				$layer.addClass(classExpand);
			});
		},
		collapsing = function($layer){
			$layer.find(target).slideUp(time,function(){
				$layer.removeClass(classExpand);
				$layer.addClass(classCollapse);
			});
		}

	$(window).on('load',function(){
		$(layer).each(function(index){
			var $target = $(this).find(target);
			if( $(this).hasClass(classExpand) ){
				$target.show();
			}else if( $(this).hasClass(classCollapse) ){
				$target.hide();
			}
			if( $(this).hasClass(classBlind) ){
				$(this).hide();
			}
		});
	});

	$(btn).each(function(){
		$(this).off().on('click',function(e){
			e.preventDefault();
			var $layer = $(this).parents(layer);
			if($layer.hasClass(classExpand)){
				collapsing($layer);
			}else if($layer.hasClass(classCollapse)){
				expanding($layer);
			}
		});
	});
}


//�덉씠�� �앹뾽 �덉뿉 ��
function PopupTab(layer,index){
	if(!index) index=0;
	if(!layer) layer='';
	var tabEle = layer+' .tab-default .tab-item',
		classActive = 'active',
		onActive = function(index){
			$(tabEle).siblings('.'+classActive).removeClass(classActive);
			$(tabEle).eq(index).addClass(classActive);
			var $target = $($(tabEle).eq(index).attr('href'));
			$target.show();
			$target.siblings('div:visible').hide();
		}
	onActive(index);
	$(tabEle).each(function(i){
		$(this).on(userEvents,function(e){
			e.preventDefault();
			onActive(i);
		});
	});
    var eduBankCateSlide = new swiperBasic({
        targetDiv: '#divEduBankCateSlide',
        paging: false
    });
}

//hbs �곷떒 硫붾돱
var HBSMenus = function(a,b,c){
	var _this = this,
		idx = {a : a, b : b, c : c},
		menuSrc = '/assets/js/hbs-menus.json.js',
		subData,
		firstTime = true,

	init = function(){
		try{

		$.getJSON(menuSrc,function(json){
			$.each(json, function(key,val){
				if(val.menuIdx === idx.a){
					_this.makeMajor(val,getTitle(val,idx.a,idx.b,idx.c));
					subData = val.subList;
				}
			});
			eventInit(idx.b,idx.c);
		}).fail(function( jqxhr, textStatus, error ) {
			console.log( "getJson Error: " + textStatus + ' '+ error );
		});

		}catch(e){
			console.log(e);
		}
	},

	getTitle = function(datas,a,b,c){
		var title;

		if(c!==undefined){
			var datas = datas.subList;
			$.each(datas,function(k,v){
				if(v.menuIdx === b){
					$.each(v.subList,function(k2,v2){
						if(v2.menuIdx === c){
							title = v2.menuName;
						}
					});
				}
			});
		}else if(b!==undefined){
			var datas = datas.subList;
			$.each(datas,function(k,v){
				if(v.menuIdx === b){
					title = v.menuName;
				}
			});
		}else{
			title = datas.menuName;
		}

		return title;
	},

	eventInit = function(b,c){
		$('.'+_this.classMenu+'1').each(function(){
			$(this).off().on(_this.handleEvent,function(e){
				e.preventDefault();

				if( $('.'+_this.classSection).has('.'+_this.classSublayer).length==0){
					_this.makeSub(subData,1,$('.'+_this.classSection));
				}else{
					$('.'+_this.classSection+' > .'+_this.classSublayer).slideToggle(_this.speed);
				}
				$(this).toggleClass(_this.classExpand);

				eventBtnClose();
				eventSub();

				if(firstTime){
					if(c!==undefined){
						_this.makeSub(subData[b].subList,2,$('.'+_this.classMenu+'2[data-index='+b+']').parent());
						$('.'+_this.classMenu+'2[data-index='+b+']').addClass(_this.classActive);
						$('.'+_this.classMenu+'3[data-index='+c+']').addClass(_this.classActive);
						$('.'+_this.classMenu+'2[data-index='+b+'] + .'+_this.classBtnToggle).addClass(_this.classExpand);
					}else if(b!==undefined){
						$('.'+_this.classMenu+'2[data-index='+b+']').addClass(_this.classActive);
					}
					firstTime = false;
				}
			});
		});
	},

	eventBtnClose = function(){
		$('.'+_this.classSection+' .'+_this.classBtnClose).on(_this.handleEvent,function(e){
			e.preventDefault();
			$('.'+_this.classSection+' .'+_this.classSublayer).slideUp(_this.speed);
			$('.'+_this.classArea+'1'+' > .'+_this.classBtnToggle).removeClass(_this.classExpand);
		});
	},

	eventSub = function(){
		$('.'+_this.classArea+'2'+' li').each(function(index){
			var _index = index;
			$(this).find('.'+_this.classBtnToggle).off().on(_this.handleEvent,function(e){
				e.preventDefault();
				if( $(this).parent().has('.'+_this.classArea+'3').length==0){
					_this.makeSub(subData[_index].subList,2,$(this).parent());
				}else{
					$(this).siblings('.'+_this.classSublayer).slideToggle(_this.speed);
				}
				$(this).siblings('.'+_this.classMenu+'2').toggleClass(_this.classExpand);
				$(this).toggleClass(_this.classExpand);
			});
		});
	}

	$(window).on('load',function(){
		init(idx);
	});
}
HBSMenus.prototype = {
	speed : 300,
	handleEvent : userEvents,
	classSection : 'section-category',
	classMenu : 'dep',
	classArea : 'area-dep',
	classBtnToggle : 'btn-toggle',
	classBtnClose : 'btn-close',
	classExpand : 'expand',
	classActive : 'active',
	classSublayer : 'sub-layer',
	textClose : '�リ린',
	textToggle : '�섏쐞 硫붾돱 蹂닿린',

	makeMajor : function(datas,title){
		var _this = this,

			$wrapSection = $('<div />')
				.addClass(_this.classArea+'1')
				.appendTo($('.'+_this.classSection)),

			$button = $('<button />')
				.addClass(_this.classMenu+'1')
				.text(title)
				.appendTo($wrapSection);
	},

	makeSub : function(datas,depth,$parent){
		var _this = this,

			classArea = _this.classArea+(parseInt(depth)+1),
			classLink = _this.classMenu+(parseInt(depth)+1),

			$subList = $('<ul />')
				.addClass(classArea),

			$sublayer = $('<div />')
				.addClass(_this.classSublayer)
				.appendTo($parent)
				.append($subList)
				.hide();

		if(depth===1){
			var $btnClose = $('<button />')
					.addClass(_this.classBtnClose)
					.appendTo($sublayer),
				$btnSpan = $('<span />')
					.text(_this.textClose)
					.appendTo($btnClose);
		}

		$.each(datas,function(key,val){
			var $subItem = $('<li />')
					.appendTo($subList),

				$subLink = $('<a />')
					.addClass(classLink)
					.attr('href',val.menuLink)
					.text(val.menuName)
					.appendTo($subItem)
					.attr('data-index',val.menuIdx)
					.on(userEvents,function(){
						window.location = val.menuLink;
					});

			if(val.subList){
				var $btnToggle = $('<button />')
					.attr('role','button')
					.addClass(_this.classBtnToggle)
					.text(_this.textToggle)
					.appendTo($subItem);
			}
		});

		$sublayer.slideDown(_this.speed);
	}
}



var SingleBannerSlide = function(){
	var isSwipe = true,
		eleSection = '#rolling01';

	if(!isMobile&&!isTablet) isSwipe=false;

	var setSize = function(ele){
		var h = $(ele+' img').height();
		$(ele+' .swiper-wrapper,'+ele+' .swiper-slide').height(h+'px');
	}

	$(window).on('load',function(){
		if($(eleSection+' .swiper-container .swiper-slide').size()<2){
			$(eleSection+' .arrow-left').hide();
			$(eleSection+' .arrow-right').hide();
			$(eleSection+' .pagination').hide();
		}else{
			var bannerSwiper = new Swiper(eleSection+' .swiper-container',{
				paginationClickable: true,
				pagination: eleSection+' .pagination',
				loop:true,
				grabCursor: true,
				nextButton:isSwipe,
				prevButton:isSwipe,
				onInit: function(){
					setSize(eleSection);
					setTimeout(function(){
						$(eleSection+' .arrow-left').animate({left:-100});
						$(eleSection+' .arrow-right').animate({right:-100});
					}, 3000);
				},
				onTouchStart:function(){
					$(eleSection+' .arrow-left').animate({left:0},0);
					$(eleSection+' .arrow-right').animate({right:0},0);
				},
				onTouchEnd:function(){
					setTimeout(function(){
						$(eleSection+' .arrow-left').animate({left:-100});
						$(eleSection+' .arrow-right').animate({right:-100});
					}, 3000);
				},
				onSlideReset: function(){
					setSize(eleSection);
				}
			});
			$(eleSection+' .arrow-left').on(userEvents, function(e){
				e.preventDefault();
				bannerSwiper.slidePrev();
			});
			$(eleSection+' .arrow-right').on(userEvents, function(e){
				e.preventDefault();
				bannerSwiper.slideNext();
			});
		}
	}).on("resize orientationchange",function(){
		setTimeout( function(){ setSize(eleSection) },100);			//for android
	});
}


/* 20160427 */
$(function(){	
	var swiper2 = new Swiper('#rolling02 .swiper-container', {
        pagination: '#rolling02 .swiper-pagination',
        paginationClickable: true,
		loop:true,
        nextButton: '#rolling02 .arrow-right',
        prevButton: '#rolling02 .arrow-left',
        spaceBetween: 30,
		onTouchStart:function(){
			$('#rolling02 .arrow-left').animate({left:0},0);
			$('#rolling02 .arrow-right').animate({right:0},0);
		},
		onTouchEnd:function(){
			setTimeout(function(){
				$('#rolling02 .arrow-left').animate({left:-100});
				$('#rolling02 .arrow-right').animate({right:-100});
			}, 3000);
		}
    });
});


var swiperBasic = function(params){
    var defaults = {
            paging : true,
            loop : true,
            size : 1
        },
        params = params || {},
        isSwipe = true;

    if(!isMobile&&!isTablet) isSwipe=false;

    for (var prop in defaults) {
        if (prop in params && typeof params[prop] === 'object') {
            for (var subProp in defaults[prop]) {
                if (! (subProp in params[prop])) {
                    params[prop][subProp] = defaults[prop][subProp];
                }
            }
        }
        else if (! (prop in params)) {
            params[prop] = defaults[prop];
        }
    }

    var divPaging = null;
    if(params.paging==true) divPaging = params.targetDiv+' .pagination';

    $(function(){
		var h = $(params.targetDiv+' .swiper-slide').outerHeight();
		$(params.targetDiv+' .swiper-container').height(h+'px');

		if($(params.targetDiv+' .swiper-container .swiper-slide').size()<2){
			$(params.targetDiv+' .arrow-left').hide();
			$(params.targetDiv+' .arrow-right').hide();
			$(divPaging).hide();
		}else{
			var startNo = params.startNo? params.startNo : 0;
			var newswiper = new Swiper(params.targetDiv+' .swiper-container',{
				slidesPerView: params.size,
				loop: params.loop,
				initialSlide: startNo,
				swipeToNext:isSwipe,
				swipeToPrev:isSwipe,
				paginationClickable: params.paging,
				pagination: divPaging,
				nextButton: params.targetDiv+' .arrow-right',
				prevButton: params.targetDiv+' .arrow-left',

				onSlideChangeEnd : function(){      //移댄뀒怨좊━ �댁슜 蹂�寃쎈맆 �� �ㅻ쪟 �덉뼱�� 異붽�
					if(params.targetDiv =='.area-best .lists'){
						$(divPaging+' .swiper-pagination-bullet').removeClass('swiper-pagination-bullet-active');

						if(newswiper==undefined){
							var i=0;
						}else{
							var i = newswiper.activeIndex-1;
						}

						if(i>$(divPaging+' .swiper-pagination-bullet').size()-1) i=0;
						$(divPaging+' .swiper-pagination-bullet').eq(i).addClass('swiper-pagination-bullet-active');
					}
				}
			});
		}
	});
}

//HBS硫붿씤 愿��� �⑥닔
var HBSMains = function(params){
	if(params.topSlide){
		var slideBanner = new SingleBannerSlide();
	}

	if(params.bestSlide){
		HBSBest.init(params.bestSlide, params.bestSlideStartNo);
	}

	if(params.reviewSlide){
		var slideReview = new swiperBasic({
			targetDiv : params.reviewSlide
		});
	}

	if(params.mobilesSlide){
		var slideMobile = new swiperBasic({
			targetDiv :params.mobilesSlide,
			size : 2,
			paging : false
		});
	}

	if(params.refundsSlide){
		var slideRefund = new swiperBasic({
			targetDiv : params.refundsSlide,
			size : 2,
			paging : false
		});
	}

	if(params.listTypeToggle){
		hbsListType();
	}

	var setSize = function(){
		var hThumbs = $('.area-thumb').find('.list-item .block').outerHeight();
		$('.area-thumb').find('.swiper-container,.swiper-wrapper,.swiper-slide').height(hThumbs+'px');

		var hReviews = $('.area-reviews').find('.list-item').outerHeight()*3;
		$('.area-reviews').find('.swiper-container,.swiper-wrapper,.swiper-slide').height(hReviews+'px');
	};
	$(window).on('load resize orientationchange',function(){
		setSize();
	});
}

var hbsListType = function(mode){
	var lists = '.hasListToggle .lists',
		classListType = 'typeList',
		classModeThumb = 'mode-thumb',
		classModeList = 'mode-list';

	$(function(){
		if($('.hasListToggle .'+classModeThumb).hasClass('active')){
			$(lists).removeClass(classListType);
			$('.hasListToggle .'+classModeList).removeClass('active');
		}else{
			$(lists).addClass(classListType);
			$('.hasListToggle .'+classModeList).addClass('active');
		}

		$('.hasListToggle .btn-mode').each(function(){
			$(this).on(userEvents,function(){
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');

				if($(this).hasClass(classModeThumb)){
					$(lists).removeClass(classListType);
				}else{
					$(lists).addClass(classListType);
				}
			});
		});
	});
}

//var SlideBestList;
var HBSBest = {
	divCategory : '.area-best .cate ',
	divLists : '.area-best .lists ',

	init : function(param, slideStartNo){
		var startNo = slideStartNo? slideStartNo : 0;
		var _this = this;
		$(function(){
			var size = $(param+' .cate p.swiper-slide').size();
			if( size==1){
				$(param+' .cate').addClass('singleSlide');
			}else if( size==2){
				$(param+' .cate').addClass('doubleSlide');
			}else{
				var slideCategory = new swiperBasic({
					targetDiv : param+' .cate',
					size : 2,
					startNo: startNo,
					paging : false,
					onSlideChangeEnd:function(){
						//console.log("onSlideChangeEnd >>>" +slideCategory.clickedIndex);
					},
					onClick:function(){
						//console.log("onClick >>>"+slideCategory.clickedIndex);
					}
				});
			}

			$(_this.divCategory+'.swiper-slide:not(.swiper-slide-duplicate) .item').eq(startNo).click();
		});
	},
	loadBestList : function(src,index){
		var _this = this;
		$.getJSON(src,function(json) {
			_this.markup(json);

			new swiperBasic({
				targetDiv : '.area-best .lists'
			});

			var $items = $(_this.divCategory+'.swiper-slide .item');

			$(_this.divCategory+'.swiper-slide .active').removeClass('active');

			if($items.size()<3){
				$items.eq(index).addClass('active');
			}else{
				$items.eq(index+2).addClass('active');

				if( $(_this.divCategory+'.swiper-slide-duplicate').hasClass('swiper-slide-visible') ){
					var size = $(_this.divCategory+'.swiper-slide:not(.swiper-slide-duplicate) .item').size();
					if(index<=size-2){
						var i = size+index+2;
					}else{
						var i = 1;
					}
					$items.eq(i).addClass('active');
				}
				$(_this.divLists+'.pagination .swiper-pagination-switch').eq(0).addClass('swiper-visible-switch swiper-active-switch');     //移댄뀒怨좊━ �댁슜 蹂�寃쎈맆 �� �ㅻ쪟 �덉뼱�� 異붽�
			}
		}).fail(function( jqxhr, textStatus, error ) {
			//console.log( "getJson Error: " + textStatus + ' '+ error );
		});
	},
	markup : function(datas,param){
		var _this = this,
			$wrapperSlide = $(_this.divLists+'.swiper-wrapper').empty(),
			divArray = new Array();

		if(datas.length/5>1){
			for(var i=0;i<datas.length/5;i++){
				var $div = $('<div />')
					.addClass('swiper-slide')
					.width($(document).width()+'px')
					.appendTo($wrapperSlide);
				divArray.push($div);
			}
		}

		$.each(datas,function(key,val){
			if(key<5){
				var i = 0;
			}else if(key>=5&&key<10){
				var i = 1;
			}else if(key>=10&&key<15){
				var i = 2;
			}else if(key>=15){
				var i = 3;
			}
			var $wrapper = divArray[i],

				$item = $('<div />')
						.addClass('list-item')
						.appendTo($wrapper),
				$link = $('<a />')
						.attr('href',val.link)
						.appendTo($item),
				$rank = $('<span />')
						.addClass('rank')
						.text(val.rank)
						.appendTo($link),
				$title = $('<span />')
						.addClass('title')
						.text(val.title)
						.appendTo($link);

			if(key%5===0){
				var $thumb = $('<span />')
							.addClass('thumb')
							.appendTo($link),
					$img = $('<img />')
							.attr({
								'src':val.imgSrc,
								'alt':''
							})
							.appendTo($thumb),
					$text = $('<span />')
							.addClass('text')
							.text(val.text)
							.appendTo($link);
			}
		});
	}
}



/*! Image Map Resizer (imageMapResizer.min.js ) - v1.0.7 - 2018-05-01
 *  Desc: Resize HTML imageMap to scaled image.
 *  Copyright: (c) 2018 David J. Bradshaw - dave@bradshaw.net
 *  License: MIT
 */

!function(){"use strict";function a(){function a(){function a(a,d){function e(a){var d=1===(f=1-f)?"width":"height";return c[d]+Math.floor(Number(a)*b[d])}var f=0;j[d].coords=a.split(",").map(e).join(",")}var b={width:l.width/l.naturalWidth,height:l.height/l.naturalHeight},c={width:parseInt(window.getComputedStyle(l,null).getPropertyValue("padding-left"),10),height:parseInt(window.getComputedStyle(l,null).getPropertyValue("padding-top"),10)};k.forEach(a)}function b(a){return a.coords.replace(/ *, */g,",").replace(/ +/g,",")}function c(){clearTimeout(m),m=setTimeout(a,250)}function d(){l.width===l.naturalWidth&&l.height===l.naturalHeight||a()}function e(){l.addEventListener("load",a,!1),window.addEventListener("focus",a,!1),window.addEventListener("resize",c,!1),window.addEventListener("readystatechange",a,!1),document.addEventListener("fullscreenchange",a,!1)}function f(){return"function"==typeof i._resize}function g(a){return document.querySelector('img[usemap="'+a+'"]')}function h(){j=i.getElementsByTagName("area"),k=Array.prototype.map.call(j,b),l=g("#"+i.name)||g(i.name),i._resize=a}var i=this,j=null,k=null,l=null,m=null;f()?i._resize():(h(),e(),d())}function b(){function b(a){if(!a.tagName)throw new TypeError("Object is not a valid DOM element");if("MAP"!==a.tagName.toUpperCase())throw new TypeError("Expected <MAP> tag, found <"+a.tagName+">.")}function c(c){c&&(b(c),a.call(c),d.push(c))}var d;return function(a){switch(d=[],typeof a){case"undefined":case"string":Array.prototype.forEach.call(document.querySelectorAll(a||"map"),c);break;case"object":c(a);break;default:throw new TypeError("Unexpected data type ("+typeof a+").")}return d}}"function"==typeof define&&define.amd?define([],b):"object"==typeof module&&"object"==typeof module.exports?module.exports=b():window.imageMapResize=b(),"jQuery"in window&&(jQuery.fn.imageMapResize=function(){return this.filter("map").each(a).end()})}();
//# sourceMappingURL=imageMapResizer.map
$(function(){
	if ($('[data-type="responsive-map"]').length > 0)
	{
		$('[data-type="responsive-map"]').imageMapResize();
	}
});


function fn_replaceAll(str, searchStr, replaceStr) {

    return str.split(searchStr).join(replaceStr);
}

function fn_isAppInstalled(href, callback) {
    if (_app_installed == "False") {
        confirm("�대꽬 �ㅻ쭏�몄틺�쇱뒪 APP �ㅼ튂 �� �댁슜�섏떎 �� �덉뒿�덈떎\n�ㅼ튂�붾㈃�쇰줈 �대룞�섏떆寃좎뒿�덇퉴?", function () { location.href = 'http://apps.hunet.co.kr/down/mlearning.html' }, "�뺤씤", "痍⑥냼");
    }
    else {
        if (typeof callback != "undefined" && callback != "") {
            eval(callback);
            return;
        }

        if (typeof href != "undefined" && href != "") {
            location.href = href;
            return;
        }
    }
}


// scolling page

function scrollManager(){
	var tabPanelStartY = 0;
	var $tabMenu = null;
	var $tabPaneList = null;
	var $tabMenuItemList = null;
	var aryPanePosList = [];
	var $selectTabItem = null;
			
	function init(){
		$tabMenu = $('.group-details .area-tab');
		tabPanelStartY = $tabMenu.offset().top;
							
		$tabPaneList = $('.tab-con');
		$tabMenuItemList = $tabMenu.find('a');
		
	};
	
	function createPanePosition(){
		return $tabPaneList.each(function(index){
			aryPanePosList.push($(this).offset().top - 57);
			//console.log(aryPanePosList);
		});

	}
	
	
	function initEvent(){
		$(window).on('scroll', function(){
			showScrollInfo();
			checkTabMenuEnabbleZone();
		});
		
		$tabMenuItemList.click(function(e){
			var index = $tabMenuItemList.index(this);
			var pos = aryPanePosList[index];			
			e.preventDefault();
			var target = this.hash;
			var $target = $(target);

			$('html, body').stop().animate({
				'scrollTop': pos
			}, 900, 'swing', function () {
				window.location.hash = target;
			});
		});
	};
	
	// scroll infomation
	function showScrollInfo(){
		var scrollY = window.pageYOffset ;
		//$('#scrollInfo').html('sY='+scrollY);
		//console.log('sY='+scrollY);
	}
	
	function checkTabMenuEnabbleZone(){
		var scrollY = window.pageYOffset;
		if(scrollY>tabPanelStartY){
			$tabMenu.addClass('fixed');
			updateTabMenuItem();
		}else{
			$tabMenu.removeClass('fixed');
		}
		
	}
	
	// scroll position tabmenu active
	function updateTabMenuItem(){
		var scrollY = window.pageYOffset;
		for (var i=aryPanePosList.length-1; i>=0; i--){
			if(scrollY>=aryPanePosList[i]){
				console.log(aryPanePosList[i]);
				setSelectTabItemAt(i);
				return;
			}
		}
	}
	
	function setSelectTabItemAt(index){
		if($selectTabItem){
			console.log($selectTabItem);
			$selectTabItem.removeClass('active');
		}	
		$selectTabItem = $tabMenuItemList.eq(index);
		$selectTabItem.addClass('active');
		
	};
	
	init();
	initEvent();
	createPanePosition();
};


window.onload=function(){
	
	// 20151110 MBA 怨쇱젙�뱀쭠 / 而ㅻ━�섎읆 
	if($('.tab_box_scroll').length > 0) {
		var tab = $('.tab_box_scroll');
		var tabHeight = tab.outerHeight() -1;
		var tabY = tab.offset().top;
		var tabBtn = tab.find('a');
		var contYarr = [];		
		var idxNum = 0;
		$('.tab_cont > div').each(function(){
			contYarr.push($(this).offset().top - tabHeight);
		});
		tabBtn.click(function(e){
			e.preventDefault();
			
			
			if($(this).attr('data-link')){	 /* �ㅽ겕濡ㅼ씠�숈씠 �꾨땲�� 留곹겕�쇰븣�� �대떦 �곸뿭 �ㅽ뻾 */
				location.href = $(this).attr('data-link');
			}else{
				//idxNum = $(this).parent().index();\
				idxNum = $(this).attr('data-nunmber');
				$('html, body').stop().animate({
					'scrollTop': contYarr[idxNum]
				}, 500, 'swing')	
			}
			
		});
		$(window).on('scroll', function(){
			if(tabY < $(window).scrollTop()){
				tab.addClass('fixed');
				$('.tab_cont').addClass('scroll');
			}else{
				tab.removeClass('fixed');	
				$('.tab_cont').removeClass('scroll');
			}

			for (var i=contYarr.length-1; i>=0; i--){
				if(contYarr[i] < $(window).scrollTop()+1){
					//console.log("i : " + i + " / " + "window.pageYOffset+1 : " + ($(window).scrollTop()+1));
					tab.find('li').eq(i).addClass('active').siblings().removeClass('active');
					
					// �꾨왂�ы솕怨쇱젙怨� 留덉��낆떖�붽낵�� �덉쇅
					if($('#marketing').length > 0 || $('#strategy').length > 0){
						tab.find('li').eq(i+1).addClass('active').siblings().removeClass('active');
					}
					
					return;
				}
			}
			
		});	
		
		// 而ㅻ━�섎읆 �곷떒 �대┃�� �대룞
		$('#curriTopMenu area').click(function(e){
			//e.preventDefault();
			$('html, body').stop().animate({
				'scrollTop': contYarr[$(this).attr('data-target')]
			}, 500, 'swing')
		});
	};
	/*
	$('.ex_tab_box ul li a').click(function(e){
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.ex_tab_cont > div').eq($(this).parent().index()).addClass('active').siblings().removeClass('active');
	});
	*/
	/* �뚯뒪��
	$('a[href="#"], map area[href="#"]').click(function(e){
		e.preventDefault();
		alert('留곹겕�덉옟��')
	});
	*/
	// �섍컯�좎껌
	$('.mba_tab li a').click(function(e){
		console.log('aa');
		e.preventDefault();
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.entrance_apply_section .tab_content > div').eq($(this).parent().index()).addClass('on').siblings().removeClass('on');
	});
	
	/* �됱깮耳��� �쒕퉬�� */
	if($('.allcare_tab').length > 0){
		var taragetAllcareTop = $('.allcare_tab').offset().top;
		$(window).on('scroll', function () {
			if(taragetAllcareTop < $(this).scrollTop()){
				 $('.allcare_tab').addClass('fixed');
				 $('.allcare_cont').css('padding-top', '48px')
			}else{
				$('.allcare_tab').removeClass('fixed');
				 $('.allcare_cont').css('padding-top', '0')
			}
		});
	}
	
	$('.allcare_tab ul li').click(function(e){
		e.preventDefault();
		$(this).addClass('on').siblings().removeClass('on');
		$('.allcare_cont > div').eq($(this).index()).show().siblings().hide();
		$('html, body').animate({scrollTop:taragetAllcareTop }, '300');
	});
	
	/* �꾧린�깅줉�대깽�� */
	/*
	$('.event_review .btn_write').click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:$('.review_write').offset().top }, '300');
		$('.review_write > div').hide();
		$($(this).attr('href')).show();
	});
	*/
	
	// 20151215 誘쇨컙�먭꺽利�
	$('.private_wrap .tab_box ul li a').click(function(e){
		$(this).parent().addClass('active').siblings().removeClass('active');
		$('.private_wrap .tab_content > div').eq($(this).parent().index()).show().siblings().hide();
		return false;
	});
	
	var tabNav = $('.group-details .area-tab');
	if (tabNav.length > 0)
	{	
		scrollManager();
	}

	
		

	
};


/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);


// booklearning 

$(document).ready(function(){

	//main Nav
	var navBtn = $('.learning-sub-box .navBox li'),
		nowActiveBox = $('.learning-sub-box .navBox li.active').attr('id');
	
	$('.learning-sub-box .innerBox').children('.'+nowActiveBox).fadeIn();
	navBtn.on('click',function(){
		
		var preNav = $('.learning-sub-box .navBox li.active'),
			preBox = preNav.attr('id'),
			showNav = $(this),
			showBox = showNav.attr('id');

		if(showNav.attr('class') != 'active' ){
			preNav.removeClass('active');
			showNav.addClass('active');
			$('.learning-sub-box .innerBox').children('.'+preBox).fadeOut();
			$('.learning-sub-box .innerBox').children('.'+showBox).fadeIn();
		}

	});

	//sub Nav
	var subNavBtn = $('.learning-sub-box .subNav li');

	subNavBtn.on('click',function(){
		if( $(this).attr('class') != 'active'){
			$('.learning-sub-box .subNav li.active').removeClass('active');
			$(this).addClass('active');
		}
	});

	//mobile popup
	var popupOpenBtn = $('.detailBtn');
	popupOpenBtn.on('click',function(){
		$(this).parents('.author').next('.proPopup').fadeIn();
	});

	var popupCloseBtn = $('.closePopup');
	popupCloseBtn.on('click',function(){
		$(this).parents('.proPopup').fadeOut();
	});

});
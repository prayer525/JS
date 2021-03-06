/*
    Function : Css transition animate status check.
 */
function fnWhichTransitionEvent(eType){
    var type,
    el = document.createElement("fakeelement");

    var transitions = {
        "transition"      : {
            "end" : "transitionend"
        },
        "OTransition"     : {
            "end" : "oTransitionEnd"
        },
        "MozTransition"   : {
            "end" : "transitionend"
        },
        "WebkitTransition": {
            "end" : "webkitTransitionEnd"
        }
    }

    for (type in transitions){
        if (el.style[type] !== undefined){
            $.singlePage.transition[eType] = transitions[type][eType];

            break;
        }
    }
}

function fnWhichAnimationEvent(eType){
    var type,
        el = document.createElement("fakeelement");

    var animations = {
        "animation"      : {
            "end" : "animationend"
        },
        "OAnimation"     : {
            "end" : "oAnimationEnd"
        },
        "MozAnimation"   : {
            "end" : "animationend"
        },
        "WebkitAnimation": {
            "end" : "webkitAnimationEnd"
        }
    }

    for (type in animations){
        if (el.style[type] !== undefined){
            $.singlePage.animation[eType] = animations[type][eType];

            break;
        }
    }
}

/*
    Function : add new page with layer.
*/
 (function( $, undefined ) {
    // python -m SimpleHTTPServer 8000
    $('html').addClass('ui-mobile');

    $.singlePage = {
        option:{
            contentWrapper : 'body',
        },
        transition:{},
        animation:{},
        getPage:function(e){
            $('<div></div>').load(e.data('href') + ' > div', function(data){
                var content = $( $(this).html() );

                $.singlePage.beforeShowPage(content);
                
                $($.singlePage.option.contentWrapper).append(content)
            });
        },
        beforeShowPage:function(content){
            content.find('[data-role=back]').one('click', function(){
                $.singlePage.beforeHidePage(content);
            })
            $.singlePage.showPage(content);
        },
        showPage:function(content){
            content.addClass('ui-page ui-page-active slide in');

            content.one($.singlePage.transition.end, function(){
                $.singlePage.afterShowPage(content);
            });

            content.one($.singlePage.animation.end, function(){
                $.singlePage.afterShowPage(content);
            })
        },
        afterShowPage:function(content){
            content.removeClass('slide in');
        },
        beforeHidePage:function(content){
            $.singlePage.hidePage(content);
        },
        hidePage:function(content){
            content.addClass('slide out reverse');

            content.one($.singlePage.transition.end, function(){
                $.singlePage.afterHidePage(content);
            });

            content.one($.singlePage.animation.end, function(){
                $.singlePage.afterHidePage(content);
            })
        },
        afterHidePage:function(content){
            content.remove();
        }
    };

    // To Do : Users select using to Transition or Animation and append start, move
    fnWhichTransitionEvent('end');
    fnWhichAnimationEvent('end')

    $.extend( $.singlePage, {
		// define the window and the document objects
		window: $( window ),
        document: $( document )
    });

    $.fn.singlePage = function(opt){
        $.extend( $.singlePage.option, opt);
    }
    
    $(document).off('click', '[data-href]').on('click', '[data-href]', function(){
        event.preventDefault();

        $.singlePage.getPage($(this));

        return false;
    })
})( jQuery );


/***********************************************************************************************************
 * Function : Clickable Swiper Slide Tab
 * 사용 : 
    var tab1 = $('#custom-list').swipeTab({
        selIdx:2,
        moveEnd : function(idx){
            console.log('move end callback : ' , idx)
        }
    });

    $('.btn-execution').off('click').on('click', function(){
        var idx = $('#moveIdx').val();
        tab1.moveTab(idx)
    })
 ***********************************************************************************************************/
(function( $, undefined ) {
	/***********************************************************************************************************
	 * Function : Clickable Swiper Slide Tab
	 * 사용 : 
		var tab1 = $('#custom-list').swipeTab({
			selIdx:2,
			moveEnd : function(idx){
				console.log('move end callback : ' , idx)
			}
		});

		$('.btn-execution').off('click').on('click', function(){
			var idx = $('#moveIdx').val();
			tab1.moveTab(idx)
		})
	***********************************************************************************************************/
	$.fn.swipeTab = function(opt){
		// 현재 객체를[ $(el) ] $this 객체에 할당
		var $this = this;

		// 현재 객체의 첫번째 <UL>을 할당
		var $thisUl = $this.find('ul');

		// 탭을 할당
		var $thisLi = $this.find('li');

		// Library 내부에서 사용될 함수의 객체 모델
		var fnc = {};
		
		// Tab Item의 기본 넓이를 구함 : (현재 선택된 탭의 인덱스 * defaultWidth) 로 현재 활성화 된 탭으로 이동시킨다.
		var defaultWidth = $thisUl.find('li:not(.active)').outerWidth();

		// Tab List의 전체 넓이를 할당
		var listWidth = 0;

		// 사용자로부터 받을 수 있는 옵션 : 필요시 추가 가능
		var option = {
			moveEnd:null, // 탭 동작이 끝난 후 실행시킬 Callback Function
			selIdx:0, // 초기 선택 탭
			moveSpeed:1, // Drag 스피드 : 2일 경우 (Drag한 거리 : 슬라이드된 거리가 1:2의 비율이다.)
			pageNavigation:null // page navigation : jquery object
		};

		// 기본 옵션 값과 사용자로부터 입력받은 옵션값을 merge 한다.
		$.extend(option, opt)

		// Library 내부에서 사용되는 각 상태 값들
		var status = {
			// (Touchstart, Mousedown) 의 여부를 체크해서 Drag 중인지 단순 마우스 이동인지를 판단하기 위해 사용.
			'start' : false, 
			
			// Target Element 위에서 (Touchmove, Mousemove)의 여부를 체크
			'move' : false,

			// Target Element 에서 (Touchend, Mouseup) 이벤트 체크
			'end' : false,

			// 최초 Touchstart 지점의 좌표값을 저장 : Touch 이동 거리를 구하는데 사용된다.
			'startX':null,

			// Touchmove의 이동 거리
			'moveX':null,

			// Slide의 마지막 이동 거리
			'endX':0,

			// event target : click 이벤트를 위해 최초 터치시의 event 를 저장
			'evt':null,

			// tab의 animate 상태
			'animated':false
		}

		$thisUl.transition = {};

		// Regist Transition Event
		fnWhichTransitionEvent($thisUl, 'end');

		// 초기화
		fnc.init = function(){
			fnc.rmEvent();
			fnc.regEvent();
			fnc.fnSetWidth();
			
			// 사용자로부터 입력받은 초기 Tab이 있을 경우 활성화
			if(option.selIdx != 0){
				fnc.fnChangeTab();
			}
		}

		// 이벤트의 중복 등록을 방지하기 위해 기존에 등록 되어있던 이벤트 삭제
		fnc.rmEvent = function(){
			$this.off('touchstart mousedown', fnc.fnTouchStart);
			$this.off('touchmove mousemove', fnc.fnTouchMove);
			$this.off('touchend mouseup', fnc.fnTouchEnd);
			$this.off('mouseleave', fnc.fnTouchEnd);
			$this.off('dblclick', function(event){ event.preventDefault(); })
		}

		// 이벤트 신규 등록
		fnc.regEvent = function(){
			$this.on('touchstart mousedown', fnc.fnTouchStart);
			$this.on('touchmove mousemove', fnc.fnTouchMove);
			$this.on('touchend mouseup', fnc.fnTouchEnd);
			$this.on('mouseleave', fnc.fnTouchEnd);
			$this.on('dblclick', function(event){ event.preventDefault(); })
		}

		// tab click event
		// 이슈 : $.fn.on('click') 이벤트 등록시 (Touchstart, Mousedown)과 중복 등록 현상 발생
		// 해결 : click event 대신 status.start == true 이면서 status.move == 0 일 경우 click으로 판단.
		// 해결에 사용된 변수 : status.evt :(Touchstart, Mousedown)시 event를 저장 (touchend, mouseup)에서는 event를 얻을 수 없다.
		fnc.fnClick = function(){
			// target의 parent(li)의 인덱스를 글로벌 변수인 option.selIdx에 저장
			// 글로벌 변수이기 때문에 fnc.fnChangeTab()에 parameter를 넘길 필요 없고 option.selIdx를 참조하면 된다.
			
			var _target, idx;

			// 현재 클릭된 타겟이 wrapper일 경우 li 의 index를 구할 수 없기 때문에 Block 처리 한다.
			if($(status.evt.target)[0].id == $this[0].id){
				return false;
			}

			_target = $(status.evt.target).parent()

			// LI의 Iindex를 구해야 하기 때문에 LI를 찾을 때 까지 탐색 한다.
			while(_target[0].tagName != 'LI'){
				_target = _target.parent();
			}

			var idx = _target.index();

			if(idx != -1){
				option.selIdx = idx;

				fnc.fnChangeTab();

				// 한번 사용된 status.evt target은 초기화 해준다.
				status.evt = null;

				return false;
			}
		}

		// touch start event
		fnc.fnTouchStart = function(e){
			e.stopPropagation();

			var evt = fnc.fnCheckEvent(e);

			// click : true
			status.start = true;

			// 현재 event target을 저장 : Move거리가 0일 경우 fnClick 에서 클릭된 타겟으로 사용
			status.evt = evt;

			// 현재 클릭된 좌표를 글로벌 변수에 저장 : fnTouchMove 에서 움직인 거리를 구하는데 사용
			status.startX = evt.clientX;
		}

		// touch move event
		fnc.fnTouchMove = function(e){
			e.stopPropagation();

			// status.start==true (클릭된 상태에서 Drag 시)
			if(status.start){
				status.move = true;

				var evt = fnc.fnCheckEvent(e);

				// Touch후 움직인 거리를 구한다.
				status.moveX = evt.clientX - status.startX

				// Slide Tab의 마지막 위치값 status.endX 에서 움직인 거리를 더해 실제로 Tab이 움직여야 할 거리를 구한다.
				// 이 과정이 없을 경우 Tab의 값이 항상 0 부터 시작하기 때문에 동작이 이상하다.
				var move = status.endX + status.moveX*option.moveSpeed;
				
				// 좌측에 아이템이 더이상 없을 경우 더이상 슬라이드가 되지 않게 막는다.
				// Bounce 효과를 주고싶으면 이 값을 (+ 값으로) 변경 해주면 된다. 
				if(move >= 0){
					move = 0;
				}
				// 우측의 마지막 아이템까지 이동 한 경우 더이상 이동하지 않게 막는다.
				else if(move < defaultWidth - listWidth){
					move = defaultWidth - listWidth;
				}

				// 움직인 거리만큼 실시간으로 CSS를 변경한다.
				$thisUl.css({
					'transform' : 'translateX(' + move + 'px)'
				})
			}
		}

		// touch end event
		fnc.fnTouchEnd = function(e){
			e.stopPropagation();

			var evt = fnc.fnCheckEvent(e);
			
			// (touchend, mouseup) 상태를 true로 변경 : 아직까진 사용하는 곳이 없음 찾아보길 바람 ...
			status.end = true;
			
			// target에 클릭 되었으나 움직이지 않은 경우 Click 이벤트로 간주
			if(status.start && !status.move && !status.animated){
				// 클릭 상태는 다시 false로.
				status.start = false;

				// onclick 이벤트 함수를 실행한다.
				fnc.fnClick();

				return false;
			}
			// target에 클릭 되고 움직였을 경우 Drag 이벤트로 간주
			else if(status.start && status.move && !status.animated){
				// click 상태와 move 상태를 false로 초기화 한다.
				status.start = false;
				status.move = false;

				// 움직인 거리가 30 보다 클경우 Active 탭을 변경한다.
				if(Math.abs(status.moveX) > 30){
					// 값이 0 보다 커질 경우는 좌측에 더이상 탭이 없다는 것이므로  endX를 0으로 강제 한다.
					if( (status.endX + status.moveX * option.moveSpeed) >= 0){
						status.endX = 0;
					}
					// 값이 전체 넓이에서 기본 탭의 넓이만큼을 뺀 값보다 작으면 마지막 아이템이라는 것이므로 endX를 마지막 아이템의 위치로 강제 한다.
					else if((status.endX + status.moveX * option.moveSpeed) < (defaultWidth - listWidth) ){
						status.endX = defaultWidth - listWidth;
					}
					// 첫번째나 마지막 아이템이 아닌경우 현재 드래그 된 위치를 반환 한다.
					else{
						status.endX += status.moveX * option.moveSpeed
					}

					// 움직일 탭의 Index를 구하고
					fnc.fnGetMoveIdx();
					
					// 해당 탭으로 움직인다.
					fnc.fnChangeTab();
				}

				// 움직인 거리가 30보다 작거나 0보다 클 경우 
				// Drag는 했으나 탭을 변경할 만큼은 아니므로 기존에 선택된 탭의 위치로 다시 이동 시킨다.
				else if(Math.abs(status.moveX) <= 30 && Math.abs(status.moveX) > 0){
					fnc.fnMoveTab();
				}
			}
		}

		// Drag된 위치 기반으로 현재 선택 되어야 할 탭의 Index를 구한다. 
		fnc.fnGetMoveIdx = function(){
			var v = 0;
			
			$.each($thisLi, function(idx, elem){
				// 탭의 넓이를 한 단계씩 올린다.
				v += defaultWidth;

				// 움직인 거리가 탭 넓이의 절반보다 작은 경우 현재의 Index를 반환 : 넘을 경우 한번 더 구하므로 다음 Index를 반환
				option.selIdx = idx;

				if(v - (defaultWidth / 2) > Math.abs(status.endX) ){
					// 만족하는 값이 나온 경우 each문을 종료한다. : break;
					return false;
				}
			})
		}

		fnc.fnChangeTab = function(){
			// 글로벌 변수에 저장된 index 값을 기반으로 탭을 활성화
			$thisLi.eq(option.selIdx).addClass('active').siblings('li').removeClass('active');

			// page navigation 이 'null'이 아닐 경우 page navigation을 활성화 시켜준다.
			if(option.pageNavigation != null){
				$(option.pageNavigation[0].children[option.selIdx]).addClass('active').siblings().removeClass('active');
			}

			// 탭 활성화 후 활성화 된 탭으로 이동
			fnc.fnMoveTab();
		}

		// 탭을 활정화 된 탭으로 이동시키는 함수
		fnc.fnMoveTab = function(){
			// 탭의 animate 상태를 true로 변경한다.
			// 탭이 animate 상태일 경우 추가 이벤트를 막는다.
			status.animated = true;

			// 마지막으로 선택된 탭의 X 좌표를 구한다. : -(마지막에 선택된 탭의 index * 탭의 기본 넓이)
			status.endX = option.selIdx * -defaultWidth;

			$thisUl.css({
				transform : 'translateX(' + status.endX + 'px)',
				transition : '0.3s'
			})

			if(option.moveEnd != null && typeof option.moveEnd == 'function'){
				setTimeout(function(){
					option.moveEnd(option.selIdx);

					status.animated = false;
				}, 300)
			}else{
				status.animated = false;
			}

			// 아래의 코드가 없을 경우 style에 transition: all 0.3s ease 0s; 이 추가 되고
			// 이 후 동작에 딜레이가 생김 : 다른 방법이 있으면 추후 변경
			$($thisUl).one($thisUl.transition.end, function(){
				$(this).css({
					'transition':''
				})
			})
		}

		// create tab list : 탭 list의 전체 넓이를 구한다.
		// listWidth 는 글로벌 변수 : 이 또한 status object로 들어가도 된다.
		fnc.fnSetWidth = function(){
			$thisLi.each(function(idx){
				listWidth += $(this).outerWidth();
			})

			// 
			$thisUl.css({
				'display':'-webkit-flex',
				'display':'flex'
				// 'width' : listWidth+'px'
			});
		}

		// Touch and Mouse event check
		// touch 와 mouse event의 구조가 다르기 때문에 event의 type이 달라도 
		// 동일한 target 값을 가질 수 있도록 동기화
		fnc.fnCheckEvent = function(evt){
			// 터치 기반의 event일 때 target event를 재 할당 시켜준다.
			if(evt.originalEvent.type.indexOf('touch') > -1){
				evt = evt.originalEvent.touches[0];
			}

			return evt;
		}

		// 현재 선택된 탭의 index를 반환하는 메소드
		$this.getIndex = function(){
			return option.selIdx;
		}

		// Javascript에서 임의로 탭을 변경할 수 있게 해주는 메소드
		// 1. 다른 화면에서 해당 화면으로 넘어 온경우
		// 2. 탭 컨텐츠의 유무에 따라 선택된 탭이 달라야 하는 경우
		// 3. 클라이언트의 요청으로 특정 탭이 선택 되어있어야 하는 경우 등등
		$this.moveTab = function(idx){
			option.selIdx = idx;

			fnc.fnChangeTab();
		}

		fnc.init();

		// 현재 객체 (this)를 반환 함으로서 해당 Ojbect를 참조 할 수 있다.
		// var swiper = $('#swipe').swipeTab();
		// swiper.moveTab(2);
		return $this;
	}

	/***********************************************************************************************************
	 * Function : header move function when content is scrolled
	 * 사용 방법 : 
		$('scroll target').scrollMotion({
			target : add class target (support jQuery element : $(target)),
			addClassName : class name for add to target
		})
	* 사용 위치 : 
		- page : open_lead, my_task, video_list
	***********************************************************************************************************/
	$.fn.scrollMotion = function(opt){
		var _this = this;
		var navbarHeight = 10;
		var contentHeight = _this.height();
		var documentHeight = $(document).height();

		_this.scroll(function(evt){
			// event 에서 scrollTop을 구한다.
			var st = evt.target.scrollTop;

			if (st > navbarHeight){
				opt.target.addClass(opt.addClassName);
			} else {
				if(st + contentHeight <= documentHeight) {
					opt.target.removeClass(opt.addClassName);
				}
			}

		}).resize(function(){
			contentHeight = _this.height();
			documentHeight = $(document).height()
		});
	}

	/***********************************************************************************************************
	 * Function : header move function when content is scrolled
	 * 사용 방법 : 
		$('scroll target').changeTab()
	 * 사용 위치 : 
		- page : outcome_update
	 * 사용시 주의 : Tab Id와 Tab Content간 ID, ClassName을 맞춰 주어야 한다.
	***********************************************************************************************************/
	$.fn.changeTab = function(callback){
		var _this = this;
		var _id = _this.attr('id');
	
		_this.find('a').off('click').on('click', function(){
			var _idx = $(this).parent('li').index();
			$(this).parent('li').addClass('on').siblings('li').removeClass('on');
			$('.'+_id).eq(_idx).show().siblings('.'+_id).hide();

			if(callback != undefined){
				callback($(this), _idx);
			}

			return false;
		});
	}
})( jQuery );
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
 *  Function : Clickable Swiper Slide Tab
 ***********************************************************************************************************/
(function( $, undefined ) {
    $.fn.swipeTab = function(opt){
        // 현재 객체를[ $(el) ] $this 객체에 할당
        var $this = this;

        // 현재 객체의 첫번째 <UL>을 할당
        var $thisUl = $this.find('ul');

        // 탭을 할당
        var $thisLi = $this.find('li');

        // Library 내부에서 사용될 함수의 객체 모델
        var fnc = {};

        // list item의 넓이 배열 : Drag시 움직인 거리 기반으로 현재 선택되어야 할 Item의 Index를 구하는데 사용
        var itemWidth = [];
        
        // Tab Item의 기본 넓이를 구함 : (현재 선택된 탭의 인덱스 * defaultWidth) 로 현재 활성화 된 탭으로 이동시킨다.
        var defaultWidth = $thisUl.find('li:not(.active)').outerWidth();

        // Tab List의 전체 넓이를 할당
        var listWidth = 0;

        // 사용자로부터 받을 수 있는 옵션 : 필요시 추가 가능
        var option = {
            moveEnd:null, // 탭 동작이 끝난 후 실행시킬 Callback Function
            selIdx:0, // 초기 선택 탭
            moveSpeed:2 // Drag 스피드 : 2일 경우 (Drag한 거리 : 슬라이드된 거리가 1:2의 비율이다.)
        };

        $.extend(option, opt)

        // Library 내부에서 사용되는 각 상태 값들
        var status = {
            // (Touchstart, Mousedown) 의 여부를 체크해서 Drag 중인지 단순 마우스 이동인지를 판단.
            'start' : false, 
            
            'move' : false,
            'end' : false,
            'startX':null,
            'moveX':null,
            'endX':0,
            'target':null
        }

        // 초기화
        fnc.init = function(){
            fnc.rmEvent();
            fnc.regEvent();
            fnc.fnSetWidth();
            
            if(option.selIdx != 0){
                fnc.fnChangeTab();
            }
        }

        // 기존에 등록 되어있던 이벤트 삭제
        fnc.rmEvent = function(){
            $this.off('touchstart mousedown', fnc.fnTouchStart);
			$this.off('touchmove mousemove', fnc.fnTouchMove);
            $this.off('touchend mouseup', fnc.fnTouchEnd);
            $this.off('mouseleave', fnc.fnTouchEnd);
        }

        // 이벤트 신규 등록
        fnc.regEvent = function(){
            $this.on('touchstart mousedown', fnc.fnTouchStart);
			$this.on('touchmove mousemove', fnc.fnTouchMove);
            $this.on('touchend mouseup', fnc.fnTouchEnd);
            $this.on('mouseleave', fnc.fnTouchEnd);
        }
        // tab click event
        fnc.fnClick = function(){
            option.selIdx = $(status.target.target).parent('li').index();

            fnc.fnChangeTab();

            status.target = null;

            return false;
        }

        // touch start event
        fnc.fnTouchStart = function(e){
            e.stopPropagation();

            var evt = fnc.fnCheckEvent(e);

            status.start = true;
            status.target = evt;

            status.startX = evt.clientX;
        }

        // touch move event
        fnc.fnTouchMove = function(e){
            e.stopPropagation();

            if(status.start){
                status.move = true;

                var evt = fnc.fnCheckEvent(e);

                status.moveX = evt.clientX - status.startX

                var move = status.endX + status.moveX*option.moveSpeed;

                if(move >= 0){
                    move = 0
                }else if(move < defaultWidth - listWidth){
                    move = defaultWidth - listWidth;
                }

                $thisUl.css({
                    'transform' : 'translateX(' + move + 'px)'
                })
            }
        }

        // touch end event
        fnc.fnTouchEnd = function(e){
            e.stopPropagation();

            var evt = fnc.fnCheckEvent(e);

            status.end = true;

            if(status.start && !status.move){
                status.start = false;

                fnc.fnClick(evt);

                return false;
            }else if(status.start && status.move){
                status.start = false;
                status.move = false;

                if(Math.abs(status.moveX) > 30){
                    if( (status.endX + status.moveX * option.moveSpeed) >= 0){
                        status.endX = 0;
                    }else if((status.endX + status.moveX * option.moveSpeed) < (defaultWidth - listWidth) ){
                        status.endX = defaultWidth - listWidth;
                    }else{
                        status.endX += status.moveX * option.moveSpeed
                    }
    
                    fnc.fnGetMoveIdx();
    
                    fnc.fnChangeTab();
                }else if(Math.abs(status.moveX) <= 30 && Math.abs(status.moveX) > 0){
                    fnc.fnMoveTab();
                }
            }
        }

        fnc.fnGetMoveIdx = function(){
            var v = selPos = 0;
            
            $.each(itemWidth, function(idx, value){
                v += value;

                if(v - (value / 2) > Math.abs(status.endX) ){
                    option.selIdx = idx;
                    
                    return false;
                }
            })
        }

        fnc.fnChangeTab = function(){
            $thisLi.eq(option.selIdx).addClass('active').siblings('li').removeClass('active');

            fnc.fnMoveTab();
        }

        fnc.fnMoveTab = function(){
            status.endX = option.selIdx * -defaultWidth;

            var oriPos = $thisUl[0].style.transform.replace('translateX(', '').replace('px)','')*1 - status.endX*1;
            
            var moveInter = setInterval(function(){
                if(Math.abs(oriPos) <= 3 && Math.abs(oriPos) >= 0){
                    oriPos = 0;
                }else if(oriPos < 3){
                    oriPos += 2;
                }else{
                    oriPos -= 2;
                }

                $thisUl.css({
                    transform : 'translateX(' + (status.endX + oriPos) + 'px)'
                })

                if(oriPos == 0){
                    if(option.moveEnd != null && typeof option.moveEnd == 'function'){
                        option.moveEnd(option.selIdx);
                    }

                    clearInterval(moveInter)
                }
            },2)
        }

        // create tab list
        fnc.fnSetWidth = function(){
            var _l = $thisLi.length;

            $thisLi.each(function(idx){
                itemWidth[idx] = $(this).outerWidth();

                listWidth += itemWidth[idx];
            })

            $thisUl.css({
                'width' : listWidth+'px'
            });
        }

        // Touch and Mouse event check
        fnc.fnCheckEvent = function(evt){
            if(evt.originalEvent.type.indexOf('touch') > -1){
                evt = evt.originalEvent.touches[0];
            }

            return evt;
        }

        // Method
        $this.getIndex = function(){
            return option.selIdx;
        }

        $this.moveTab = function(idx){
            option.selIdx = idx;

            fnc.fnChangeTab();
        }

        fnc.init();

        return $this;
    }
})( jQuery );



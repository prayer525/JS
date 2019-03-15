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



(function( $, undefined ) {
    $.fn.swipeTab = function(opt){
        var $this = this;
        var $thisUl = $this.find('ul');
        var $thisLi = $this.find('li');
        var fnc = {};
        var itemWidth = [];
        var defaultWidth = 0;
        var endPos = 0;

        var option = {
            moveEnd:null
        };

        $.extend(option, opt)

        var status = {
            'start' : false,
            'move' : false,
            'end' : false,
            'startX':null,
            'endX':0,
            'moveX':null,
            'selIdx':0
        }

        // 초기화
        fnc.init = function(){
            fnc.rmEvent();
            fnc.regEvent();
            fnc.fnSetWidth();
        }

        // 기존에 등록 되어있던 이벤트 삭제
        fnc.rmEvent = function(){
            $this.off('touch', fnc.fnClick);
            $this.off('touchstart', fnc.fnTouchStart);
			$this.off('touchmove', fnc.fnTouchMove);
            $this.off('touchend', fnc.fnTouchEnd);
            $this.off('mousedown', fnc.fnTouchStart);
			$this.off('mousemove', fnc.fnTouchMove);
			$this.off('mouseup', fnc.fnTouchEnd);
            $this.off('mouseleave', fnc.fnTouchEnd);
            $this.off('click', fnc.fnClick);
        }

        // 이벤트 신규 등록
        fnc.regEvent = function(){
            $this.on('touch', fnc.fnClick);
            $this.on('touchstart', fnc.fnTouchStart);
			$this.on('touchmove', fnc.fnTouchMove);
            $this.on('touchend', fnc.fnTouchEnd);
            $this.on('mousedown', fnc.fnTouchStart);
            $this.on('mousemove', fnc.fnTouchMove);
            $this.on('mouseup', fnc.fnTouchEnd);
            $this.on('mouseleave', fnc.fnTouchEnd);
            $this.on('click', fnc.fnClick);
        }

        fnc.fnClick = function(e){
            var evt = fnc.fnCheckEvent(e);

            status.selIdx = $(evt.target).parent('li').index();

            fnc.fnChangeTab();

            return false;
        }

        fnc.fnTouchStart = function(e){
            status.start = true;

            var evt = fnc.fnCheckEvent(e);

            status.startX = evt.clientX;
        }

        fnc.fnTouchMove = function(e){
            if(!status.start){
                return false;
            }
            var evt = fnc.fnCheckEvent(e);

            status.move = true;

            status.moveX = evt.clientX - status.startX

            var move = status.endX + status.moveX*2

            if(move >= 0){
                move = 0
            }else if(move < endPos){
                move = endPos;
            }

            $thisUl.css({
                'transform' : 'translateX(' + move + 'px)'
            })

        }

        fnc.fnTouchEnd = function(e){
            status.end = true;
            status.start = false;

            if(!status.move){
                // return false;
            }

            status.move = false;

            if(Math.abs(status.moveX) > 30){
                if( (status.endX + status.moveX * 2) >= 0){
                    status.endX = 0;
                }else{
                    status.endX += status.moveX * 2
                }

                fnc.fnGetMoveIdx();

                fnc.fnChangeTab();
            }else if(Math.abs(status.moveX) <= 30 && Math.abs(status.moveX) > 0){
                
                fnc.fnMoveTab();
            }
        }

        fnc.fnGetMoveIdx = function(){
            var v = selPos = 0;
            
            $.each(itemWidth, function(idx, value){
                v += value;

                if(v - (value / 2) > Math.abs(status.endX) ){
                    status.selIdx = idx;
                    
                    return false;
                }
            })
        }

        fnc.fnChangeTab = function(){
            $thisLi.eq(status.selIdx).addClass('active').siblings('li').removeClass('active');

            setTimeout(function(){
                fnc.fnSetWidth();

                fnc.fnMoveTab();

                if(option.moveEnd != null && typeof option.moveEnd == 'function'){
                    option.moveEnd(status.selIdx);
                }
            },300)
        }

        fnc.fnMoveTab = function(){
            status.endX = status.selIdx * -defaultWidth;

            var oriPos = $thisUl[0].style.transform.replace('translateX(', '').replace('px)','')*1 - status.endX*1;
            console.log('oriPos : ' , oriPos)
            
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
                    clearInterval(moveInter)
                }
            },2)
        }

        // create tab list
        fnc.fnSetWidth = function(){
            var _w = 0;
            var _l = $thisLi.length;

            $thisLi.each(function(idx){
                itemWidth[idx] = $(this).outerWidth();

                _w += itemWidth[idx];

                if(idx == _l - 2){
                    endPos = -_w;
                }

                if(!$(this).hasClass('active')){
                    defaultWidth = itemWidth[idx];
                }
            })

            $thisUl.css({
                'width' : _w+'px'
            });
        }

        // Touch and Mouse event check
        fnc.fnCheckEvent = function(evt){
            if(evt.originalEvent.type.indexOf('touch') > -1){
                evt = evt.originalEvent.touches[0];
            }

            return evt
        }

        fnc.init();
    }
})( jQuery );



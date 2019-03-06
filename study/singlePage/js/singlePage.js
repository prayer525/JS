(function( $, undefined ) {
    // python -m SimpleHTTPServer 8000
    $('html').addClass('ui-mobile');

    $.singlePage = {
        option:{
            contentWrapper : 'body',
        },
        whichTransitionEvent:function(){
            var t,
            el = document.createElement("fakeelement");

            var transitions = {
                "transition"      : "transitionend",
                "OTransition"     : "oTransitionEnd",
                "MozTransition"   : "transitionend",
                "WebkitTransition": "webkitTransitionEnd"
            }

            for (t in transitions){
                if (el.style[t] !== undefined){
                    $.singlePage.transition.end = transitions[t];
                }
            }

        },
        whichAnimationEvent:function(){
            var t,
                el = document.createElement("fakeelement");

            var animations = {
                "animation"      : "animationend",
                "OAnimation"     : "oAnimationEnd",
                "MozAnimation"   : "animationend",
                "WebkitAnimation": "webkitAnimationEnd"
            }

            for (t in animations){
                if (el.style[t] !== undefined){
                    $.singlePage.animation.end = animations[t];
                }
            }
        },
        transition:{
            end:null
        },
        animation:{
            end:null
        },
        getPage:function(e){
            $('<div></div>').load(e.data('href') + ' > div', function(data){
                var content = $( $(this).html() );

                $.singlePage.beforeShowPage(content);
                
                $($.singlePage.option.contentWrapper).append(content)
            });
        },
        beforeShowPage:function(content){
            content.find('[data-role=back]').click(function(){
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

    $.singlePage.whichTransitionEvent();
    $.singlePage.whichAnimationEvent();

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


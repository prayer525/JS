$(function(){
    var pageOption = {
        contentWrapper : '.content-wrap'
    }
    $.extend($.singlePage.option, pageOption);

    // GNB menu 
    $('.btn-toggle-menu').off('click').on('click', function(){
        if($(this).hasClass('show-menu')){
            $(this).removeClass('show-menu');
            $('.content-wrap').removeClass('show-menu');
        }else{
            $(this).addClass('show-menu');
            $('.content-wrap').addClass('show-menu');
        }

        return false;
    });

    var scroller = new FTScroller(document.getElementById('frame'), {
        scrollingY: false,
        snapping: true,
        scrollbars: false,
        bouncing:false
    });

    scroller.setSnapSize(125, 0);

    scroller.addEventListener('scroll', function(){
        // console.log('scroll event scroller : ' , scroller)
        // console.log('scroll event scroller.currentSegment : ' , scroller.currentSegment)
    },false);

    scroller.addEventListener('segmentdidchange', function(){
        console.log('segmentdidchange event scroller.currentSegment : ' , scroller.currentSegment)
        console.log('segmentdidchange event scroller.contentContainerNode : ' , scroller.contentContainerNode)
        $(scroller.contentContainerNode).find('li').eq(scroller.currentSegment.x).addClass('active').siblings('li').removeClass('active')
    })

    scroller.addEventListener('scrollend', function(e){
        // console.log('scrollend scroller : ' , scroller)
        // console.log('scrollend scroller.currentSegment : ' , scroller.currentSegment)
    }, false);

    // custom scroll tab
    var tab1 = $('#custom-list').swipeTab({
        moveEnd : function(idx){
            console.log('move end callback : ' , idx)
        }
    });

    $('.btn-execution').off('click').on('click', function(){
        var idx = $('#moveIdx').val();
        tab1.moveTab(idx)
    })

    

    // sly swipe slide
    
    // $('#frame').sly({
    //     horizontal: 1,
    //     itemNav: 'forceCentered',
    //     smart: 1,
    //     activateMiddle: 1,
    //     activateOn: 'click',
    //     mouseDragging: 1,
    //     touchDragging: 1,
    //     releaseSwing: 1,
    //     startAt: 0,
    //     scrollBy: 1,
    //     speed: 300,
    //     elasticBounds: 1,
    //     dragHandle: 1,
    //     dynamicHandle: 1,
    //     clickBar: 1,
    // }, {
    //     load: function (l) {
    //         console.log('sly load : ' , l)
    //     },
    //     move: [
    //         function (m1) {
    //             //console.log('sly move 1 : ' , m1)
    //         },
    //         function (m2) {
    //             //console.log('sly move 2 : ' , m2)
    //         }
    //     ]
    // });
})
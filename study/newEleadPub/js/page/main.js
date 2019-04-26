fnList.pageMain = function(){
    console.log("page main");
    
    // Main Tab Navigation
	var pageMain = fnList.pageMain;
	var elem = document.getElementById('main-swipe-cont-wrap');

	pageMain.mainSwipeLoop = null;
	pageMain.mainSwipeLoop = Swipe(elem, {
		startSlide: 0,
		continuous: true,
		callback: function(index, element) {
            if(isNaN(index)){
                fnList.pageMain();
            }

			$('.main-swipe-cont-wrap .main-swipe-cont>li').scrollTop(0)
			$('.main-tab-navi').find('li').removeClass('on')
		},
		transitionEnd: function(index, element) {
			$('.main-tab-navi').find('li').eq(index).addClass('on')
		}
	});

	$('.main-tab-navi').find('a').off('click').on('click', function(){
		pageMain.mainSwipeLoop.slide($(this).parent('li').index(), 500)
		return false;
    })

    // GNB menu 
    $('.btn-toggle-menu').off('click').on('click', function(){
        if($(this).hasClass('show-menu')){
            $(this).removeClass('show-menu');
            $('html, body').removeClass('over-hidden');
            $('.content-wrap').removeClass('show-menu');
            $('.menu-cover').hide();
        }else{
            $(this).addClass('show-menu');
            $('html, body').addClass('over-hidden');
            $('.content-wrap').addClass('show-menu');
            $('.menu-cover').show();
        }

        return false;
    });
    $('.menu-cover').off('click').on('click', function(){
        $('.btn-toggle-menu').trigger('click');
    })
    
    /* lead summary slider */
    $("#dashboard-lead-list").touchSlider({
        roll:false,
        flexible:true,
        initComplete : function (e) {
            
        },
        counter : function (e) {
            //console.log('counter e : ' , e)
        }
    });

    /* OPEN LEAD */
    var openleadTab = $('#openlead-tab-list').swipeTab({
        pageNavigation:$('.tab-slide-custom-navi'),
        moveEnd : function(idx){
            // console.log('move end callback : ' , idx)
        }
    });

}
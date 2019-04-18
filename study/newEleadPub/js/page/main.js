fnList.pageMain = function(){
	console.log("page main");
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
			console.log('index : ' , index)
			$('.main-tab-navi').find('li').eq(index).addClass('on')
		}
	});

	$('.main-tab-navi').find('a').off('click').on('click', function(){
		pageMain.mainSwipeLoop.slide($(this).parent('li').index(), 500)
		return false;
	})
}
var fnList = {};

// 공통 이벤트 바인드
$(function(){
	// detail popup - comment show more
	$(document).off('click', '.lead-comment button').on('click', '.lead-comment button', function(){
		$(this).prev('.comment').toggleClass('show');
	})
	// detail popup - comment show more : comment 영역을 클릭해도 보여지게 수정
	$(document).off('click', '.lead-comment .comment').on('click', '.lead-comment .comment', function(){
		$(this).next('button').trigger('click');
	})

	/* scroll top/down to header hide */
	// Hide Header on on scroll down
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = 50;

	$('.scroll-wrap').scroll(function(event){
		hasScrolled($(this).scrollTop());
	});

	function hasScrolled(st) {

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop && st > navbarHeight){
			$('.controll-btn-wrap, .main-swipe-cont .tit-h2').addClass('nav-up');
		} else {
			if(st + $('.scroll-wrap').height() < $(document).height()) {
				$('.controll-btn-wrap, .main-swipe-cont .tit-h2').removeClass('nav-up');
			}
		}

		lastScrollTop = st;
	}
})
var fnList = {};

// 공통 이벤트 바인드
$(function(){
	// detail popup - comment show more
	$(document).off('click', '.lead-comment button').on('click', '.lead-comment button', function(){
		$(this).prev('.comment').toggleClass('show');
	})
})
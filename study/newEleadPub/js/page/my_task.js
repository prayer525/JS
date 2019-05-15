fnList.pageMyTask = function(){
	console.log('pageMyTask');

	$('.lead-list, .first-contact-summary-wrap').on('touchstart', function(){
		fnList.pageMain.mainSwipeLoop.freez();
	}).off('touchend').on('touchend', function(){
		fnList.pageMain.mainSwipeLoop.unfreez();
	})

	/* MY TASK */
	var mytaskleadTab = $('#mytask-tab-list').swipeTab({
        pageNavigation:$('#mytask-tab-list').next('ul'),
        moveEnd : function(idx){
            
        }
	});

	var listSwipe = Swiped.init({
        query: '.lead-list li a',
        list: true,
		right: 65
	});
	
	$('.lead-list li').off('click', 'button').on('click', 'button', function(e){
		$.each(listSwipe, function(idx, item){
			item.close(true);
		})
	})

	var firstContactLeadSlide = null;
	$("#first-contact-lead-list").touchSlider({
        roll:true,
		flexible:false,
		btn_prev:$('.first-contact-slide-navi .btn-prev'),
		btn_next:$('.first-contact-slide-navi .btn-next'),
        initComplete : function (e) {
            firstContactLeadSlide = this;
        },
        counter : function (e) {
			$(firstContactLeadSlide).find('>ul>li').scrollTop(0);
        }
	});

	$('.first-contact-summary-list li').off('click', 'a').on('click', 'a', function(){
		var idx = $(this).parent('li').index();

		firstContactLeadSlide.go_page(idx);

		setTimeout(function(){
			$('.layer-popup-wrap, .first-contact-wrap').addClass('show');
		}, 150)
	})

	$('.first-contact-wrap .btn-skip').off('click').on('click', function(){
		$('.layer-popup-wrap, .first-contact-wrap').removeClass('show');
	})

	$('#mytask-lead-list .lead-list li').off('click', 'button').on('click', 'button', function(e){
		fnList.selLayerContact();
	})
}
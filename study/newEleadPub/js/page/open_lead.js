fnList.pageOpenLead = function(){
	console.log('pageOpenLead');

	$('.lead-list').on('touchstart', function(){
		fnList.pageMain.mainSwipeLoop.freez();
	}).off('touchend').on('touchend', function(){
		fnList.pageMain.mainSwipeLoop.unfreez();
	})

	/* OPEN LEAD */
    var openleadTab = $('#openlead-tab-list').swipeTab({
        pageNavigation:$('#openlead-tab-list').next('ul'),
        moveEnd : function(idx){
            if(idx == 4){
				$('#takeover-lead-list').show();
				$('#open-lead-list').hide()
			}else{
				$('#takeover-lead-list').hide();
				$('#open-lead-list').show()
			}
        }
	});

	var listSwipe = Swiped.init({
        query: '.lead-list li a',
        list: true,
		right: 65
	});

	$('.lead-list-wrap li').off('click', '>h3').on('click', '>h3', function(){
		$(this).parent('li').toggleClass('show');
	})
	
	$('.lead-list li').off('click', 'button').on('click', 'button', function(e){
		$.each(listSwipe, function(idx, item){
			item.close(true);
		})
	})

	$('#open-lead-list .lead-list li').off('click', 'a').on('click', 'a', function(e){
		Data.setData('leadId', 'TestId');
	})

	/* Takeover list accordion event */
	$('.takeover-lead-list dt').off('click').on('click', function(){
		$(this).next('dd').toggleClass('show');
	})
}
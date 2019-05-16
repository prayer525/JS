fnList.pageOpenLead = function(){
	console.log('pageOpenLead');

	fnList.initTabEvent();

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

	$('#open-lead-list .lead-list li').off('click', 'a').on('click', 'a', function(e){
		Data.setData('leadId', 'TestId');
	})

	/* Takeover list accordion event */
	$('.takeover-lead-list dt').off('click').on('click', function(){
		$(this).next('dd').toggleClass('show');
	})
}
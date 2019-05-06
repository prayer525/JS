fnList.pageLeadDetail = function(){
	console.log('pageLeadDetail : ' , $.singlePage)

	/* lead summary slider */
	// var leadHistoryList = null;
    // $("#lead-history-list").touchSlider({
    //     roll:false,
    //     flexible:false,
    //     initComplete : function (e) {
	// 		leadHistoryList = this;
    //     },
    //     counter : function (e) {
			
    //     }
	// });

	$('.other-lead-wrap-summary').load('./other_lead_list.html .other-lead-wrap', function(){

		/* lead summary slider */
		$("#pageLeadDetail .lead-history-list").touchSlider({
			roll:false,
			flexible:false,
			initComplete : function (e) {
			},
			counter : function (e) {
			}
		});
	})

	// fnList.pageOtherLeadList();

	setTimeout(function(){
		$.singlePage.preloadPage()
	}, 1000)
}
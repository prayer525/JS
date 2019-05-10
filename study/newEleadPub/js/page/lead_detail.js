fnList.pageLeadDetail = function(){
	console.log('pageLeadDetail')

	console.log(Data.getData('leadId') );

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

	setTimeout(function(){
		$.singlePage.preloadPage()
	}, 1000)
}
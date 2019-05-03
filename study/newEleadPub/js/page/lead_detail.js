fnList.pageLeadDetail = function(){
	console.log('pageLeadDetail : ' , $.singlePage)

	/* lead summary slider */
	var leadHistoryList = null;
    $("#lead-history-list").touchSlider({
        roll:false,
        flexible:true,
        initComplete : function (e) {
			leadHistoryWrap = this;            
        },
        counter : function (e) {
			console.log('counter e : ' , e)
        }
	});

	$('.lead-comment button').off('click').on('click', function(){
		leadHistoryList.heightReset();
	})

	setTimeout(function(){
		$.singlePage.preloadPage()
	}, 2000)
}
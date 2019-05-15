fnList.pageDashboard = function(){
	console.log('pageDashboard : ' , fnList.pageMain.mainSwipeLoop);

	$('.dashboard-lead-list-wrap').on('touchstart', function(){
		fnList.pageMain.mainSwipeLoop.freez();
	}).off('touchend').on('touchend', function(){
		fnList.pageMain.mainSwipeLoop.unfreez();
	})

	/* lead summary slider */
    // $("#dashboard-lead-list").touchSlider({
    //     roll:false,
    //     flexible:true,
    //     initComplete : function (e) {
            
    //     },
    //     counter : function (e) {
    //         //console.log('counter e : ' , e)
    //     }
    // });
}
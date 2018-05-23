fnList.pageDashboardIndicator = function(){
	var showDisclaimer = Data.get('showDisclaimer');

	if(showDisclaimer){
		$(".lightbox").removeClass("none");
		$(".popup").removeClass("none");
	}

	$(".pbtn.close").click(function() {
		if ($("#chk01").prop("checked")) {
			Data.set('showDisclaimer', false);
		}
		$(".lightbox").addClass("none");
		$(".popup").addClass("none");
	});

	$(".li-style-icon").find("li:not(.d-none) > button").click(function() {
		Data.setData('indicatorKey', $(this).attr("class"))

		$.mobile.changePage( "dashboard_indicator_view.html", { transition: "slide" } );
	});
}



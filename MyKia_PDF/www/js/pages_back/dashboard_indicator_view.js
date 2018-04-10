fnList.pageDashboardIndicatorView = function(){
	var key=Data.getData('indicatorKey')
    var imgUrl = "../img/icon_Dashboard_" + key.replace("d_i_", "") + ".png";
    $("#indicator_view").attr("src",imgUrl);
    $("#indicator_title").text(Data.get('Translations')[key + "_title"]);
    $("#indicator_text").text(Data.get('Translations')[key + "_text"]);
    $("#indicator_action").text(Data.get('Translations')[key + "_action"]);
}



fnList.pageBreakdownAssistance = function(){
    var myvehicle=Data.getData('selectedVehicle');
    var breakdown=Data.getData('MarketInformation');
    
    $("#car").text(myvehicle.VehicleName);
    $("#carImage").attr("src", myvehicle.VehicleImageUrl);

    $("#domestic").text(breakdown.BreakDownCallNumberLocal);
    $("#domesticCall").data('domestic', JsUtil.blank(breakdown.BreakDownCallNumberLocal)).click(function(){
        var _num = $(this).data('domestic');
        directCall(_num);
    });

    $("#international").text(breakdown.BreakdownCallNumberInternational);
    $("#internationalCall").data('international', JsUtil.blank(breakdown.BreakdownCallNumberInternational)).click(function(){
        var _num = $(this).data('international');
        directCall(_num);
    });
}



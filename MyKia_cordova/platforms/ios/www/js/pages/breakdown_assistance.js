fnList.pageBreakdownAssistance = function(){
    var myvehicle=Data.getData('selectedVehicle');
    var breakdown=Data.getData('MarketInformation');
    
    $("#car").text(myvehicle.VehicleName);
    $("#carImage").attr("src", myvehicle.VehicleImageUrl);

    $("#domestic").text(breakdown.BreakDownCallNumberLocal);
    $("#domesticCall").click(function(){
        // Direct Call
    });
    $("#international").text(breakdown.BreakdownCallNumberInternational);
    
    $("#internationalCall").click(function(){
        // Direct Call
    });
}



fnList.pageEmergencyCall = function(){
    var myvehicle=Data.getData('selectedVehicle');
    var emergencyCallNumber="112",
        country=i18n('Y2_22', 'text');
    
    $("#carImage").attr("src", myvehicle.VehicleImageUrl);
    $("#car").text(myvehicle.VehicleName);

    if(country == "Y2_22"){
        country = "Europe"
    }

    $(".emergency").text(country);
    $("#number").text(emergencyCallNumber);
    // $("#callNumber").data(Scheme.PhoneNumber,emergencyCallNumber);
    
    $("#callNumber").click(function(){
        // Direct Call
    });
}



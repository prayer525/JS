fnList.pageMyVehicle = function(){
	var vehicles = Data.getData('VehiclesInformation').Vehicles;
	var selectedVehicleIndex = Data.getData('selectedVehicleIndex');
	var htmlStr = '';

	$.each(vehicles, function(k,v){
    	htmlStr += '<li data-vehicle-index="' + k + '">';
    	htmlStr += '	<input name="car" type="radio" data-role="none" id="rd' + k + '">';
    	htmlStr += '	<label class="li-sub hbox js" data-role="none" for="rd' + k + '">';
    	htmlStr += '	<p class="flex">' + v.VehicleName + '</p>';
    	if (Data.getData('UserInformation').MarketId == 'KMSE' && v.Licenseplate) {
    		htmlStr += '	<span>' + i18n('PN_01', 'text') + ' ' + v.Licenseplate + '</span>';
    	}
    	htmlStr += '	<div kme-preload>';
    	htmlStr += '		<img src="' + v.VehicleImageUrl + '">';
    	htmlStr += '	</div>';
    	htmlStr += '	</label>';
    	htmlStr += '</li>';
	})
    $("#my-vehicle-list").html(htmlStr);

    // previously selected vehicle check
    if(selectedVehicleIndex != ''){
    	$("#my-vehicle-list > li").eq(selectedVehicleIndex).find("input").click();
    }

    $('[data-vehicle-index]').on('click', function(){
    	$(".btn-sel-vehicle").prop("disabled",false);
        $(".btn-sel-vehicle").removeClass("off");

        Data.setData('selectedVehicleIndex',$(this).data("vehicleIndex"));
        Data.setData('selectedVehicle',vehicles[$(this).data("vehicleIndex")]);
    });

	$('.btn-sel-vehicle').on('click', function(){
		window.history.back(-1);
	});
}



fnList.pageParkedVehicle = function(){
	var gvlSavedLocation = Data.getData('ParkedLocation');
	var userInfo = Data.getData('UserInformation')
    var gMap = gvlDirectionsDisplay = null;
    var mapParam = {
        pos:{lat: -25.363, lng: 131.044}
    }

    function fnMakeMap(pos){
        console.log('fnMakeMap pos : ' , pos)

        KmeSpinner.stop();
        
        if(pos != ''){
            mapParam.pos.lat = pos.coords.latitude;
            mapParam.pos.lng = pos.coords.longitude;

            gvlPosition = pos.coords;
        }

        gMap = new fnGoogleMap('map_canvas', mapParam);

    	gfnBtnChanger();

    	console.log('fnMakeMap gvlSavedLocation : ' , gvlSavedLocation)

		if (JsUtil.objSize(gvlSavedLocation) == 0) {
			gvlSavedLocation = pos.coords;
		}
		else {
			var geoloc = new google.maps.Geocoder(),
				item = {};
			geoloc.geocode({
				"latLng" : new google.maps.LatLng(gvlSavedLocation.latitude, gvlSavedLocation.longitude)},
				function(results, status) {
					if (status == google.maps.GeocoderStatus.OK) {

						// 현재 위치 정보 수집 결과 성공 시 맵에 현재 위치를 표시한다
						item.coords = gvlSavedLocation;
						item.title = results[0].formatted_address;
						
						$("#mapSub").removeClass("none");
						$("#title").text(item.title);
						$("#parkNote").val(Data.getData('ParkedNote'));
						$("#parkNote").prop("disabled", true);
						
						if (gvlDirectionsDisplay == null) {
							gvlDirectionsDisplay = new google.maps.DirectionsRenderer(),
							gvlDirectionsService = new google.maps.DirectionsService();
						}
						var parkedLoc = new google.maps.LatLng(gvlSavedLocation.latitude, gvlSavedLocation.longitude),
							curLoc = new google.maps.LatLng(gvlPosition.latitude, gvlPosition.longitude);
						
						gvlDirectionsDisplay.setMap(gMap.getMap());
						var request = {
							origin: curLoc,
							destination: parkedLoc,
							// Note that Javascript allows us to access the constant
							// using square brackets and a string value as its
							// "property."
							travelMode: google.maps.TravelMode.TRANSIT
						};

						/* 
						 * 주차 위치 정보가 저장 되어 있는 경우
						 * 주차 위치를 맵에 표시한다.
						 * 이동 소요시간을 표시한다.
						 * 이동 거리를 표시한다.
						 * 주차 시간을 표시한다.
						 * 사용자와 주차 위치를 도보 기준으로 맵에 그린다.
						 * 메모 내용을 표시한다.
						 */
						gvlDirectionsService.route(request, function(response, status) {
							if (status == google.maps.DirectionsStatus.OK) {
								gvlDirectionsDisplay.setDirections(response);
								console.log('response : ' , response)
								var timeVal = response.routes[0].legs[0].duration.value,
									distVal = response.routes[0].legs[0].distance.value
								$("#dura").text(Math.ceil(timeVal/60)+"min");
								$("#dist").text((distVal/1000)+" km");
								$("#time").text(Data.getData('ParkedTime'));
								$("#callMapBtn").off("click");
								$("#callMapBtn").click(function() {
									gMap.callMap({coords : gvlSavedLocation});
								});
							}
						});
					}
				}
			);
		}
    }

   

    function errorGeo(error){
        console.log('geo error : ' , error)

        if(confirm('Retry?')){
            fnGetPos()
        }
    }

    function fnGetPos(){
        if (navigator.geolocation.getCurrentPosition) {
            KmeSpinner.start();
            navigator.geolocation.getCurrentPosition(fnMakeMap, errorGeo, { maximumAge: 10000, timeout: 15000, enableHighAccuracy: true });
        } else {
            console.log('Geolocation is not supported for this Browser/OS.');
            console.log('aa')
            fnMakeMap()
        }
    }

    // 최초 진입 시 주차 위치 정보가 저장 되어 있는 경우 버튼 타입을 변경한다.
	function gfnBtnChanger() {
		gvlSavedLocation = Data.getData('ParkedLocation');

		console.log('gfnBtnChanger gvlSavedLocation : ' , gvlSavedLocation)
		
		$('#clearBtn, #saveBtn').addClass('off');

		if(JsUtil.objSize(gvlSavedLocation) == 0){
			$('#saveBtn').addClass('btn-white').removeClass('btn-red');
			$('#clearBtn').addClass('btn-white')
		}else{
			$('#saveBtn').addClass('btn-white').removeClass('btn-red');
			$('#clearBtn').removeClass('off');
		}
	}

	$("#parkNote").attr("placeholder",i18n('F1_21', 'text'))
					.on('keyup', function(){
						if($.trim($(this).val()) != ''){
							$('#saveBtn').removeClass('off').removeClass('btn-white').addClass('btn-red');
						}else{
							$('#saveBtn').addClass('off').addClass('btn-white').removeClass('btn-red');
						}
					});

	// “Save”버튼 터치 시
	$("#saveBtn").click(function() {
		if ($(this).hasClass("off")) {
			return false;
		}
		console.log('gvlSavedLocation 1 : ' , gvlSavedLocation)
		Dialog.confirm(i18n('N1_3','text'), function(){
			/*
			 * 현재 사용자 위치를 스토리지에 저장한다.
			 * 위치 정보를 스토리지에 저장한다.
			 * 주차 시간을 스토리지에 저장한다.
			 * 메모 내용을 스토리지에 저장한다.
			 */
			console.log('gvlSavedLocation 2 : ' ,gvlSavedLocation)
            var tempTime = new Date();
            var pattern="DD/MM/YYYY hh:mm";
            if(userInfo.MarketId == "sv-SE") pattern="YYYY-MM-DD hh:mm";

            Data.setData('ParkedLocation', gvlSavedLocation)
            Data.setData('ParkedTime', tempTime.getDateString(pattern))
            Data.setData('ParkedNote', $("#parkNote").val())

            var _pos = {
            	coords : gvlPosition
            }
            fnMakeMap(_pos);
		}, null, [i18n('D1_9','text'), i18n('F1_33', 'text')]);
	});
	
	// “Clear”버튼 터치 시
	$("#clearBtn").click(function() {
		if ($(this).hasClass("off")) {
			return false;
		}
		Dialog.confirm(i18n('N1_5','text'), function(){
			/*
			 * 구글맵을 초기화 한다.
			 * 위치 정보를 스토리지에서 삭제한다.
			 * 주차 시간을 스토리지에서 삭제한다.
			 * 메모 내용을 스토리지에서 삭제한다.
			 * 버튼 타입을 변경한다.
			 */
			// gMap.setDefaultCenter(true);
			console.log('clearBtn')
			Data.setData('ParkedLocation','');
			Data.setData('ParkedTime','');
			$('#parkNote').prop('disabled', false);
			$('#parkNote').val('');
			gvlSavedLocation = '';
			gvlDirectionsDisplay.setMap(null);
			gMap.getMap().setZoom(17);
			$("#mapSub").addClass("none");
			$("#curLocBtn").click();
		}, null, [i18n('N1_6','text'), i18n('N1_7', 'text')]);
	})

    fnGetPos()
}



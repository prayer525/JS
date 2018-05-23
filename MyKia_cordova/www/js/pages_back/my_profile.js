fnList.pageMyProfile = function(){
	var userInfo = Data.getData('UserInformation');
	var myvehicle;

	// Start Display Init
	function fnInitPage(){
		var params = {
			'CustomerId' : Data.getData('Login').CustomerId
		}

		getApi('UserInformation', params, fnSetUser);
		getApi('VehiclesInformation', params, fnSetVehicle);

		function fnSetUser(data){
			Data.setData('UserInformation', data)

			userInfo = data;


			$("#name").html(userInfo.FirstName + " " + userInfo.LastName);
		    $("#address").html(userInfo.Street+" "+userInfo.Housenumber+"</br>"+userInfo.PostalCode+" "+userInfo.City);
		    $("#phone").html(userInfo.Phone);
		    $("#email").html(userInfo.Email);
		}

		function fnSetVehicle(data){
			Data.setData('VehiclesInformation', data);
			myvehicle = data.Vehicles[Data.getData('selectedVehicleIndex')];

			if(myvehicle != undefined){
				if(myvehicle.LastServiceDate != null && myvehicle.LastServiceDate.trim().length > 0){
		        	$("#service em").html(JsUtil.fnMomentDate(myvehicle.LastServiceDate, 'L'));
		        	$("#service").show();
		        }else{
		        	$("#service").remove();
		        }
		        
		        $("#mileage em").html(JsUtil.addComma(myvehicle.CurrentMileageInKilometers)+" km");
		        // mileage update date
		        if(myvehicle.CurrentMileageSetDate != ""){
		        	$("#mileageSetDate em").html(JsUtil.fnMomentDate(myvehicle.CurrentMileageSetDate, 'L'));
		        	$("#mileageSetDate").show();
		        }else{
		        	$("#mileageSetDate").hide();
		        }
		        
		        if(myvehicle.RegistrationDate != ""){
		            $("#registered em").html(JsUtil.fnMomentDate(myvehicle.RegistrationDate, 'L'));   
		        }
		        $("#usage em").html(JsUtil.addComma(myvehicle.UsagePerYear)+" km/"+i18n('V1_3', 'text'));
		        if (userInfo.MarketId == 'KMSE' && myvehicle.Licenseplate) {
		            $("#plate").html(i18n('PN_01', 'text')+' : ' + myvehicle.Licenseplate);
		        }else{
		            $("#plate").hide();
		        }

		        // display change button if user has vehicle greater than one
		        // 자동차가 1대 이상일 경우 자동차 변경 버튼을 표시한다.
		        if(data.Vehicles.length>1) $("#mk_a00_0004").show();
		        $("#car").html(myvehicle.VehicleName);
		        $("#carImage").attr("src", Data.getData('VehiclesImagesV2').Vehicles[Data.getData('selectedVehicleIndex')].VehicleImageUrl);

			}else{
				$(".car-info").hide();
	        	$(".mileage-info").hide();
			}
		}
	}
	// End Display Init

	// lastServiceDate Format
    if(userInfo.MarketId.match("KMSE")){
        $('<input type="tel" id="year" maxlength="4" style="width: 40%;" placeholder="YYYY"/>').appendTo('#lastServiceArea');
        $('<input type="tel" id="month" maxlength="2" style="width: 28%;" placeholder="MM"/>').appendTo('#lastServiceArea');
        $('<input type="tel" id="day" maxlength="2" style="width: 28%;" placeholder="DD"/>').appendTo('#lastServiceArea');
    }else{
        $('<input type="tel" id="day" maxlength="2" style="width: 28%;" placeholder="DD"/>').appendTo('#lastServiceArea');
        $('<input type="tel" id="month" maxlength="2" style="width: 28%;" placeholder="MM"/>').appendTo('#lastServiceArea');
        $('<input type="tel" id="year" maxlength="4" style="width: 40%;" placeholder="YYYY"/>').appendTo('#lastServiceArea');
    }

	// update last service date 
    $("#day").keyup(gfnInputDayValidate);
    $("#month").keyup(gfnInputMonthValidate);
    $("#year").keyup(gfnInputYearValidate);

	// Start Mileage & Lastupdate 
	$("#update").click(fnOpenMileage);
	$("#updateLastservice").click(fnOpenLastUpdate);

	$("#popupClose").click(fnCloseMileage);
	$("#popupLastClose").click(fnCloseLastUpdate);
	
	$("#popupInputMileage").keyup(fnInputMileageValidate);

	$("#popupSave").click(gfnUpdateMileage);
	$("#lastServiceSave").click(gfnUpdateLastService);

	function fnOpenMileage(){
	    $("#popup").removeClass('none');
	    $(".lightbox").removeClass('none');
	}

	function fnOpenLastUpdate(){
	    $("#popup_last").removeClass('none');
	    $(".lightbox").removeClass('none');
	}

	function fnCloseMileage(){
	    $("#popup").addClass('none');
	    $(".lightbox").addClass('none');
		$("#popupInputMileage").val("");
	}

	function fnCloseLastUpdate(){
	    $("#popup_last").addClass('none');
	    $(".lightbox").addClass('none');
	    $("#lastServiceSave").prop("disabled",true);
	    $("#lastServiceSave").addClass("off");
	    $("#day").val("");
	    $("#month").val("");
	    $("#year").val("");
	}

	function fnInputMileageValidate(){
	    var val=JsUtil.mfnNumberOnlyFilter($(this).val());
	    var maxLength=6;
	    if(val!=""){
	    	val=val.replace(/,|\.| /g,"");
	    	if(val.length>maxLength)val=val.substr(0,maxLength);
	    	if(val>240000) val=240000;
	    	val=JsUtil.addComma(val);
	    }
	    $(this).val(val);
	    if(val==0){
	        $("#popupSave").prop("disabled",true);
	        $("#popupSave").addClass("off");
	    }else{
	        $("#popupSave").prop("disabled",false);
	        $("#popupSave").removeClass("off");
	    }
	}

	function gfnUpdateMileage(){
	    $("#popup").addClass('none');
	    $(".lightbox").addClass('none');

	    var params = {
	    	"CustomerId":Data.getData('Login').CustomerId,
			"VIN":myvehicle.VIN,
			"MileageInKilometers":$("#popupInputMileage").val().replace(/,|\.| /g,"")
	    }

	    getApi('MileageUpdating', params, function(){
	    	fnInitPage();
	    	fnCloseMileage();
	    });
	}

	// 일검증 
	function gfnInputDayValidate(){
	    var val=JsUtil.mfnNumberOnlyFilter($(this).val());
	    var maxDay = 31;
	    if(val > maxDay) val = maxDay;
	    $(this).val(val);

	    gfnInputLastServiceValidate();
	}
	//월검증 
	function gfnInputMonthValidate(){
	    var val=JsUtil.mfnNumberOnlyFilter($(this).val());
	    var maxMonth = 12;
	    if(val > maxMonth) val = maxMonth;
	    $(this).val(val);

	    gfnInputLastServiceValidate();
	}
	// 년도검증 
	function gfnInputYearValidate(){
	    var val=JsUtil.mfnNumberOnlyFilter($(this).val());
	    $(this).val(val);

	    gfnInputLastServiceValidate();
	}

	function gfnInputLastServiceValidate(){
	    var year 	= JsUtil.mfnNumberOnlyFilter($('#year').val()),
	        month 	= JsUtil.mfnNumberOnlyFilter($('#month').val()),
	        day 	= JsUtil.mfnNumberOnlyFilter($('#day').val());
	    
	    if( year>0 && year.length==4 && month>0 && day>0){
	        $("#lastServiceSave").prop("disabled",false);
	        $("#lastServiceSave").removeClass("off");
	    }else{
	        $("#lastServiceSave").prop("disabled",true);
	        $("#lastServiceSave").addClass("off");
	    }
	}

	function gfnUpdateLastService(){
	    $("#day, #month #year").blur();

	    var year 				= JsUtil.prependZeros($("#year").val(),4),
	        month 				= JsUtil.prependZeros($("#month").val(),2),
	        day 				= JsUtil.prependZeros($("#day").val(),2),
	        lastServiceDate 	= year+"-"+month+"-"+day,
	        registrationDate 	= myvehicle.RegistrationDate.substring(0, 8),
	        current 			= new Date(),
	        today 				= current.getFullYear()+''+JsUtil.prependZeros(current.getMonth()+1,2)+''+JsUtil.prependZeros(current.getDate(),2),
	        CurrentLastServiceDate = myvehicle.LastServiceDate.substring(0,8);

	    // registrationDate 보다 낮은값을 등록 할 수 없음
	    if(Number(year+""+month+""+day) <= Number(registrationDate)){
	    	JsUtil.alert(i18n('Y2_18', 'text'));
	        // MApi.alert(M.locale.localizedString("Y2_18"));
	        return false;
	    }
	    // 오늘보다 이후의 날짜는 등록할 수 없음
	    else if(Number(year+""+month+""+day) > Number(today)){
	    	JsUtil.alert(i18n('Y2_18', 'text'));
	        // MApi.alert(M.locale.localizedString("Y2_18"));
	        return false;
	    }
	    // 현재 마지막 서비스 날짜보다 이후 날짜는 등록할 수 없음.
	    else if(CurrentLastServiceDate > Number(year+""+month+""+day)){
	    	JsUtil.alert(i18n('Y2_18', 'text'));
	        //MApi.alert(M.locale.localizedString("Y2_18"));
	        return false;
	    }
	    fnCloseLastUpdate();

	    var params = {
	    	"CustomerId":Data.getData('Login').CustomerId,
	        "VIN":myvehicle.VIN,   // 암호화 하지 않으려고 만든 VIN 필드
	        "DateOfLastService":lastServiceDate
	    }

	    getApi('LastServiceUpdate', params, function(){
	    	fnInitPage();
	    });
	}

	fnInitPage();

}
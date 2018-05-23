fnList.pageMaintenanceSchedule = function(){
    console.log('pageMaintenanceSchedule');

    var myvehicle, userInfo;

    function fnInitPage(){
        var params = {
            'CustomerId' : Data.getData('Login').CustomerId
        }

        getApi('UserInformation', params, function(data){
            Data.setData('UserInformation', data);
            getApi('VehiclesInformation', params, fnSetVehicleList);
        });
    }
    

    function fnSetVehicleList(data){
        Data.setData('VehiclesInformation', data);

        fnMergeVehicle();

        myvehicle = data.Vehicles[Data.getData('selectedVehicleIndex')];
        userInfo = Data.getData('UserInformation');

        console.log('myvehicle : ' , myvehicle)

        $('#car').text(myvehicle.VehicleName);

        if(myvehicle.LastServiceDate != null && myvehicle.LastServiceDate.trim().length > 0){
            $('#lastService em').text(JsUtil.fnMomentDate(myvehicle.LastServiceDate, 'L'));
            $('#lastService').show();
        }else{
            $('#lastService').remove();
        }

        $('#carImage').attr('src', myvehicle.VehicleImageUrl);
        $('#mileage em').text(JsUtil.addComma(myvehicle.CurrentMileageInKilometers)+' km');

        // mileage update date
        if(myvehicle.CurrentMileageSetDate){
            $('#mileageSetDate em').html(JsUtil.fnMomentDate(myvehicle.CurrentMileageSetDate, 'L'));
            $('#mileageSetDate').show();
        }else{
            $('#mileageSetDate').hide();
        }

        if(myvehicle.RegistrationDate != ''){
            $('#registered em').text(JsUtil.fnMomentDate(myvehicle.RegistrationDate, 'L'));
        }

        $('#usage em').text(JsUtil.addComma(myvehicle.UsagePerYear)+' km/'+i18n('V1_3', 'text'));
        if (userInfo.MarketId == 'KMSE' && myvehicle.Licenseplate) {
            $('#plate em').text(myvehicle.Licenseplate);
        }else{
            $('#plate').hide();
        }

        $('#name').text(userInfo.FirstName+',');

        if(data.Vehicles.length>1) $('.ve-set').show();

        var param={
            'CustomerId':Data.getData('Login').CustomerId,
            'VIN':myvehicle.VIN
        };

        getApi('MaintainanceSchedule', param, fnMakeMaintenanceList);
    }

    function fnMakeMaintenanceList(data){
        console.log('userInfo.MarketId : ' , userInfo.MarketId)
        console.log('data.Plans : ' , data.Plans)
        if(userInfo.MarketId != 'KMBE'){
            if(data.Plans == undefined || data.Plans == null){
                $('.result-none-p').removeClass('none');

                return;
            }else{
                if($('.result-none-p').hasClass('none') === true) {
                    $('.timeline-space').removeClass('none');
                    $('.result-none-p').addClass('none');
                }
            }
        }

        // API 2.12 통신 결과 성공 시 결과를 리스트로 표시한다
        $('#checkList > li:not(.t-start)').remove();

        var appo_space = '';

        if(userInfo.MarketId == 'KMDE'){
            appo_space = i18n('S1_27', 'text');

            appo_space = appo_space.replace('{ServiceSuggestionMileage}',myvehicle.CurrentMileageInKilometers)
            appo_space = appo_space.replace('{ServiceSuggestionMonths}',JsUtil.fnMomentDate(myvehicle.NextServiceDate, 'L'))
        }else{
            appo_space = i18n('S1_27', 'text') + " " + JsUtil.fnMomentDate(myvehicle.NextServiceDate, 'L')
        }

        $(".appo-space > p").text(appo_space);

        // HideNextServiceDate == true이면 이름을 표시안한다.
        if (data.HideNextServiceDate == true || data.HideNextServiceDate == 'true') {
            $('.appo-space').hide()
        } else {
            $('.appo-space').show()
        }

        $(data.Plans).each(function(idx, item) {
            var description=item.Description;
            // item.Description=null;
            // description=null;
            if(description==null) description=i18n('E1_51','text');

            var temp = $("<li></li>")
                .append($("<p></p>").text("point icon").addClass("t-icon"))
                .append($("<div></div>").addClass("t-sub")
                .append($("<p></p>").text(i18n('V1_9', 'text') + " " + JsUtil.addComma(item.ServiceplanMileage) + " km").addClass("tit"))
                .append($("<div></div>").addClass("t-subdata")
                .append($("<div></div>").text(description).addClass("t-tit"))
            ));

            if(item.Description==null){
                var button=$('<button class="btn-white tmp"></button>').text(i18n('S1_15', 'text'));
                
                /*
                button.click(function(){
                    var params={};
                    params.tab="contact";
                    var options = Options.Default;
                    options.param=params;
                    Page.moveToPage("mk_c01_0001",options);
                    gvlReloadFlag=false;
                });
                */
                temp.find(".t-subdata").append(button);
                temp.find(".t-tit").addClass("tmp2");
            }

            temp.data("checkupMileage", item.ServiceplanMileage).appendTo($("#checkList"));
            
            $(item.ServiceOptions).each(function(index, thatItem) {
                if(thatItem.Category!=null){
                    temp.find(".t-subdata")
                        .append($("<p></p>").text(thatItem.Category).addClass("t-tit"));
                    
                    $(thatItem.Options).each(function(theIdx, optionItem) {
                        temp.find(".t-subdata")
                            .append($("<p></p>").text(optionItem).addClass("t-data"));
                    });
                }
            });
            
            temp.find(".t-subdata")
                .append($("<span></span>").text(JsUtil.fnMomentDate(item.ServiceDate, 'L')).addClass("t-date"));
        });

        // 리스트 터치 시 상세 내용이 열려 있는 경우 상세 내용이 아래로 펼쳐진다.
        // 상세 내용이 닫혀 있는 경우 상세 내용이 위로 닫힌다.
        // $("#checkList > li:not(.t_start)").click(function() {
        $("#checkList .tit").click(function() {
            $(this).parent().parent().toggleClass("open");
        });
        //gfnRedLineMark();

        fnRegPage()
    }

    function fnRegPage(){
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
    }

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
        var year    = JsUtil.mfnNumberOnlyFilter($('#year').val()),
            month   = JsUtil.mfnNumberOnlyFilter($('#month').val()),
            day     = JsUtil.mfnNumberOnlyFilter($('#day').val());
        
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

        var year                = JsUtil.prependZeros($("#year").val(),4),
            month               = JsUtil.prependZeros($("#month").val(),2),
            day                 = JsUtil.prependZeros($("#day").val(),2),
            lastServiceDate     = year+"-"+month+"-"+day,
            registrationDate    = myvehicle.RegistrationDate.substring(0, 8),
            current             = new Date(),
            today               = current.getFullYear()+''+JsUtil.prependZeros(current.getMonth()+1,2)+''+JsUtil.prependZeros(current.getDate(),2),
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
            "VIN":myvehicle.VIN,
            "DateOfLastService":lastServiceDate
        }

        getApi('LastServiceUpdate', params, function(){
            fnInitPage();
        });
    }

    fnInitPage();
}



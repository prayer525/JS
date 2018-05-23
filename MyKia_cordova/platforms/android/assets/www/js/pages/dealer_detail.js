fnList.pageDealerDetail = function(){
    console.log('dealer detail')

    var param = {
        'CustomerId' : Data.getData('Login').CustomerId,
        'DealerSapCode' : Data.getData('dealerSapCode')
    }

    getApi('DealerInformation', param, fnInit);

    function fnInit(dealerInfo){
        var openInfo = dealerInfo.OpeningHours;

        if(!dealerInfo.DealerSapCode){
            alert(i18n('S1_12', 'text'))

            window.history.back(-1);
        }

        $('#dealer-name').text(dealerInfo.Name).addClass('type0'+dealerInfo.DealerType);
        $('#dealer-img').attr('src', '../img/default_sales.png')
        $('dealer-img-wrap').addClass('kmd-img');

        if (dealerInfo.Description) {
            $("#description").html(dealerInfo.Description);
            $("#generalInfo").show();
        } else {
            $("#generalInfo").hide();
        }

        if(!openInfo.Sales.IsEmpty){
            gfnTimeTable(openInfo.Sales, "#salesLayout");
        }
        if(!openInfo.Service.IsEmpty){
            gfnTimeTable(openInfo.Service, "#serviceLayout");
        }
        if(openInfo.Sales.IsEmpty && openInfo.Service.IsEmpty){
            $('.info-service-time').hide();
        }

        $("#address").html(dealerInfo.Street+"</br>"+dealerInfo.ZipCode+" "+dealerInfo.Town);
        $("#btn-map").click(function(){
            // External App call
            // var value=[];
            // value.push(dealerInfo.GeoLatitude);
            // value.push(dealerInfo.GeoLongitude);
            // exMapCall(JsUtil.stringFomatter("daddr=%@, %@",value));
        });

        // sales & service 둘 다 전화번호가 있을 경우
        if(dealerInfo.Phone != "" && dealerInfo.PhoneService != "" ){
            $('#twoSalesPhone').text(dealerInfo.Phone);
            $('#call-two').data('phone', '+'+dealerInfo.Phone);
            $('#servicePhone').text(dealerInfo.PhoneService);
            $('#callService').data('phone', '+'+dealerInfo.PhoneService);

            $(".two-phone").show();
        }
        // Service 만 전화 번호가 있을 경우
        else if(dealerInfo.Phone=="" && dealerInfo.PhoneService != ""){
            $('#oneSalesPhone').text(dealerInfo.PhoneService);
            $('#call-one').data('phone','+'+dealerInfo.PhoneService);

            $(".one-phone").show();
        }
        // Sales 만 전화 번호가 있을 경우
        else if(dealerInfo.Phone != "" && dealerInfo.PhoneService == ""){
            $('#oneSalesPhone').text(dealerInfo.Phone);
            $('#call-one').data('phone','+'+dealerInfo.Phone);

            $(".one-phone").show();
        }

        // Sales & Service 둘 다 이메일 주소가 있을 경우
        if(dealerInfo.Email.length > 1 && dealerInfo.EmailService.length > 1){
            $('#twoSalesEmail').text(dealerInfo.Email);
            $('#link-two').data('email', dealerInfo.Email);
            $('#serviceEmail').text(dealerInfo.EmailService);
            $('#linkService').data('email', dealerInfo.EmailService);

            $('.two-email').show();
        }
        // Service 만 이메일이 있을 경우
        else if(dealerInfo.Email.length <= 1 && dealerInfo.EmailService.length > 1){
            $('#oneSalesEmail').text(dealerInfo.EmailService);
            $('#link-one').data('email',dealerInfo.EmailService);

            $('.one-email').show();
        }
        // Sales 만 이메일이 있을 경우
        else if(dealerInfo.Email.length > 1 && dealerInfo.EmailService.length >= 1){
            $('#oneSalesEmail').text(dealerInfo.Email);
            $('#link-one').data('email',dealerInfo.Email);

            $('.one-email').show();
        }

        if(dealerInfo.Website.length > 3){
            $("#site").text(dealerInfo.Website);
            $("#browser").data('url',dealerInfo.Website);
            $("#browser").click(function(){
                // open external browser
            });
        }else{
            $('.dealer-homepage').hide();
        }

        // select to preferred dealer
        $('.btn-select-dealer').click(function(){
            var param = {
                "CustomerId":Data.getData('Login').CustomerId,
                "DealerSAPCode":Data.getData('dealerSapCode')
            }

            getApi('SetPreferredDealer', param, function(data){
                if((data.ResponseMessage).indexOf('PARAM-') > -1){
                    var trCode = JsUtil.trMessageCode(rev.ResponseMessage.split(":")[0])
                }
            })


            if (idx == 0) {
                return;
            }
            var callback={
                    success:function(rev,setting){
                        if(rev.ResponseMessage.match("PARAM-")){
                            var TranslatioCode = JsUtil.trMessageCode(rev.ResponseMessage.split(":")[0]);
                            // MApi.alert(M.locale.localizedString(TranslatioCode));

                            return false;
                        }
                        // API 2.39 통신 결과 성공 시 최초 진입 시 처리 로직이 진행된다. 
                        M.pop.instance(M.locale.localizedString("Y2_8"));
                        LoginManager.setDealerInfo(gvlDealerInfo);
                        gvlUserInformationNetwork.send({
                            "CustomerId" : LoginManager.getCustomerId()
                        });
                    }
                }
            ,PreferredDealerUpdatingNetwork=new NetworkManager(TrCode.SetPreferredDealer,callback,false);
        
            PreferredDealerUpdatingNetwork.send({
                "CustomerId":LoginManager.getCustomerId(),
                "DealerSAPCode":gvlDealerSapCode
            });
        })
    }

    /*
    var tab=M.data.param("tab");
    if(tab=="contact") $("#contactBtn").click();

    if (e.param.stackFlag == 'BACK') {
        $('#header button').addClass('back').removeClass('home')
    }
    */

    function gfnTimeTable(obj, idKey) {
        function pattern(val){
            var data=val.split(":");
            return data[0]+":"+data[1];
        }

        var sort=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        var trans = ["E1_8", "E1_9", "E1_10", "E1_11", "E1_12", "T1_1", "T1_2"]

        for(var key in sort){
            var item=obj[sort[key]];
            if(item!=null){
                var title=i18n(trans[key], 'text')
                var text="";
                for(var i=0;i<item.length;i++){
                    if(i==0) text += '<i class="dltitle">'+title+"</i>";
                    text+=pattern(item[i].From)+" - "+pattern(item[i].To);
                    if(item.length-1!=i) text+=" / ";
                }
                if(text != ""){
                    $("<span></span>").html(text).appendTo(idKey);
                    $(idKey).show();
                }
            }
        }
    }
}



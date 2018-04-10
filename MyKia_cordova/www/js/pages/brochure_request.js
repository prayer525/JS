fnList.pageBrochureRequest = function(){
    console.log('pageBrochureRequest')
    var userInfo=Data.getData('UserInformation');
    var gvlBrochureList = Data.getData('gvlBrochureList');
    var dealerInfo = Data.getData('DealerInformation');
    var downloadStoragePath = '', cancelFlag = false;
    var gvlTemp, gvlSelCarCode, fileTransfer, fileURL;

    if(gvlBrochureList == ''){
        var param = {
            'MarketId':userInfo.MarketId
        }

        getApi('AllVehicleImages', param, function(data){
            console.log('data')
            gvlBrochureList = data.ModelImages;

            fnMakeList();
        });
    }else{
        fnMakeList()
    }

    function fnMakeList(){
        if(gvlBrochureList.length==0){
            $('.result-none-file').removeClass('none');

            return false;
        }

        $.each(gvlBrochureList, function(idx, item){
            var temp = $("<li></li>")
                        .append($("<input name='car' type='radio' id='chk"+idx+"'/>"))
                        .append(
                            $("<label class='li-sub hbox js' for='chk"+idx+"'></label>")
                            .append($("<p class='flex'></p>").html(item.VehicleModelName))
                            .append($("<span></span>").html(item.Licenseplate))
                            .append($("<img></img>").attr("src", item.VehicleThumbnailUrl))
                        )
                        .data("vCode", item.VehicleCode)
                        .data("hasPDF", item.HasBrochure)
                        .data("pdfpath", item.pdfpath)
                        .click(function(){
                            $("#request").prop("disabled",false);
                            $("#request").removeClass("off");
                            gvlSelCarCode = $(this).data("vCode");
                            gvlTemp = $(this);
                            cancelFlg = false;
                        })

            $("#list").append(temp);
        })

        $('#openIn').click(fnOpenIn);
        $('#download').click(fnJustDownLoad);
        $('#email').click(function(){
            Dialog.confirm(i18n('V1_4','text'), fnSendEmail, null, [i18n('D1_9','text'), i18n('E1_25', 'text')]);
        })
    }

    function fnSendEmail(){
        var param = {
            CustomerId : Data.getData('Login').CustomerId,
            Gender : userInfo.Male ? "M" : "F",
            Salutation : userInfo.Male ? dataEncode("Mr.") : dataEncode("Mrs."),
            FirstName : dataEncode(userInfo.FirstName),
            LastName : dataEncode(userInfo.LastName),
            MobilePhone : dataEncode(userInfo.Phone),
            HomePhone : "",
            StreetAddress1 : dataEncode(userInfo.Street),
            StreetAddress2 : "",
            HouseNumber : dataEncode(userInfo.Housenumber),
            Postcode : dataEncode(userInfo.PostalCode),
            City : dataEncode(userInfo.City),
            CountryCode : userInfo.CountryCode,
            Region : '',
            EmailAddress : dataEncode(userInfo.Email),
            RequestModel : dataEncode(gvlSelCarCode),
            DealerSapCode : dataEncode(dealerInfo.DealerSapCode),
            Language : userInfo.CultureCode,
            MarketingAgreement : "N",
            OptinForNewsletter : "N"
        }

        $(".lightbox").addClass('none');
        $("#morePopup").addClass('none');

        getApi('VehicleBrochure', param, function(){
            $("input:checked").prop("checked", false);
            $("#request").prop("disabled", true);
            $("#request").addClass("off");
            $("#scroll").scrollTop(0);
            navigator.notification.alert(i18n('H1_1', 'text'))
        })
    }

    function fnOpenIn(){
        if(gvlTemp.data("pdfpath") == undefined){
            var popTitle = i18n('L1_3', 'text'),
                popMessage = i18n('D1_8', 'text')

            if(i18n('Y2_23', 'text') != 'Y2_23'){
                popTitle = i18n('Y2_23', 'text')
            }

            if(i18n('Y2_24', 'text') != 'Y2_24'){
                popMessage = i18n('Y2_24', 'text')
            }
            
            $(".download-popup-title").text(popTitle);
            $(".download-popup-message").text(popMessage);

            if((navigator.userAgent).indexOf('Android') > -1){
                downloadStoragePath = cordova.file.dataDirectory;
            }else{
                downloadStoragePath = cordova.file.documentsDirectory
            }

            fnDownloadPdfFile(fnOpenInApp);
        }else{
            localStorage.setItem('pdfFilePath', gvlTemp.data('pdfpath'))
            $.mobile.changePage( 'view_pdf.html', { transition: 'slide'} );
        }
    }

    function fnJustDownLoad(){
        var popTitle = i18n('L1_3', 'text'),
            popMessage = i18n('D1_8', 'text')

        if(i18n('Y2_23', 'text') != 'Y2_23'){
            popTitle = i18n('Y2_23', 'text')
        }

        if(i18n('Y2_24', 'text') != 'Y2_24'){
            popMessage = i18n('Y2_24', 'text')
        }

        if((navigator.userAgent).indexOf('Android') > -1){
            downloadStoragePath = cordova.file.externalDataDirectory;
        }else{
            downloadStoragePath = cordova.file.dataDirectory
        }
        
        $(".download-popup-title").text(popTitle);
        $(".download-popup-message").text(popMessage);

        fnDownloadPdfFile(fnOpenExternal);
    }

    function fnOpenInApp(entry){
        if(cancelFlg){
            return false;
        }

        gvlBrochureList[gvlTemp.index()].pdfpath = entry.toURL();

        Data.setData('gvlBrochureList', gvlBrochureList)

        localStorage.setItem('pdfFilePath', entry.toURL());

        $.mobile.changePage( 'view_pdf.html', { transition: 'slide'} );
    }

    function fnOpenExternal(entry){
        if(cancelFlg){
            return false;
        }

        cordova.plugins.fileOpener2.showOpenWithDialog(
            entry.toURL(), 
            'application/pdf', 
            {
                error : function(e ){
                    console.log('open fail : ', e)
                }, 
                success : function(){
                    console.log('open success')
                } 
            } 
        );
    }

    function fnDownloadPdfFile(callBack){
        $(".lightbox").addClass('none');
        $("#morePopup").addClass('none');

        window.resolveLocalFileSystemURL(downloadStoragePath, function (fs) {
            var uri = 'https://eleadapp-test.dealer-portal.net/proxy/api/common/bin.proxy?targetServer=EU&targetApi=BROCHURE&fileName=' + b64EncodeUnicode(gvlSelCarCode);
            fs.getFile(gvlTemp.data('DocumentTitle')+'.pdf', { create: true, exclusive: false }, function (fileEntry) {
                $(".lightbox").removeClass('none');
                $("#downloadPopup").removeClass('none');

                fileTransfer = new FileTransfer();
                fileURL = fileEntry.toURL();

                fileTransfer.onprogress = function(progress){
                    var w =  parseInt((progress.loaded / progress.total) * 100);
                    $('#per-int').text(w)
                    $('#per-bar').css('width',w+'%');
                }

                fileTransfer.download(
                    uri,
                    fileURL,
                    function (entry) {
                        $(".lightbox").addClass('none');
                        $("#downloadPopup").addClass('none');

                        $('#per-int').text('0')
                        $('#per-bar').css('width','0%');

                        callBack(entry);
                    },
                    function (error) {
                        console.log("download error source " + error.source);
                        console.log("download error target " + error.target);
                        console.log("upload error code" + error.code);
                    },
                    null, // or, pass false
                    {
                        headers: {
                           "Authorization": 'Bearer '+Data.getData('Login').TokenResponse.access_token
                        }
                    }
                );

            }, function(e){
                console.log('onErrorCreateFile : ' , e)
            });

        }, function(e){
            console.log('onErrorLoadFs : ', e)
        });
    }

    function b64EncodeUnicode(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
    }

    function gfnGetExtension(fileName){
        fileName=fileName.replace(/ /g,"").toLowerCase();
        if(fileName.lastIndexOf(".pdf")>-1) return "pdf";
        else if(fileName.lastIndexOf(".zip")>-1) return "zip";
    }

    $("#request").click(function() {
        $(".lightbox").removeClass('none');
        $("#morePopup").removeClass('none');
    });

    $(".lightbox").click(function(){
        $(".lightbox").addClass('none');
        $("#morePopup").addClass('none');
    })

    $('.back').click(function(){
        Data.setData('gvlBrochureList','');
        localStorage.removeItem('pdfFilePath');
    })

    $('#btn-download-cancel').click(function(){
        cancelFlg = true;
        fileTransfer = null;
        $(".lightbox").addClass('none');
        $("#downloadPopup").addClass('none');
    })
}
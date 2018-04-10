fnList.pageManuals = function(){

	var myvehicle=Data.getData('selectedVehicle');
	var userInfo=Data.getData('UserInformation');
	var gvlDocumentList = Data.getData('gvlDocumentList');
	var downloadStoragePath = '';
	var gvlTemp, cancelFlg = false, fileTransfer, fileURL;


	if(gvlDocumentList == ''){
		var param = {
			'CultureCode':userInfo.CultureCode,
			'MarketId':userInfo.MarketId,
			'VIN':myvehicle.VIN
		}

		getApi('GetDocumentList', param, function(data){
			gvlDocumentList = data.Documents;

			fnMakeList();
		});
	}else{
		fnMakeList()
	}

	function fnMakeList(){
		if(gvlDocumentList.length==0){
			$('.result-none-file').removeClass('none');

			return false;
		}

		$.each(gvlDocumentList, function(idx, item){
			var temp = '';
			var noticeStr="";
			var itemExtention = gfnGetExtension(item.DocumentfileName);

			temp = $('<li><button><p data-carname=ttt>'+item.DocumentTitle+'</p><p>'+item.PublishDate+'</p></button></li>')
				.data("DocumentfileName",item.DocumentfileName)
				.data("DocumentTitle",item.DocumentTitle)
				.data("noticeStr",noticeStr)
				.data("pdfpath", item.pdfpath)
				.addClass(itemExtention)
				.click(function(){
					gvlTemp = $(this);
					cancelFlg = false;
					$(".lightbox").removeClass('none');
					$("#morePopup").removeClass('none');
				});

			$("#list").append(temp)

		})

		//$('#download').click(gfnDownload);
		$('#openIn').click(fnOpenIn);
		$('#download').click(fnJustDownLoad);
	}

	function fnOpenIn(){
		if(gvlTemp.data("pdfpath") == undefined || gvlTemp.data("pdfpath") == null || gvlTemp.data("pdfpath") == '' ){
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

        gvlDocumentList[gvlTemp.index()].pdfpath = entry.toURL();

        Data.setData('gvlDocumentList', gvlDocumentList)

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
		    var uri = 'https://eleadapp-test.dealer-portal.net/proxy/api/common/bin.proxy?targetServer=EU&targetApi=MANUAL&fileName=' + b64EncodeUnicode(gvlTemp.data('DocumentfileName'));
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

	$(".lightbox").click(function(){
		$(".lightbox").addClass('none');
		$("#morePopup").addClass('none');
	})

	$('.back').click(function(){
		Data.setData('gvlDocumentList','');
		localStorage.removeItem('pdfFilePath');
	})

	$('#btn-download-cancel').click(function(){
		cancelFlg = true;
		fileTransfer = null;
		$(".lightbox").addClass('none');
		$("#downloadPopup").addClass('none');
	})
}
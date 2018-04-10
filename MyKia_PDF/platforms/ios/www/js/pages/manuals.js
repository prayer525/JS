fnList.pageManuals = function(){

	var myvehicle=Data.getData('selectedVehicle');
	var userInfo=Data.getData('UserInformation');
	var gvlDocumentList, gvlTemp;
	var param = {
		'CultureCode':userInfo.CultureCode,
		'MarketId':userInfo.MarketId,
		'VIN':myvehicle.VIN
	}

	getApi('GetDocumentList', param, fnMakeList);

	function fnMakeList(data){
		gvlDocumentList = data.Documents;

		if(gvlDocumentList.length==0){
			$('.result-none-file').removeClass('none');

			return false;
		}

		$.each(gvlDocumentList, function(idx, item){
			var temp = '';
			var noticeStr="";
			var itemExtention = gfnGetExtension(item.DocumentfileName);

			temp = $('<li class="download"><button><p data-carname=ttt>'+item.DocumentTitle+'</p><p>'+item.PublishDate+'</p></button></li>')
				.data("DocumentfileName",item.DocumentfileName)
				.data("noticeStr",noticeStr)
				.addClass(itemExtention)
				.click(function(){
					gvlTemp = $(this);
					$(".lightbox").removeClass('none');
					$("#morePopup").removeClass('none');
				});

			$("#list").append(temp)

		})

		//$('#download').click(gfnDownload);
		$('#openIn').click(fnOpenIn);
	}

	function fnOpenIn(){
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
		
		if(gvlTemp.hasClass("download")){
			fnDownloadForOpen(gvlTemp);
		}else{
			// gfnShowDocument(gvlTemp);
		}
	}

	$(".lightbox").click(function(){
		$(".lightbox").addClass('none');
		$("#morePopup").addClass('none');
	})

	function fnDownloadForOpen(temp){
		$(".lightbox").addClass('none');
		$("#morePopup").addClass('none');

		var filePath = '';

		if((navigator.userAgent).indexOf('Android') > -1){
			filePath = cordova.file.dataDirectory;
		}else{
			filePath = cordova.file.documentsDirectory
		}

		KmeSpinner.start();

		window.resolveLocalFileSystemURL(filePath, function (fs) {
		    // Make sure you add the domain name to the Content-Security-Policy <meta> element.
		    var uri = 'https://eleadapp-test.dealer-portal.net/proxy/api/common/bin.proxy?targetServer=EU&fileName=' + b64EncodeUnicode(temp.data('DocumentfileName'));
		    // Parameters passed to getFile create a new file or return the file if it already exists.
		    fs.getFile('download.pdf', { create: true, exclusive: false }, function (fileEntry) {
		        var readBinaryData = true;

		        var fileTransfer = new FileTransfer();
			    var fileURL = fileEntry.toURL();

			    fileTransfer.download(
			        uri,
			        fileURL,
			        function (entry) {
			            console.log("Successful download...");
			            console.log("download complete: " + entry.toURL());

			            localStorage.setItem('pdfFilePath', entry.toURL());

			            KmeSpinner.stop();

			            // var options = "location=yes,zoom=no";
            			// var ref = cordova.InAppBrowser.open("../pdfjs/web/viewer.html", "_blank", options);

			            // fnViewFile(entry.toURL());

			            // cordova.plugins.openpdfviewer.getFile(entry.toURL(), function(){console.log('Success')}, function(e){console.log('Fail : ' , e)})
			            
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
			        },
			        function (error) {
			            console.log("download error source " + error.source);
			            console.log("download error target " + error.target);
			            console.log("upload error code" + error.code);

			            KmeSpinner.stop();
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
		    	KmeSpinner.stop();
		    });

		}, function(e){
			console.log('onErrorLoadFs : ', e)
			KmeSpinner.stop();
		});

		/*
		$.ajax({
			type : 'POST',
			dataType:'text',
			contentType: 'application/json',
			// url: Data.get('targetServer')+'api/v2/market/getdocument',
			url: "https://eleadapp-test.dealer-portal.net/proxy/api/common/bin.proxy?targetServer=EU&fileName=UVJHL0tNQVQvUFMgRVYvS2lhIFNvdWwgRVYgUVJHICgxNC0wMDE1NTgpLnBkZg==",
			data: JSON.stringify(param),
			async: false,
			crossDomain:true,
			timeout: 60000,
			beforeSend: function(request) {
				request.setRequestHeader("Authorization", 'Bearer '+Data.getData('Login').TokenResponse.access_token);
				$(".lightbox").addClass('none');
				$("#morePopup").addClass('none');
				KmeSpinner.start();
			},
			success: function(response,statusText,xhr){
				console.log('response : ' , response.length)
				fnSaveFile(response);
				
			},
			error: function (xhr, ajaxOptions, thrownError){
				// error 
				console.log("Error : ", thrownError);
			},
			complete: function(data){
				KmeSpinner.stop();
			}
		});
		*/
	}

	function fnSaveFile(res){
		window.resolveLocalFileSystemURL(cordova.file.externalDataDirectory, function (fs) {

		    console.log('file system open: ' , fs);
		    createFile(fs, "download.pdf", true);

		}, onErrorLoadFs);

		function createFile(dirEntry, fileName, isAppend) {
		    // Creates a new file or returns the file if it already exists.
		    dirEntry.getFile(fileName, {create: true}, function(fileEntry) {

		        writeFile(fileEntry, fileName);

		    }, onErrorCreateFile);

		}

		function writeFile(fileEntry, fileName) {
		    // Create a FileWriter object for our FileEntry (log.txt).
		    fileEntry.createWriter(function (fileWriter) {
		    	//fileWriter.localURL = fileEntry.nativeURL;

		    	console.log('fileWriter : ' , fileWriter)

		        fileWriter.onwriteend = function() {
		            console.log('Successful fileEntry : ' , fileEntry)

		            fnViewFile(fileEntry);
		        };

		        fileWriter.onerror = function (e) {
		            console.log("Failed file write: " , e);
		        };
		        // If data object is not passed in,
		        // create a new Blob instead.
		        // var blobData =  new Blob([res]);

		        // console.log('blobData : ' , blobData)
		        

		        var _data = b64EncodeUnicode(res);

		        fileWriter.write(_data);
		    });
		}

		function onErrorLoadFs(error){
			console.log('onErrorLoadFs : ' , error)
		}

		function onErrorCreateFile(error){
			console.log('onErrorCreateFile : ' , error)
		}
	}

	function fnViewFile(_url){
		var linkHandlers = [
            {
                pattern: '^\/',
                close: false,
                handler: function (link) {
                    alert('link handler called with link: "' + link + '"');
                }
            },
            {
                pattern: '^\/',
                close: false,
                handler: function (link) {
                    alert('This handler should not be called because a prior handler should already have matched.');
                }
            },
            {
                pattern: '^\/order',
                close: false,
                handler: function (link) {
                    alert('This handler should not be called because a prior handler should already have matched.');
                }
            },
            {
                pattern: '[\s\S]*',
                close: true,
                handler: function (link) {
                    // catch-all handler demonstrating document close and regex pattern precedence
                }
            }
        ];

		cordova.plugins.SitewaertsDocumentViewer.canViewDocument(_url, 'application/pdf', {}, onPossible, onMissingApp, onImpossible, onError);

		function onPossible(){
			console.log('possible');

			function onShow(){
				console.log('on show')
			}

			function onClose(){
				console.log('on close')
			}
			
			cordova.plugins.SitewaertsDocumentViewer.viewDocument(_url, 'application/pdf', {}, onShow, onClose, onMissingApp, onError, linkHandlers);
		}

		function onMissingApp(appId, installer){
		    if(confirm("Do you want to install the free PDF Viewer App "
		            + appId + " for Android?"))
		    {
		        installer();
		    }
		}

		function onImpossible(){
			console.log('onImpossible')
		}

		function onError(error){
			console.log('Error : ' , error)
		}

		
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
}
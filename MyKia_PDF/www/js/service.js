console.log('serviceJs')
// jquery mobile에서 자동으로 Class 추가 하는것을 차단 
var serverList = {
	'PRD':{
		'EU':'https://apigateway.service.kia.eu/',
		'KMD':'https://apigateway-kmde.service.kia.eu/'
	},
	'DEV':{
		'EU':'https://apigateway.accept.kia.eu/',
		'KMD':'https://apigateway-kmde.accept.kia.eu/'
	}
}
var targetServer = '';
var localFlag = false;

var Data = {
	data:{
		devMode:'PRD',
		serverFlag:'EU',
		isFirstRun:true
	},
	apiData:{

	},
	set:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.data[k] = v;
	},
	get:function(k){
		if(Data.data[k] === undefined){
			Data.data[k] = '';
		}
		return Data.data[k];
	},
	setData:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.apiData[k] = v;
	},
	getData:function(k){
		if(Data.apiData[k] === undefined){
			Data.apiData[k] = '';
		}
		return Data.apiData[k];
	},
	put:function(callBack){
		window.localStorage.setItem("data", JSON.stringify(Data.data));
		window.localStorage.setItem("apiData", JSON.stringify(Data.apiData));
		if(callBack !== undefined){
			callBack();
		}
	},
	withdraw:function(callBack){
		var _data = window.localStorage.getItem("data");

		if(_data != undefined){
			Data.data = JSON.parse(_data);

			var _apiData = window.localStorage.getItem("apiData");

			if(_apiData != undefined){
				Data.apiData = JSON.parse(_apiData);

				if(callBack !== undefined){
					callBack();
				}
			}
		}
	}
}
window.Data = Data;

Data.withdraw();

document.addEventListener('deviceready', function(){
	if(cordova.getAppVersion !== undefined){
		cordova.getAppVersion.getVersionNumber().then(function (version) {
			Data.set('appVer', version);
		});
	}
}, false)


var Token = '';
var ApiInfo={
	'Login'						: {'type':'POST', 'path':'api/authentication/login'},
	'FbLogin'					: {'type':'POST', 'path':'api/authentication/facebookLogin'},
	'Logout'					: {'type':'POST', 'path':'api/authentication/logout'},
	'UserInformation'			: {'type':'POST', 'path':'api/v3/user/information'},
	'VehiclesImages'			: {'type':'POST', 'path':'api/user/vehicleImages'},
	'VehiclesImagesV2'			: {'type':'POST', 'path':'api/v3/user/vehicleImages'},
	'VehiclesInformation'		: {'type':'POST', 'path':'api/v2/user/vehiclesInformation'},
	'AllVehicleImages'			: {'type':'POST', 'path':'api/v2/lead/allModelImages'},
	'TestDrive'					: {'type':'POST', 'path':'api/lead/testdrive'},
	'VehicleBrochure'			: {'type':'POST', 'path':'api/lead/vehicleBrochure'},
	'MileageUpdating'			: {'type':'POST', 'path':'api/v2/service/mileageUpdating'},
	'MaintainanceSchedule'		: {'type':'POST', 'path':'api/v2/service/maintainanceSchedule'},
	'DealerInformation'			: {'type':'POST', 'path':'api/v2/dealer/information'},
	'DealerLocationInformation'	: {'type':'POST', 'path':'api/v2/dealer/locationInformation'},
	'DealerSearching'			: {'type':'POST', 'path':'api/dealer/searching'},
	'NewsList'					: {'type':'POST', 'path':'api/news/list'},
	'NewsListV2'				: {'type':'POST', 'path':'api/v2/news/list'},
	'NewsDetails'				: {'type':'POST', 'path':'api/v5/news/details'},
	'NewsListVideo'				: {'type':'POST', 'path':'api/v2/news/listVideo'},
	'HowToVideo'				: {'type':'POST', 'path':'api/news/howToVideo'},
	'NewsRead'					: {'type':'POST', 'path':'api/news/read'},
	'MarketInformation'			: {'type':'POST', 'path':'api/market/information'},
	'RecallInformation'			: {'type':'POST', 'path':'api/v2/recall/information'},
	'LangSet'					: {'type':'POST', 'path':'api/lang/set'},
	'TranslationList'			: {'type':'POST', 'path':'api/market/translationList'},
	'GetToken'					: {'type':'POST', 'path':'api/gettoken'},
	'ContentVersion'			: {'type':'POST', 'path':'api/market/getcontentversionnumber'},
	'GetLegalNotice'			: {'type':'POST', 'path':'api/v2/market/getlegalnotice'},
	'PutLegalNoticeAgreement'	: {'type':'POST', 'path':'api/user/putlegalnoticeagreement'},
	'GetDocumentList'			: {'type':'POST', 'path':'api/v2/market/documentlist'},
	'GetDocument'				: {'type':'POST', 'path':'api/v2/market/getdocument'},
	'LastServiceUpdate'			: {'type':'POST', 'path':'api/service/lastServiceDateUpdating'},
	'SetPreferredDealer'		: {'type':'POST', 'path':'api/user/setPreferredDealer'},
	'GetBrochure'				: {'type':'POST', 'path':'api/lead/getBrochure'},
	'GetEncryption'				: {'type':'POST', 'path':'api/encryption/encrypt256'}
};

/** 
 * @description API 호출
 * @see all , error.html
 * @param apiName, param, callback
 * @return callback
 */
 var ignoreApi = ['GetToken', 'TranslationList', 'GetLegalNotice', 'Login'];
 var ajaxCount = 0;
function getApi(apiName, param, callback){
//	console.log('[getApi('+apiName+') : param]',param);
	var apiObj;
	var data;
	var jsonStr;
	ajaxCount++;
	
	if(apiName != null && apiName != ""){
		var _type = ApiInfo[apiName]['type'];
		console.log('Request : ' , apiName, param)

		if(localFlag){
			var data = JSON.parse(localData[apiName])

			callback(data);

			return false;
		}

		var encList = ['VIN'];

		if(param != null){
			$.each(encList, function(encIdx, encItem){
				$.each(param, function(paramIdx, paramItem){
					if(encItem == paramIdx){
						param[paramIdx] = dataEncode(paramItem);
					}
				})
			})
		}

		$.ajax({
			type : _type,
			dataType:'text',
			contentType: 'application/json',
			url: Data.get('targetServer')+ApiInfo[apiName]['path'],
			data: param == null ? '' : JSON.stringify(param),
			async: true,
			crossDomain:true,
			timeout: 60000,
			beforeSend: function(request) {
				if(apiName == 'Login'){
					request.setRequestHeader("Token", Data.getData('Token'));
				}else if(!ignoreApi.includes(apiName)){
					request.setRequestHeader("Authorization", 'Bearer '+Data.getData('Login').TokenResponse.access_token);
				}

				if(ajaxCount == 1){
					KmeSpinner.start();
				}
			},
			success: function(response,statusText,xhr){
				var data = JSON.parse(response);

				if(!ignoreApi.includes(apiName)){
					fnDecryptData(data ,callback);
				}else{
					callback(data);
				}
			},
			error: function (xhr, ajaxOptions, thrownError){
				// error 
				console.log("Error : ", apiName, param, thrownError);
			},
			complete: function(data){
				ajaxCount--;

				if(ajaxCount == 0){
					KmeSpinner.stop();
				}
			}
		});
	}
}

function fnDecryptData(data, callback){
	var arrDec = [	"FirstName","LastName","Phone","Street","Housenumber","PostalCode",
					"City","PreferredDealer","SecondDealer", "Country", "VIN"];

	function makeJson(json){
		$.each(json, function(k, v) {
			if(v == null || v == '' || typeof v == 'number' || typeof v == 'boolean'){
				return true;
			}

			if(typeof v != 'object'){
				if(arrDec.includes(k)){
					var d = dataDecode(v);
					json[k] = d == '' ? v : d
				}
			}else{
				makeJson(v);
			}
		});
	}
	makeJson(data);

	callback(data);
}

/** 
 * @description localStorage 값 추출
 * @see all
 * @param  item
 * @return window.localStorage.getItem(item)
 */
function getStorageItem(item){
	return window.localStorage.getItem(item);
}

/** 
 * @description localStorage 저장
 * @see all
 * @param  item, value
 * @return 
 */
function setStorageItem(item,value){
	window.localStorage.setItem(item,value);
	return window.localStorage.getItem(item);
}

/** 
 * @description localStorage 삭제
 * @see all
 * @param  item
 * @return 
 */
function delStorageItem(item){
	window.localStorage.removeItem(item);
}

function checkServer(){
	targetServer = serverList[Data.get('devMode')][Data.get('serverFlag')];
	Data.set('targetServer', targetServer);
	return targetServer;
}

function fnMergeVehicle(){
	// merge to VehiclesInformation from VehiclesImagesV2
	var vehicleList = Data.getData('VehiclesInformation')
	var vehicleImageList = Data.getData('VehiclesImagesV2');

	$.each(vehicleList.Vehicles, function(vIdx, vVal){
		$.each(vehicleImageList.Vehicles, function(iIdx, iVal){
			if(vVal.VIN == iVal.VIN){
				$.extend(vVal, iVal)
			}
		})
	});
	
	Data.setData('VehiclesInformation', vehicleList);
}

/*
 * Web용 Spinner
 */
var KmeSpinner={
	start:function(_message, _option){
		var  self = this
			,spinnerLeft

		if (_message == null) {
			_message = undefined;
		}

		if ($('.spinner-box').length > 0) {
			return false;
		}
		var  option = typeof _message == 'object' ? _message : _option || {}
			,message = typeof _message == 'string' ? _message : undefined
			,_svg = ''
			,_svgBody
			,platform = navigator.platform;
			
			_svg += '<div class="spinner-wrap">';

			if (option.backlock !== false && platform == 'iOS' && !option.cancelable) {
				_svg += '	<div class="spinner-back trans-parent"></div>';
			}else if (option.backlock !== false) {
				_svg += '	<div class="spinner-back"></div>';
			}

			if(platform != 'Android'){
				_svg += '	<div class="spinner-box ios">';
				_svg += '		<div id="floatingBarsG" ';
				if (platform == 'iOS' && !!message && option.cancelable) {
					_svg += '		class="floatingleft"';
				}
				_svg += '			>';
				_svg += '			<div class="blockG" id="rotateG_01"></div>';
				_svg += '			<div class="blockG" id="rotateG_02"></div>';
				_svg += '			<div class="blockG" id="rotateG_03"></div>';
				_svg += '			<div class="blockG" id="rotateG_04"></div>';
				_svg += '			<div class="blockG" id="rotateG_05"></div>';
				_svg += '			<div class="blockG" id="rotateG_06"></div>';
				_svg += '			<div class="blockG" id="rotateG_07"></div>';
				_svg += '			<div class="blockG" id="rotateG_08"></div>';
				_svg += '			<div class="blockG" id="rotateG_09"></div>';
				_svg += '			<div class="blockG" id="rotateG_10"></div>';
				_svg += '			<div class="blockG" id="rotateG_11"></div>';
				_svg += '			<div class="blockG" id="rotateG_12"></div>';
				_svg += '		</div>';
				if (platform == 'iOS' && option.cancelable) {
					_svg += '		<div class="ios-dialog">';
					_svg += '			<button id="iosDialogClose"></button>';
					_svg += '		</div>';
				}
			}else{
				_svg += '	<div class="spinner-box">';
				_svg += '		<svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">';
				_svg += '			<circle class="path" fill="none" stroke-width="6" stroke="bb162b" stroke-linecap="round" cx="33" cy="33" r="30"></circle>';
				_svg += '		</svg>';
			}
			_svg += '	</div>';
			_svg += '</div>';

			_svgBody = $(_svg);

		if(message != undefined){
			var _m = $("<span><span>").text(message)
			if(platform == 'iOS'){
				if (option.cancelable) {
					_m.addClass('cancelable-title')
				}
				_m.addClass('trans-parent')
			} else {
				_m.addClass('android-title')
			}
			_svgBody.find('.spinner-box').prepend(_m);
		}
		$("body").append(_svgBody);

		spinnerLeft = $('body').width() / 2 - parseInt($('.ios').width(), 10) / 2;
		$('.ios').css('left', spinnerLeft);
		
		$('#iosDialogClose').on('click', function(){
			self.stop();
			M.page.back();
		})
		if (platform == 'iOS' && option.cancelable) {
			$('#iosDialogClose').html(M.locale.localizedString("D1_9"))
		}
	},
	stop:function(_callBack, _param){
		$("body").find(".spinner-wrap").eq(0).remove();

		if(typeof _callBack == "function"){
			
			_callBack(_param);
		}
	}
};


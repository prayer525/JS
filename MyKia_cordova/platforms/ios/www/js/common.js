console.log('commonJs')
// fnGetToken();

/*
$('button').click(function(){
	var param = {
		"Email" : "kmit_rhm@mailinator.com",
		"Password" : "Abc123!@"
	}

	exRHMEncrypt.enc(JSON.stringify(param), fnGoLogin);
})

function fnGoLogin(param){
	console.log("fnGoLogin param : " ,param )
	console.log("after paramReplace param : ", paramReplace(param))
	getApi('Login', paramReplace(param), fnResultLogin)
}

function fnResultLogin(data){
	console.log('data : ' , data)
}

function paramReplace(param){
	return JSON.parse(param.replace(/,,/g, ""));
}
*/
var countryToLanguage = {
	"de-at":"de-AT",
	"fr":"fr-BE",
	"nl-be":"nl-BE",
	"cs":"cs-CZ",
	"de":"de-DE",
	"es":"es-ES",
	"it":"it-IT",
	"pl":"pl-PL",
	"sv":"sv-SE",
	"sv":"sk-SK",
	"en-ie":"en-IE",
	"hu":"hu-HU",
	"fr":"fr-FR",
	"lb":"fr-LU",
}

var Define = {
	EmailTestRegExp:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
}

Number.prototype.to2 = function() { return (this > 9 ? "" : "0")+this; };
Date.MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
Date.DAYS   = ["Sun", "Mon", "Tue", "Wed", "Tur", "Fri", "Sat"];
Date.prototype.getDateString = function(dateFormat) {
     var result = "";
     dateFormat = dateFormat == 8 && "YYYY.MM.DD" ||
     dateFormat == 6 && "hh:mm:ss" ||
     dateFormat || "YYYY.MM.DD hh:mm:ss" ||
     dateFormat || "YYYY-MM-DD hh:mm";
     for (var i = 0; i < dateFormat.length; i++) {
          result += dateFormat.indexOf("YYYY", i) == i ? (i+=3, this.getFullYear()           ) :
          dateFormat.indexOf("YY",   i) == i ? (i+=1, String(this.getFullYear()).substring(2)) :
          dateFormat.indexOf("MMM",  i) == i ? (i+=2, Date.MONTHS[this.getMonth()]           ) :
          dateFormat.indexOf("MM",   i) == i ? (i+=1, (this.getMonth()+1).to2()              ) :
          dateFormat.indexOf("M",    i) == i ? (      this.getMonth()+1                      ) :
          dateFormat.indexOf("DDD",  i) == i ? (i+=2, Date.DAYS[this.getDay()]               ) :
          dateFormat.indexOf("DD",   i) == i ? (i+=1, this.getDate().to2()                   ) :
          dateFormat.indexOf("D"   , i) == i ? (      this.getDate()                         ) :
          dateFormat.indexOf("hh",   i) == i ? (i+=1, this.getHours().to2()                  ) :
          dateFormat.indexOf("h",    i) == i ? (      this.getHours()                        ) :
          dateFormat.indexOf("mm",   i) == i ? (i+=1, this.getMinutes().to2()                ) :
          dateFormat.indexOf("m",    i) == i ? (      this.getMinutes()                      ) :
          dateFormat.indexOf("ss",   i) == i ? (i+=1, this.getSeconds().to2()                ) :
          dateFormat.indexOf("s",    i) == i ? (      this.getSeconds()                      ) :
          (dateFormat.charAt(i));
     }
     
     return result;
};

var GetLangPack = null;

var changeLang = function(){
	var langCode = null;
	var langType = null;
	var _format = null;
	var _date = null;
	GetLangPack = Data.get('Translations');
	
	$('[data-translation-code]').each(function(){
		langCode = $(this).attr('data-translation-code');

		// upperCase, lowerCase 를 위한 변수 
		langType = $(this).attr('data-translation-type');

		if(GetLangPack[langCode] !== undefined && langCode.indexOf('FO')<0){
			if(langType !== undefined && langType == 'upper'){
				$(this).html(GetLangPack[langCode].toUpperCase());
			}else if(langType !== undefined && langType == 'lower'){
				$(this).html(GetLangPack[langCode].toLowerCase());
			}else{
				$(this).html(GetLangPack[langCode]);
			}
		}else if(GetLangPack[langCode] !== undefined && langCode.indexOf('FO')>=0){
			if($(this).attr('data-format-date') == '' || $(this).attr('data-format-date') == null){
				return true;
			}
			
			_format = GetLangPack[langCode];
			_date = ($(this).attr('data-format-date')).split(' ');
			
			if(_date.length > 1){
				$(this).text(moment(_date[0], 'MM/DD/YYYY').format(_format.toUpperCase()) + ' ' + _date[1]);
			}else{
				$(this).text(moment(_date[0], 'MM/DD/YYYY').format(_format.toUpperCase()));
			}
		}
		// code 와 매칭되는 텍스트가 없을 경우 code 값을 보여준다.
		else{
			$(this).html(langCode);
		}
	});
	
	
	$('input[type=text], textarea').each(function(){
		langCode = $(this).attr('data-code')
		$(this).attr('placeholder', GetLangPack[langCode])
	})
}

var i18n = function(code, type){
	// language type 이 있을 경우 type을 추가해준다.
	// language pack 이 null 일 경우 localStorage 에서 불러온다.
	if(GetLangPack == null){
		GetLangPack = Data.get('Translations');
	}

	if(GetLangPack[code] == undefined){
		return code
	}else{
		if(type == 'upper'){
			return '<t data-translation-code="'+code+'" data-translation-type="upper">'+GetLangPack[code].toUpperCase()+'</t>';
		}else if(type == 'lower'){
			return '<t data-translation-code="'+code+'" data-translation-type="lower">'+GetLangPack[code].toLowerCase()+'</t>';
		}else if(type == 'text'){
			return $('<span>'+GetLangPack[code]+'</span>').text();
		}else if(type == 'html'){
			return GetLangPack[code];
		}else{
			return '<t data-translation-code="'+code+'">'+GetLangPack[code]+'</t>';
		}
	}
}

var JsUtil = {
	momentLocaleCode : {
		"de-AT":"de-at",
		"fr-BE":"fr",
		"nl-BE":"nl-be",
		"cs-CZ":"cs",
		"de-DE":"de",
		"es-ES":"es",
		"it-IT":"it",
		"pl-PL":"pl",
		"sv-SE":"sv",
		"sk-SK":"sv",
		"en-IE":"en-ie",
		"hu-HU":"hu",
		"fr-FR":"fr",
		"fr-LU":"lb"
	},
	trMessageCode:function(code){
		var defined={
			"LOGIN-ERR-0":"C1_8",
			"LOGIN-ERR-1":"C1_9",
			"LOGIN-ERR-2":"S1_5",
			"LOGIN-OK-1":"V1_5",
			"LOGIN-OK-2":"V1_15",
			"LOGIN-OK-5":"V1_5",
			"PARAM-CUSTOMERID":"Y2_19",
			"PARAM-SAPCODE":"Y2_20"
		}

		return defined[code];
	},
	addComma:function(val){
		var marketId = Data.getData('UserInformation').MarketId
		if(marketId == 'KMFR' || marketId == 'KMSE')
			return (val + '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
		else if(marketId == 'KMDE')
			return (val + '').replace(/(\d)(?=(\d{3})+$)/g, '$1.');
		else
			return (val + '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
	},
	fnStringFomatter:function(txt, data){
		for(var i in data){
			txt=txt.replace("%@",data[i]);
		}
		return txt;
	},
	fnMomentDate:function(_date, _format){
		var locale = JsUtil.momentLocaleCode[Data.getData('UserInformation').CultureCode];

		return moment(_date, 'YYYYMMDD').locale(locale).format(_format);
	},
	mfnNumberOnlyFilter:function(val){
	 	return val==undefined?"":val.replace(Define.NumberOnlyRegExp,"");
	},
	prependZeros:function (str, len) {
	    if(typeof str === 'number' || Number(str)){
		    str = str.toString();
		    return (len - str.length > 0) ? new Array(len + 1 - str.length).join('0') + str: str;
		}
		else{
		    for(var i = 0,spl = str.split(' '); i < spl.length; spl[i] = (Number(spl[i])&& spl[i].length < len)?PrependZeros(spl[i],len):spl[i],str = (i == spl.length -1)?spl.join(' '):str,i++);
		    return str;
		}
	},
	alert:function(txt){
		// Must find plugin
		alert(txt);
	},
	getVideo:function(itemUrl){	// Youtube UR parsing
		var videoId,
			list,
			videoUrl = "http://www.youtube.com/embed/",
			thumbnailUrl;
		var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	    var match = itemUrl.match(regExp);
	    if (match&&match[7].length==11){
	    	videoId = match[7];
	    }
	    
	    videoUrl += videoId + "?origin=http://example.com";
		thumbnailUrl = "http://img.youtube.com/vi/"+videoId+"/0.jpg";
		
		if(itemUrl.match("list=")){
			 var splitArray = itemUrl.split("list=");
			 if(splitArray[1]){
				 if(splitArray[1].match("\&")){
					var listArray = splitArray[1].split("\&");
					list = listArray[0];
					videoUrl += "&list="+list;
				}else{
					list = splitArray[1];
					videoUrl += "&list="+list;
				}
			}
		 }
		return {"videoId":videoId, "videoUrl":videoUrl,"thumbnailUrl":thumbnailUrl, "list":list};
	},
	objSize:function(obj){
	    var size = 0, key;
	    for (key in obj) {
	        if (key != '' && key != null){
	        	size++;
	        } 
	    }
	    return size;
	}
}
/******************************************************************************************
function : Native Direct Call
******************************************************************************************/
var directCall = function(num){
	var number = '+'+num;

	function onSuccessCall(result){
	  console.log("Success:"+result);
	}

	function onErrorCall(result) {
	  console.log("Error:"+result);
	}
	
	window.plugins.CallNumber.callNumber(onSuccessCall, onErrorCall, number, true);
}

// document.addEventListener("deviceready", onDeviceReady, false);

// function onDeviceReady() {
//   window.plugins.sim.getSimInfo(successCallback, errorCallback);
// }

// function successCallback(result) {
//   console.log("getSim result : ", result);
// }

// function errorCallback(error) {
//   console.log("getSim error : ", error);
// }

/******************************************************************************************
function : Google Map
******************************************************************************************/
function fnGoogleMap(target, param){
	//var uluru = {lat: -25.363, lng: 131.044};
	var markers = [];
	var mapOption = {
		zoom:17,
		center:param.pos
	}
	var controllerOption = {
		zoomControl: false,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		rotateControl: false,
		fullscreenControl: true,
		myLocationEnabled:true
	}
	

	$.extend(mapOption, controllerOption);
    this.map = new google.maps.Map(document.getElementById(target), mapOption);
    var marker = new google.maps.Marker({
      position: param.pos,
      map: this.map
    });

    this.addMarker=function(_position,callback){
		var option=markerOptions={
			map:this.map,
			draggable:false,
			position:fnChangePos(_position),
			icon:"../img/imap_maker.png"
		};

		var mark=new google.maps.Marker(option);
		markers.push(mark);
		google.maps.event.addListener(mark, 'click', callback);
	};

    this.clearMarker = function(){
    	for(var i in markers){
			markers[i].setMap(null);
		}
		markers=[];
    }

    this.changeMarkerImg = function(idx){
    	for(var i in markers){			
			if(i == idx){
				markers[i].setIcon('../img/imap_maker_active.png');
			}else{
				markers[i].setIcon('../img/imap_maker.png');
			}
		}
    }

    this.setCenter = function(pos){
		this.map.setCenter(pos);
    }

    this.clusterMap=function(){
		var markerCluster = new MarkerClusterer(this.map, markers,
            {
            	styles:[{
            		url:"../img/imap_maker1.png",
            		width:53,
            		height:52,
            		textColor:"#ffffff",
            		textSize:15
            	}],
            	imagePath: '../img/imap_maker'
        	});
	}

	this.getMap=function(){
		return this.map;
	}

    function fnChangePos(_pos){
		return new google.maps.LatLng(_pos.coords.latitude,_pos.coords.longitude);
	}
}
   
/******************************************************************************************
function : Data Encrypt
******************************************************************************************/
function dataEncode(message){
	if(localFlag){
		return message;
	}else{
		var _keyset = Data.getData('Key');
		var encrypted = CryptoJS.AES.encrypt(message, _keyset.key, { iv: _keyset.iv});
		return encrypted.toString();
	}
}

/******************************************************************************************
function : Data Decrypt
******************************************************************************************/
function dataDecode(encrypted){
	var _keyset = Data.getData('Key');
	var decrypted = CryptoJS.AES.decrypt(encrypted,_keyset.key,{iv:_keyset.iv}); 
	return decrypted.toString(CryptoJS.enc.Utf8);
}

/******************************************************************************************
function : Cordova Inapp Browser
******************************************************************************************/
$(document).on('click', '.open-inapp', function(){
	var _target = $(this).data('href');
	var _option = $(this).data('option');
	var _length = 0;
	var ref = getStorageItem("ref");

	if(ref == null){
		ref = {};
	}else{
		ref = JSON.parse(ref)
	}

	_length = Object.keys(ref).length;
	
	ref[_length] = cordova.InAppBrowser.open(_target, "_blank", _option);

	setStorageItem("ref", JSON.stringify(ref));

	return false;
});

/******************************************************************************************
function : page transition
******************************************************************************************/
$(document).on('click', '[data-href]', function(){
	event.preventDefault();
	var _href = $(this).data('href') + '.html';
	var _translation = $(this).data('trans')

	if(_translation == undefined){
		_translation = 'slide';
	}
	
	$.mobile.changePage( _href, { transition: _translation} );
});

/******************************************************************************************
function : page history back
******************************************************************************************/
$(document).on('click', '.header .back, .header .back-white', function(){
	window.history.back(-1);
});

/******************************************************************************************
function : used in page
******************************************************************************************/
var fnList = {};
$(document).on( "pagecontainershow", function ( event, ui ) {
	
	var activePage = $($.mobile.pageContainer.pagecontainer( "getActivePage" ) ).attr('id');

	changeLang();

	console.log('activePage : ' , activePage)

	if(fnList[activePage] !== undefined){
		console.log('activePage : ' , activePage)
		var a = fnList[activePage]()

		a = null;
	}
}).on('pagebeforechange', function(e){
	Data.put();
});

/******************************************************************************************
function : LoginManager for My Appointment
******************************************************************************************/
var LoginManager = {
	setSyncDate:function(_date){
		Data.setData('syncDate', _date)
	},
	getSyncDate:function(){
		return Data.getData('syncDate')
	},
	isLogin:function(){
		if(Data.getData('Login') != ''){
			return true;
		}else{
			return false;
		}
	},
	getSecondDealerInfo:function(){
		var dealer = Data.getData('SecondDealerInformation')

		if(dealer == ''){
			dealer = {}
		}

		return dealer;
	},
	getDealerInfo:function(){
		return Data.getData('DealerInformation');
	},
	getVehiclesInfo:function(){
		return Data.getData('VehiclesInformation');
	},
	getBreakDownCall:function(){
		return Data.getData('MarketInformation');
	},
	getLoginInfo:function(){
		return Data.getData('Login');
	},
	getSelectedVehiclesInfo:function(){
		return Data.getData('selectedVehicle');
	},
	getPushInfo:function(){
		var data = {
			'IsHowToVideoPush'	:true,
			'IsNewsPush'		:true,
			'IsSalesNProPush'	:true,
			'IsVideoPush'		:true
		}

		return data;
	},
	getDetailsInfo:function(){
		return Data.getData('UserInformation')
	},
	getSelectedVehiclesIndex:function(){
		return Data.getData('selectedVehicleIndex')
	},
	getRecallInformation:function(){
		return Data.getData('RecallInformation');
	}
}

var Dialog = {
	confirm:function(text, callBack, title, buttonGroup){
		if(navigator.notification != undefined){
			navigator.notification.confirm(text, callBack, title, buttonGroup);
		}else{
			if(confirm(text)){
				callBack();
			}
		}
	}
}

window.changeLang = changeLang;
window.i18n = i18n;
window.JsUtil = JsUtil;
window.fnList = fnList;
window.LoginManager = LoginManager;
window.Dialog = Dialog;
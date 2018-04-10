var exRHMEncrypt = {
	data:{},
	fnc:null,
	enc:function(k,c){
		exRHMEncrypt.fnc = c;
		cordova.exec(exRHMEncrypt.returnValue, function(err) {
	        callback('eneryption error : ' , err);
	    }, "aesEncrypt", "aesEncrypt", [k]);
	},
	dec:function(d,k,c){
		exRHMEncrypt.data = d;
		exRHMEncrypt.fnc = c;
		cordova.exec(exRHMEncrypt.returnValue, function(err) {
	        callback('eneryption error : ' , err);
	    }, "aesEncrypt", "aesDecrypt", [k]);
	},
	set:function(k, c){
		exRHMEncrypt.fnc = c
		cordova.exec(exRHMEncrypt.returnSet, function(err) {
	        callback('eneryption error : ' , err);
	    }, "aesEncrypt", "setKeyIv", [k]);
	},
	returnValue:function(d){
		var param = JSON.parse(d.replace(/,,/g,''));
		param = $.extend(exRHMEncrypt.data, param);
		exRHMEncrypt.fnc(param);
	},
	returnSet:function(d){
		var param = JSON.parse(d);
		exRHMEncrypt.fnc(param);
	}
}

window.exRHMEncrypt = exRHMEncrypt;
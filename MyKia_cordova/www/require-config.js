/**
  *
 * @ Develop Desc 		: 1. requirejs 의존성 설정
 * @ Author 			: AEUE0256
 * @ Version 			: Release 1.0
 * @ Develop Date 		: 8 JAN 2016
 * @ Change History 	: 
 */

/**
 * requirejs 설정
 * 모듈 의존성 정의을 한다.
 */
(function(){
	'use strict';
	require.config({
		waitSeconds: 0,
		paths: {
			 'cordova'			: ['cordova'],
			 'jquery'			: ['bower_components/jquery/dist/jquery_1.8.3.min'],
			 'jquery-mobile'	: ['bower_components/jquery-mobile/js/jquery.mobile_1.4.5'],
			 'jquery-modal'		: ['bower_components/jquery.modal/js/jquery.modal'],
			 'Crypto'			: ['bower_components/crypto-js/core-min'],
			 'CryptoJS'			: ['bower_components/crypto-js/aes'],
			 'moment'			: ['bower_components/moment/min/moment-with-locales.min'],
			 'swipe'			: ['bower_components/swipe/jquery.touchSlider'],
			 'service'			: ['js/service'],
			 'common'			: ['js/common'],
			 'index'			: ['js/pages/index'],
			 'select_country'	: ['js/pages/select_country'],
			 'legal_notice'		: ['js/pages/legal_notice'],
			 'login'			: ['js/pages/login'],
			 'loading'			: ['js/pages/loading'],
			 'main'				: ['js/pages/main'],
			 'my_profile'		: ['js/pages/my_profile']
		},
		shim: {
			'service'			: ['cordova', 'jquery', 'jquery-mobile'],
			'jquery-modal'		: ['jquery'],
			'swipe'				: ['jquery'],
			'CryptoJS'			: ['Crypto']
		},
		baseUrl: '../',
		urlArgs: "bust=" + (new Date()).getTime() // cache manage,
	});
	require(['cordova', 'jquery', 'jquery-mobile', 'jquery-modal'], function(){
		require(['cordova', 'moment', 'Crypto', 'CryptoJS'], function(cordova, moment, Crypto, CryptoJS){
			window.moment = moment;
			window.CryptoJS = CryptoJS;
			require(['swipe', 'service', 'common'], function(){
				require(['index', 'select_country', 'legal_notice', 'login', 'loading', 'main', 'my_profile']);
			})
		})
		
	});
	require.onError = function (err) {
		if (err.requireType === 'timeout') {
//			console.log("error: "+err);
		} 
		else {
			console.log("err : ", err)
			throw err;
		}   
	};
}).call(this);

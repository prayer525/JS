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
 /*
 GoogleApiKey:"AIzaSyCS7tR4y3XcQunvKg2332lZrAOXp10ECEE",
	GoogleApiKey:"AIzaSyAVUvQeJGvCGxANhLL8BghV3S0kzttgG8s",
 */
(function(){
	'use strict';
	require.config({
		waitSeconds: 0,
		paths: {
			 'cordova'					: ['cordova'],
			 'jquery'					: ['bower_components/jquery/dist/jquery_1.8.3.min'],
			 'jquery-mobile'			: ['bower_components/jquery-mobile/js/jquery.mobile_1.4.5'],
			 'jquery-modal'				: ['bower_components/jquery.modal/js/jquery.modal'],
			 'Crypto'					: ['bower_components/crypto-js/core-min'],
			 'CryptoJS'					: ['bower_components/crypto-js/aes'],
			 'moment'					: ['bower_components/moment/min/moment-with-locales.min'],
			 'swipe'					: ['bower_components/swipe/jquery.touchSlider'],
			 'Swiper'					: ['bower_components/swiper/dist/js/swiper.min'],
			 'mapCluster'				: ['https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer'],
			 'googleMap'				: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCS7tR4y3XcQunvKg2332lZrAOXp10ECEE&sensor=false&libraries=places&v=3.28'],
			 'youtube'					: ['js/youtube'],
			 'service'					: ['js/service'],
			 'common'					: ['js/common'],
			 'index'					: ['js/pages/index'],
			 'select_country'			: ['js/pages/select_country'],
			 'legal_notice'				: ['js/pages/legal_notice'],
			 'login'					: ['js/pages/login'],
			 'loading'					: ['js/pages/loading'],
			 'main'						: ['js/pages/main'],
			 'my_vehicle'				: ['js/pages/my_vehicle'],
			 'my_profile'				: ['js/pages/my_profile'],
			 'dashboard_indicator'		: ['js/pages/dashboard_indicator'],
			 'dashboard_indicator_view'	: ['js/pages/dashboard_indicator_view'],
			 'how_to_video'				: ['js/pages/how_to_video'],
			 'maintenance_schedule'		: ['js/pages/maintenance_schedule'],
			 'contact_us'				: ['js/pages/contact_us'],
			 'breakdown_assistance'		: ['js/pages/breakdown_assistance'],
			 'emergency_call'			: ['js/pages/emergency_call'],
			 'mykia_video'				: ['js/pages/mykia_video'],
			 'brochure_request'			: ['js/pages/brochure_request'],
			 'news_list'				: ['js/pages/news_list'],
			 'news_detail'				: ['js/pages/news_detail'],
			 'promotion_list'			: ['js/pages/promotion_list'],
			 'mykia_dealer'				: ['js/pages/mykia_dealer'],
			 'dealer_locator'			: ['js/pages/dealer_locator'],
			 'dealer_detail'			: ['js/pages/dealer_detail'],
			 //'parked_vehicle'			: ['js/pages/parked_vehicle'],
			 'setting'					: ['js/pages/setting'],
			 'language'					: ['js/pages/language'],
			 'license'					: ['js/pages/license'],
			 //'manuals'					: ['js/pages/manuals'],
			 'localData'				: ['js/local_data'],
		},
		shim: {
			'service'			: ['cordova', 'jquery', 'jquery-mobile'],
			'jquery-modal'		: ['jquery'],
			'swipe'				: ['jquery'],
			'common'			: ['googleMap', 'mapCluster']
		},
		baseUrl: '../',
		urlArgs: "bust=" + (new Date()).getTime() // cache manage,
	});
	require(['cordova', 'jquery', 'jquery-mobile', 'jquery-modal'], function(cordova){
		require(['moment', 'Crypto', 'CryptoJS'], function(moment, Crypto, CryptoJS){
			window.moment = moment;

			require(['Swiper', 'swipe', 'youtube', 'googleMap', 'mapCluster', 'localData', 'service', 'common'], function(Swiper){
				window.localData = localData;
				window.Swiper = Swiper;
				require(['select_country', 'legal_notice', 'login', 'loading', 'main', 'my_vehicle', 'my_profile', 
					'dashboard_indicator', 'dashboard_indicator_view', 'how_to_video', 'maintenance_schedule', 'contact_us',
					'breakdown_assistance', 'emergency_call', 'mykia_video', 'brochure_request', 'news_list', 'news_detail',
					'promotion_list', 'mykia_dealer', 'setting', 'language', 'license', 'dealer_locator', 'dealer_detail',
					 'index']);
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

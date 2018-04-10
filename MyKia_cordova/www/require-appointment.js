/**
 * myKiaApp AMD (Asynchronouse Module Definition) setting
 *
 * @ Develop Desc 		: 1. set file path for Karma spec
 *						  2. set dependency requirejs 
 *						  3. angular bootstrap setting
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

/**
 * set requirejs
 * defining the module dependencies
 * requirejs 설정
 * 모듈 의존성 정의을 한다.
 */
(function(){

'use strict';
var locationHistory = [];
window.locationHistory = locationHistory;

require.config({
	paths: {
		'angular'				: ['bower_components/angular/angular.min']
		,'angularMocks'			: ['bower_components/angular-mocks/angular-mocks']
		,'ui.router'			: ['bower_components/angular-ui-router/release/angular-ui-router.min']
		,'ui.select'			: ['bower_components/angular-ui-select/dist/select.min']
		,'cluster'				: ['https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer']
		,'gmap'					: ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCS7tR4y3XcQunvKg2332lZrAOXp10ECEE&sensor=false&libraries=places&v=3.28']
		,'ngDialog' 			: ['bower_components/ng-dialog/js/ngDialog.min']
		,'jquery'				: ['bower_components/jquery/dist/jquery.min']
		,'scrollTo'				: ['bower_components/jquery.scrollTo/jquery.scrollTo.min']
		,'moment'				: ['bower_components/moment/min/moment-with-locales.min']
		,'underscore'			: ['bower_components/underscore/underscore-min']
		,'accounting'			: ['bower_components/accounting.js/accounting.min']
		,'rzslider'				: ['bower_components/angularjs-slider/dist/rzslider.min']
		,'serviceJs'			: ['js/service']
		,'common'				: ['js/common']
	},
	shim: {
		 'angular': {exports: 'angular'}
		,'angularMocks': {
			deps:['angular'],
			'exports':'angular.mock'
		}
		,'ui.router': ['angular']
		,'gmap': ['cluster']
		,'scrollTo': ['jquery']
		,'ui.select': ['angular']
		,'rzslider': ['jquery', 'angular']
		,'serviceJs':['jquery', 'gmap']
		,'common'	:['jquery', 'gmap']
	},
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
	baseUrl: window.__karma__ ? '/base/www' : '../',
	waitSeconds: 0,
	catchError: true
	//urlArgs: "bust=" + (new Date()).getTime() // cache manage,
});

requirejs.onError = function (err) {
    console.log(err)
};

/**
 * declare angularjs bootstrap 
 */
require([
	'angular'
	,'gmap'
	,'app'
	,'serviceJs'
	,'common'
], function(angular){
	angular.element().ready(function(){
		angular.bootstrap(document, ['myKiaApp']);
	});
});

}).call(this);

/**
 * Quote Main Module 
 *
 * @ Develop Desc 		: Quote 모듈
 *						  		Model, 
 *							  	Date Picker, 
 *							  	Confirmation, 
 *							  	Campaign Detail 로 구성
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

(function(){

'use strict';

define([
	 'angular'
], function(angular) {

	/**
	 * myKiaApp.quote 모듈 정의
	 * @ ui.router 					: angular.route 에서 제공하는 module
	 */
	var quote = angular.module('myKiaApp.quote', [
										 'ui.router'
									]);

	/**
	 * MyKia Quote 모듈에 Route Provider 설정
	 */
	quote.config([
				 '$stateProvider'
				,'TEMPLATE_STRING'
				,'ROUTE_URL'
				,'CONTROLLER_STRING'
				,routeFn
			]);

	/**
	 * Route Provider 에 모듈을 주입한다.
	 * @ $stateProvider 	: angular.route 에서 제공하는 $stateProvider
	 * @ TEMPLATE_STRING 	: Template URL을 정의 상수
	 * @ ROUTE_URL			: Route URL을 정의 상수
	 * @ CONTROLLER_STRING 	: Controller 정의 상수
	 */
	function routeFn($stateProvider, TEMPLATE_STRING, ROUTE_URL, CONTROLLER_STRING) {
		
		$stateProvider

			// Quote main > Quote Model 선택
			.state(ROUTE_URL.QUOTE_MODEL, {
				 url: ROUTE_URL.QUOTE_MODEL
				,templateUrl: TEMPLATE_STRING.QUOTE_MODEL
				,controller: CONTROLLER_STRING.QUOTE_MODEL
			})

			// Quote main > Date picker
			.state(ROUTE_URL.QUOTE_DATE_PICKER, {
				 url: ROUTE_URL.QUOTE_DATE_PICKER
				,templateUrl: TEMPLATE_STRING.DATE_PICKER
				,controller: CONTROLLER_STRING.QUOTE_DATE_PICKER
			})

			// Quote main > Confirmation
			.state(ROUTE_URL.QUOTE_CONFIRMATION, {
				 url: ROUTE_URL.QUOTE_CONFIRMATION
				,templateUrl: TEMPLATE_STRING.CONFIRMATION
				,controller: CONTROLLER_STRING.QUOTE_CONFIRMATION
			})
	}

	return quote;
});

})();





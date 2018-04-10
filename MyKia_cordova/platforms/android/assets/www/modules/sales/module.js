/**
 * Showroom Sales Module 
 *
 * @ Develop Desc 		: Sales 모듈
 *						  		Meet Sales Advisor, 
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
	,'rzslider'
], function(angular) {

	/**
	 * myKiaApp.sales 모듈 정의
	 * @ ui.router 					: angular.route 에서 제공하는 module
	 * @ 
	 */
	var sales = angular.module('myKiaApp.sales', [
										 'ui.router'
										,'rzModule'
									]);

	/**
	 * Sales 모듈에 Route Provider 설정
	 */
	sales.config([
				 '$stateProvider'
				,'TEMPLATE_STRING'
				,'ROUTE_URL'
				,'CONTROLLER_STRING'
				,routeFn
			]);

	/**
	 * Route Provider 에 모듈을 주입한다.
	 * @ $stateProvider 	: angular.ui-route 에서 제공하는 $stateProvider
	 * @ TEMPLATE_STRING 	: Template URL을 정의 상수
	 * @ ROUTE_URL			: Route URL을 정의 상수
	 * @ CONTROLLER_STRING 	: Controller 정의 상수
	 */
	function routeFn($stateProvider, TEMPLATE_STRING, ROUTE_URL, CONTROLLER_STRING) {
		
		$stateProvider

			// Sales main > Meet A Sales Advisor
			.state(ROUTE_URL.SALES_ADVISOR, {
				 url: ROUTE_URL.SALES_ADVISOR
				,templateUrl: TEMPLATE_STRING.SALES_ADVISOR
				,controller: CONTROLLER_STRING.SALES_ADVISOR
			})

			// Sales Date Picker
			.state(ROUTE_URL.SALES_DATE_PICKER, {
				 url: ROUTE_URL.SALES_DATE_PICKER
				,templateUrl: TEMPLATE_STRING.DATE_PICKER
				,controller: CONTROLLER_STRING.SALES_DATE_PICKER
			})

			// sales Confirmation
			.state(ROUTE_URL.SALES_CONFIRMATION, {
				 url: ROUTE_URL.SALES_CONFIRMATION
				,templateUrl: TEMPLATE_STRING.CONFIRMATION
				,controller: CONTROLLER_STRING.SALES_CONFIRMATION
			})
	}

	return sales;
});

})();





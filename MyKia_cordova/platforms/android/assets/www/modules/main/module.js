/**
 * My Appointments Main Module 
 *
 * @ Develop Desc 		: Appointments Main 모듈
 *						  		Appointments Main, 
 *						 		Appointments Detail, 
 *						 		Campaign Detail 로 구성
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
	,'services/config'
], function(angular) {

	/**
	 * myKiaApp.appointments 모듈 정의
	 * @ ui.router 					: angular.ui-route 에서 제공하는 module
	 * @ 
	 */
	var appointments = angular.module('myKiaApp.appointments', [
										 'ui.router'
										,'myKiaApp.constants'
										,'myKiaApp.services'
									]);

	/**
	 * MyKia Appointments 모듈에 Route Provider 설정
	 */
	appointments.config([
					 '$stateProvider'
					,'TEMPLATE_STRING'
					,'ROUTE_URL'
					,'CONTROLLER_STRING'
					,routeFn
				]);

	/**
	 * Route Provider 설정
	 * @ $stateProvider 	: angular.ui-route 에서 제공하는 $stateProvider
	 * @ TEMPLATE_STRING 	: Template URL을 정의 상수
	 * @ ROUTE_URL			: Route URL을 정의 상수
	 * @ CONTROLLER_STRING 	: Controller 정의 상수
	 */
	function routeFn($stateProvider, TEMPLATE_STRING, ROUTE_URL, CONTROLLER_STRING) {
		
		$stateProvider

			// appointments main
			.state(ROUTE_URL.MAIN, {
				 url: ROUTE_URL.MAIN
				,templateUrl: TEMPLATE_STRING.MAIN
				,controller: CONTROLLER_STRING.MAIN
			})

			// appointments > detail 
			.state(ROUTE_URL.MAIN_DETAIL, {
				 url: ROUTE_URL.MAIN_DETAIL
				,templateUrl: TEMPLATE_STRING.MAIN_DETAIL
				,controller: CONTROLLER_STRING.MAIN_DETAIL
				,params: {
					appointmentId: null
				}
			})

			// appointments > contact
			.state(ROUTE_URL.MAIN_CONTACT, {
				 url: ROUTE_URL.MAIN_CONTACT
				,templateUrl: TEMPLATE_STRING.CONTACT
				,controller: CONTROLLER_STRING.MAIN_CONTACT
			})

	}

	return appointments;
});

})();





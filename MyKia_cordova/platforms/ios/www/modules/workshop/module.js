/**
 * Workshop Main Module 
 *
 * @ Develop Desc 		: Workshop 모듈
 *						  		Workshop, 
 *						  		Appointment, 
 *						  		Not Available, 
 *							  	Date Picker, 
 *							  	Confirmation, 
 *							  	Campaign Detail, 
 *						  		Dealer List, 
 *						  		Dealer Detail 로 구성
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
	,'ngDialog'
	,'services/service'
], function(angular) {

	/**
	 * myKiaApp.workshop 모듈 정의
	 * @ ui.router 					: angular.route 에서 제공하는 module
	 * @ 
	 */
	var workshop = angular.module('myKiaApp.workshop', [
										 'ui.router'
										,'ngDialog'
									]);

	/**
	 * Workshop 모듈에 Route Provider 설정
	 */
	workshop.config([
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

			// Workshop > main
			.state(ROUTE_URL.WORKSHOP, {
				 url: ROUTE_URL.WORKSHOP
				,templateUrl: TEMPLATE_STRING.WORKSHOP
				,controller: CONTROLLER_STRING.WORKSHOP
			})

			// Workshop > Appointments
			.state(ROUTE_URL.WORKSHOP_APPOINTMENT, {
				 url: ROUTE_URL.WORKSHOP_APPOINTMENT
				,templateUrl: TEMPLATE_STRING.WORKSHOP_APPOINTMENT
				,controller: CONTROLLER_STRING.WORKSHOP_APPOINTMENT
			})

			// Workshop > DatePicker
			.state(ROUTE_URL.WORKSHOP_DATE_PICKER, {
				 url: ROUTE_URL.WORKSHOP_DATE_PICKER
				,templateUrl: TEMPLATE_STRING.WORKSHOP_DATE_PICKER
				,controller: CONTROLLER_STRING.WORKSHOP_DATE_PICKER
			})

			// Workshop > Confirmation
			.state(ROUTE_URL.WORKSHOP_CONFIRMATION, {
				 url: ROUTE_URL.WORKSHOP_CONFIRMATION
				,templateUrl: TEMPLATE_STRING.WORKSHOP_CONFIRMATION
				,controller: CONTROLLER_STRING.WORKSHOP_CONFIRMATION
			})

			// Workshop > Vehicle
			.state(ROUTE_URL.WORKSHOP_VEHICLE, {
				 url: ROUTE_URL.WORKSHOP_VEHICLE
				,templateUrl: TEMPLATE_STRING.WORKSHOP_VEHICLE
				,controller: CONTROLLER_STRING.WORKSHOP_VEHICLE
				,params: {
					 removeStack: null
				}
			})
	}

	return workshop;
});

})();





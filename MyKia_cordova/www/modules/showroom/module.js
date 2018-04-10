/**
 * Showroom > TestDrive Module 
 *
 * @ Develop Desc 		: Showroom > TestDrive 모듈
 *						  		TestDrive, 
 *						  		Drive List, 
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
], function(angular) {

	/**
	 * myKiaApp.showroom 모듈 정의
	 * @ ui.router 					: angular.route 에서 제공하는 module
	 */
	var showroom = angular.module('myKiaApp.showroom', [
												 'ui.router'
											]);

	/**
	 * MyKia showroom 모듈에 Route Provider 설정
	 */
	showroom.config([
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

			// showroom main
			.state(ROUTE_URL.SHOWROOM, {
				 url: ROUTE_URL.SHOWROOM
				,templateUrl: TEMPLATE_STRING.SHOWROOM
				,controller: CONTROLLER_STRING.SHOWROOM
			})

			// showroom main > Test Drive > Drive List
			.state(ROUTE_URL.SHOWROOM_DRIVE_LIST, {
				 url: ROUTE_URL.SHOWROOM_DRIVE_LIST
				,templateUrl: TEMPLATE_STRING.DRIVE_LIST
				,controller: CONTROLLER_STRING.SHOWROOM_DRIVE_LIST
			})

			// showroom main > Test Drive > Date Picker
			.state(ROUTE_URL.SHOWROOM_DATE_PICKER, {
				 url: ROUTE_URL.SHOWROOM_DATE_PICKER
				,templateUrl: TEMPLATE_STRING.DATE_PICKER
				,controller: CONTROLLER_STRING.SHOWROOM_DATE_PICKER
			})

			// showroom main > Test Drive > Confirmation
			.state(ROUTE_URL.SHOWROOM_CONFIRMATION, {
				 url: ROUTE_URL.SHOWROOM_CONFIRMATION
				,templateUrl: TEMPLATE_STRING.CONFIRMATION
				,controller: CONTROLLER_STRING.SHOWROOM_CONFIRMATION
			})

			// showroom main > Dealer List
			.state(ROUTE_URL.SHOWROOM_DEALER_LIST, {
				 url: ROUTE_URL.SHOWROOM_DEALER_LIST
				,templateUrl: TEMPLATE_STRING.DEALER_LIST
				,controller: CONTROLLER_STRING.SHOWROOM_DEALER_LIST
				,params: {
					 dealerType: null
					,removeStack: null
				}
			})

			// showroom main > Dealer Detail
			.state(ROUTE_URL.SHOWROOM_DEALER_DETAIL, {
				 url: ROUTE_URL.SHOWROOM_DEALER_DETAIL
				,templateUrl: TEMPLATE_STRING.DEALER_DETAIL
				,controller: CONTROLLER_STRING.SHOWROOM_DEALER_DETAIL
				,params: {
					 dealerSapCode: null
					,removeStack: null
					,pageTitle: null
				}
			})

			// showroom main > Dealer Search
			.state(ROUTE_URL.SHOWROOM_DEALER_SEARCH, {
				 url: ROUTE_URL.SHOWROOM_DEALER_SEARCH
				,templateUrl: TEMPLATE_STRING.DEALER_SEARCH
				,controller: CONTROLLER_STRING.SHOWROOM_DEALER_SEARCH
				,params: {
					 dealerType: null,
					 removeStack: null
				}
			})
	}

	return showroom;
});

})();





/**
 * myKiaApp.constants
 *
 * @ Develop Desc 		: config 및 상수를 정의하는 전역 모듈
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
	,'ui.router'
], function(angular) {

	/**
	 * angular 상수 module 선언
	 * module 명							: myKiaApp.constants
	 * @ ui.router						: angular.route 에서 제공하는 module
	 */
	var configs = angular.module('myKiaApp.constants', [
												 'ui.router'
											]);

	/**
	 * $Log 활성/비활성 한다. (angular에서 제공하는 $log)
	 */
	configs.config(function($logProvider){
		$logProvider.debugEnabled(true);
	});
	

	/**
	 * DevMode
	 * @param true 	: use a virtual data
	 * @param false : use a real data from server
	 * @param true 	: 서버에 접속하지 않고, 가상데이터를 사용한다.
	 * @param false : 서버에 접속하여 실제 데이터를 가져온다.
	 */
	configs.value('devMode', function(){
		return false;
	});

	configs.value('device', function(){
		return false;
	});

	/**
	 * cacheLifeTime
	 * @param it sets time for keeping cache data network (단위: 분)
	 * keep cached data for specified period of time and delete cached data over time
	 * @param 네트워크 캐시 데이터를 보유하는 시간을 설정한다. (단위: 분)
	 * 설정한 시간동안 네트워크 캐시를 보관하고, 시간이 지나면 캐시를 삭제한다.
	 */
	configs.value('cacheLifeTime', function(){
		return 10;
	});

	/**
	 * manage a stack
	 * Stack 관리
	 */
	configs.run(function($rootScope, $location) {
		$rootScope.$on('$stateChangeSuccess', function() {
			//locationHistory.push($location.$$path);
		});
	})

	/**
	 * global CONSTANT setting
	 * CONSTANT 상수 설정
	 * 전역 CONSTANT 상수 정의한다.
	 */
	configs.constant('CONSTANT', {
		// theme for back button on the top
		// 상단 타이틀 좌측 Back 버튼 테마
		 THEME_NAVI_LEFT_NONE 	: 0
		,THEME_NAVI_LEFT_BACK 	: 1
		,THEME_NAVI_LEFT_HOME 	: 2

		// theme for option button on the top
		// 상단 타이틀 우측 옵션 버튼 테마
		,THEME_NAVI_RIGHT_NONE 	: 0

		// Showroom > Sales > Meet A Sales Advisor Title
		,SALES_MEETING_SUBJECT_OTHER 			: '0'
		,SALES_MEETING_SUBJECT_FINANCE 			: '1'
		,SALES_MEETING_SUBJECT_TRADE_IN 		: '2'
		,SALES_MEETING_SUBJECT_FLEET_BUSINESS 	: '3'
		,SALES_MEETING_SUBJECT_BUY_USED_KIA 	: '5'

		// selection showroom category
		// SHOWROOM 카테고리 선택
		,SHOWROOM_TEST_DRIVE					: 0
		,SHOWROOM_SALES 						: 1
		,SHOWROOM_QUOTE 						: 2

		// selection workshop appoinment category
		// WORKSHOP APPOINTMENT 카테고리 선택
		,WORKSHOP_APPOINTMENT_MAINTENANCE_ROUTINE	: 0
		,WORKSHOP_APPOINTMENT_REPAIR 				: 1
		,WORKSHOP_APPOINTMENT_MAINTENANCE_SERVICE 	: 2
		,WORKSHOP_APPOINTMENT_OTHER 				: 3

		// return workshop available market list
		// move to contact screen other markets except the list below 
		// Workshop 신청가능한 Market 리스트를 반환한다.
	 	// 아래 Market을 제외한 다른 Market은 Main > Contact로 진입해야함
		,WORKSHOP_AVAILABLE_LIST 				: ['KMAT', 'KMES', 'KMFR', 'KMIT']

		// countries that only showroom menu
		// My Appointments에 Showroom 메뉴만 보여야 하는 국가
		,APPOINTMENTS_MENU_DIFF 				: [ 'KMSK', 'KMPL', 'KMCZ', 'KMHU', 'KMSE']

		,DEALER_TYPE_SALES 						: 1
		,DEALER_TYPE_SERVICE 					: 2
		,DEALER_TYPE_SALES_SERVICE 				: 3

		// name for tab button
		// 탭버튼 명
		,TAB_DEALER_LIST 						: 0
		,TAB_DEALER_MAP 						: 1
		,TAB_DEALER_INFORMATION 				: 0
		,TAB_DEALER_CONTACT 					: 1

		// Showroom sales title
		,SHOWROOM_TITLE_TEST_DRIVE 				: 'TestDrive'
		,SHOWROOM_TITLE_MEET_SALES_ADVISOR 		: 'MeetSalesAdvisor'
		,SHOWROOM_TITLE_GET_QUOTE 				: 'GetQuote'
		,SHOWROOM_TITLE_RENT_KIA 				: 'RentKia'

		// modify on the confirmation
		// Confirmation에서 수정
		,MODIFY_TYPE 							: 0
		,MODIFY_DEALER 							: 1
		,MODIFY_DATETIME 						: 2
		,MODIFY_MESSAGE 						: 3
		,MODIFY_CALLBACK 						: 4
		,MODIFY_MEETING_QUESTION				: 5
		,MODIFY_QUESTION						: 6
		,MODIFY_MODEL							: 7
		,MODIFY_APPOINTMENT_DETAIL				: 8
		,MODIFY_TRANSITION_OPTION				: 9
		,MODIFY_COST_OF_ESTIMATION				: 10
		,MOMENT_CODE							: {
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
												}
	});

	/**
	 * TEMPLATE_STRING constant setting, it defines a template URL
	 * TEMPLATE_STRING 상수 설정
	 * Template URL을 상수 정의한다.
	 */
	configs.constant('TEMPLATE_STRING' ,{
		 MAIN 						:'../templates/mk_f00_my_appointments.html'
		,MAIN_DETAIL 				:'../templates/mk_f01_my_appointments_detail.html'
		,SHOWROOM 					:'../templates/mk_f10_show_room.html'
		,DRIVE_LIST 				:'../templates/mk_f11_test_drive_list.html'
		,DEALER_LIST 				:'../templates/mk_f12_dealer_selection.html'
		,DEALER_DETAIL 				:'../templates/mk_f13_dealer_detail.html'
		,DEALER_SEARCH 				:'../templates/mk_f14_dealer_search.html'

		,SALES_ADVISOR 				:'../templates/mk_f20_meet_a_sales_advisor.html'
		,QUOTE_MODEL 				:'../templates/mk_f30_get_a_quote_model.html'
		,WORKSHOP 					:'../templates/mk_f40_workshop.html'
		,WORKSHOP_APPOINTMENT 		:'../templates/mk_f41_workshop_appointment.html'
		,WORKSHOP_DATE_PICKER 		:'../templates/mk_f42_date_time.html'
		,WORKSHOP_CONFIRMATION 		:'../templates/mk_f43_confirmation.html'
		,WORKSHOP_VEHICLE			:'../templates/mk_f44_vehicle.html'

		,DATE_PICKER 				:'../templates/mk_f52_date_time.html'
		,CONFIRMATION 				:'../templates/mk_f53_confirmation.html'
		,CONTACT					:'../templates/mk_f54_contact.html'
		,POPUP 						:'../templates/template_popup.html'
	});

	/**
	 * ROUTE_URL constant setting, it defines a route URL
	 * ROUTE_URL 상수 설정
	 * Route URL을 상수 정의한다.
	 */
	configs.constant('ROUTE_URL' ,{
		 MAIN 						:'/appointments'
		,MAIN_DETAIL 				:'/appointments/detail'
		,MAIN_CONTACT 				:'/appointments/contact'

		,SHOWROOM 					:'/appointments/showroom'
		,SHOWROOM_DRIVE_LIST 		:'/appointments/showroom/testdrive/driveList'
		,SHOWROOM_DATE_PICKER 		:'/appointments/showroom/testdrive/date'
		,SHOWROOM_CONFIRMATION 		:'/appointments/showroom/testdrive/confirmation'
		,SHOWROOM_DEALER_LIST 		:'/appointments/showroom/testdrive/dealer'
		,SHOWROOM_DEALER_DETAIL 	:'/appointments/showroom/testdrive/dealer/detail'
		,SHOWROOM_DEALER_SEARCH 	:'/appointments/showroom/testdrive/dealer/search'

		,SALES_ADVISOR 				:'/appointments/showroom/sales/meetSalesAdvisor'
		,SALES_DATE_PICKER 			:'/appointments/showroom/sales/date'
		,SALES_CONFIRMATION 		:'/appointments/showroom/sales/confirmation'

		,QUOTE_MODEL 				:'/appointments/showroom/quote/quoteModel'
		,QUOTE_DATE_PICKER			:'/appointments/showroom/quote/date'
		,QUOTE_CONFIRMATION 		:'/appointments/showroom/quote/confirmation'

		,WORKSHOP 					:'/appointments/workshop'
		,WORKSHOP_APPOINTMENT 		:'/appointments/workshop/appointment'
		,WORKSHOP_DATE_PICKER 		:'/appointments/workshop/date'
		,WORKSHOP_CONFIRMATION 		:'/appointments/workshop/confirmation'
		,WORKSHOP_VEHICLE 			:'/appointments/workshop/vehicle'
	});

	/**
	 * CONTROLLER_STRING constant setting, it defines a Controller string
	 * CONTROLLER_STRING 상수 설정
	 * Controller String을 상수 정의한다.
	 */
	configs.constant('CONTROLLER_STRING' ,{
		 MAIN 						:'AppointmentsController'
		,MAIN_DETAIL 				:'AppointmentsDetailController'
		,MAIN_CONTACT 				:'AppointmentsContactController'
		
		,SHOWROOM 					:'AppointmentsShowroomController'
		,SHOWROOM_DRIVE_LIST 		:'AppointmentsShowroomDriveListController'
		,SHOWROOM_DATE_PICKER 		:'AppointmentsShowroomDateController'
		,SHOWROOM_CONFIRMATION 		:'AppointmentsShowroomConfirmationController'
		,SHOWROOM_DEALER_LIST 		:'AppointmentsShowroomDealerController'
		,SHOWROOM_DEALER_DETAIL 	:'AppointmentsShowroomDealerDetailController'
		,SHOWROOM_DEALER_SEARCH 	:'AppointmentsShowroomDealerSearchController'

		,SALES_ADVISOR 				:'AppointmentsSalesMeetSalesAdvisorController'
		,SALES_DATE_PICKER 			:'AppointmentsSalesDateController'
		,SALES_CONFIRMATION 		:'AppointmentsSalesConfirmationController'

		,QUOTE_MODEL 				:'AppointmentsQuoteModelController'
		,QUOTE_DATE_PICKER 			:'AppointmentsQuoteDateController'
		,QUOTE_CONFIRMATION 		:'AppointmentsQuoteConfirmationController'

		,WORKSHOP 					:'AppointmentsWorkshopController'
		,WORKSHOP_APPOINTMENT 		:'AppointmentsWorkshopAppointmentController'
		,WORKSHOP_DATE_PICKER 		:'AppointmentsWorkshopDateController'
		,WORKSHOP_CONFIRMATION 		:'AppointmentsWorkshopConfirmationController'
		,WORKSHOP_VEHICLE 			:'AppointmentsWorkshopVehicleController'
	});

	/**
	 * PAGE_TITLE constant setting, it defines a Page Title String
	 * PAGE_TITLE 상수 설정
	 * Page Title String을 상수 정의한다.
	 */
	configs.constant('PAGE_TITLE' ,{
		 MAIN 						: 'W0_12'		// 'My Appointments'
		,MAIN_DETAIL 				: 'W0_12'		// 'My Appointment'
		,MAIN_CONTACT 				: 'W0_14'		// 'workshop'
		
		,SHOWROOM 					: 'W0_13'		// 'Showroom'
		,SHOWROOM_DRIVE_LIST 		: 'WS_4'		// 'Test Drive - Appointment Detail'
		,SHOWROOM_DATE_PICKER 		: 'WS_4'		// 'Test Drive - Appointment Date'
		,SHOWROOM_CONFIRMATION 		: 'WS_4'		// 'Test Drive - confirmation'
		,SHOWROOM_DEALER_LIST 		: 'E1_52'		// 'Search Dealer'
		,SHOWROOM_DEALER_DETAIL 	: 'E1_26'		// 'Dealer Selection'
		,SHOWROOM_DEALER_SEARCH 	: 'E1_52'		// 'Search Dealer'

		,SALES_ADVISOR 				: 'WS_7'		// 'Meet A Sales Advisor - Appointment Detail'
		,SALES_DATE_PICKER 			: 'WS_7'		// 'Meet A Sales Advisor - Appointment Date'
		,SALES_CONFIRMATION 		: 'WS_7'		// 'Meet A Sales Advisor - confirmation'

		,QUOTE_MODEL 				: 'WS_8'		// 'Get A Quote - Appointment Detail'
		,QUOTE_DATE_PICKER 			: 'WS_8'		// 'Get A Quote - Appointment Date'
		,QUOTE_CONFIRMATION 		: 'WS_8'		// 'Get A Quote - confirmation'

		,WORKSHOP 					: 'W0_14'		// 'Workshop - Vehicle & Dealership'

		,WORKSHOP_APPOINTMENT 		: 'W0_14'		// 'Workshop - Appointment Details'
		,WORKSHOP_DATE_PICKER 		: 'W0_14'		// 'Workshop - Appointment Date'
		,WORKSHOP_CONFIRMATION 		: 'W0_14'		// 'Workshop - confirmation'
		,WORKSHOP_VEHICLE 			: 'B1_24'		// 'My Vehicle'
	});

	/**
	 * PROGRESS_STEP_TITLE constant setting, it defines a Progress Step Title
	 * PROGRESS_STEP_TITLE 상수 설정
	 * Progress Step Title 을 상수 정의한다.
	 */
	configs.constant('PROGRESS_STEP_TITLE' ,{
		 SHOWROOM 					: 'WS_2' 	// 'Type Of Appointment'
		,SHOWROOM_DRIVE_LIST 		: 'WS_22'	// 'Appointment Detail'
		,SHOWROOM_DATE_PICKER 		: 'W0_23'	// 'Appointment Date'
		,SHOWROOM_CONFIRMATION 		: 'WS_41'	// 'Confirmation'

		,SALES_ADVISOR 				: 'WS_22'	// 'Appointment Detail'
		,SALES_DATE_PICKER 			: 'W0_23'	// 'Appointment Date'
		,SALES_CONFIRMATION 		: 'WS_41'	// 'confirmation'

		,QUOTE_MODEL 				: 'WS_22'	// 'Appointment Detail'
		,QUOTE_DATE_PICKER 			: 'W0_23'	// 'Appointment Date'
		,QUOTE_CONFIRMATION 		: 'WS_41'	// 'Confirmation'

		,WORKSHOP 					: 'Y1_12'	// 'Vehicle & Dealership'
		,WORKSHOP_APPOINTMENT 		: 'WS_22'	// 'Appointment Details'
		,WORKSHOP_DATE_PICKER 		: 'W0_23'	// 'Appointment Date'
		,WORKSHOP_CONFIRMATION 		: 'WS_41'	// 'Confirmation'
	});

	/**
	 * TR_CODE constant setting, it defines a network TRCODE
	 * I used camel type naming for compatible with Release 1.2 version
	 * TR_CODE 상수 설정
	 * 네트워크 TRCODE를 설정한다.
	 * Release 1.2 이전 버전과 호환하기 위해 상수 Key 를 Camel 형식으로 사용함
	 */
	configs.constant('TR_CODE' ,{
		 Login						: 'api/authentication/login' 			// 2.1
		,FbLogin					: 'api/authentication/facebookLogin' 	// 2.2
		,Logout						: 'api/authentication/logout' 			// 2.3
		,UserInformation			: 'api/v2/user/information' 			// 2.4
		,VehiclesImages				: 'api/v3/user/vehicleImages' 			// 2.5 - 3.5
		,VehiclesInformation		: 'api/v2/user/vehiclesInformation' 	// 2.6
		,AllVehicleImages			: 'api/v2/lead/allModelImages' 			// 2.8 - 3.8
		,TestDrive					: 'api/lead/testdrive'					// 2.9
		,VehicleBrochure			: 'api/lead/vehicleBrochure' 			// 2.10
		,MileageUpdating			: 'api/v2/service/mileageUpdating' 		// 2.11
		,MaintainanceSchedule		: 'api/v2/service/maintainanceSchedule' // 2.12
		,DealerInformation			: 'api/v2/dealer/information' 			// 2.15 - 3.15
		,DealerLocationInformation	: 'api/v2/dealer/locationInformation' 	// 2.16
		,DealerSearching			: 'api/dealer/searching' 				// 2.17
		,NewsList					: 'api/news/list' 						// 2.18
		,NewsDetails				: 'api/v2/news/details' 				// 2.19
		,NewsListVideo				: 'api/v2/news/listVideo' 					// 2.20
		,HowToVideo					: 'api/news/howToVideo' 				// 2.21
		,NewsRead					: 'api/news/read' 						// 2.22
		,MarketInformation			: 'api/market/information' 				// 2.23
		,RecallInformation			: 'api/v2/recall/information' 			// 2.24
		,LangSet					: 'api/lang/set' 						// 2.26
		,TranslationList			: 'api/market/translationList' 			// 2.28
		,GetToken					: 'api/gettoken' 						// 2.29
		,ContentVersion				: 'api/market/getcontentversionnumber' 	// 2.30
		,GetLegalNotice				: 'api/v2/market/getlegalnotice' 		// 2.31
		,PutLegalNoticeAgreement	: 'api/user/putlegalnoticeagreement' 	// 2.32
		,GetDocumentList			: 'api/v2/market/documentlist' 			// 2.33
		,GetDocument				: 'api/market/getdocument' 				// 2.34

		,GetDealerAvailability			: 'api/v2/appointments/getdealeravailability' 			// 2.27.1
		,GetAppointments 				: 'api/v2/appointments/getappointments' 				// 2.27.2
		,GetAppointmentDetails 			: 'api/v3/appointments/getappointmentdetails' 			// 2.27.3
		,GetMaintenanceOperations 		: 'api/v3/appointments/getmaintenanceoperations' 		// 2.27.4
		,GetMaintenanceOperationDetails : 'api/v2/appointments/getmaintenanceoperationdetails' 	// 2.27.5
		,GetMaintenanceOperationsPrice 	: 'api/v2/appointments/getmaintenanceoperationprice' 	// 2.27.6
		,SaveServiceAppointment 		: 'api/v3/appointments/saveserviceappointment' 			// 2.27.6.1
		,SaveContactMeForAService 		: 'api/v2/appointments/savecontactmeforservice' 			// 2.27.6.2
		,SaveSalesAppointment 			: 'api/v3/appointments/savesalesappointment' 			// 2.27.6.3
		,GetCampaignList 				: 'api/campaigns/list' 									// 2.35
		,GetCampaignsDetails 			: 'api/v2/campaigns/details' 							// 2.36 - 3.36
		
		//RESTful api/generic/values/{CultureCode}/{ValueType}
		,GetValues 						: 'api/v2/generic/values/' 								// 2.37.1 
	});

	/**
	 * STORAGE_KEY 상수 설정
	 * Storage 에 저장되는 데이터의 키값을 알파벳 키로 치환한다.
	 * Release 1.2 이전 버전과 호환하기 위해 상수 Key 를 Camel 형식으로 사용함
	 */
	configs.constant('STORAGE_KEY' ,{
		 loginInfo 			: 'a'
		,pushInfo 			: 'b'
		,detailsInfo 		: 'c'
		,vehiclesInfo 		: 'd'
		,pushSettingInfo 	: 'e'
		,selectedVehicle 	: 'f'
		,dealerInfo 		: 'g'
		,allVehicleImages 	: 'h'
		,breakDownCall 		: 'i'
		,recallInformation 	: 'j'
		,AutoLogin 			: 'k'
		,Email 				: 'l'
		,Pwd 				: 'm'
		,Language 			: 'n'
		,FbToken 			: 'o'
		,syncDate 			: 'p'
		,optInsVal 			: 'q'
		,showDisclaimer 	: 'r'
		,Marketid 			: 's'
		,ContentVersion 	: 't'
		,LegalContent 		: 'u'
		,ParkedLocation 	: 'v'
		,OwnersDownloaded 	: 'w'
		,ParkedTime 		: 'x'
		,ParkedNote 		: 'y'
		,Authorization 		: 'z'
		,Token 				: 'zz'
		,WasCustomerId 		: 'aa'
		,LastUpdate 		: 'ab'
	});

	/**
	 * GLOBAL_DEFINE 상수 설정
	 * Release 1.2 이전 버전과 호환하기 위해 상수 Key 를 Camel 형식으로 사용함
	 */
	configs.constant('GLOBAL_DEFINE' ,{
		 Level 					: 'V'
		,TAG 					: 'MyKia'
		,URL 					: 'https://usermanual.kia.com/'
		,GoogleMapPackageName 	: 'com.google.android.apps.maps'
		,GoogleMapItunesId 		: '585027354'
		,GoogleApiKey 			: 'AIzaSyCS7tR4y3XcQunvKg2332lZrAOXp10ECEE'
		,OwnerType 				: 'O'
		,QucikType 				: 'Q'
		,EmailTestRegExp 		: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		,NumberOnlyRegExp 		: /[^0123456789]/g
		,NotLoginPageFlitRegExp : /mk_a00_0001|mk_a00_0005|mk_a00_0006|mk_a00_0008|mk_a00_0009|mk_b03_0001|mk_b03_0002|mk_d03_0001|mk_d05_0001|manual|license|mk_a00_0010|mk_a00_0011|mk_a00_0012|mk_b03_0003/g
		,VehiclePageFiltRegExp 	: /mk_b01_0001|mk_b02_0001|mk_c04_0001|mk_d04_0001/g
		,RemoveTagRegExp 		: /(<([^>]+)>)/ig
	});

	/**
	 * Route Provider 설정
	 */
	configs.config([
			 '$stateProvider'
			,'ROUTE_URL'
			,rootRoute
		])

	/**
	 * Route Provider 에 모듈을 주입한다.
	 * @ $urlRouterProvider : angular.ui-route 에서 제공하는 $urlRouterProvider
	 * @ ROUTE_URL			: Route URL 을 주입
	 */
	function rootRoute($stateProvider, ROUTE_URL) {
		// 디폴트로 /appointments 로 라우팅
		$stateProvider
			
			// appointments main
			.state('/main', {
				 url: '/main'
				,onEnter: function($state) {
					setTimeout(function(){
						// if(LoginManager.getDetailsInfo().MarketId === "KMDE"){
						// 	$state.go(ROUTE_URL.MAIN_CONTACT);
						// }else{
							$state.go(ROUTE_URL.MAIN);
						// }
						
					}, 100)
				}
			})
	}

	return configs;
});

})();

















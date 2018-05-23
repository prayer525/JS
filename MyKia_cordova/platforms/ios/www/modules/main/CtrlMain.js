/**
 * My Appointments Main Controller 
 *
 * @ Develop Desc 		: Appointments Main Controller
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

(function(){

'use strict';

define([
	 './module'
	,'moment'
], function(module, moment) {

	/**
	 * declare appointments Controller
	 */
	module.controller('AppointmentsController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsCtrl
								]);

	/**
	 * inject My Appointments Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsCtrl($scope, $rootScope, $state, $filter, Network, ROUTE_URL, CONSTANT) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.MAIN );

		// $rootScope.progressStep = 4;
		$rootScope.momentCode = CONSTANT.MOMENT_CODE[Data.getData('Login').CultureCode];

		if($rootScope.user.detailsInfo.MarketId == 'KMBE'){
			$rootScope.progressStep = 3;
			$rootScope.flagKMBE = true;
		}else{
			$rootScope.progressStep = 4;
			$rootScope.flagKMBE = false;
		}

		// remove background class when back to main screen from showroom screen
		// showroom 에서 back 버튼을 눌러 main 으로 돌아올 때 배경 클래스를 제거해준다.
		angular.element(document).find('body').attr('class', 'ng-scope');

		$scope.CONSTANT 				= CONSTANT;
		$scope.hasAppointment 			= null;
		locationHistory 				= locationHistory.slice(0, 2);
		$scope.appMenuDiff				= $filter('appModuleType')($rootScope.user.detailsInfo.MarketId);
		$scope.flagKMBE					= $rootScope.flagKMBE;
		
		// data binding
		// 데이터 바인딩
		// 2.35 Get Campaign List
		var  successCampaign = function(result) {
				var lists = result.data.Campaigns;
				for(var i in lists){
					lists[i].CampaignStartDate = moment(lists[i].CampaignStartDate, 'YYYY-MM-DD').locale($rootScope.momentCode).format("L")
					lists[i].CampaignEndDate = moment(lists[i].CampaignEndDate, 'YYYY-MM-DD').locale($rootScope.momentCode).format("L")
				}
				$scope.campaigns = lists;
			}
			,failCampaign = function(result) {
				console.log('error, ', result)
			}
			,dealerInfo 		= $rootScope.dealer.dealerInfo
			,selectedVehicle 	= $rootScope.vehicle.selectedVehicleIndex
			,vehicle 			= $rootScope.vehicle.vehicleInfo.Vehicles[selectedVehicle]
			,userInfo			= $rootScope.user.loginInfo
			,dealerCategory 	= '1' //1 = target all dealers, 2 = target dealers with sales component, 3 = target dealers with service component
			,sendCampaignData 	= {
				 CampaignType 	: 0
				,MarketId 		: dealerInfo.MarketId
				,ModelCode 		: vehicle.VehicleModelCode
				,CultureCode 	: userInfo.CultureCode
				,DealerSapCode 	: dealerInfo.DealerSapCode
				,StartDate 		: moment().format('YYYY-MM-DD')
				,EndDate 		: moment().add(2, 'Y').format('YYYY-MM-DD')
				,DealerCategory : dealerCategory
			}

		// 2.27.2 Get Appointments
		var successAppointment = function(result) {
			var  sales = result.data.SalesAppointments
				,service = result.data.ServiceAppointments
				,appointments = []
				,locale = CONSTANT.MOMENT_CODE[Data.getData('Login').CultureCode]
				,activeAppointment = []
				,historyAppointment = []
				,resultAppointment = []

			// if the appointments history
			// appointments 내역이 있으면
			if (sales.length == 0 && service.length == 0) {
				$scope.hasAppointment = false;
				return false;
			}
			$scope.hasAppointment = true;
			angular.forEach(sales, function(_sale) {
				var isBefore = moment(_sale.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').isBefore(moment())

				_sale.date = moment(_sale.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(locale).format('lll')
				// _sale.time = moment(_sale.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(locale).format('D MMM YYYY HH:mm')
				if (isBefore) {
					_sale.scheduleStatus = 'History';
					_sale.scheduleStatusCode = 'W0_17';
				} else {
					_sale.scheduleStatus = $filter('i18n')(_sale.Status, $filter('convertStatus')(_sale.Status));
					_sale.scheduleStatusCode = $filter('convertStatus')(_sale.Status);
				}
				_sale.AppointmentTypeString = $filter('i18n')(_sale.AppointmentType, $filter('replaceToCodeInAppointmentType')(_sale.AppointmentType) )
				appointments.push(_sale);
			})
			angular.forEach(service, function(_service) {
				var isBefore = moment(_service.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').isBefore(moment())

				_service.date = moment(_service.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(locale).format('lll')
				// _service.time = moment(_service.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(locale).format('HH:mm')
				if (isBefore) {
					_service.scheduleStatus = 'History';
					_service.scheduleStatusCode = 'W0_17';
				} else {
					_service.scheduleStatus = $filter('i18n')(_service.Status, $filter('convertStatus')(_service.Status));
					_service.scheduleStatusCode = $filter('convertStatus')(_service.Status);
				}
				_service.AppointmentTypeString = $filter('i18n')('Workshop', 'W0_14');
				appointments.push(_service);
			})

			// devided by history data and scheduled data
			// history 데이터와 scheduled 데이터로 나눈다.
			angular.forEach(appointments, function(appointment) {
				if (appointment.scheduleStatus == 'History') {
					historyAppointment.push(appointment);
				} else {
					activeAppointment.push(appointment);
				}
			})

			// recent historical data leaving only two
			// 히스토리 데이터는 최근 2개만 남긴다.
			historyAppointment = _.chain(historyAppointment).reverse().value();
			if (historyAppointment.length > 2) {
				historyAppointment.length = 2;
			}

			// it sorts the scheduled data
			// scheduled 데이터를 정렬한다.
			activeAppointment = _.sortBy(activeAppointment, function(element) {
				return element.ScheduledDate;
			})

			// it sorts the finally result
			// 최종 결과물을 정렬한다.
			resultAppointment.push(activeAppointment);
			resultAppointment.push(historyAppointment);
			resultAppointment = _.flatten(resultAppointment);
			
			$scope.appointments = resultAppointment;

			// 2.35 Get Campaign List
			Network.getCampaignList(sendCampaignData).then(successCampaign, failCampaign);
		}
		,failAppointment = function(result) {
			console.log('fail: ', result)
		}
		,sendData = {
			Historical : true
		}

		// 2.27.2 Get Appointments
		Network.getAppointments(sendData).then(successAppointment, failAppointment);

		// go to showroom
		$scope.goShowroom = function() {
			$state.go(ROUTE_URL.SHOWROOM);
		}
		// go to workshop
		$scope.goWorkshop = function() {
			var  dealerMarket = $rootScope.dealer.dealerInfo
				,availableList = CONSTANT.WORKSHOP_AVAILABLE_LIST
				,isAvailable = false;

			angular.forEach(availableList, function(market) {
				if (market == dealerMarket.MarketId) {
					isAvailable = true;
				}
			})

			if (isAvailable) {
				$state.go(ROUTE_URL.WORKSHOP);
				return false;
			}
			$state.go(ROUTE_URL.MAIN_CONTACT);
		}

		// view Campaign Detail
		$scope.selectedCampaign = null
		$scope.viewCampaign = function(campaign, idx) {
			if ($scope.selectedCampaign == idx) {
				$scope.selectedCampaign = null;
				return false;
			}
			
			$scope.selectedCampaign = idx;

			// 2.36 Get Campaign Details
			// get Campaign Detail
			var  cultureCode = $rootScope.user.loginInfo.CultureCode
				,successCampaign = function(result) {
					$scope.campaignDetail = result.data
				}
				,failCampaign = function(result) {

				}
				,sendData = {
					 CampaignId 	: campaign.CampaignId
					,CultureCode 	: cultureCode
				}

			// 2.36 Get Campaign Details
			Network.getCampaignsDetails(sendData).then(successCampaign, failCampaign);
		}
	}

	return module;
});

})();


















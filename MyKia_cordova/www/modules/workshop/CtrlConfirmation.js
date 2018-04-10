/**
 * Workshop Confirmation Controller 
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
	 * declare Workshop Confirmation Controller
	 */
	module.controller('AppointmentsWorkshopConfirmationController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsWorkshopConfirmationCtrl
								]);

	/**
	 * inject Workshop Confirmation Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsWorkshopConfirmationCtrl($scope, $rootScope, $state, $window, $filter, 
																					Network, Utils, ROUTE_URL, CONSTANT) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.WORKSHOP_CONFIRMATION );

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : 4
			,current : 4
		};

		// move previous screen if you don't have metting data
		// meeting에 데이터가 없으면 이전으로 이동한다.
		if (!$rootScope.workshop.date ||
				!$rootScope.workshop.time) {
			$window.history.back();
			return false;
		}

		var  workshop 			= $rootScope.workshop
			,dealerInfo 		= $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
			,address 			= dealerInfo.Street + ' ' + dealerInfo.Town
			,locale 			= Data.getData('Login').CultureCode
			,dateTime 			= moment(workshop.date, 'YYYY-MM-DD').locale($rootScope.momentCode).format("ll") + ' ' +
									moment(workshop.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')
			,callbackByDealer 	= $filter('i18n')(workshop.CallbackByDealer, $filter('booleanToYesNo')(workshop.CallbackByDealer))
			

		// data binding
		$scope.CONSTANT				= CONSTANT;
		$scope.dealerName 			= dealerInfo.Name;
		$scope.dealerAddress 		= address;
		$scope.dateTime 			= dateTime;
		$scope.appointment 			= workshop.service
		$scope.transportOption		= workshop.transport
		$scope.transportOptionString = $filter('i18n')( workshop.transport, $filter('transportOptionString')(workshop.transport) );
		$scope.price 				= workshop.price
		$scope.callbackByDealer 	= callbackByDealer;
		$scope.carModel 			= $rootScope.vehicle.selectedVehicleInfo.VehicleName;

		$scope.modify = function(flag) {
			// change Model
			if (flag === CONSTANT.MODIFY_MODEL) {
				$state.go(ROUTE_URL.WORKSHOP_VEHICLE, {
					removeStack: -3
				});
				return false;
			}

			// change Selected Dealer
			if (flag === CONSTANT.MODIFY_DEALER) {
				$state.go(ROUTE_URL.SHOWROOM_DEALER_LIST);
				return false;
			}

			// change Appointment Detail
			if (flag === CONSTANT.MODIFY_APPOINTMENT_DETAIL) {
				$window.history.go(-2);
				return false;
			}

			// change datetime
			if (flag === CONSTANT.MODIFY_DATETIME || 
				flag === CONSTANT.MODIFY_TRANSITION_OPTION ||
				flag === CONSTANT.MODIFY_COST_OF_ESTIMATION
			) {
				$window.history.go(-1);
				return false;
			}
		}

		// Save Appointment
		$scope.nextstep = function() {
			var  myVehicle 			= $rootScope.vehicle.selectedVehicleInfo
				,recall 			= $rootScope.info.recallInfo.Recall || []
				,VIN 				= myVehicle.VIN
				,CurrentMileage 	= myVehicle.CurrentMileageInKilometers
				,ModelId 			= workshop.ModelId
				,DealerSapCode 		= dealerInfo.DealerSapCode
				,RecallId 			= recall.RecallId || null
				,Service 			=  {
							 Id 			: workshop.service.Id
							,GroupVarId 	: workshop.service.GroupVarId
							,Code 			: workshop.service.Code
							,Description 	: workshop.service.Description
							,Interval 		: workshop.service.Months
							,Distance 		: workshop.service.Distance
							,AsMiles 		: false
						}
				,Repairs 			= {
							 Description 	: workshop.elseNeed
							,Operations 	: workshop.repair
						}
				,IsMot 				= workshop.isMot
				,Other 				= workshop.Other
				,Price 				= workshop.price.TotalPrice
				,ScheduledDate 		= workshop.dateTime
				,TransportOption 	= workshop.transport || ''
				,CallbackByDealer 	= $rootScope.workshop.CallbackByDealer
				,CultureCode 		= $rootScope.user.loginInfo.CultureCode
				,saveData = {}
				,successSaveService = function(result) {
					var data = result.data;
					if (data.ResponseCode == 1) {
						Utils.log($filter('i18n')('Your Appointment Submission is successfully completed', 'Y1_6'));
						$rootScope.workshop = {};
						$rootScope.network = {};
						locationHistory = locationHistory.slice(0, 1);
						$window.history.go(-4);
						return false;
					}
					Utils.log(data.ResponseMessage);
				}
				,failSaveService = function(result) {
					console.log('error: ', result)
				}
			
			saveData = {
				 VIN 				: VIN
				,CurrentMileage 	: CurrentMileage
				,ModelId 			: ModelId
				,DealerSapCode 		: DealerSapCode
				,RecallId 			: RecallId
				,Repairs 			: Repairs
				,IsMot 				: IsMot
				,Other 				: Other
				,Price 				: Price
				,ScheduledDate 		: ScheduledDate
				,TransportOption 	: TransportOption
				,CultureCode 		: CultureCode
				,CallbackByDealer 	: CallbackByDealer
			}
			if (Service.Id !== undefined) {
				saveData.Service = Service;
			}

			//console.log(saveData)
			Network.saveServiceAppointment(saveData).then(successSaveService, failSaveService);
		};
	}

	return module;
});

})();
/**
 * Showroom > Test Drive > Confirmation Controller 
 *
 * @ Develop Desc 		: Showroom Main Controller
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
	 * declare Showroom > Test Drive > Confirmation Controller
	 */
	module.controller('AppointmentsShowroomConfirmationController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsShowroomConfirmationCtrl
								]);

	/**
	 * inject Showroom > Test Drive > Confirmation Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsShowroomConfirmationCtrl($scope, $rootScope, $state, $window, $filter, 
																			Network, Utils, ROUTE_URL, CONSTANT) {
		// set navigation title
		// 상단 Navigation 설정
		console.log(' showroom comfirmation')
		$rootScope.setNaviTitle( ROUTE_URL.SHOWROOM_CONFIRMATION );

		// set progress step
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : $rootScope.progressStep
		};
		
		// move previous screen if you don't have showroom date or selected vehicle
		// showroom에 날짜, 선택한 자동차 데이터가 없으면 이전으로 이동한다.
		if (!$rootScope.showroom.ModelName ||
			!$rootScope.showroom.SiebelModelCode ||
			(!$rootScope.showroom.ScheduledDate && !$rootScope.flagKMBE)
		) {
			$window.history.back();

			return false;
		}
		
		var  dealerInfo = $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
			,address = dealerInfo.Street + ' ' + dealerInfo.Town
			,locale = Data.getData('Login').CultureCode
			// ,dateTime = moment($rootScope.showroom.date, 'YYYY-MM-DD').locale($rootScope.momentCode).format("ll") + ' ' + moment($rootScope.showroom.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')
			,dateTime = $rootScope.flagKMBE ? '' : moment($rootScope.showroom.date, 'YYYY-MM-DD').locale(locale).format('D MMM YYYY') + ' ' +
			 			moment($rootScope.showroom.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')

		// data binding
		$scope.CONSTANT			= CONSTANT;
		$scope.type 			= CONSTANT.SHOWROOM_TITLE_TEST_DRIVE;
		$scope.typeString		= $filter('i18n')(CONSTANT.SHOWROOM_TITLE_TEST_DRIVE, 'WS_4');
		$scope.dealerName 		= dealerInfo.Name;
		$scope.dealerAddress	= address;
		$scope.dateTime 		= dateTime;
		$scope.comment 			= $rootScope.showroom.Comment;
		$scope.callbackByDealer = "true";
		$scope.modelName		= $rootScope.showroom.ModelName;
		$scope.flagKMBE			= $rootScope.flagKMBE;

		// modify
		$scope.modify = function(flag) {
			// change Appointments type
			if (flag === CONSTANT.MODIFY_TYPE) {
				$window.history.go(1-$rootScope.progressStep);
				return false;
			}

			// change Car Model
			if (flag === CONSTANT.MODIFY_MODEL) {
				$window.history.go(2-$rootScope.progressStep);
				return false;
			}

			// change Selected Dealer
			if (flag === CONSTANT.MODIFY_DEALER) {
				$state.go(ROUTE_URL.SHOWROOM_DEALER_LIST, {
					removeStack: 1-$rootScope.progressStep
				});
				return false;
			}

			// change datetime
			if (flag === CONSTANT.MODIFY_DATETIME || 
				flag === CONSTANT.MODIFY_MESSAGE ||
				flag === CONSTANT.MODIFY_CALLBACK
			) {
				$window.history.go(-1);
				return false;
			}
		}

		// save and next step
		$scope.nextstep = function() {
			var  AppointmentTypeId 			= $scope.type
				,ModelName 					= $rootScope.showroom.ModelName
				,SiebelModelCode 			= $rootScope.showroom.SiebelModelCode
				,ScheduledDate 				= $rootScope.flagKMBE ? '' : $rootScope.showroom.ScheduledDate
				,Comment 					= $scope.comment
				,CallbackByDealer 			= $scope.callbackByDealer == "true" ? true : false
				,DealerSapCode 				= dealerInfo.DealerSapCode
				,Campaigns	 				= $rootScope.showroom.Campaigns
				,CultureCode 				= $rootScope.user.loginInfo.CultureCode
				,vin 						= $rootScope.vehicle.selectedVehicleInfo.VIN
				,CurrentMileageInKilometers = $rootScope.vehicle.selectedVehicleInfo.CurrentMileageInKilometers
				,sendData = {}
				,success = function(result) {
					var data = result.data;
					if (data.ResponseCode == 1) {
						Utils.log($filter('i18n')('Your Appointment Submission is successfully completed', 'Y1_6'));
						$rootScope.showroom = {};
						$rootScope.network = {};
						locationHistory = locationHistory.slice(0, 1);
						$window.history.go(-$rootScope.progressStep);
						return false;
					}
				}
				,fail = function(result) {
					console.log('error: ', result)
				}
			
			// TODO: model 데이터 넣어야함
			sendData = {
				 AppointmentTypeId 			: AppointmentTypeId
				,ModelName 					: ModelName
				,SiebelModelCode 			: SiebelModelCode
				,ScheduledDate 				: ScheduledDate
				,Comment 					: Comment
				,DealerSapCode				: DealerSapCode
				,Campaigns					: Campaigns
				,CallbackByDealer 			: CallbackByDealer
				,CultureCode 				: CultureCode
			}

			console.log(sendData)
			Network.saveSalesAppointment(sendData).then(success, fail);
		}
	}

	return module;
});

})();
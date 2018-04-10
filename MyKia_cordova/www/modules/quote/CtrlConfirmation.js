/**
 * Quote > Confirmation Controller 
 *
 * @ Develop Desc 		: Quote > Confirmation Controller
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
	 * declare Quote > Confirmation Controller
	 */
	module.controller('AppointmentsQuoteConfirmationController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsQuoteConfirmationCtrl
								]);

	/**
	 * inject Quote > Confirmation Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsQuoteConfirmationCtrl($scope, $rootScope, $state, $window, $filter, 
																		Network, Utils, ROUTE_URL, CONSTANT) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.QUOTE_CONFIRMATION );

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : $rootScope.progressStep
		};

		// go to the previous screen if you don't have quote date or selected vehicle data
		// quote에 날짜, 선택한 자동차 데이터가 없으면 이전으로 이동한다.
		console.log($rootScope.quote)
		if (!$rootScope.quote.ModelName ||
				!$rootScope.quote.SiebelModelCode ||
				(!$rootScope.quote.ScheduledDate  && !$rootScope.flagKMBE)
			) {
			$window.history.back();
			return false;
		}

		var  dealerInfo = $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
			,address = dealerInfo.Street + ' ' + dealerInfo.Town
			,locale = Data.getData('Login').CultureCode
			// ,dateTime = moment($rootScope.quote.date, 'YYYY-MM-DD').locale($rootScope.momentCode).format("ll") + ' ' +
			// 			moment($rootScope.quote.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')

			,dateTime = $rootScope.flagKMBE ? '' : moment($rootScope.quote.date, 'YYYY-MM-DD').locale($rootScope.momentCode).format("ll") + ' ' +
						moment($rootScope.quote.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')
			// ,callbackByDealer = $filter('i18n')($rootScope.quote.CallbackByDealer, $filter('booleanToYesNo')($rootScope.quote.CallbackByDealer))

		// data biding
		$scope.CONSTANT			= CONSTANT;
		$scope.type 			= CONSTANT.SHOWROOM_TITLE_GET_QUOTE;
		$scope.typeString		= $filter('i18n')(CONSTANT.SHOWROOM_TITLE_GET_QUOTE, 'WS_8');
		$scope.dealerName 		= dealerInfo.Name;
		$scope.question 		= $rootScope.quote.Question;
		$scope.dealerAddress 	= address;
		$scope.dateTime 		= dateTime;
		$scope.comment 			= $rootScope.quote.Comment;
		// $scope.callbackByDealer = callbackByDealer;
		$scope.callbackByDealer = "true";
		$scope.modelName 		= $rootScope.quote.ModelName;

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

			// change Question
			if (flag === CONSTANT.MODIFY_QUESTION) {
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

		$scope.nextstep = function() {
			var  AppointmentTypeId 			= $scope.type
				,ModelName 					= $rootScope.quote.ModelName
				,SiebelModelCode 			= $rootScope.quote.SiebelModelCode
				,ScheduledDate 				= $rootScope.quote.ScheduledDate
				,Comment 					= $scope.comment
				// ,CallbackByDealer 			= $rootScope.quote.CallbackByDealer
				,CallbackByDealer 			= $scope.callbackByDealer == "true" ? true : false
				,DealerSapCode 				= dealerInfo.DealerSapCode
				,Campaigns	 				= $rootScope.quote.Campaigns
				,Question	 				= $rootScope.quote.Question
				,vin 						= $rootScope.vehicle.selectedVehicleInfo.VIN
				,CurrentMileageInKilometers = $rootScope.vehicle.selectedVehicleInfo.CurrentMileageInKilometers
				,CultureCode 				= $rootScope.user.loginInfo.CultureCode
				,sendData = {}
				,successSave = function(result) {
					var data = result.data;
					if (data.ResponseCode == 1) {
						Utils.log($filter('i18n')('Your Appointment Submission is successfully completed', 'Y1_6'));
						$rootScope.quote = {};
						$rootScope.network = {};
						locationHistory = locationHistory.slice(0, 1);
						$window.history.go(-$rootScope.progressStep);
						return false;
					}
					Util.log(data.ResponseMessage);
				}
				,failSave = function(result) {
					console.log('error: ', result)
				}
			
			sendData = {
				 AppointmentTypeId 			: AppointmentTypeId
				,ModelName 					: ModelName
				,SiebelModelCode 			: SiebelModelCode
				,ScheduledDate 				: ScheduledDate
				,Comment 					: Comment
				,DealerSapCode				: DealerSapCode
				,Campaigns					: Campaigns
				,CallbackByDealer 			: CallbackByDealer
				,Question 					: Question
				,CultureCode 				: CultureCode
				,Vehicle : {
					VIN 						: vin
					,CurrentMileageInKilometers	: CurrentMileageInKilometers
				}
			}

			console.log(sendData)
			Network.saveSalesAppointment(sendData).then(successSave, failSave);
		}
	}

	return module;
});

})();
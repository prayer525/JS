/**
 * Sales Confirmation Controller 
 *
 * @ Develop Desc 		: Sales Confirmation Controller
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
	 * declare Sales Confirmation Controller
	 */
	module.controller('AppointmentsSalesConfirmationController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.user'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsSalesConfirmationCtrl
								]);

	/**
	 * inject Sales Confirmation Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsSalesConfirmationCtrl($scope, $rootScope, $state, $window, $filter, 
																		Network, User, Utils, ROUTE_URL, CONSTANT) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.SALES_CONFIRMATION );

		// set progress step
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : $rootScope.progressStep
		};

		// move previous screen if you don't have meeting data
		// meeting에 데이터가 없으면 이전으로 이동한다.
		if ((!$rootScope.meeting.date ||
				!$rootScope.meeting.time) && !$rootScope.flagKMBE) {
			$window.history.back();
			return false;
		}

		var  dealerInfo = $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
			,address = dealerInfo.Street + ' ' + dealerInfo.Town
			,locale = Data.getData('Login').CultureCode
			// ,dateTime = moment($rootScope.meeting.date, 'YYYY-MM-DD').locale(locale).format('D MMM YYYY') + ' ' +
			// 			moment($rootScope.meeting.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')
			,dateTime = $rootScope.flagKMBE ? '' : moment($rootScope.meeting.date, 'YYYY-MM-DD').locale(locale).format('D MMM YYYY') + ' ' +
						moment($rootScope.meeting.time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm')
			// ,callbackByDealer = $filter('i18n')($rootScope.meeting.CallbackByDealer, $filter('booleanToYesNo')($rootScope.meeting.CallbackByDealer))

		// data biding
		$scope.CONSTANT			= CONSTANT;
		$scope.type 			= CONSTANT.SHOWROOM_TITLE_MEET_SALES_ADVISOR;
		$scope.typeString		= $filter('i18n')(CONSTANT.SHOWROOM_TITLE_MEET_SALES_ADVISOR, 'WS_7');
		$scope.subjects 		= $rootScope.meeting.subjects;
		$scope.subjectsString	= $filter('i18n')($rootScope.meeting.subjects, $filter('replaceToCodeInAppointmentType')($rootScope.meeting.subjects) );
		$scope.question 		= $rootScope.meeting.question;
		$scope.dealerName 		= dealerInfo.Name;
		$scope.dealerAddress 	= address;
		$scope.dateTime 		= dateTime;
		$scope.comment 			= $rootScope.meeting.comment;
		// $scope.callbackByDealer = callbackByDealer;
		$scope.callbackByDealer = "true";

		$scope.modify = function(flag) {
			// change Appointments type
			if (flag === CONSTANT.MODIFY_TYPE) {
				$window.history.go(1-$rootScope.progressStep);
				return false;
			}

			// change Selected Dealer
			if (flag === CONSTANT.MODIFY_DEALER) {
				$state.go(ROUTE_URL.SHOWROOM_DEALER_LIST, {
					removeStack: 1-$rootScope.progressStep
				});
				return false;
			}

			// change Selected Dealer
			if (flag === CONSTANT.MODIFY_MEETING_QUESTION) {
				$window.history.go(2-$rootScope.progressStep);
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

			// save service
			var  AppointmentTypeId 			= $scope.type
				,AppointmentQuestionTypeId 	= $rootScope.meeting.subjects
				,ModelName					= $rootScope.meeting.ModelName
				,Comment 					= $rootScope.meeting.comment
				,Question 					= $rootScope.meeting.question
				,ScheduledDate 				= $rootScope.meeting.dateTime
				,MileageFrom 				= $rootScope.meeting.mielageMin
				,MileageTo 					= $rootScope.meeting.mielageMax
				,PriceFrom 					= $rootScope.meeting.priceMin
				,PriceTo 					= $rootScope.meeting.priceMax
				,CurrentMileageInKilometers = $rootScope.meeting.currentMileage
				,CallbackByDealer 			= $scope.callbackByDealer == "true" ? true : false
				// ,CallbackByDealer 			= $rootScope.meeting.CallbackByDealer
				,Campaigns	 				= $rootScope.meeting.Campaigns
				,DealerSapCode 				= dealerInfo.DealerSapCode
				,CultureCode 				= $rootScope.user.loginInfo.CultureCode
				,vin 						= $rootScope.vehicle.selectedVehicleInfo.VIN
				,successSave = function(result) {
					var data = result.data;
					if (data.ResponseCode == 1) {
						Utils.log($filter('i18n')('Your Appointment Submission is successfully completed', 'Y1_6'));
						
						// current mileageInKilometers를 업데이트 한다.
						if (CurrentMileageInKilometers) {
							$rootScope.vehicle.selectedVehicleInfo.CurrentMileageInKilometers = CurrentMileageInKilometers
						}
						$rootScope.meeting = {};
						$rootScope.network = {};
						locationHistory = locationHistory.slice(0, 1);
						$window.history.go(-$rootScope.progressStep);
						return false;
					}
				}
				,failSave = function(result) {
					console.log('error: ', result)
				}
				,sendSaveData = {
					 AppointmentTypeId 			: AppointmentTypeId
					,AppointmentQuestionTypeId 	: AppointmentQuestionTypeId
					,ModelName					: ModelName
					,Comment 					: Comment
					,Question 					: Question
					,ScheduledDate 				: ScheduledDate
					,MileageFrom 				: MileageFrom
					,MileageTo 					: MileageTo
					,PriceFrom 					: PriceFrom
					,PriceTo 					: PriceTo
					,CallbackByDealer 			: CallbackByDealer
					,Campaigns					: Campaigns
					,DealerSapCode				: DealerSapCode
					,CultureCode 				: CultureCode
				}

			// update mileage
			var  customerId 				= $rootScope.user.loginInfo.CustomerId
				,successLocation = function(result) {
					var result = result.data
					if (result.ResponseCode == '1') {
						
						// update mileage client 처리해야함 
						User.setVehiclesMilage(CurrentMileageInKilometers).then(function(){
							// save service
							console.log(sendSaveData)
							Network.saveSalesAppointment(sendSaveData).then(successSave, failSave);
						})
						return false;
					}
				}
				,failLocation = function(result) {
					console.log('error, ', result)
				}
				,sendLocationData = {
					 CustomerId 			: customerId
					,VIN 					: vin
					,MileageInKilometers 	: CurrentMileageInKilometers
				}

			if (AppointmentQuestionTypeId == 'TradeIn') {
				// update mileage
				sendSaveData.Vehicle = {
					 VIN 						: exRHMEncrypt(vin)
					,CurrentMileageInKilometers	: CurrentMileageInKilometers
				}

				console.log(sendLocationData)
				Network.updateMileage(sendLocationData).then(successLocation, failLocation);
			} else {
				// save service
				console.log(sendSaveData)
				Network.saveSalesAppointment(sendSaveData).then(successSave, failSave);
			}
		}
	}

	return module;
});

})();
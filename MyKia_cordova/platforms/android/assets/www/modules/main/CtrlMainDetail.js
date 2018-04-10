/**
 * My Appointments Detail Controller
 *
 * @ Develop Desc 		: Appointments Detail Controller
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
	 * declare appointments Detail Controller
	 */
	module.controller('AppointmentsDetailController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$stateParams'
									,'$window'
									,'$filter'
									,'service.network'
									,'CONSTANT'
									,'ROUTE_URL'
									,AppointmentsDetailCtrl
								]);

	/**
	 * inject My Appointments Detail Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 * @ ROUTE_URL			: Controller contant
	 */
	function AppointmentsDetailCtrl($scope, $rootScope, $state, $stateParams, $window, $filter, 
																		Network, CONSTANT, ROUTE_URL) {

		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.MAIN_DETAIL );
		
		var appointmentId = $stateParams.appointmentId
		if (!appointmentId) {
			$window.history.back();
			return false;
		}

		var  cultureCode = $rootScope.user.loginInfo.CultureCode
			,successCampaign = function(result) {
				// 2.27.3 Get Appointment Details
				var  appointment = result.data;

				$scope.CONSTANT						= CONSTANT;				
				$scope.appointmentDetail 			= appointment.Sales || appointment.Service;
				$scope.appointmentDealer 			= appointment.Dealer;
				$scope.appointmentScheduledDate 	= appointment.ScheduledDate;
				$scope.type 						= '';
				$scope.Comment						= appointment.Comment;
				$scope.CallbackByDealer				= $filter('i18n')(appointment.CallbackByDealer, $filter('booleanToYesNo')(appointment.CallbackByDealer));

				// Sales
				if(appointment.Sales){
					$scope.type = $scope.appointmentDetail.AppointmentType;
					$scope.appointmentDetail.AppointmentTypeString = $filter('i18n')( $scope.appointmentDetail.AppointmentType, $filter('replaceToCodeInAppointmentType')($scope.appointmentDetail.AppointmentType) )
					$scope.question = $scope.appointmentDetail.Question;

					if($scope.type == CONSTANT.SHOWROOM_TITLE_MEET_SALES_ADVISOR){
						$scope.appointmentMeetQuestion 	= true;
						$scope.subjectsString 			= $filter('i18n')( $scope.appointmentDetail.AppointmentQuestionType, $filter('replaceToCodeInAppointmentType')($scope.appointmentDetail.AppointmentQuestionType) );
					}else{
						$scope.modelName = $scope.appointmentDetail.ModelName;
					}
				}
				// Service
				else{
					if($rootScope.i18n['WS_disclaimer_html']){
					 	$scope._WS_disclaimer = 'WS_disclaimer_html';
					 }else{
					 	$scope._WS_disclaimer = 'WS_disclaimer';
					 }
					$scope.type = 'service';
					$scope.appointmentDetail.AppointmentTypeString = $filter('i18n')('Workshop', 'W0_14');
					$scope.appointmentDetail.priceDescription = $filter('i18n')('Legal Disclaimer', $scope._WS_disclaimer)

					/* get vehicle name from local storage */
					/* 자동차 명은 따로 내려오지 않으니 local data에서 찾는다. */
					$scope.vehicles = $rootScope.vehicle.vehicleInfo.Vehicles;
					angular.forEach($scope.vehicles, function(_vehicles){
						if(_vehicles.VIN == exRHMDecrypt($scope.appointmentDetail.Vin)){
							$scope.carModel = _vehicles.VehicleName;
						}
					});

					// Transportation Option
					if($scope.appointmentDetail.TransportOption != null){
						$scope.transportOptionString = $filter('i18n')($scope.appointmentDetail.TransportOption, $filter('transportOptionString')($scope.appointmentDetail.TransportOption) );
					}

				}
				$scope.scheduleStatus = $filter('i18n')( $filter('convertStatus')(appointment.AppointmentStatus), $filter('convertStatus')(appointment.AppointmentStatus));

				console.log(appointment)
			}
			,failCampaign = function(result) {

			}
			,sendData = {
				 AppointmentId 	: appointmentId
			}

		// 2.27.3 Get Appointment Details
		Network.getAppointmentDetails(sendData).then(successCampaign, failCampaign);

		// data binding
		$scope.getScheduleDate = function() {
			var locale = Data.getData('Login').CultureCode;
			
			return moment($scope.appointmentScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale($rootScope.momentCode).format("lll");
		}

		//console.log(appointmentId)
		$scope.nextstep = function() {
			
		}
	}

	return module;
});

})();


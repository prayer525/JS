/**
 * Workshop Main Controller 
 *
 * @ Develop Desc 		: Workshop Main Controller
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
	 * declare Workshop Main Controller
	 */
	module.controller('AppointmentsWorkshopController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'service.user'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsWorkshopCtrl
								]);

	/**
	 * inject Workshop Main Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsWorkshopCtrl($scope, $rootScope, $state, $filter, 
															Network, User, Utils, ROUTE_URL, CONSTANT) {
		var  vehicles = $rootScope.vehicle.vehicleInfo.Vehicles
			,selectedVerhicle = $rootScope.vehicle.selectedVehicleIndex
			,vehicleInfo = vehicles[selectedVerhicle]

		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.WORKSHOP );

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : 4
			,current : 1
		};

		// data binding
		$scope.CONSTANT 		= CONSTANT;
		$scope.vehicles 		= vehicles;
		$scope.vehicleName 		= vehicleInfo.VehicleName;
		$scope.oldMileage 		= vehicleInfo.CurrentMileageInKilometers;
		$scope.mileage 			= vehicleInfo.CurrentMileageInKilometers;
		$scope.registeration 	= moment(vehicleInfo.RegistrationDate, 'YYYYMMDDHHmmSS').locale($rootScope.momentCode).format("L");
		$scope.dealer 			= $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
		$scope.dealer.FullAddress = $scope.dealer.Street + ' ' + $scope.dealer.Town;
		$rootScope.changeDealer.dealerType = null;
		$scope.vehicle = {
			 VehicleImageUrl 		: vehicleInfo.VehicleImageUrl
			,VehicleImageExtension 	: vehicleInfo.VehicleImageExtension
			,VehicleImage 			: vehicleInfo.VehicleImage
		}
		$scope.isShowPlate 		= !!vehicleInfo.Licenseplate && $rootScope.user.detailsInfo.MarketId === 'KMSE';
		$scope.plate 			= vehicleInfo.Licenseplate;

		// move to Contact Dealer screen Release 1.2
		// Contact Dealer로 이동 Release 1.2 화면으로 이동한다.
		$scope.goDealerDetail = function() {
			var url;
			
			if (!$rootScope.user.detailsInfo.SecondDealer) {
				// other dealer
				// 기타 딜러
				url = 'mk_c01_0001.html';
			} else {
				// sweden dealer
				// 스웨덴 딜러
				url = 'mk_c01_0002.html';
			}
			Utils.link(url, {
				param: {
					stackFlag: 'BACK'
				}
			})
		}

		// change vehicle
		// 자동차 변경
		$scope.changeVehicle = function() {
			$state.go(ROUTE_URL.WORKSHOP_VEHICLE);
		}

		$scope.getVehicleImage = function(index) {
			return $scope.vehicle['VehicleImageUrl'];
		}
		
		$scope.nextstep = function() {
			if (!angular.isNumber( parseInt($scope.mileage, 10) ) ||
				$scope.mileage == '' || 
				$scope.mileage == '0' || 
				$scope.mileage > 2200000
			) {
				Utils.log($filter('i18n')('Not valid input of Mileage. Please try it again', 'Y2_6'));
				$scope.mileage = $scope.oldMileage;
				return false;
			}

			if ($scope.oldMileage == $scope.mileage) {
				// move next screen if you don't change mileage information
				// 마일리지를 변경하지 않으면 다음페이지로 이동한다.
				$state.go(ROUTE_URL.WORKSHOP_APPOINTMENT);
				return false;
			}

			// move next screen after changed mileage information
			// 마일리지를 업데이트 한후 다음 페이지로 이동한다.
			var  customerId = $rootScope.user.loginInfo.CustomerId
				,vin = $rootScope.vehicle.selectedVehicleInfo.VIN
				,successLocation = function(result) {
					var result = result.data
					if (result.ResponseCode == '1') {
						// update mileage client
						// update mileage client 처리해야함 
						vehicleInfo.CurrentMileageInKilometers = $scope.mileage;
						User.setVehiclesMilage($scope.mileage).then(function(){
							Utils.log($filter('i18n')('Mileage update is completed successfully', 'Y2_11'));
							$state.go(ROUTE_URL.WORKSHOP_APPOINTMENT);
							return false;
						})
					}
				}
				,failLocation = function(result) {
					console.log('error, ', result)
				}
				,sendData = {
					 CustomerId 			: customerId
					,VIN 					: vin
					,MileageInKilometers 	: $scope.mileage
				}

			Network.updateMileage(sendData).then(successLocation, failLocation);

		};
	}

	return module;
});

})();
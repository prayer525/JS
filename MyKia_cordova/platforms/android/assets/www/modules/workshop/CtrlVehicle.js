/**
 * Workshop Vehicle Controller
 *
 * @ Develop Desc 		: Appointments Vehicle Controller
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
], function(module) {

	/**
	 * declare Workshop Vehicle Controller
	 */
	module.controller('AppointmentsWorkshopVehicleController', [
									 '$scope'
									,'$rootScope'
									,'$window'
									,'$stateParams'
									,'ROUTE_URL'
									,AppointmentsWorkshopVehicleCtrl
								]);

	/**
	 * inject Workshop Vehicle Controller into module
	 * @ $scope				: angular scope
	 */
	function AppointmentsWorkshopVehicleCtrl($scope, $rootScope, $window, $stateParams, ROUTE_URL) {
		
		var removeStack = $stateParams.removeStack || -1
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.WORKSHOP_VEHICLE );
		
		// data binding
		$scope.title = 'The list of Vehicle that in owned by yours';
		$scope.vehicles = $rootScope.vehicle.vehicleInfo.Vehicles;
		$scope.selectedMyVehicle = $rootScope.vehicle.selectedVehicleIndex;
		$scope.isShowPlate 		= !!$scope.vehicles.Licenseplate && $rootScope.user.detailsInfo.MarketId === 'KMSE';
		$scope.plate 			= $scope.vehicles.Licenseplate;
		
		// selection vehicle
		// 자동차를 선택한다.
		$scope.selectedVehicle = function(index) {
			$rootScope.vehicle.selectedVehicleIndex = index;
			$rootScope.vehicle.selectedVehicleInfo = $scope.vehicles[ index ];
			$scope.selectedMyVehicle = index;
			//MApi.storage(Storage.selectedVehicle, index);
			Data.setData('selectedVehicle', $scope.vehicles[ index ]);
			Data.setData('selectedVehicleIndex', index);
		}

		$scope.getVehicleImage = function(index) {
			return $scope.vehicles[index]['VehicleImageUrl'];
		}

		$scope.nextstep = function() {
			$window.history.go(removeStack);
		}
	}

	return module;
});

})();
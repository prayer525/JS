/**
 * Get A Quote Model Controller 
 *
 * @ Develop Desc 		: Get A Quote Model Controller
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
	 * declare appointments Controller
	 */
	module.controller('AppointmentsQuoteModelController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,AppointmentsQuoteModelCtrl
								]);

	/**
	 * inject My Appointments Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsQuoteModelCtrl($scope, $rootScope, $state, $filter, 
																Network, Utils, ROUTE_URL) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.QUOTE_MODEL );

		// set progress step
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : 2
		};
		
		// 2.8 Get All vehicle model images
		var  successVehicle = function(result) {
				var lists = result.data.ModelImages;
				//console.log(lists)
				$scope.vehicles = lists;
			}
			,failVehicle = function(result) {
				console.log('error, ', result)
			}
			,dealerInfo 		= $rootScope.dealer.dealerInfo
			,sendData 	= {
				MarketId 		: dealerInfo.MarketId
			}
		Network.getAllVehicleImages(sendData).then(successVehicle, failVehicle);

		// data biding
		$scope.selectedVerhicle = null;
		
		// selection vehicle
		// 자동차를 선택함
		$scope.setVehicle = function(index) {
			$scope.selectedVerhicle = index;
		}

		$scope.getVehicleImage = function(index) {
			return $scope.vehicles[index]['VehicleThumbnailUrl'];
		}

		// next step
		// 다음단계
		$scope.nextstep = function() {
			var selectedVerhicle = $scope.selectedVerhicle

			if ( $.isNumeric(selectedVerhicle) ) {
				$rootScope.quote.ModelName = $scope.vehicles[selectedVerhicle].VehicleModelName
    			$rootScope.quote.SiebelModelCode = $scope.vehicles[selectedVerhicle].VehicleCode
				$state.go(ROUTE_URL.SHOWROOM_DATE_PICKER);
				$rootScope.quote.Question = $scope.question;
				
				//console.log($rootScope.quote)

				if($rootScope.flagKMBE){
					$state.go(ROUTE_URL.QUOTE_CONFIRMATION);
				}else{
					$state.go(ROUTE_URL.QUOTE_DATE_PICKER);
				}

				//$state.go(ROUTE_URL.QUOTE_DATE_PICKER);
				return false;
			}
			Utils.log($filter('i18n')('Please select the car model', 'Y1_11'));
			return false;
		}
	}

	return module;
});

})();
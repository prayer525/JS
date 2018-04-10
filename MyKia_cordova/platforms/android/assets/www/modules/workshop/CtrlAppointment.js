/**
 * Workshop > Appointment Controller 
 *
 * @ Develop Desc 		: Workshop > Appointment Controller
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
	 * declare Workshop > Appointment Controller
	 */
	module.controller('AppointmentsWorkshopAppointmentController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'ngDialog'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'TEMPLATE_STRING'
									,'CONSTANT'
									,AppointmentsWorkshopAppointmentCtrl
								]);

	/**
	 * inject Workshop > Appointment Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsWorkshopAppointmentCtrl($scope, $rootScope, $state, $filter
															,ngDialog, Network, Utils, ROUTE_URL, TEMPLATE_STRING, CONSTANT) {
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.WORKSHOP_APPOINTMENT );

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : 4
			,current : 2
		};

		var  vehicles = $rootScope.vehicle
			,vehicleSelectedIndex = vehicles.selectedVehicleIndex
			,myVehicle = vehicles.selectedVehicleInfo
			,myVehicleList = vehicles.vehicleInfo.Vehicles
			,dealer = $rootScope.dealer.dealerInfo
			,locale = Data.getData('Login').CultureCode

		// data binding
		$scope.CONSTANT							= CONSTANT;
		$scope.selectedSession 					= null;
		$scope.myVehicle 						= myVehicle;
		$scope.myVehicle.RegistrationDateFormat = moment(myVehicle.RegistrationDate, 'YYYYMMDD').locale($rootScope.momentCode).format("LL");
		$scope.myVehicle.NextMotDateFormat 		= moment(myVehicle.NextMotDate, 'YYYY-MM-DD').locale($rootScope.momentCode).format("LL");

		/*
		 * session1: Routine Maintenance object
		 */
		$scope.routine = {
			 title 				: $filter('i18n')('Routine Maintenance', 'WW_21')
			,selectedItemIndex 	: angular.isNumber( $rootScope.workshop.selectedItemIndex ) ? $rootScope.workshop.selectedItemIndex : null
			,lists 				: []
			,selectItem 		: function(idx) {
				// select Routine Maintenance
				// Routine Maintenance 을 선택한다.
				if ($scope.routine.selectedItemIndex == idx) {
					$scope.routine.selectedItemIndex = null;
				} else {
					$scope.routine.selectedItemIndex = idx;
				}
				getPrice();
			}
			,showDetailInfo 	: function(idx, item) {
				// display popup
				// 팝업창을 표시한다.
				openPopup(idx, item);
			}
			,selectDetailInfo 	: function(idx) {
				// close popup
				// 팝업을 닫는다.
				if ($scope.routine.selectedItemIndex == idx) {
					$scope.routine.selectedItemIndex = null;
				} else {
					$scope.routine.selectedItemIndex = idx;
				}
				closePopup();
			}
		}

		/*
		 * session2: Repair object
		 */
		$scope.repair = {
			 title 				: $filter('i18n')('Repair', 'WW_22')
			,selectedItems		: $rootScope.workshop.repairSelectedItems || []
			,lists 				: []
			,elseNeed 			: $rootScope.workshop.elseNeed || ''
			,selectItem 		: function(idx) {
				// Repair 를 선택한다.
				$scope.repair.selectedItems = Utils.selectItems( $scope.repair.selectedItems , idx );
				getPrice();
			}
			,isSelectedItem		: function(idx) {
				return Utils.hasSelectedItem( $scope.repair.selectedItems , idx );
			}
		}

		/*
		 * session3: Maintenance Service object
		 */
		$scope.service = {
			 title 			: $filter('i18n')('Maintenance Service', 'WW_23')
			,isMot 			: $rootScope.workshop.isMot || false
			,selectItem 	: function() {
				// Maintenance Service를 선택한다.
				// TODO: 선택한 데이터 서버에 전송해야함
				if ($scope.service.isMot) {
					$scope.service.isMot = false;
					return false;
				}
				$scope.service.isMot = true;
			}
		}
		
		/*
		 * session4: Other object
		 */
		$scope.other = {
			 title 			: $filter('i18n')('Note to the dealer', 'W0_24')
			,comment 		: $rootScope.workshop.Other || ''
		}

		/*
		 * session5: Price object
		 */
		 if($rootScope.i18n['WS_disclaimer_html']){
		 	$scope._WS_disclaimer = 'WS_disclaimer_html';
		 }else{
		 	$scope._WS_disclaimer = 'WS_disclaimer';
		 }
		$scope.price = {
			 TotalPrice 	: $rootScope.workshop.price ? $rootScope.workshop.price.TotalPrice : 0
			,OriginalPrice 	: 0
			,Discount	 	: 0
			,description 	: $filter('i18n')('Legal Disclaimer', $scope._WS_disclaimer)
		}

		// toggle the accordion menu
		// 아코디언 메뉴를 토글한다.
		$scope.toggleSession = function(idx) {
			if ($scope.selectedSession == idx) {
				$scope.selectedSession = null;
				return false;
			}
			$scope.selectedSession = idx;
		}

		// call 2.27.3 Maintenance Operations
		var  successMaintenance = function(result) {
				var  servicePlan = result.data.ServicePlans
					,repairOption = result.data.RepairOptions
				
				//console.log(result.data)
				$scope.routine.lists = servicePlan;
				$scope.repair.lists = repairOption;
			}
			,failMaintenance = function(result) {
				console.log('error, ', result)
			}
			,sendMaintenanceData = {
				 VIN		: myVehicle.VIN
				,Mileage	: myVehicle.RegistrationMileageInKilometers
			}

		Network.getMaintenanceOperations(sendMaintenanceData).then(successMaintenance, failMaintenance);

		// display popup
		// 팝업창을 표시한다.
		function openPopup(idx, item) {
			var  distance 	= item.Distance
				,months 	= item.Months
				,id 		= item.Id

			// call 2.27.4 Maintenance Operation Details
			var  successDetail = function(result) {
					var  data = result.data
					$scope.popup = {
						 index  	: idx
						,title  	: 'Maintenance Detail'
						,distance 	: distance
						,months 	: months
						,contents	: data.InvoiceLines
					}
					ngDialog.open({
						 template 	: TEMPLATE_STRING.POPUP
						,className 	: 'ngdialog-theme-plain'
						,scope 		: $scope
					});
				}
				,failDetail = function(result) {
					console.log('error, ', result)
				}
				,sendDetailData = {
					 Id	: id
				}

			Network.getMaintenanceOperationDetails(sendDetailData).then(successDetail, failDetail);
		}

		// close popup
		// 팝업을 닫는다.
		function closePopup() {
			ngDialog.close();
		}

		// get price information
		// 가격정보를 가져온다.
		function getPrice() {
			// call 2.27.5 Get Maintenance Operations Price
			var  successPrice = function(result) {
					var  price = result.data
					//console.log(price);
					$scope.price.TotalPrice 	= price.TotalPrice;
					$scope.price.Discount 		= price.Discount;
					$scope.price.OriginalPrice 	= price.OriginalPrice;
					Utils.log($filter('i18n')('Cost Estimation', 'WW_25') + ' ' + price.TotalPrice + ' €');
				}
				,failPrice = function(result) {
					console.log('error, ', result)
				}
				,sendPriceData = {
					 DealerSapCode 	: dealer.DealerSapCode
					,ModelId 		: myVehicle.VehicleModelCode
					,Operations 	: getOptionsForPrice()
				}

			Network.getMaintenanceOperationsPrice(sendPriceData).then(successPrice, failPrice);
		}

		// get options for price calculation
		// price 계산을 위하여 옵션을 가져온다.
		function getOptionsForPrice() {
			var  routine_data = {}
				,options = []

			// get Repair option
			// Repair option을 가져온다.
			angular.forEach($scope.repair.selectedItems, function(_idx) {
				var repair_data = {
					 Code 		: $scope.repair.lists[_idx].Code
					,GroupVarId : $scope.repair.lists[_idx].GroupVarId
				}
				options.push(repair_data);
			});

			// get routine maintenance option
			// routine maintenance option을 가져온다.
			if ( angular.isNumber($scope.routine.selectedItemIndex) ) {
				$scope.routine.lists[$scope.routine.selectedItemIndex];
				routine_data = {
					 Code 		: $scope.routine.lists[$scope.routine.selectedItemIndex].Code
					,GroupVarId : $scope.routine.lists[$scope.routine.selectedItemIndex].GroupVarId
				}
				options.push(routine_data);
			}
			return options;
		}

		// get repair item
		// repair 아이템 가져오기
		function getRepairItem() {
			var options = [];

			// get Repair option
			// Repair option을 가져온다.
			angular.forEach($scope.repair.selectedItems, function(_idx) {
				options.push($scope.repair.lists[_idx]);
			});
			return options;
		}

		// next step
		$scope.nextstep = function() {
			var requiredMsg = $filter('i18n')('Required field', 'W0_20');
			$rootScope.workshop.price = $scope.price;
			$rootScope.workshop.service = $scope.routine.lists[ $scope.routine.selectedItemIndex ] || {};
			$rootScope.workshop.repair = getRepairItem();
			$rootScope.workshop.repairSelectedItems = $scope.repair.selectedItems;
			$rootScope.workshop.Other = $scope.other.comment || '';
			$rootScope.workshop.elseNeed = $scope.repair.elseNeed;
			$rootScope.workshop.isMot = $scope.service.isMot;
			$rootScope.workshop.selectedItemIndex = $scope.routine.selectedItemIndex;
			$rootScope.workshop.ModelId = $scope.routine.lists[0].ModelId;
			
			/*
			** $rootScope.workshop.service is data type change
			** 'String' to {Object}
			*/
			// if (!$rootScope.workshop.service && 
			if (Object.keys($rootScope.workshop.service).length === 0 && 
							$rootScope.workshop.repair.length == 0 && 
							$rootScope.workshop.isMot == false &&
							$rootScope.workshop.Other == ''
						) {

				Utils.log(requiredMsg);
				return false;
			}

			if ($rootScope.workshop.repair.length > 0 && $rootScope.workshop.elseNeed == '') {
				$scope.selectedSession = CONSTANT.WORKSHOP_APPOINTMENT_REPAIR;
				Utils.log($filter('i18n')('This is required field', 'W0_20'));
				return false;
			}
			//console.log($rootScope.workshop)
			$state.go(ROUTE_URL.WORKSHOP_DATE_PICKER);
		};
	}

	return module;
});

})();
/**
 * Workshop Date Picker Controller 
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
	 * declare Workshop Date Picker Controller
	 */
	module.controller('AppointmentsWorkshopDateController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'$window'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,AppointmentsWorkshopDateCtrl
								]);

	/**
	 * inject Workshop Date Picker Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsWorkshopDateCtrl($scope, $rootScope, $state, $filter, $window, 
																	Network, Utils, ROUTE_URL) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.WORKSHOP_DATE_PICKER);

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : 4
			,current : 3
		};

		// move previous screen if you don't have Appointment data
		// Appointment 데이터가 없으면 이전으로 이동한다.
		if (!$rootScope.workshop.service && 
						!$rootScope.workshop.repair && 
						!$rootScope.workshop.isMot &&
						!$rootScope.workshop.Other
					) {
			$window.history.back();
			return false;
		}

		$scope.callbackByDealer = false;

		// variabe declaration for kme-checkbox-group
		// kme-checkbox-group 에서 사용하는 변수 선언
		$scope.kmeCheckboxGroup = {
			selectedCampaign : []
		}

		// 2.37.1 TransportOptions
		var transOptionSuccess = function(result) {
			var transport = result.data.Values;
			$scope.transports = transport;

			angular.forEach($scope.transports, function(_transports){
				_transports.transportOptionString = $filter('i18n')( $filter('transportOptionString')(_transports.ValueDescription) )
			})
		}
		,transOptionFail = function(result) {
			console.log('error', result)
		}
		,sendTransOptionData = {
			 CultureCode 	: $rootScope.user.loginInfo.CultureCode
			,ValueType 		: 'TransportOptions'
		}

		// dealer Available API request Parameter (into directive)
		$scope.dealerAvailable = {
			 //DealerSapCode 	: $rootScope.dealer.dealerInfo.DealerSapCode
			 DealerSapCode 	: $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo.DealerSapCode : $rootScope.changeDealer.DealerSapCode
			,AgendaType : 1
		}

		// get campaign list
		// it driven from inside of Directive > kmeCalendar 
		// 캠페인 리스트를 불러온다.
		// Directive > kmeCalendar 내부에서 작동시킴
		$scope.getCampaigns = function() {
			$scope.selectedCampaign = null;
			
			// 2.35 Get Campaign List
			var  successCampaign = function(result) {
					var lists = result.data.Campaigns;
					//console.log(lists)
					for(var list in lists){
						lists[list].CampaignStartDate = moment(lists[list].CampaignStartDate).locale($rootScope.momentCode).format("L")
						lists[list].CampaignEndDate = moment(lists[list].CampaignEndDate).locale($rootScope.momentCode).format("L")
					}
					$scope.campaigns = lists;

					// call 2.37.1 TransportOptions
					Network.getValuesTransportOptions(sendTransOptionData).then(transOptionSuccess, transOptionFail);
				}
				,failCampaign = function(result) {
					console.log('error, ', result)
				}
				//,dealerInfo 		= $rootScope.dealer.dealerInfo
				,dealerInfo 		= $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
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
					,StartDate 		: $scope.month.format('YYYY-MM-01')
					,EndDate 		: $scope.month.endOf('month').format('YYYY-MM-DD')
					,DealerCategory : dealerCategory
				}
			Network.getCampaignList(sendCampaignData).then(successCampaign, failCampaign);
		}

		// Campaign Detail
		$scope.selectedCampaign = null;
		$scope.viewCampaign = function(campaign, idx) {
			if ($scope.selectedCampaign == idx) {
				$scope.selectedCampaign = null;
				return false;
			}
			
			$scope.selectedCampaign = idx;

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
			Network.getCampaignsDetails(sendData).then(successCampaign, failCampaign);
		}

		$scope.transportation = {
			selectOptionIdx:false,
			showTransportOption:false,
			selectTransOption:function(index){
				this.selectOptionIdx = true;
			}
		}

		$scope.toggleTransportation = function() {
			$scope.transportation.showTransportOption = !$scope.transportation.showTransportOption;
			if ($scope.transportation.showTransportOption) {
				setTimeout(function(){
					window.scrollTo(0, 500);
				}, 400)
			}
		}

		$scope.nextstep = function() {
			var  date
				,time
				,callbackByDealer

			if (!$scope.selected) {
				Utils.log($filter('i18n')('Please select the date of appointment', 'Y1_8'));
				return false;
			}
			if ( !$.isNumeric($scope.selectedTime) ) {
				Utils.log($filter('i18n')('Please select the time of appointment', 'Y1_9'));
				return false;
			}

			date = $scope.selected.format('YYYY-MM-DD');
			time = $scope.selectedTimeObj;
			callbackByDealer = $scope.callbackByDealer;

			$rootScope.workshop.date = date;
			$rootScope.workshop.time = time;
			$rootScope.workshop.dateTime = $scope.selected.format('YYYY-MM-DDT') + moment(time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm:SS');
			$rootScope.workshop.transport = $scope.selectedTransportOption;
			$rootScope.workshop.CallbackByDealer = callbackByDealer;
			//console.log($rootScope.workshop)
			$state.go(ROUTE_URL.WORKSHOP_CONFIRMATION);
		};
	}

	return module;
});

})();
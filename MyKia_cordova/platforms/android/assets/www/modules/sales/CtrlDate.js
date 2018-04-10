/**
 * Sales > Date Picker Controller 
 *
 * @ Develop Desc 		: Sales > Date Picker Controller
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
	 * declare Sales > Date Picker Controller
	 */
	module.controller('AppointmentsSalesDateController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'$window'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,AppointmentsSalesDateCtrl
								]);

	/**
	 * inject Sales > Date Picker Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsSalesDateCtrl($scope, $rootScope, $state, $filter, $window, 
																		Network, Utils, ROUTE_URL) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.SALES_DATE_PICKER );

		// set progress step
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : 4
			,current : 3
		};

		// $scope.callbackByDealer = false;
		$scope.comment 			= null;
		
		// variable declaration for kme-checkbox-group
		// kme-checkbox-group 에서 사용하는 변수 선언
		$scope.kmeCheckboxGroup = {
			selectedCampaign : []
		}
		
		// move previous screen if you don't have meeting data
		// meeting에 데이터가 없으면 이전으로 이동한다.
		if (!$rootScope.meeting.subjects) {
			$window.history.back();
			return false;
		}

		// dealer Available API request Parameter (into directive)
		$scope.dealerAvailable = {
			//DealerSapCode 	: $rootScope.dealer.dealerInfo.DealerSapCode
			 DealerSapCode 	: $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo.DealerSapCode : $rootScope.changeDealer.DealerSapCode
			,AgendaType : 0
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
					console.log(lists)
					for(var list in lists){
						lists[list].CampaignStartDate = moment(lists[list].CampaignStartDate).locale($rootScope.momentCode).format("L")
						lists[list].CampaignEndDate = moment(lists[list].CampaignEndDate).locale($rootScope.momentCode).format("L")
					}
					$scope.campaigns = lists;
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
		
		$scope.nextstep = function() {
			var  date
				,time
				,comment
				// ,callbackByDealer

			if (!$scope.selected) {
				Utils.log($filter('i18n')('Please select the date of appointment', 'Y1_8'));
				return false;
			}
			if ( !$.isNumeric($scope.selectedTime) ) {
				Utils.log($filter('i18n')('Please select the time of appointment', 'Y1_9'));
				return false;
			}

			date = $scope.selected.format('YYYY-MM-DD');
			comment = $scope.comment;
			// callbackByDealer = $scope.callbackByDealer;
			time = $scope.selectedTimeObj;

			$rootScope.meeting.date = date;
			$rootScope.meeting.time = time;
			$rootScope.meeting.dateTime = $scope.selected.format('YYYY-MM-DDT') + moment(time.Start, 'YYYY-MM-DD HH:mm:SS').format('HH:mm:SS');
			$rootScope.meeting.comment = comment;
			// $rootScope.meeting.CallbackByDealer = callbackByDealer;
			$rootScope.meeting.Campaigns = $scope.kmeCheckboxGroup.selectedCampaign;
			
			console.log($rootScope.meeting)
			$state.go(ROUTE_URL.SALES_CONFIRMATION);
		}
	}

	return module;
});

})();
/**
 * Showroom Dealer Search Controller
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
], function(module) {

	/**
	 * declare showroom Controller
	 */
	module.controller('AppointmentsShowroomDealerSearchController', [
									 '$scope'
									,'$rootScope'
									,'$stateParams'
									,'$state'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'service.user'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsShowroomDealerSearchCtrl
								]);

	/**
	 * inject Showroom Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsShowroomDealerSearchCtrl($scope, $rootScope, $stateParams, $state, $window, $filter,
															Network, Utils, User, ROUTE_URL, CONSTANT) {
		
		// set navigation title
		// 상단 Navigation 설정
		$scope.setNaviTitle( ROUTE_URL.SHOWROOM_DEALER_SEARCH );

		$scope.CONSTANT = CONSTANT;
		$scope.noResult = false;
		$scope.searchKeyword = '';
		if ($rootScope.searchResult) {
			$scope.searchDealers = $rootScope.searchResult.dealers;
			$scope.searchKeyword = $rootScope.searchResult.keyword;
			$scope.noResult = $scope.searchDealers.length;
		}
		$scope.placeholderText = $filter('i18n')( 'ZIP, City or Dealer name', 'F1_10');
		$scope.userInfo = $rootScope.user.detailsInfo

		// search dealer
		// 딜러를 검색한다.
		$scope.searchDealer = function(place) {
			if ($scope.searchKeyword == '') {
				return false;
			}
			$scope.searchDealers = null;
			$scope.$apply();

			var  customerId = $rootScope.user.loginInfo.CustomerId
				,position = $rootScope.user.position
				,successSearch = function(result) {
					$scope.searchDealers = result.data.Dealers;
					$rootScope.searchResult = {
						 dealers: $scope.searchDealers
						,keyword: $scope.searchKeyword
					}
					$scope.noResult = $scope.searchDealers.length
					console.log($scope.searchDealers)
				}
				,failSearch = function(result) {
					console.log('error, ', result);
				}
				,sendData = {
					 CustomerId 	: customerId
					,Latitude 		: place.geometry.location.lat()
					,Longitude 		: place.geometry.location.lng()
					,LimitToMarket	: true
					,DealerType 	: $stateParams.dealerType || 3
				}

			// 2.17 Get Dealer Searching
			$scope.viewportResize()
			Network.DealerSearching(sendData).then(successSearch, failSearch);
			console.log($scope.searchDealers)
		}

		// select dealer
		// 딜러를 선택한다.
		$scope.selectDealer = function(dealerSapCode) {
			$state.go(ROUTE_URL.SHOWROOM_DEALER_DETAIL, {
				 dealerSapCode 	: dealerSapCode
				,removeStack 	: $stateParams.removeStack || -3
			});
		}

		$scope.closeSearch = function() {
			$scope.viewportResize();
			$window.history.go(-1)
		}

		/*
		*	이슈 : Dealer Search 화면에서 auto complete 리스트 클릭시 화면이 resize 되어 footer 가 화면 중앙에 위치하는 현상 수정
		*	수정 : input 에 focus, blur 를 따로 처리, 리스트 클릭시 viewport 초기화
		*/
		$scope.viewportResize = function(){
			$('meta[name=viewport]').attr('content', 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no');
			$('meta[name=viewport]').attr('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
		}
	}

	return module;
});

})();
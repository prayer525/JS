/**
 * Showroom Main Controller 
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
	module.controller('AppointmentsShowroomDealerController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$stateParams'
									,'$filter'
									,'service.network'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsShowroomDealerCtrl
								]);

	/**
	 * inject Showroom Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsShowroomDealerCtrl($scope, $rootScope, $state, $stateParams, $filter,
																	Network, ROUTE_URL, CONSTANT) {
		var docBody = angular.element(document).find('body');
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.SHOWROOM_DEALER_LIST );

		/**
		* 이슈 : Map 에서 맵 확장 버튼으로 header, footer 영역을 안보이게 한후 뒤로가기로 화면을 벗어난 후 재진입 할 경우
		* 		딜러 리스트 화면에서 header, footer 영역이 사라진채로 나오는 문제
		* 해결 : 리스트 화면 처음 들어올 때 header, footer를 숨기는 클래스인 .full-size-map을 remove 시켜준다.
		*/
		docBody.attr('class', 'ng-scope');

		// dealer list
		// 딜러 리스트
		var  customerId = $rootScope.user.loginInfo.CustomerId
			,successLocation = function(result) {
				var dealers = result.data.Dealers
				$scope.dealers = dealers;
				$scope.search.tempDealers = dealers;
				$rootScope.reCenter();
			}
			,failLocation = function(result) {
				console.log('error, ', result)
			}
			,sendDealerData = {}

		// get dealer list
		// 딜러 리스트를 가져온다.
		$scope.dealer = $rootScope.dealer.dealerInfo;
		if ($rootScope.changeDealer.DealerSapCode) {
			$scope.dealer = $rootScope.changeDealer;
		}

		// get dealertype parameter and save (i cann't get a dealertype parameter when history back)
		// DealerType을 parameter 전달받아 저장함(history back시 parameter 전달 못받아서 임시저장함)
		if (!$rootScope.changeDealer.dealerType) {
			$rootScope.changeDealer.dealerType = $stateParams.dealerType || 3
		}
		
		loadDealerList();
		
		function loadDealerList() {
			sendDealerData = {
				 CustomerId 	: customerId
				,Latitude 		: $scope.dealer.GeoLatitude
				,Longitude 		: $scope.dealer.GeoLongitude
				// ,DealerType 	: $rootScope.changeDealer.dealerType
				,Radius 		: 30000
				,LimitToMarket	: true
			}
			$scope.postion = $rootScope.user.position;
			
			// 2.16 Get All Dealer Location
			Network.getDealerLocation(sendDealerData).then(successLocation, failLocation);
		}

		$scope.CONSTANT = CONSTANT;
		$scope.tabPage = CONSTANT.TAB_DEALER_LIST;
		$scope.showMapDetail = '';

		// selection dealer
		// 딜러를 선택함
		$scope.goDealerDetail = function(dealerSapCode) {
			$state.go(ROUTE_URL.SHOWROOM_DEALER_DETAIL, {
				 dealerSapCode 	: dealerSapCode
				,removeStack 	: $stateParams.removeStack || -3
				,pageTitle 		: ROUTE_URL.SHOWROOM_DEALER_LIST
			});
		}

		// search dealer
		// 딜러검색
		$scope.search = {
			 showSearch : false
			,placeholderText: $filter('i18n')( 'ZIP, City or Dealer name', 'F1_10')
			,tempDealers: []
			,tempSearches: []
		}
		$rootScope.onOptionEvent = function() {
			$scope.search.showSearch = !$scope.search.showSearch;
		}

		// 딜러를 검색한다.
		$scope.searchDealer = function(place) {
			if ($scope.searchKeyword == '') {
				return false;
			}
			$scope.place = place;
			$scope.searchDealers = null;
			$scope.$apply();

			var  customerId = $rootScope.user.loginInfo.CustomerId
				,position = $rootScope.user.position
				,successSearch = function(result) {
					$scope.searchDealers = result.data.Dealers;
					$scope.dealers = $scope.searchDealers;
					$scope.searchResult = {
						 dealers: $scope.searchDealers
						,keyword: $scope.searchKeyword
					}
					$scope.noResult = $scope.searchDealers.length
					if ($rootScope.reCenter) {
						$rootScope.reCenter();
					}
				}
				,failSearch = function(result) {
					console.log('error, ', result);
				}
				,sendData = {
					 CustomerId 	: customerId
					,Latitude 		: place.geometry.location.lat()
					,Longitude 		: place.geometry.location.lng()
					,LimitToMarket	: true
					// ,DealerType 	: $stateParams.dealerType || 3
					,Radius			: 30000
				}

			// 2.17 Get Dealer Searching
			$scope.viewportResize()
			Network.getDealerLocation(sendData).then(successSearch, failSearch);
		}
		$scope.searchKeyword = '';
		$scope.closeSearch = function() {
			$scope.search.showSearch = false;
			$scope.searchKeyword = '';
			$scope.place = null;
			$scope.searchDealers = null;
			$scope.dealers = $scope.search.tempDealers;
		}

		// Drag End시 재조회
		/*
		$scope.callbackDragEnd = function(map) {
			var  customerId = $rootScope.user.loginInfo.CustomerId
				,pos = {
					 latitude : map.getCenter().lat()
					,longitude : map.getCenter().lng()
				}
				,successSearch = function(result) {
					$scope.searchDealers = result.data.Dealers;
					$scope.dealers = $scope.searchDealers;
					$scope.searchResult = {
						 dealers: $scope.searchDealers
						,keyword: $scope.searchKeyword
					}
					$scope.noResult = $scope.searchDealers.length;
					//$rootScope.setCenter(pos);
					if ($rootScope.reCenter) {
						$rootScope.reCenter(pos);
					}
				}
				,failSearch = function(result) {
					console.log('error, ', result);
				}
				,sendData = {
					 CustomerId 	: customerId
					,Latitude 		: map.getCenter().lat()
					,Longitude 		: map.getCenter().lng()
					,LimitToMarket	: true
					,DealerType 	: $stateParams.dealerType || 3
				}

			// 2.17 Get Dealer Searching
			$scope.viewportResize();
			Network.DealerSearching(sendData).then(successSearch, failSearch);
		}
		*/

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
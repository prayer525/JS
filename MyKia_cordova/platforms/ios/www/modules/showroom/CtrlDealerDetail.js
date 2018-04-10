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
	module.controller('AppointmentsShowroomDealerDetailController', [
									 '$scope'
									,'$sce'
									,'$rootScope'
									,'$stateParams'
									,'$window'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsShowroomDealerDetailCtrl
								]);

	/**
	 * inject Showroom Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsShowroomDealerDetailCtrl($scope, $sce, $rootScope, $stateParams, $window, $filter,
															Network, Utils, ROUTE_URL, CONSTANT) {
		
		var  dealerSapCode = $stateParams.dealerSapCode
			,removeStack = $stateParams.removeStack
			,pageTitle = $stateParams.pageTitle || ROUTE_URL.SHOWROOM_DEALER_SEARCH

		// set navigation title
		// 상단 Navigation 설정
		$scope.setNaviTitle( pageTitle );

		if (!dealerSapCode) {
			$window.history.back();
			return false;
		}

		// get dealer information
		// 딜러정보를 불러온다.
		var  customerId = $rootScope.user.loginInfo.CustomerId
			,successDealer = function(result) {
				$scope.dealer = result.data;
				
				// if Dealer Opening Hour is null 
				// Dealer Opening Hour 가 null 일 경우
				if( $scope.dealer.OpeningHours.Sales.IsEmpty && $scope.dealer.OpeningHours.Service.IsEmpty ){
					$scope.dealerOpeningHour = true;
				}

				/*
				 * valiable for calling button
				 * 딜러 전화 번호의 전화 걸기 버튼 표시를 위한 변수
				 * $scope.dealerPhoneCnt = 0 : Sales or Service 만 있을 경우
											1 : Sales & Service 둘 다 있을 경우
											2 : 둘 다 없는 경우 (default)
				 */
				$scope.dealerPhoneCnt	= 2;

				/*
				 * valiable for email button
				 * 딜러 이메일 보내기 버튼 표시를 위한 변수
				 * $scope.dealerEmailCnt = 0 : Sales or Service 만 있을 경우
											1 : Sales & Service 둘 다 있을 경우
											2 : 둘 다 없는 경우 (default)
				 */
				$scope.dealerEmailCnt	= 2;

				// save phone information
				// 핸드폰 정보를 따로 저장한다 : 디자인 적용 문제로 인해 HTML 태그로 만들어야한다.
				// salesPhone 	: sales phone number
				// servicePhone : service phone number 
				if($scope.dealer.Phone != "" && $scope.dealer.PhoneService != ""){
					$scope.salesPhone 		= $scope.dealer.Phone;
					$scope.servicePhone		= $scope.dealer.PhoneService;
					$scope.dealerPhoneCnt	= 1;
				} else if($scope.dealer.Phone != "" && $scope.dealer.PhoneService == ""){
					$scope.salesPhone		= ''+$scope.dealer.Phone;
					$scope.dealerPhoneCnt	= 0;
				} else if($scope.dealer.Phone == "" && $scope.dealer.PhoneService != ""){
					$scope.salesPhone 		= ''+$scope.dealer.PhoneService;
					$scope.dealerPhoneCnt	= 0;
				}

				// save email information
				// 이메일 정보를 따로 저장한다 : 디자인 적용 문제로 인해 HTML 태그로 만들어야한다. 
				// salesEmail		: sales email address
				// serviceEmail		: service email address
				if($scope.dealer.Email.length > 1 && $scope.dealer.EmailService.length > 1){
					$scope.salesEmail		= $scope.dealer.Email;
					$scope.serviceEmail		= $scope.dealer.EmailService;
					$scope.dealerEmailCnt	= 1;
				} else if($scope.dealer.Email.length > 1 && $scope.dealer.EmailService.length <= 1){
					$scope.salesEmail		= $scope.dealer.Email;
					$scope.dealerEmailCnt	= 0;
				} else if($scope.dealer.Email.length <= 1 && $scope.dealer.EmailService.length > 1){
					$scope.salesEmail		= $scope.dealer.EmailService;
					$scope.dealerEmailCnt	= 0;
				}

				$scope.dealerPhontHtml = function(){
					return $sce.trustAsHtml($scope.dealerPhone);
				}

				$scope.dealerEmailHtml = function(){
					return $sce.trustAsHtml($scope.dealerEmail);
				}
			}
			,failDealer = function(result) {
				console.log('error, ', result);
			}
			,sendData = {
				 CustomerId 	: customerId
				,DealerSapCode 	: dealerSapCode
			}

		// 2.15 Get Dealer Information
		Network.getDealerInformation(sendData).then(successDealer, failDealer);

		$scope.CONSTANT = CONSTANT;
		$scope.userInfo = $rootScope.user.detailsInfo
		//$scope.tabPage = CONSTANT.TAB_DEALER_INFORMATION;

		/*
		 * contact for dealer
		 * 딜러 연락처
		 */
		// 구글지도
		$scope.goMap = function() {
			var  latitude = $scope.dealer.GeoLatitude
				,longitude = $scope.dealer.GeoLongitude
				,addr = 'daddr=' + latitude + ', ' + longitude

			exMapCall(addr);
		}

		// calling
		// 전화걸기
		$scope.goCall = function(number) {
			// M.sys.call(number);
		}

		// send email
		// 멜보내기
		$scope.goMail = function(mail) {
			/*
			M.sys.mail({
				 to: [mail]
				,subject : ""
				,contents : ""
			});
			*/
		}

		// link website
		// 홈페이지 링크
		$scope.goWebsite = function(website) {
			// M.apps.browser(website.replace(/ /g, ""));
		}

		// 다른 마켓의 딜러는 선택할 수 없다.
		$scope.canSelect = function() {
			if (!$scope.dealer.MarketId) {
				return false;
			}
			var  userCountryCode = $rootScope.user.detailsInfo.MarketId.toLowerCase()
				,dealerCountryCode = $scope.dealer.MarketId.toLowerCase()

			if (userCountryCode == dealerCountryCode) {
				return true;
			}
			return false;
		}

		// selection dealer
		// 딜러를 선택한다.
		$scope.changeDealer = function() {
			Utils.log($filter('i18n')('Dealer Change for appointment is completed successfully', 'Y2_8'));
			$rootScope.changeDealer = $scope.dealer;
			$rootScope.changeDealer.dealerType = null;
			$window.history.go( removeStack );
		}
	}

	return module;
});

})();
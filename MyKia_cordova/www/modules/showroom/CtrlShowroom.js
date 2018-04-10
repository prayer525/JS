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
	module.controller('AppointmentsShowroomController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsShowroomCtrl
								]);

	/**
	 * inject Showroom Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ $state 			: angular ui-route 에서 제공하는 $state 
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsShowroomCtrl($scope, $rootScope, $state, $filter, Network, Util, ROUTE_URL, CONSTANT) {
		var docBody = angular.element(document).find('body');
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.SHOWROOM );

		// Showroom main 이나 date & time 화면에서 진입할 경우 배경 클래스를 제거해준다.
		docBody.attr('class', 'ng-scope')

		// set progress step
		// 상단 progress step 설정
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : 1
		};

		$scope.CONSTANT = CONSTANT;
		$scope.dealer = $rootScope.changeDealer.DealerSapCode === undefined ? $rootScope.dealer.dealerInfo : $rootScope.changeDealer
		$scope.dealer.FullAddress = $scope.dealer.Street + ' ' + $scope.dealer.Town;
		$rootScope.changeDealer.dealerType = null;

		if( ($rootScope.user.loginInfo.CultureCode).toUpperCase() == 'ES-ES'){
			$scope.salesNone = true;
		}
		

		// add background image to footer
		// 화면 하단에 배경을 삽입한다.
		docBody.addClass('bg-type4')

		// move to contact dealer screen Release 1.2 
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
			Util.link(url, {
				param: {
					stackFlag: 'BACK'
				}
			});
		}

		$scope.nextstep = function(showroomCategoryId) {
			if ($scope.dealer.DealerType == CONSTANT.DEALER_TYPE_SERVICE) {
				var msg = $filter('i18n')('Your preferred Dealer does not have a showroom. Please select another dealer', 'WS_11')
				Util.log(msg);
				return false;
			}

			// next step to remove background image
			// 다음 단계로 진행하기 전 배경을 삭제 한다.
			docBody.removeClass('bg-type4')

			if (showroomCategoryId == CONSTANT.SHOWROOM_TEST_DRIVE) {
				$state.go(ROUTE_URL.SHOWROOM_DRIVE_LIST);
				return false;
			}
			if (showroomCategoryId == CONSTANT.SHOWROOM_SALES) {
				$state.go(ROUTE_URL.SALES_ADVISOR);
				return false;
			}
			if (showroomCategoryId == CONSTANT.SHOWROOM_QUOTE) {
				$state.go(ROUTE_URL.QUOTE_MODEL);
				return false;
			}
		}
	}

	return module;
});

})();
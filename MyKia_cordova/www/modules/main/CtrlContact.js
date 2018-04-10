/**
 * My Appointments Contact Controller 
 *
 * @ Develop Desc 		: Appointments Contact Controller
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
	module.controller('AppointmentsContactController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,AppointmentsContactCtrl
								]);

	/**
	 * inject My Appointments Not Available Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsContactCtrl($scope, $rootScope, $state, $filter, Network, Utils, ROUTE_URL) {
		
		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.MAIN_CONTACT );

		// it allows you to set a default login information
		// Login 정보로 기본 셋팅을 해준다.
		$scope.UserInfo = $rootScope.user.detailsInfo;
		
		$scope.subjects = [{"ValueTitle":i18n('D2_1', 'text')},
		                   {"ValueTitle":i18n('D2_2', 'text')},
		                   {"ValueTitle":i18n('D2_3', 'text')}];
		// data binding
		// 데이터 바인딩
		$scope.fill = {
			 firstname 		: $scope.UserInfo.FirstName
			,sirname 		: $scope.UserInfo.LastName
			,emailAddress 	: $scope.UserInfo.Email
			,phone 			: $scope.UserInfo.Phone
			,subject		: $scope.UserInfo.MarketId === 'KMDE' ? $scope.subjects[0] : ""
			,explain 		: null
		}

		$scope.filterRequire = $filter('i18n')('Required field','W0_20');

		$scope.nextstep = function() {
			if (!$scope.fill.firstname) {
				//M.pop.instance($scope.filterRequire);
				console.info($scope.filterRequire);
				return false;
			}
			if (!$scope.fill.sirname) {
				//M.pop.instance($scope.filterRequire);
				console.info($scope.filterRequire);
				return false;
			}
			if (!$scope.fill.emailAddress) {
				//M.pop.instance($scope.filterRequire);
				console.info($scope.filterRequire);
				return false;
			}
			if (!$scope.fill.phone) {
				//M.pop.instance($scope.filterRequire);
				console.info($scope.filterRequire);
				return false;
			}
			if (!$scope.fill.explain) {
				//M.pop.instance($scope.filterRequire);
				console.info($scope.filterRequire);
				return false;
			}
			var successSave = function(result) {
				var resultCode = result.data.ResponseCode;
				if (resultCode == 1) {
					//M.pop.instance($filter('i18n')('Success', 'Y2_21'));
					if($scope.UserInfo.MarketId === 'KMDE'){ // KMDE는 메인화면으로 이동하도록 변경
						// M.onBack();
						$state.go(ROUTE_URL.MAIN);
					}else{
						$state.go(ROUTE_URL.MAIN);
					}
					
					return false;
				}
				Utils.log($filter('i18n')('Data is not processed successfully', 'Y2_1'));
			}
			,failSave = function(result) {
				Utils.log($filter('i18n')('Connection to server was not sucessful. Please contact call center', 'S1_5'));
			}
			,sendData = {
				 FirstName 			: $scope.fill.firstname
				,LastName 			: $scope.fill.sirname
				,EmailAddress 		: $scope.fill.emailAddress
				,PhoneNumber 		: $scope.fill.phone
				,CultureCode 		: $rootScope.user.loginInfo.CultureCode
				,Question 			: exRHMEncrypt($scope.fill.explain)
				,Subject 			: exRHMEncrypt($scope.fill.subject)
			}

			// TODO: $scope.fill.explain 없음
			// TODO: 2.27.6.2 Save contact me for a service Email => EmailAddress 로 변경 요청하기
			Network.saveContactMeForAService(sendData).then(successSave, failSave);
		};
	}

	return module;
});

})();
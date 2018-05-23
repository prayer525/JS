/**
 * myKiaApp Module
 *
 * @ Develop Desc 		: Top level module to load sub modules
 * @ Develop Desc 		: 하위 모듈을 로드하는 myKiaApp 최상위 모듈
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

(function(){

'use strict';

define([
	 'angular'
	,'jquery'
	,'ui.router'
	,'ui.select'
	,'services/config'
	,'services/directive'
	,'services/filter'
	,'modules/main/index'
	,'modules/showroom/index'
	,'modules/sales/index'
	,'modules/quote/index'
	,'modules/workshop/index'
], function(angular) {

	/**
	 * declare angular module
	 * module name						: myKiaApp
	 * @ ui.router						: angular.route module
	 * @ myKiaApp.constants			 	: constant module
	 * @ myKiaApp.appointments		 	: My Appointments moduel
	 * @ myKiaApp.showroom			 	: Showroom module
	 */
	var kiaApp = angular.module('myKiaApp', [
									 'ui.router'
									,'ui.select'
									,'myKiaApp.constants'
									,'myKiaApp.appointments'
									,'myKiaApp.showroom'
									,'myKiaApp.sales'
									,'myKiaApp.quote'
									,'myKiaApp.workshop'
									,'myKiaApp.directive'
									,'myKiaApp.filter'
								]);
	
	/**
	 * declare App Controller
	 */
	kiaApp.controller('CtrlApp', [
							 '$rootScope'
							,'$q'
							,'$filter'
							,'service.user'
							,'service.utils'
							,'CONSTANT'
							,AppCtrl
						]);

	/**
	 * inject App Controller into module
	 * @ $scope				: angular scope
	 * @ CONSTANT			: CONSTANT 
	 */
	function AppCtrl($rootScope, $q, $filter, User, Util, CONSTANT) {
		var  _user = null
			,_dealer = null
			,_vehicle = null
			,_info = null
			,successPosition, failPosition

		// change screen title
		// 페이지 제목 변경
		$rootScope.setNaviTitle = function(route) {
			$rootScope.route = route;
		}

		$rootScope.focus = false;

		// data bining
		// rootScope 데이터 바인딩
		$rootScope.showroom 	= {};
		$rootScope.meeting 		= {};
		$rootScope.quote 		= {};
		$rootScope.workshop		= {};
		$rootScope.changeDealer = {};
		$rootScope.network 		= {};
		$rootScope.i18n 		= {};

		// get user information
		// user 정보를 가져온다.
		$rootScope.getUser = function() {
			var  deferred = $q.defer()
				,successIsLogin = function(result) {
					// login status information 
					// 로그인 여부 정보
					_user.isLogin = result;
					User.getLoginInfo().then(successLoginInfo, failLoginInfo);
				}
				,failIsLogin = function(result) {
					console.log('failIsLogin: ', result);
				}
				,successLoginInfo = function(result) {
					// login information
					// 로그인 정보
					_user.loginInfo = result;
					User.getDetailsInfo().then(successDetailInfo, failDetailInfo);
				}
				,failLoginInfo = function(result) {
					console.log('failLoginInfo: ', result);
				}
				,successDetailInfo = function(result) {
					// user detail information
					// 상세정보
					_user.detailsInfo = result;
					_getI18n(_user);
					deferred.resolve(_user);
					return deferred.promise;
				}
				,failDetailInfo = function(result) {
					console.log('failDetailInfo: ', result);
				}

			if (!_user) {
				// login status
				// 로그인 여부
				_user = {};
				User.isLogin().then(successIsLogin, failIsLogin);
			}

			deferred.resolve(_user);
			return deferred.promise;
		}
		
		// get dealer information
		// dealer 정보를 가져온다.
		$rootScope.getDealer = function() {
			var  deferred = $q.defer()
				,successDealerInfo = function(result) {
					// dealer info
					_dealer.dealerInfo = result;
					deferred.resolve(_dealer);
					return deferred.promise;
				}
				,failDealerInfo = function() {
					console.log('failDealerInfo, ', result);
				}

			if (!_dealer) {
				_dealer = {};
				User.getDealerInfo().then(successDealerInfo, failDealerInfo);
			}
			deferred.resolve(_dealer);
			return deferred.promise;
		}

		// get vehicle information
		// vehicle 정보를 가져온다.
		$rootScope.getVehicle = function() {
			var  deferred = $q.defer()
				,successVehicleInfo = function(result) {
					// vehicle information
					// vehicle 정보
					_vehicle.vehicleInfo = result;
					User.getSelectedVehiclesInfo().then(successSelectedVehicleInfo, failSelectedVehicleInfo);
				}
				,failVehicleInfo = function(result) {
					console.log('failVehicleInfo: ', result);
				}
				,successSelectedVehicleInfo = function(result) {
					// selected vehicle information
					// 선택된 vehicle 정보
					_vehicle.selectedVehicleInfo = result;
					User.getSelectedVehiclesIndex().then(successSelectedVehicleIndex, failSelectedVehicleIndex);
				}
				,failSelectedVehicleInfo = function(result) {
					console.log('failSelectedVehicleInfo: ', result);
				}
				,successSelectedVehicleIndex = function(result) {
					// selected index of vehicle information
					// 선택된 vehicle index 정보
					_vehicle.selectedVehicleIndex = result;
					deferred.resolve(_vehicle);
					return deferred.promise;
				}
				,failSelectedVehicleIndex = function(result) {
					console.log('failSelectedVehicleIndex: ', result);
				}

			if (!_vehicle) {
				// vehicle information
				// vehicle 정보
				_vehicle = {};
				User.getVehiclesInfo().then(successVehicleInfo, failVehicleInfo);
			}
			deferred.resolve(_vehicle);
			return deferred.promise;
		}

		// get other information
		// 기타 정보를 가져온다.
		$rootScope.getInfo = function() {
			var  deferred = $q.defer()
				,successBreakDownCall = function(result) {
					// breakDown Call information
					// breakDown Call 정보
					_info.breakDownCall = result;
					User.getPushInfo().then(successPushInfo, failPushInfo);
				}
				,failGetBreakDownCall = function(result) {
					console.log('failGetBreakDownCall: ', result);
				}
				,successPushInfo = function(result) {
					// push information
					// push 정보
					_info.pushInfo = result;
					User.getRecallInformation().then(successRecallInformation, failRecallInformation);
				}
				,failPushInfo = function(result) {
					console.log('failPushInfo: ', result);
				}
				,successRecallInformation = function(result) {
					// recall information
					// recall 정보
					_info.recallInfo = result;
					User.getSyncDate().then(successSyncData, failSyncData);
				}
				,failRecallInformation = function(result) {
					console.log('failRecallInformation: ', result);
				}
				,successSyncData = function(result) {
					// sync date information
					// sync date 정보
					_info.syncDate = result;
					deferred.resolve(_info);
					return deferred.promise;
				}
				,failSyncData = function(result) {
					console.log('failSyncData: ', result);
				}

			if (!_info) {
				// breakcall information
				// breakcall 정보
				_info = {};
				User.getBreakDownCall().then(successBreakDownCall, failGetBreakDownCall);
			}
			deferred.resolve(_info);
			return deferred.promise;
		}

		$rootScope.getUser().then(function(user) {
			$rootScope.user	= user;
		})
		$rootScope.getDealer().then(function(dealer) {
			$rootScope.dealer = dealer;
		});
		$rootScope.getVehicle().then(function(vehicle) {
			$rootScope.vehicle = vehicle;
		});
		$rootScope.getInfo().then(function(info) {
			$rootScope.info = info;
		})

		// remove spinner when page back
		// Back시 spinner를 제거한다.
		$rootScope.$on('$stateChangeStart',
			function(event, toState, toParams, fromState, fromParams){
				KmeSpinner.stop();
			}
		)

		// get multi language translation code
		// 다국어 번역코드를 가져온다.
		function _getI18n(_user) {
			var  cultureCode = _user.loginInfo.CultureCode
				,transSuccess = function(result) {
					$rootScope.i18n = result;
					Util.log( $filter('i18n')('My Appointments is loading...', 'Y2_17') );
				}
				,transFail = function(result) {
					console.log('transFail: ', result);
				}
			User.getI18n(cultureCode).then(transSuccess, transFail);
		}

		// image render for base64
		// base64 이미지 렌더링
		$rootScope.parseBase64 = function(src, ext) {
			return 'data:' + ext + ';base64,' + src;
		}

		// externally pass the valiables to access within the angular scope
		// 외부에서 angular내 scope에 접근하기 위해 scope를 전달함
		var interfaceOption = {
			rootScope: $rootScope
		}

		angularInterface(interfaceOption);
	}

	return kiaApp;
});

})();

/*
 * externally pass the valiables to access within the angular scope
 * 외부에서 angular내 scope에 접근하기 위해 사용함
 */
function angularInterface(_option) {
	var option = _option || {}
	if (option.rootScope) {
		$rootScope = option.rootScope
	}

	// press option key to toggle translation code and translate
	// 옵션키를 누르면 번역 코드와 번역본을 교차해서 보여줌
	if (option.keySwitch) {
		$rootScope.keySwitch = option.keySwitch;
	}
	
	if(!$rootScope.$$phase) {
		$rootScope.$apply();
	}
}








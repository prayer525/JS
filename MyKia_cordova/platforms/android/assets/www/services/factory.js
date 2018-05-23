/**
 * MyKiaApp Factory
 *
 * @ Develop Desc 		: 서버에 데이터를 요청한다.
 *							서버 접속이 불가할 경우 가상 데이터를 반환한다.(개발시)
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

(function (){

'use strict';

define([
	 'angular'
	,'moment'
], function(angular, moment) {
	
	/**
	 * myKiaApp.factory 정의
	 * controller 에서 호출할 module명을 정의한다.
	 * @ Network Service
	 * @ Move Service
	 */
	var myKiaFactory = angular.module('myKiaApp.factory', []);
	
	/**
	 * Network
	 * myKia.factory.network 선언
	 */
	myKiaFactory.factory('factory.request', [
								 '$rootScope'
								,'$q'
								,'service.utils'
								,'cacheLifeTime'
								,Factory
							]);

	/**
	 * Network
	 * Network Service 에 모듈을 주입한다.
	 * @ $http 				: angular http service
	 * @ $q 				: angular q promise
	 */
	function Factory($rootScope, $q, Util, cacheLifeTime) {
		return {
			 check 		: check
			,getData 	: getData
			,getRest	: getRest
		}

		function check() {
			var  deferred = $q.defer()
			deferred.resolve('Hello Factory checked');
			
			return deferred.promise;
		}

		// 서버에서 데이터를 가져옴 HTTP 방식
		function getData(_option) {
			var  cache = _getCacheData(_option) || false
				,deferred = $q.defer()
				,option = _.clone(_option) || {}
				,callback = {
					success: function(result, setting) {
						var cache = {
							 date 		: moment().format()
							,option 	: _.clone(option)
							,data 		: _.clone(result)
						}
						$rootScope.network.push( _.clone(cache) );
						deferred.resolve(result, setting);
					}
					,error: function(code, message) {
						var result = {
							 code: code
							,message: message
						}
						deferred.reject(result);
					}
				}
				,indicator = {}
				/*,indicator = {
					 show		: option.indicator
					,cancelable : option.cancelable
					,message 	: option.message || ''
				}*/
			
			if (cache) {
				//Util.log('** 네트워크 캐시를 사용합니다. **' + option.trCode);
				deferred.resolve(cache.data, _option);
				return deferred.promise;
			}
			//Util.log('** 실제 네트워크 접속에 접속합니다. **');
			getAppointmentApi(option.trCode, 'POST', option.data, callback)

			return deferred.promise;
		}

		// 서버에서 데이터를 가져옴 RESTFul 방식
		function getRest(_option) {
			var  deferred = $q.defer()
				,option = _option || {}
				,method = option.method
				,callback = {
					success: function(result, setting) {
						deferred.resolve(result, setting);
					}
					,error: function(code, message) {
						var result = {
							 code: code
							,message: message
						}
						deferred.reject(result);
					}
				}
				,indicator = {}
				/*,indicator = {
					 show		: option.indicator
					,cancelable : option.cancelable
					,message 	: option.message || ''
				}*/
			getAppointmentApi(option.trCode, method, option.data, callback)
			
			return deferred.promise;
		}

		// Cache Data가 있으면 반환한다.
		function _getCacheData(networkOption) {
			$rootScope.network = _cleanCache();
			return _.find($rootScope.network, function(cacheData){
				return _.isEqual(networkOption, cacheData.option)
			})
		}

		// config에서 설정한 시간이 지난 네트워크 캐시는 삭제한다.
		function _cleanCache() {
			var arr = [];
			_.each($rootScope.network, function(code) {
				var diff = moment().diff(code.date, 'minute')
				if (diff < cacheLifeTime()) {
					arr.push(code);
				}
			})
			return arr;
		}
	}

	return myKiaFactory;
});

})();





















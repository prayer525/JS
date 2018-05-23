/**
 * MyKiaApp Filter
 *
 * @ Develop Desc 		: Filter 모음
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 18 Apr 2016
 * @ Change History
 *  					: 18 Apr 2016 - initial
 */

(function (){

'use strict';

define([
	 'angular'
	,'moment'
	,'accounting'
], function(angular, moment, accounting) {
	
	/**
	 * myKiaApp.filter 정의
	 */
	var myKiaFilter = angular.module('myKiaApp.filter', []);
	
	/**
	 * getTime
	 * 날짜에서 시간만 추출한다.
	 * YYYY-MM-DD HH:mm:SS => MM:mm
	 * 사용법: {{time.Start | getTime}}
	 */
	myKiaFilter.filter('getTime', function(){
		return function(date) {
			return moment(date).format('HH:mm');
		}
	});

	/**
	 * booleanToYesNo
	 * Boolean 을 YES NO로 변환한다.
	 * 사용법: booleanToYesNo(boolean)
	 */
	myKiaFilter.filter('booleanToYesNo', function(){
		return function(bool) {
			return bool ? 'N1_7' : 'N1_6';
		}
	});

	/**
	 * Campaign List > Read, Unread 변환 
	 * true: Read | false : Unread 로 변환한다.
	 * 사용법: {{campaign.CampaignRead | readUnread}}
	 */
	myKiaFilter.filter('readUnread', function(){
		return function(bool) {
			return bool ? 'Read' : 'Unread';
		}
	});

	/**
	 * 다국어 번역코드로 변환 후 반환한다.
	 * 사용법: {{ 'String' | replaceToCode }}
	 */
	myKiaFilter.filter('replaceToCode', [
							fnReplaceToCode
						]);

	function fnReplaceToCode(){
		return function(string) {
			if (string.toUpperCase() == 'JANUARY') 		return 'W1_31';
			if (string.toUpperCase() == 'FEBRUARY') 	return 'W1_32';
			if (string.toUpperCase() == 'MARCH') 		return 'W1_33';
			if (string.toUpperCase() == 'APRIL') 		return 'W1_34';
			if (string.toUpperCase() == 'MAY') 			return 'W1_35';
			if (string.toUpperCase() == 'JUNE') 		return 'W1_36';
			if (string.toUpperCase() == 'JULY') 		return 'W1_37';
			if (string.toUpperCase() == 'AUGUST') 		return 'W1_38';
			if (string.toUpperCase() == 'SEPTEMBER') 	return 'W1_39';
			if (string.toUpperCase() == 'OCTOBET') 		return 'W1_20';
			if (string.toUpperCase() == 'NOVEMBER') 	return 'W1_21';
			if (string.toUpperCase() == 'DECEMBER') 	return 'W1_22';

			if (string.toUpperCase() == 'SU') 			return 'W2_1';
			if (string.toUpperCase() == 'MO') 			return 'W2_2';
			if (string.toUpperCase() == 'TU') 			return 'W2_3';
			if (string.toUpperCase() == 'WE') 			return 'W2_4';
			if (string.toUpperCase() == 'TH') 			return 'W2_5';
			if (string.toUpperCase() == 'FR') 			return 'W2_6';
			if (string.toUpperCase() == 'SA') 			return 'W2_7';
			if (string.toUpperCase() == 'Sunday') 		return 'WD_1';
			if (string.toUpperCase() == 'Monday') 		return 'WD_2';
			if (string.toUpperCase() == 'Tuesday') 		return 'WD_3';
			if (string.toUpperCase() == 'Wednesday') 	return 'WD_4';
			if (string.toUpperCase() == 'Thursday') 	return 'WD_5';
			if (string.toUpperCase() == 'Friday') 		return 'WD_6';
			if (string.toUpperCase() == 'Saturday') 	return 'WD_7';
			return string;
		}
	};

	/**
	 * Appointment Type Code 변환
	 */
	myKiaFilter.filter('replaceToCodeInAppointmentType', [
							fnReplaceToCodeInAppointmentType
						]);

	function fnReplaceToCodeInAppointmentType(){
		return function(string) {
			if (string.toUpperCase() == 'TESTDRIVE') 		return 'WS_4';
			if (string.toUpperCase() == 'MEETSALESADVISOR') return 'WS_7';
			if (string.toUpperCase() == 'GETQUOTE') 		return 'WS_8';
			if (string.toUpperCase() == 'OTHER') 			return 'WW_24';
			if (string.toUpperCase() == 'FINANCE') 			return 'WS_55';
			if (string.toUpperCase() == 'TRADEIN') 			return 'WS_54';
			if (string.toUpperCase() == 'FLEETBUSINESS') 	return 'WS_56';
			if (string.toUpperCase() == 'BUYUSEDKIA') 		return 'WS_51';
			return string;
		}
	};

	/**
	* Workshop Transportation Option
	*/
	myKiaFilter.filter('transportOptionString',[
							fnTransportOptionString
						]);

	function fnTransportOptionString(){
		return function(string){
			if (!string)											return string;
			if (string.toUpperCase() == 'COURTESYVEHICLE')			return 'Y1_15';
			if (string.toUpperCase() == 'DROPOFF')					return 'Y1_16';
			if (string.toUpperCase() == 'SHUTTLESERVICE')			return 'Y1_17';
			if (string.toUpperCase() == 'WAITINSERVICEDEPARTMENT')	return 'Y1_18';
			if (string.toUpperCase() == 'OTHER') 					return 'WW_24';

			return string
		}
	}

	/**
	 * Appointment Type Code 변환
	 */

	 /*
	myKiaFilter.filter('replaceToCodeMeetingSubject', [
							fnReplaceToCodeMeetingSubject
						]);

	function fnReplaceToCodeMeetingSubject(){
		return function(string) {
			if (string.toUpperCase() == 'OTHER') 			return 'WW_24';
			if (string.toUpperCase() == 'FINANCE') 			return 'WS_55';
			if (string.toUpperCase() == 'TRADEIN') 			return 'WS_54';
			if (string.toUpperCase() == 'FLEETBUSINESS') 	return 'WS_56';
			if (string.toUpperCase() == 'BUYUSEDKIA') 		return 'WS_51';
			return string;
		}
	};
	*/

	/**
	 * 다국어 번역코드를 반환한다.
	 * 사용법: {{ 'Scheduled' | i18n:'W0_15' }}
	 */
	myKiaFilter.filter('i18n', [
							 '$rootScope'
							,fnI18n
						]);

	function fnI18n($rootScope){
		return function(string, code) {
			if (code == undefined) {
				return $rootScope.i18n[string];
			}
			if(!$rootScope.i18n[code]) {
				return '*' + code + '*';
			}
			return $rootScope.i18n[code];
		}
	};

	/**
	 * 워크샵 Status 코드를 변환한다.
	 */
	myKiaFilter.filter('convertStatus', [
							fnConvertStatus
						]);

	function fnConvertStatus(){
		return function(string) {
			if (string.toUpperCase() == 'SCHEDULED') {
				return 'W0_15'
			}
			if (string.toUpperCase() == 'NEW' || 
									string.toUpperCase() == 'OPEN' ||
									string.toUpperCase() == 'UNCONFIRMED'
								) {
				return 'W0_16'
			}
			if (string.toUpperCase() == 'DECLINED' || 
									string.toUpperCase() == 'CLOSE' || 
									string.toUpperCase() == 'CLOSED' || 
									string.toUpperCase() == 'DONE'
								) {
				return 'W0_17'
			}
			return string;
		}
	};

	/**
	 * String을 CamelCase로 변환한다.
	 */
	myKiaFilter.filter('toCamelCase', [
							fnToCamelCase
						]);

	function fnToCamelCase(){
		return function(string) {
			string = string || '';
			return string.replace(/\w\S*/g, function(txt){
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		};
	};

	/**
	 * special charactor(foriegn language)를 html로 parsing한다.
	 */
	myKiaFilter.filter('html', [
							 '$sce'
							,fnHtml
						]);

	function fnHtml($sce){
		return function(string) {
			return $sce.trustAsHtml( string );
		};
	};

	/**
	 * My Appointments -> Showroom & Workshop 메뉴 표시
	 * return true	: Showroom & Workshop 표시
	 * return false	: Showroom 표시 Workshop 숨김
	 */
	myKiaFilter.filter('appModuleType', [
							 'CONSTANT'
							,fnAppModuleType
						]);

	function fnAppModuleType(CONSTANT){
		return function(marketId) {
			if(CONSTANT.APPOINTMENTS_MENU_DIFF.indexOf(marketId) >= 0){
				return false;
			}else{
				return true;
			}
		};
	};


	/**
	 * 숫자 지역화
	 */
	myKiaFilter.filter('l13n', [
							fnL13n
						]);

	function fnL13n(){
		return function(value, _option) {
			var  marketId = $rootScope.user.detailsInfo.MarketId
				,localType = 0
				,option = _option || 0

			// 스웨덴 지역화
			if (marketId.toUpperCase() == 'KMSE' || marketId.toUpperCase() == 'KMFR') {
				localType = 1;
			}

			// 독일 지역화
			if (marketId.toUpperCase() == 'KMDE') {
				localType = 2;
			}

			if (localType === 0) {
				return accounting.formatNumber(value, option, ',', '.');
			}
			if (localType === 1) {
				return accounting.formatNumber(value, option, ' ', '.');
			}
			if (localType === 2) {
				return accounting.formatNumber(value, option, '.', ',');
			}
		};
	};
	
	/**
	 * 통화 지역화
	 */
	myKiaFilter.filter('currency', [
	                       fnCurrency
						]);

	function fnCurrency(){
		return function(currency) {
			var  marketId = $rootScope.user.detailsInfo.MarketId
				,currency = currency || '€'

			// 스웨덴 지역화
			if (marketId.toUpperCase() == 'KMSE') {
				currency = "kr";
			}

			return currency;
		};
	};
	
	return myKiaFilter;
});

})();





















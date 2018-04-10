/**
 * Meet Sales Advisor Controller 
 *
 * @ Develop Desc 		: Meet Sales Advisor Controller
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
	 * declare Meet Sales Advisor Controller
	 */
	module.controller('AppointmentsSalesMeetSalesAdvisorController', [
									 '$scope'
									,'$rootScope'
									,'$state'
									,'$filter'
									,'service.network'
									,'service.utils'
									,'ROUTE_URL'
									,'CONSTANT'
									,AppointmentsSalesMeetSalesAdvisorCtrl
								]);

	/**
	 * inject Meet Sales Advisor Controller into module
	 * @ $scope				: angular scope
	 * @ $log 				: angular log
	 * @ Network 			: myKiaApp.services.network Service
	 */
	function AppointmentsSalesMeetSalesAdvisorCtrl($scope, $rootScope, $state, $filter, 
																			Network, Utils, ROUTE_URL, CONSTANT) {
		var  selectedMyVehicle 	= $rootScope.vehicle.selectedVehicleInfo,
			 docBody			= angular.element(document).find("body");

		// set navigation title
		// 상단 Navigation 설정
		$rootScope.setNaviTitle( ROUTE_URL.SALES_ADVISOR );

		// remove background image when landing this screen
		// 화면에 처음 진입시 배경이미지를 제거해준다.
		docBody.attr('class', 'ng-scope')

		// set progress step 
		// total	: 전체 step 갯수
		// current	: 현재 진행중인 step
		$rootScope.kmeProgressStep = {
			total : $rootScope.progressStep
			,current : 2
		};
		$scope.CONSTANT = CONSTANT;
		$scope.question = '';
		$scope.requireField = $filter('i18n')('Required field', 'W0_20')

		// data binding
		function init() {
			var  successMeeting, failMeeting, sendMeeting
				,successUsed, failUsed, sendUsed, defaultSelect;

			$scope.myVehicles = $rootScope.vehicle.vehicleInfo.Vehicles;
			/*
			 * get SalesMeetingSubject
			 */
			successMeeting = function(result) {
				defaultSelect = {
					ValueId : '',
					ValueTitle : $filter('i18n')('Required field', 'WS_59'),
					ValueDescription : '',
				}
				$scope.subjects = result.data.Values;
				//$scope.subjects.push(defaultSelect);
				$rootScope.selectedSubject = $rootScope.selectedSubject || { value: defaultSelect };

				$scope.selectSubject($rootScope.selectedSubject.value)
			}
			failMeeting = function(result) {
				console.log('error', result);
			}
			sendMeeting = {
				 CultureCode 	: $rootScope.user.loginInfo.CultureCode
				,ValueType 		: 'SalesMeetingSubject'
			}
			Network.getValuesSalesMeetingSubject(sendMeeting).then(successMeeting, failMeeting)

			/*
			 * get preferred Model
			 */
			successUsed = function(result) {
				$scope.models = result.data.Values;
				$scope.selectedModel = { value: $scope.models[0] };
			}
			failUsed = function(result) {
				console.log('error', result);
			}
			sendUsed = {
				 CultureCode 	: $rootScope.user.loginInfo.CultureCode
				,ValueType 		: 'UsedKiaModels'
			}
			Network.getValuesUsedKiaModels(sendUsed).then(successUsed, failUsed)

			/*
			 * price range
			 */
			$scope.price = {
				minValue: 0,
				maxValue: 100000,
				options: {
					floor: 0,
					ceil: 100000,
					step: 1000,
					noSwitching: true,
					translate:function(){
						this.step = 1000;
					}
				}
			};

			/*
			 * mielage range
			 */
			$scope.mielage = {
				minValue: 0,
				maxValue: 300000,
				options: {
					floor: 0,
					ceil: 300000,
					step: 1000,
					noSwitching: true,
					translate:function(){
						this.step = 1000;
					}
				}
			};
			
			/*
			 * set my vehicle of TradeIn
			 * TradeIn 나의 vehicle 설정
			 */
			$scope.car 				= selectedMyVehicle.VehicleName;
			$scope.registered 		= selectedMyVehicle.RegistrationDate ? moment( selectedMyVehicle.RegistrationDate, 'YYYYMMDD' ).locale($rootScope.momentCode).format("L") : "";
			$scope.currentMileage 	= selectedMyVehicle.CurrentMileageInKilometers;
			$scope.description 		= '';
		}
		init();

		// change background design by metting subject 
		// Meeting Subject를 변경함 : 배경 디자인 변경
		$scope.selectSubject = function($item) {
			docBody.attr("class","ng-scope")

			if($item.ValueDescription == 'Other'){
				docBody.addClass('bg-type1')
			}else if($item.ValueDescription == 'Finance'){
				docBody.addClass('bg-type2')
			}else if($item.ValueDescription == 'FleetBusiness'){
				docBody.addClass('bg-type3')
			}
		}

		/**
		 * change vehicle to SALES_MEETING_SUBJECT_TRADE_IN 
		 * SALES_MEETING_SUBJECT_TRADE_IN 자동차 변경 
		 */
		$scope.changeVehicle = function() {
			$state.go(ROUTE_URL.WORKSHOP_VEHICLE);
		}

		// next step
		// 다음 선택
		$scope.nextstep = function() {
			// next step to remove background images
			// 다음 단계 진행시 배경 이미지를 삭제한다.
			docBody.attr('class','ng-scope')

			var meeting = {}

			meeting.subjects = $scope.selectedSubject.value.ValueDescription;
			meeting.question = $scope.question;

			if ($scope.question == '' || $scope.selectedSubject.value.ValueId == '') {
				Utils.log($scope.requireField);
				return false;
			}

			if ($scope.selectedSubject.value.ValueId == CONSTANT.SALES_MEETING_SUBJECT_OTHER || 
						$scope.selectedSubject.value == CONSTANT.SALES_MEETING_SUBJECT_FINANCE || 
						$scope.selectedSubject.value == CONSTANT.SALES_MEETING_SUBJECT_FLEET_BUSINESS
					) {
			}

			if ($scope.selectedSubject.value.ValueId == CONSTANT.SALES_MEETING_SUBJECT_BUY_USED_KIA) {
				meeting.selectedModel 	= $scope.selectedModel;
				meeting.priceMin 		= $scope.price.minValue;
				meeting.priceMax 		= $scope.price.maxValue;
				meeting.mielageMin 		= $scope.mielage.minValue;
				meeting.mielageMax 		= $scope.mielage.maxValue;
			}

			if ($scope.selectedSubject.value.ValueId == CONSTANT.SALES_MEETING_SUBJECT_TRADE_IN) {
				if ($scope.currentMileage == '' || $scope.currentMileage == '0') {
					Utils.log($scope.requireField);
					return false;
				}
				meeting.car 			= $scope.car;
				meeting.currentMileage 	= $scope.currentMileage;
				meeting.registered 		= $scope.registered;
			}
			$rootScope.meeting = meeting;
			console.log($scope.meeting)

			if($rootScope.flagKMBE){
				$state.go(ROUTE_URL.SALES_CONFIRMATION);
			}else{
				$state.go(ROUTE_URL.SALES_DATE_PICKER);
			}

			// $state.go(ROUTE_URL.SALES_DATE_PICKER);
		};
	}

	return module;
});

})();
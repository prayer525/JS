/**
 * MyKiaApp Directive
 *
 * @ Develop Desc 		: html Element Component를 정의한다.
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
	,'underscore'
	,'accounting'
	,'cluster'
	,'scrollTo'
], function(angular, moment, _, accounting) {
	/**
	 * myKiaApp.directive 정의
	 * @ Directive
	 */
	var myKiaDirective = angular.module('myKiaApp.directive', [
														// 'myKiaApp.constants'
														//,'myKiaApp.services'
													]);


	/**
	 * 네비게이션 상단의 제목과 Back, option버튼을 정의한다.
	 * 
	 * @ 사용법
	 * <nav kme-navi="{{route}}">
	 * 각 controller에서 $scope.setNaviTitle 모델에 Route 상수값을 전달한다.
	 * $scope.setNaviTitle( ROUTE_URL.SHOWROOM );
	 */
	myKiaDirective.directive('kmeNavi', [
									 '$filter'
									,'ROUTE_URL'
									,'PAGE_TITLE'
									,naviDrtv
								]);
	
	function naviDrtv($filter, ROUTE_URL, PAGE_TITLE) {
		return {
			 restrict: 'A'
			,scope: false
			,templateUrl: '../templates/template_navi.html'
			,link: function(scope, element, attribute) {
				var theme = {};

				//element.addClass('navbar navbar-default');
				
				// scope가 변경되면 Title Theme를 갱신한다.
				scope.$watch(function(){
					theme = _getTitleTheme(attribute.kmeNavi);
					if (theme.title === 'NONE') {
						// 상단 타이틀에 검색 창은 Template이 달라서 'NONE'값을 받으면 template내에서 별도로 컨트롤한다.
						scope.title = theme.title;
					} else {
						scope.title = $filter('i18n')(theme.title, theme.title)
					}
					
					scope.themeLeftIcon = theme.left;
					scope.themeRightIcon = theme.right;
					scope.pageTypeClass = theme.pageType;
				})

				// Back버튼 눌렀을때 동작
				scope.back = function() {
					window.history.back(-1);
					//M.onBack();
				}

				// 우측 상단 옵션버튼을 누르면 화면Controller로 이벤트를 전달함
				scope.option = function() {
					scope.onOptionEvent();
				}

				// ROUTE_URL 상수를 식별하여 해당 화면의 제목과 좌우버튼을 theme obj로 리턴한다.
				function _getTitleTheme(title) {
					var  LEFT = 'hbtn fl back'
						,HOME = 'hbtn home'
						,MAIN_PAGE = 'navbar navbar-default'
						,NONE = ''
						,SEARCH_THEME = 'NONE'
						,RIGHT_SEARCH = 'hbtn fr search'
						,obj = {
							 title: ''
							,left: LEFT
							,right: NONE
							,pageType:'navbar navbar-default'
						}
					
					// Main
					if (title == ROUTE_URL.MAIN) {
						obj.title = PAGE_TITLE.MAIN;
						obj.left = HOME;
						obj.pageType = MAIN_PAGE;
						// obj.right = 'cog';
						return obj;
					}
					if (title == ROUTE_URL.MAIN_DETAIL) {
						obj.title = PAGE_TITLE.MAIN_DETAIL;
						element.next('div').children('div').addClass('foot-btn');
						return obj;
					}
					if (title == ROUTE_URL.MAIN_CONTACT) {
						obj.title = PAGE_TITLE.MAIN_CONTACT;
						obj.pageType = MAIN_PAGE;
						element.next('div').children('div').addClass('foot-btn');
						return obj;
					}

					// Show room
					if (title == ROUTE_URL.SHOWROOM) {
						obj.title = PAGE_TITLE.SHOWROOM;
						obj.pageType = MAIN_PAGE;
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_DRIVE_LIST) {
						obj.title = PAGE_TITLE.SHOWROOM_DRIVE_LIST;
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_DATE_PICKER) {
						obj.title = PAGE_TITLE.SHOWROOM_DATE_PICKER;
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_CONFIRMATION) {
						obj.title = PAGE_TITLE.SHOWROOM_CONFIRMATION;
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_DEALER_LIST) {
						obj.title = PAGE_TITLE.SHOWROOM_DEALER_LIST;
						//obj.right = RIGHT_SEARCH;
						obj.pageType = MAIN_PAGE;
						element.next('div').children('div').addClass('full-height')
						element.next('div').children('div').children('section').addClass('no-padding')
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_DEALER_DETAIL) {
						obj.title = PAGE_TITLE.SHOWROOM_DEALER_DETAIL;
						return obj;
					}
					if (title == ROUTE_URL.SHOWROOM_DEALER_SEARCH) {
						obj.title = PAGE_TITLE.SHOWROOM_DEALER_SEARCH;
						return obj;
					}

					// Sales Advisor
					if (title == ROUTE_URL.SALES_ADVISOR) {
						obj.title = PAGE_TITLE.SALES_ADVISOR;
						obj.pageType = MAIN_PAGE;
						return obj;
					}
					if (title == ROUTE_URL.SALES_DATE_PICKER) {
						obj.title = PAGE_TITLE.SALES_DATE_PICKER;
						return obj;
					}
					if (title == ROUTE_URL.SALES_CONFIRMATION) {
						obj.title = PAGE_TITLE.SALES_CONFIRMATION;
						return obj;
					}

					// Quote Model
					if (title == ROUTE_URL.QUOTE_MODEL) {
						obj.title = PAGE_TITLE.QUOTE_MODEL;
						obj.pageType = MAIN_PAGE;
						return obj;
					}
					if (title == ROUTE_URL.QUOTE_DATE_PICKER) {
						obj.title = PAGE_TITLE.QUOTE_DATE_PICKER;
						return obj;
					}
					if (title == ROUTE_URL.QUOTE_CONFIRMATION) {
						obj.title = PAGE_TITLE.QUOTE_CONFIRMATION;
						return obj;
					}

					// Workshop
					if (title == ROUTE_URL.WORKSHOP) {
						obj.title = PAGE_TITLE.WORKSHOP;
						obj.pageType = MAIN_PAGE;
						return obj;
					}
					if (title == ROUTE_URL.WORKSHOP_APPOINTMENT) {
						obj.title = PAGE_TITLE.WORKSHOP_APPOINTMENT;
						return obj;
					}
					if (title == ROUTE_URL.WORKSHOP_DATE_PICKER) {
						obj.title = PAGE_TITLE.WORKSHOP_DATE_PICKER;
						return obj;
					}
					if (title == ROUTE_URL.WORKSHOP_CONFIRMATION) {
						obj.title = PAGE_TITLE.WORKSHOP_CONFIRMATION;
						return obj;
					}
					if (title == ROUTE_URL.WORKSHOP_VEHICLE) {
						obj.title = PAGE_TITLE.WORKSHOP_VEHICLE;
						element.next('div').children('div').addClass('foot-btn');
						return obj;
					}
					obj.title = title;
					if(title == ""){
						obj.pageType = 'navbar navbar-default';
					}
					return obj;
				}
			}
		}
	};

	/**
	 * Checkbox group 을 구현한다.
	 * 
	 * @ 사용법
	 * $scope.campaigns = [
	 * 		{CampaignId: "idXX"},{CampaignId: "idXX"}
	 * ];
	 * // kme-checkbox-group 에서 사용하는 변수 선언
	 * $scope.kmeCheckboxGroup = {
	 * 		selectedCampaign = [];
	 * }
	 * <li ng-repeat="campaign in campaigns">
	 * 		<div kme-checkbox-group></div>
	 * </li>
	 */
	myKiaDirective.directive('kmeCheckboxGroup', [
									fnCheckbox
								]);
	
	function fnCheckbox() {
		return {
			 restrict: 'A'
			,link: function(scope, elem) {
				var checkboxComp = scope.kmeCheckboxGroup;
				
				// 초기에 selectedCampaign에 요소가 있으면 checkbox를 선택한다.
				if (checkboxComp.selectedCampaign.indexOf(scope.campaigns.CampaignId) !== -1) {
					elem[0].checked = true;
				}

				// Update selectedCampaign on click
				elem.bind('click', function() {
					var  campaignId = scope.campaign.CampaignId
						,index = checkboxComp.selectedCampaign.indexOf( campaignId );
					
					// check시 selectedCampaign에 CampaignId를 넣는다.
					if (elem[0].checked) {
						if (index === -1) {
							checkboxComp.selectedCampaign.push( campaignId );
						}
					}

					// uncheck시 selectedCampaign에 CampaignId를 뺀다.
					else {
						if (index !== -1) {
							checkboxComp.selectedCampaign.splice(index, 1);
						}
					}

					// selectedCampaign를 sort한다.
					scope.$apply(checkboxComp.selectedCampaign.sort(function(a, b) {
						return a - b;
					}));
				});
			}
		}
	}

	/**
	 * Calendar를 구현한다.
	 * 
	 * @ 사용법
	 * <div kme-calendar></div>
	 */
	myKiaDirective.directive('kmeCalendar', [
									 '$timeout'
									,'service.network'
									,calendar
								]);
	
	function calendar($timeout, Network) {
		var scope, requestTimer
		return {
			 restrict: 'A'
			,scope: false
			,templateUrl: '../templates/template_calendar.html'
			,link: function(scope, element) {
				var start

				scope.selected 	= _removeTime(scope.selected || moment());
				scope.month 	= scope.selected.clone();
				scope.timeSlots = [];
				scope.timeIndex = 0;

				element.addClass('form-group calendar');
				
				start = scope.selected.clone();
				start.date(1);
				_removeTime(start.day(0));
				_buildMonth(scope, start, scope.month);

				// available date를 선택함
				scope.selectMonth = function(day) {
					if (day.isAvailable) {
						scope.selected = day.date;
						_buildTimes(scope, day);
					}
				};

				// opened 시간을 선택함
				scope.selectTime = function(time, index) {
					if (time.Status != 0) {
						return false;
					}
					scope.selectedTime = index;
					scope.selectedTimeObj = time;
				}

				// 이전달을 선택함
				scope.prevMonth = function() {
					var previous = scope.month.clone();
					scope.times = null;
					_removeTime(previous.month(previous.month()-1).date(1));
					scope.month.month(scope.month.month()-1);
					_buildMonth(scope, previous, scope.month);
				};

				// 다음달을 선택함
				scope.nextMonth = function() {
					var next = scope.month.clone();
					scope.times = null;
					_removeTime(next.month(next.month()+1).date(1));
					scope.month.month(scope.month.month()+1);
					_buildMonth(scope, next, scope.month);
				};

				// 이전 시간을 선택함
				scope.prevTime = function() {
					if (scope.timeIndex <= 0) {
						return false;
					}
					scope.timeIndex--;
					scope.selectedTime = null;
					scope.times = scope.timeSlots[scope.timeIndex];
				}

				// 다음 시간을 선택함
				scope.nextTime = function() {
					if (scope.timeIndex >= scope.timeSlots.length-1) {
						return false;
					}
					scope.timeIndex++;
					scope.selectedTime = null;
					scope.times = scope.timeSlots[scope.timeIndex];
				}

				// 이번달일 경우 이전달을 선택할수 없음
				scope.isThisMonth = function() {
					return moment().isSame(scope.month, 'month');
				}

				// 이번달을 표시한다.
				scope.getThisMonth = function() {
					var locale = Data.getData('Login').CultureCode
					return scope.month.locale(locale).format('MMMM YYYY');
				};

				// bugfix 오늘이 첫째주이면 이전달로 표시되던 오류 수정
				if(scope.month.startOf('week').date() > 20 && moment().date() < 10){
					scope.nextMonth();
				}
			}
		}

		// 날짜에서 시간을 제거한다.
		function _removeTime(date) {
			return date.day(0).hour(0).minute(0).second(0).millisecond(0);
		}

		// month > week 생성
		function _buildMonth(scope, start, month) {
			scope.weeks = [];
			var  done = false
				,date = start.clone()
				,monthIndex = date.month()
				,count = 0;

			while (!done) {
				scope.weeks.push({
					days: _buildWeek(date.clone(), month) 
				});
				date.add(1, 'w');
				done = count++ > 2 && monthIndex !== date.month();
				monthIndex = date.month();
			}
			
			// 데이터 통신에 delay 준다.
			// next(previous) month를 빠르게 선택할때 데이터 통신을 어려번 하는 경우가 발생하기 때문에
			$timeout.cancel(requestTimer);
			requestTimer = $timeout(function() {
				_getRequestData(scope);
			}, 500);
			scope.selected = null;
		}

		// available day 를 선택하면 opened 시간을 뿌려줌
		function _buildTimes(scope, day) {
			var timeslot = scope.calendarSlot[day.availableIdx].TimeSlots;
			scope.timeIndex = 0;
			scope.selectedTime = null;
			scope.timeSlots = _setTimeSlot(timeslot);
			scope.times = scope.timeSlots[scope.timeIndex];
		}

		// Timeslots Array를 최대 5개씩 분배한다.
		// timeslot = [1,2,3,4,5,6,7,8] -> slots = [[1,2,3,4,5], [6,7,8]]
		function _setTimeSlot(times) {
			var  slotLenth = 6
				,slots = []
				,slotElement = [];

			angular.forEach(times, function(time, i) {
				// 약속 날짜가 오늘이고 약속 시작 시간이 현재 시간보다 이전이면 "Close" 처리 한다.
				if( moment(time.Start, 'YYYY-MM-DDTHH:mm:SS').isBefore(moment()) ){
					time.Status = 2;
				}

				slotElement.push(time);
				if (i % slotLenth == slotLenth-1) {
					slots.push( slotElement.slice(0) );
					slotElement.length = 0;
				}
				if (times.length-1 == i && slotElement.length != 0) {
					slots.push(slotElement);
				}
			})
			return slots;
		}

		// week > date 생성
		function _buildWeek(date, month) {
			var days = [];
			var toDayDate = moment().format('YYYYMMDD');

			for (var i = 0; i < 7; i++) {
				days.push({
					 name			: date.format('dd').substring(0, 1)
					,number			: date.date()
					,isCurrentMonth	: date.month() === month.month()
					,isToday		: date.isSame(new Date(), "day")
					,date 			: date
					,beforeDay		: moment(date).format('YYYYMMDD') < toDayDate
				});
				date = date.clone();
				date.add(1, 'd');
			}
			return days;
		}

		// 서버에서 데이터를 받아온 후 달력을 순회하며 Available day에 isAvailable=true 속성을 부과한다.
		function _getRequestData(scope) {
			var toDayDate = moment().format('YYYYMMDD');
			var success = function(result) {
				scope.calendarSlot = result.data.CalendarSlots;

				// available day순회
				angular.forEach(scope.calendarSlot, function(availableDate, idx){
					var  available = moment(availableDate.Date)
						,isOpen = availableDate.IsOpen

					// weeks 순회
					angular.forEach(scope.weeks, function(weeks, i) {
						
						// weeks.days 순회
						angular.forEach(weeks.days, function(dates, j) {
							var date = dates.date;

							if (isOpen && date.isSame(available) && moment(date).format('YYYYMMDD') >= toDayDate) {
								scope.weeks[i].days[j].isAvailable = true
								scope.weeks[i].days[j].availableIdx = idx
							}
						})
					})
				})

				// Campaign이 있으면 Campaign List를 불러온다.
				if (!!scope.getCampaigns) {
					scope.getCampaigns();
				}
			}
			,fail = function(result) {
				console.log('There\'s no available date. Please select next calendar');
			}
			,sendData = _.clone( scope.dealerAvailable )
			,windowSize = _.clone( scope.month.endOf('month').format('DD') )

			if (!sendData) {
				return false;
			}

			// 이번달인 경우 start date는 오늘부터 시작한다.
			/* TODO) 시작일 논의후 정하기
			if (scope.month.month() == moment().month()) {
				sendData.StartDate  = _.clone( scope.month.format('YYYY-MM-DDT01:01:01.000000') );
				windowSize = _.clone( scope.month.endOf('month').format('DD') ) - scope.month.date() + 1
			} else {
				sendData.StartDate  = _.clone( scope.month.format('YYYY-MM-01T01:01:01.000000') );
			}*/
			sendData.StartDate  = _.clone( scope.month.format('YYYY-MM-01T01:01:01.000000') );
			sendData.WindowSize = parseInt( windowSize, 10);
			Network.getDealerAvailability(sendData).then(success, fail);
		}
	}

	/**
	 * 구글맵을 사용한다.
	 * 
	 * @ 사용법
	 * <div kme-map></div>
	 */
	myKiaDirective.directive('kmeMap', [
									 '$filter'
									,'ROUTE_URL'
									,'PAGE_TITLE'
									,'service.utils'
									,mapDrtv
								]);
	
	function mapDrtv($filter, ROUTE_URL, PAGE_TITLE, Util) {
		return {
			 restrict: 'A'
			,template: '<div id="gmaps"></div>'
			,replace: true
			//,scope: false
			,link: function(scope, element, attrs) {
				var  map, infoWindow
					,latitude, longitude, zoom
					,markers = []
					,mapOptions
					,msg = $filter('i18n')('Loading Google Map', 'S1_26')
			
				
				$rootScope.reCenter = function (_pos) {
					getPosition();
					var pos

					if (_pos) {
						pos = {
							lat: _pos.latitude || parseFloat(latitude),
							lng: _pos.longitude || parseFloat(longitude)
						}
					} else {
						pos = {
							lat: parseFloat(latitude),
							lng: parseFloat(longitude)
						}
					}
					map.setCenter(pos);
				}

				Util.log(msg);

				// 위/경도 가져오기
				getPosition();

				function getPosition() {
					if (scope.place) {
						latitude = scope.place.geometry.location.lat();
						longitude = scope.place.geometry.location.lng();
					} else {
						latitude = scope.dealer.GeoLatitude
						longitude = scope.dealer.GeoLongitude
					}
					console.log('latitude, longitude : ' , latitude, longitude)
					initMap(latitude, longitude);
					setDealerPosition();
				}

				// 지도를 초기화 한다.
				function initMap(lat, lng) {
					var  myLoc
						,markerOptions

					console.log('initMap map : ' , map)

					if (map === void 0) {

						$(".full-height").height($(".full-height").height() - $(".sub_head").outerHeight() - $("nav").outerHeight()+$("footer").height());
						
						// 구글맵 객체를 설정한다.
						zoom = 10;
						mapOptions = {
							 center: new google.maps.LatLng(lat, lng)
							,zoom: zoom
							,disableDefaultUI:true
							//,gestureHandling:"greedy"
							,mapTypeId: google.maps.MapTypeId.ROADMAP
						};
						map = new google.maps.Map(element[0], mapOptions);
						scope.map = map;
						
						// 나의 위치를 표시한다.
						markerOptions = {
							draggable:false
							,shadow: null
							,map: map
						}
						myLoc = new google.maps.Marker(markerOptions);
						myLoc.setPosition(mapOptions.center);

						console.log('initMap myLoc : ' , myLoc)

						// 지도를 클릭하면 detail을 닫음
						scope.map.addListener('click', function() {
							scope.$apply(function(){
								if (scope.showMapDetail) {
									scope.showMapDetail = '';
								}
							})
						});

						// google map pan event
						// This event is fired when the map becomes idle after panning or zooming.
						/*
						google.maps.event.addListener(map, 'idle', function(a, b, c){
							if (scope.callbackDragEnd) {
								scope.callbackDragEnd(map);
							}
						});
						*/
						setRefreshGeoController();
						setScaleContoller();
					}
				}	
				
				// 마커를 표시한다.
				function setMarker(map, position, dealer, index) {
					var  marker
						,markerOptions = {
							 position: position
							,map: map
							,draggable:false
							//,icon: '../img/imap_sub_type0' + dealer.DealerType + '.png'
							,icon: '../img/imap_maker.png'
							,zIndex: 999
						};

					marker = new google.maps.Marker(markerOptions);
					markers.push(marker); // add marker to array

					// 마커 이벤트 
					marker.addListener('click', function (e) {
						event.stopPropagation();
						
						scope.$apply(function(){
							// 상세페이지가 열려있으면 닫음
							scope.dealerDetailInfo = {
								 Name 			: dealer.Name
								,DealerSapCode 	: dealer.DealerSapCode
								,Address 		: dealer.Address
								,DealerType	 : dealer.Type
							}
							if (scope.showMapDetail == dealer.DealerSapCode) {
								scope.showMapDetail = '';
								return false;
							}
							changeMarkerImg(index);
							scope.showMapDetail = dealer.DealerSapCode;
						});
					});
				}

				function clearMarker() {
					for(var i in markers){
						markers[i].setMap(null);
					}
					markers=[];
				}
				
				// maker active
				function changeMarkerImg(index) {
					for(var i in markers){			
						if(i == index){
							markers[i].setIcon('../img/imap_maker_active.png');
						}else{
							markers[i].setIcon('../img/imap_maker.png');
						}
					}
				};
				
				/* 지도에 딜러 위치를 표시한다. */
				function setDealerPosition() {
					var dealer = scope.searchDealers || scope.dealers
					clearMarker();
					var index = 0;
					angular.forEach(dealer, function(dealer) {
						var  lat = dealer.Latitude
							,lng = dealer.Longitude

						setMarker(map, new google.maps.LatLng(lat, lng), dealer, index);
						index++;
					})

					var markerCluster = new MarkerClusterer(map, markers, {
							styles:[{
			            		url:"../img/imap_maker1.png",
			            		width:53,
			            		height:52,
			            		textColor:"#ffffff",
			            		textSize:15
			            	}],
			            	imagePath: '../img/imap_maker'
			            })
				}

				/* 초기 위치로 이동 */
				function initGeo(){
					scope.map.setZoom(zoom);
					scope.map.setCenter({lat:parseFloat(latitude), lng:parseFloat(longitude)});
					/*
					if (scope.callbackDragEnd) {
						scope.callbackDragEnd(scope.map);
					}
					*/
				}

				/* 맵 전체화면 보기 */
				function resize_scale(){
					console.log('resize_scale')
					$("#user_button").css({height: ""});
					$('body').toggleClass('full-size-map');
					if ($("body").hasClass("full-size-map")) {
						$(".full-height").height('100%');
					} else {
						$(".full-height").height($(".full-height").height() - $(".sub_head").outerHeight() - $("nav").outerHeight()+$("footer").height());
					}
					google.maps.event.trigger(map, 'resize');
				}

				/* 초기 위치로 이동 버튼 생성 및 이벤트 할당 */
				function setRefreshGeoController(){
					console.log('setRefreshGeoController')
					// create custom controller
					// Create a div to hold the control.
					var controlDiv = document.createElement('div');
					
					var controlUI = document.createElement('button');
					controlUI.className = 'btn_now';
					controlUI.id = 'curLocBtn';
					controlDiv.appendChild(controlUI);

					map.controls[google.maps.ControlPosition.TOP_RIGHT].push(controlDiv);
					google.maps.event.addDomListener(controlUI, 'click', function() {
						initGeo();
					});
				}

				/* 전체화면 보기 버튼 생성 및 이벤트 할당 */
				function setScaleContoller(){
					console.log('setScaleContoller')
					// custom controller
					// Create a div to hold the control.
					var controlDiv2 = document.createElement('div');

					var controlUI2 = document.createElement('button');
					controlUI2.className = 'btn_zoom';
					controlUI2.id = 'scaleBtn';
					controlDiv2.appendChild(controlUI2);

					map.controls[google.maps.ControlPosition.RIGHT_TOP].push(controlDiv2);
					google.maps.event.addDomListener(controlUI2, 'click', resize_scale);
				}

				// resize_scale();
			}
		};
	}

	/**
	 * 구글맵 AutoComplete를 사용한다.
	 * 
	 * @ 사용법
	 * <div kme-autocomplate></div>
	 */
	myKiaDirective.directive('kmeAutocomplate', [
									 autoComplateDrtv
								]);
	
	function autoComplateDrtv() {
		return {
			 restrict: 'A'
			,scope: false
			,link: function(scope, element, attrs) {
				var  autocomplete
					,queryService
					,types = {
						 types: ['geocode']
						,componentRestrictions: {
							country: $rootScope.user.loginInfo.CultureCode.split('-')[1].toLowerCase() || ''
						}
					}

				element.on('keydown', function(){
					var option = {
						backlock: false
					}
					KmeSpinner.start(null, option);
					queryService = new google.maps.places.AutocompleteService(element[0], types);
  					queryService.getQueryPredictions({ input: element[0] }, callback);
				})

				autocomplete = new google.maps.places.Autocomplete(element[0], types);
				autocomplete.addListener('place_changed', fillInAddress);

				function fillInAddress() {
					var place = autocomplete.getPlace();
					scope.$apply();
					scope.searchDealer(place);
				}

				function callback(predictions, status) {
					KmeSpinner.stop();
				}
			}
		}
	}

	/**
	 * progress step 을 표시한다
	 * 
	 * @ 사용법
	 * <div kme-progress-step total-step="4" current-step="2">
	 * total-step : 총 step 의 갯수
	 * current-step : 현재 step 의 단계
	 */
	 myKiaDirective.directive('kmeProgressStep', [
	 									 '$filter'
	 									,'ROUTE_URL'
	 									,'PROGRESS_STEP_TITLE'
	 									,createStepList
	 								])
 	function createStepList($filter, ROUTE_URL, PROGRESS_STEP_TITLE) {
 		return {
 			 restrict:'A'
 			,templateUrl:'../templates/template_step.html'
 			,scope:false
 			,link:function(scope,element,attrs){
 				element.addClass('row progress-step');

 				var theme = _getProgressTitle(scope.route);

 				// kmeProgressStep.total 의 타입이 Number 일 경우
 				// _.range() 실행
 				if(_.isNumber(scope.kmeProgressStep.total)){
 					scope.kmeProgressStep.total = _.range(scope.kmeProgressStep.total);
 				}

				scope.stepTitle = theme.title;

 				function _getProgressTitle(title){
 					var obj = {};

 					if(title == ROUTE_URL.SHOWROOM){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SHOWROOM, PROGRESS_STEP_TITLE.SHOWROOM);
 						return obj
 					}

 					if(title == ROUTE_URL.SHOWROOM_DRIVE_LIST){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SHOWROOM_DRIVE_LIST, PROGRESS_STEP_TITLE.SHOWROOM_DRIVE_LIST);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.SHOWROOM_DATE_PICKER){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SHOWROOM_DATE_PICKER, PROGRESS_STEP_TITLE.SHOWROOM_DATE_PICKER);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.SHOWROOM_CONFIRMATION){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SHOWROOM_CONFIRMATION, PROGRESS_STEP_TITLE.SHOWROOM_CONFIRMATION);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.SALES_ADVISOR){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SALES_ADVISOR, PROGRESS_STEP_TITLE.SALES_ADVISOR);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.SALES_DATE_PICKER){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SALES_DATE_PICKER, PROGRESS_STEP_TITLE.SALES_DATE_PICKER);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.SALES_CONFIRMATION){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.SALES_CONFIRMATION, PROGRESS_STEP_TITLE.SALES_CONFIRMATION);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.QUOTE_MODEL){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.QUOTE_MODEL, PROGRESS_STEP_TITLE.QUOTE_MODEL);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.QUOTE_DATE_PICKER){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.QUOTE_DATE_PICKER, PROGRESS_STEP_TITLE.QUOTE_DATE_PICKER);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.QUOTE_CONFIRMATION){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.QUOTE_CONFIRMATION, PROGRESS_STEP_TITLE.QUOTE_CONFIRMATION);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.WORKSHOP){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.WORKSHOP, PROGRESS_STEP_TITLE.WORKSHOP);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.WORKSHOP_APPOINTMENT){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.WORKSHOP_APPOINTMENT, PROGRESS_STEP_TITLE.WORKSHOP_APPOINTMENT);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.WORKSHOP_DATE_PICKER){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.WORKSHOP_DATE_PICKER, PROGRESS_STEP_TITLE.WORKSHOP_DATE_PICKER);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					if(title == ROUTE_URL.WORKSHOP_CONFIRMATION){
 						obj.title = $filter('i18n')(PROGRESS_STEP_TITLE.WORKSHOP_CONFIRMATION, PROGRESS_STEP_TITLE.WORKSHOP_CONFIRMATION);
 						element.parent().parent().parent().addClass('foot-btn');
 						return obj
 					}

 					return obj;
 				}

 			}
 		}
 	}

 	/**
	 * Input text에 number format 설정한다.
	 * 
	 * @ 사용법
	 * <input type="text" kme-number ng-model="10000">
	 */
	myKiaDirective.directive('kmeNumber', [
										 '$filter'
	 									,fnNumber
	 								]);

 	function fnNumber($filter) {
 		return {
 			 restrict:'A'
 			,require: '?ngModel'
 			,link:function(scope, element, attrs, ctrl){
 				if(!ctrl) {
					return;
				}

				var  marketId = $rootScope.user.detailsInfo.MarketId
					,localType = 0;

				// 스웨덴 지역화
				if (marketId.toUpperCase() == 'KMSE' || marketId.toUpperCase() == 'KMFR') {
					localType = 1;
				}

				// 독일 지역화
				if (marketId.toUpperCase() == 'KMDE') {
					localType = 2;
				}

				ctrl.$formatters.unshift(function () {
					if (localType === 0) {
						return accounting.formatNumber(ctrl.$modelValue, 0, ',', '.');
					}
					if (localType === 1) {
						return accounting.formatNumber(ctrl.$modelValue, 0, ' ', '.');
					}
					if (localType === 2) {
						return accounting.formatNumber(ctrl.$modelValue, 0, '.', ',');
					}
				});

				
				ctrl.$parsers.unshift(function (viewValue) {
					var  plainNumber, formatNumber, maxNum;

					plainNumber = accounting.unformat(viewValue)
					maxNum = parseInt(element.attr('kme-max-value'));

					if(plainNumber > maxNum){
						plainNumber = maxNum;
					}
					
					if (localType === 0) {
						formatNumber = accounting.formatNumber(plainNumber, 0, ',', '.');
					}
					if (localType === 1) {
						formatNumber = accounting.formatNumber(plainNumber, 0, ' ', '.');
					}
					if (localType === 2) {
						formatNumber = accounting.formatNumber(plainNumber, 0, '.', ',');
					}
					
					element.val(formatNumber);
					return plainNumber;
				});
 			}
 		}
 	}

 	/**
	 * Input text에 포커스가 가면 select한다.
	 * 
	 * @ 사용법
	 * <input type="text" kme-select-input>
	 */
	myKiaDirective.directive('kmeSelectInput', [
	 									fnSelectInput
	 								]);

 	function fnSelectInput() {
 		return {
 			 restrict:'A'
 			,link:function(scope, element){
 				element.on('focus', function() {
 					$(this).select();
 				})
 			}
 		}
 	}

 	/**
	 * Range Slider Input text에 포커스가 가면 Range Step을 1로 변환시킨다.
	 * (사용자가 직접 값을 입력하기 위해선 step이 1단위여야 함)
	 *
	 * @ 사용법
	 * <input type="text" kme-range-step>
	 */
	myKiaDirective.directive('kmeRangeStep', [
	 									fnRangeStep
	 								]);

 	function fnRangeStep() {
 		return {
 			 restrict:'A'
 			,link:function(scope, element){
 				element.on('focus', function() {
 					scope.price.options.step = 1;
 					scope.mielage.options.step = 1;
 				})
 			}
 		}
 	}

 	/**
	 * 다국어 적용
	 * 
	 * @ 사용법
	 * <p kme-i18n>ShowRoom</p>
	 */
	myKiaDirective.directive('kmeI18n', [
										 '$rootScope'
	 									,fnI18n
	 								]);

	function fnI18n($rootScope) {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {
				var  translateCode = attrs.kmeI18n
					,transSample = element[0].innerHTML

				element[0].innerHTML = $rootScope.i18n[translateCode] || '? ' + transSample + ' ?';
				element.css('visibility', 'visible');
			}
		}
	}


	/**
	 * 검색입력창 키바인드
	 * 
	 * @ 사용법
	 * <input type="text" kme-enter="searchDealer()" ng-model="searchKeyword" />
	 */
	myKiaDirective.directive('kmeEnter', [
	 									fnEnter
	 								]);

	function fnEnter() {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {
				element.bind("keydown keypress", function(event) {
					if(event.which === 13) {
						scope.$apply(function(){
							scope.$eval(attrs.kmeEnter, {'event': event});
						});
						event.preventDefault();
						element.blur();
					}
				});
			}
		}
	}

	/**
	 * 필수입력 값 유효성 검사한다.
	 * kme-form 을 클릭하면 kme-require 엘리먼트의 유효성을 검사해서 require class를 부여한다.
	 * 
	 * @ 사용법
	 * <button kme-form ng-click="nextstep()">
	 */
	myKiaDirective.directive('kmeForm', [
										 '$rootScope'
	 									,fnForm
	 								]);

	function fnForm($rootScope) {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {
				$rootScope.checkRequire = false;

				// kme-require element에 포커스시 require class를 삭제
				element.on('click', function(e){
					$rootScope.checkRequire = true;
					scope.checkRequire = true;
					scope.$apply();
				})
			}
		}
	}

	/**
	 * 필수입력 값 정의
	 * 
	 * @ 사용법
	 * <input type="text" kme-require />
	 */
	myKiaDirective.directive('kmeRequire', [
										 '$rootScope'
	 									,fnRequire
	 								]);

	function fnRequire($rootScope) {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {
				
				// $rootScope.checkRequire === true 이면 kme-require element에 require class를 추가한다.
				scope.$watch(function() {
					setTimeout(function(){
						if ($rootScope.checkRequire) {
							if (element.val() == '' ||
										element.val() == 0
									) {
								element.addClass('require');
							}
						}
					}, 30)
				})

				// kme-require element에 포커스시 require class를 삭제
				element.bind('click', function(e){
					var _this = e.currentTarget;
					$(_this).removeClass('require');
				})
			}
		}
	}

	/**
	 * scroll to element
	 * 
	 * @ 사용법
	 * <input type="text" kme-scroll-to />
	 */
	myKiaDirective.directive('kmeScrollTo', [
	 									fnScrollTo
	 								]);

	function fnScrollTo() {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {

				// element에 focus시 scroll을 조정한다.
				element.bind('focus', function(e){
					var  $this = $(this),
						device = navigator.platform;
						
					if (!device || device.os.name != 'Android') {
						return false;
					}					
					setTimeout(function() {
						$('#scroll').scrollTo($this, 0, {offset:-100})
					}, 1000)
				})
			}
		}
	}

	/**
	 * image preload
	 * 
	 * @ 사용법
	 * <p kme-preload max-height="100px">
	 * 		<img ng-src="{{campaign.CampaignImageUrl}}" alt="">
	 * </p>
	 */
	myKiaDirective.directive('kmePreload', [
	 									fnPreload
	 								]);

	function fnPreload() {
		return {
			 restrict:'A'
			,transclude: true
			,template: '<div ng-transclude></div><div kme-spinner></div>'
			,link:function(scope, element, attrs) {
				var $imgElement = element.find('img')
				
				// 이미지 loading 완료
				$imgElement.on('load', function(e){
					$('[kme-spinner]').remove();
				})
				$imgElement.on('error', function() {
					// TODO: noImage 넣어야함
					//$imgElement.attr('src', '../img/appointments/ico_setting_red_circle.png')
					$('[kme-spinner]').remove();
				});

				// 이미지 loading 시작
				scope.$watch('ngSrc', function() {
					///console.log('complate')
				});
			}
		}
	}

	/**
	 * image preload spinner
	 * 
	 * @ 사용법
	 */
	myKiaDirective.directive('kmeSpinner', [
	 									fnSpinner
	 								]);

	function fnSpinner() {
		return {
			 restrict:'A'
			,link:function(scope, element, attrs) {
				var  spinner = element
					,classIdx = 0
					,parentWidth = element.parent()[0].clientWidth
					,parentHeight = null
					,posTop = null

				element.addClass('preloader p0');
				playFrame();

				function playFrame() {
					setTimeout(function(){
						if (element.parent()[0] && !parentHeight) {
							parentHeight = element.parent()[0].clientHeight;
							posTop = parentHeight/2 - 32/2;
						}

						spinner.removeClass('p' + classIdx);
						if (classIdx == 12) {
							classIdx = 0;
						} else {
							classIdx++;
						}
						spinner.addClass('p' + classIdx);
						playFrame();
					}, 50);
				}
			}
		}
	}

	/*
		IOS 버전에서 input focus시 footer 및 하단 고정 버튼 숨김처리
	*/
	myKiaDirective.directive('input',[
									fnFormInput
								]);
	
	function fnFormInput(){
		return {
			restrict:'E'
			,link:function(scope, element, attrs){
				var ios = true;
				var platform=null;
				var inputType = element[0].type;

				if( (navigator.userAgent).indexOf('Android') > -1 ){
					platform = 'Android'
				}else{
					platform = 'iOS'
				}

				/*
				* 화면 : Showroom -> Sales - Meet A Sales Advisor
				* 이슈 : Select 에서 리스트 선택 후 Select 의 화살표 버튼을 누르면 footer가 사라짐
				* 원인 : ui-select의 화살표 부분의 input이 type='text' 로 만들어짐
				*		type='text'일 경우 focus가 동작해 footer 를 숨김
				* 해결 : element 에 ui-select-focusser 클래스가 있을 경우 type을 button 으로 변경
				*/
				if(element.hasClass('ui-select-focusser')){
					element.attr('type','button')
					inputType = 'button';
				}

				if(platform!='iOS' || inputType == 'radio' || inputType == 'checkbox' || inputType == 'search' || inputType == 'button' || element.hasClass('auto-complete')){
					return false;
				}

				element.on('focus', function(){
					$('body').addClass('form-focus')
				}).on('blur', function(){
					$('body').removeClass('form-focus')
				})
			}
		}
	}

	/*
		IOS 버전에서 textarea focus시 footer 및 하단 고정 버튼 숨김처리
	*/

	myKiaDirective.directive('textarea',[
									fnFormTextarea
								]);
	
	function fnFormTextarea(){
		return {
			restrict:'E'
			,link:function(scope, element, attrs){
				var ios = true;
				var platform=null;

				if( (navigator.userAgent).indexOf('Android') > -1 ){
					platform = 'Android'
				}else{
					platform = 'iOS'
				}

				if(platform!="iOS"){
					return false;
				}

				element.on('focus', function(){
					$('body').addClass('form-focus')
				}).on('blur', function(){
					$('body').removeClass('form-focus')
				})
			}
		}
	}

	/**
	 * image 파일이 없을 경우 default image 처리
	 */
	myKiaDirective.directive('kmeImgError',[
									fnImgError
								]);
	
	function fnImgError(){
		return {
			 restrict: 'A'
			,link: function(scope, element, attrs){
				attrs.$observe('ngSrc', function (ngSrc) {
					var imgsrc = '../img/appointments/noimg.png';
					
					element.bind('error', function() {
						angular.element(this).attr("src", imgsrc);
					});
				});
			}
		}
	}

	/**
	 * Android에서 가상키보드가 올라왔을때
	 * Element가 가려지는 현상때문에 focus시 
	 * padding-bottom을 부여해서 scroll이 생기게 처리함
	 */
	myKiaDirective.directive('kmeSetFocus',[
									 '$rootScope'
									,fnSetFocus
								]);
	
	function fnSetFocus($rootScope){
		return {
			 restrict: 'A'
			,link: function(scope, element, attrs){
				element
					.on('focus', function(){
						$rootScope.focus = true;
						scope.$apply();
						$('body').scrollTop(500)
					})
					.on('blur', function(){
						$rootScope.focus = false;
						scope.$apply();
					})
			}
		}
	}

	return myKiaDirective;
});

})();





















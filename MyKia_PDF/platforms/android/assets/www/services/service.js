/**
 * MyKiaApp Service
 *
 * @ Develop Desc 		: 네트워크 데이터를 요청 및 가공한다.
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
	,'underscore'
	,'./factory'
	,'./factory.mock'
], function(angular, _) {
	
	/**
	 * myKiaApp.service 정의
	 * controller 에서 호출할 module명을 정의한다.
	 * @ Network Service
	 * @ Move Service
	 */
	var myKiaService = angular.module('myKiaApp.services', [
														 'myKiaApp.constants'
														,'myKiaApp.factory'
														,'myKiaApp.factory.mock'
													]);
	
	/**
	 * Network
	 * myKia.services.network 선언
	 */
	myKiaService.service('service.network', [
								 '$q'
								,'$filter'
								,'TR_CODE'
								,'STORAGE_KEY'
								,'factory.request'
								,'factory.request.mock'
								,'service.user'
								,'device'
								,'devMode'
								,Network
							]);

	/**
	 * Network
	 * Network Service 정의
	 * @ Request 			: angular http factory
	 */
	function Network($q, $filter, TR_CODE, STORAGE_KEY, Request, RequestMock, User, Device, devMode) {
		var requestOption = {
				trCode 	: ''
				,data 		: {}
			}
			,appInfo = Device().app()
			,devMode = devMode()

		return {
			 check 							: check
			,getUserInformation 			: getUserInformation 				// 2.4 Get User Information
			,getAllVehicleImages			: getAllVehicleImages				// 2.8 Get All vehicle model images
			,updateMileage 					: updateMileage						// 2.11 mileage Updating
			,getDealerInformation			: getDealerInformation				// 2.15 Get Dealer Information
			,getDealerLocation				: getDealerLocation					// 2.16 Get All Dealer Location Information
			,DealerSearching				: DealerSearching					// 2.17 Get Dealer Searching
			,getToken 						: getToken 							// 2.29 Get Token 
			,getDealerAvailability 			: getDealerAvailability 			// 2.27.1 Get Dealer Availability
			,getAppointments 				: getAppointments 					// 2.27.2 Get Appointments
			,getAppointmentDetails 			: getAppointmentDetails 			// 2.27.3 Get Appointment Detail
			,getMaintenanceOperations 		: getMaintenanceOperations 			// 2.27.3 Get Maintenance Operations
			,getMaintenanceOperationDetails : getMaintenanceOperationDetails 	// 2.27.4 Get Maintenance Operation Details
			,getMaintenanceOperationsPrice 	: getMaintenanceOperationsPrice 	// 2.27.5 Get Maintenance Operations Price
			,saveServiceAppointment 		: saveServiceAppointment 			// 2.27.6.1 Save Service Appointment
			,saveContactMeForAService 		: saveContactMeForAService 			// 2.27.6.2 Save Contact Me For A Service
			,saveSalesAppointment 			: saveSalesAppointment 				// 2.27.6.3 Save Sales Appointment
			,getCampaignList 				: getCampaignList 					// 2.35 Get Campaign List
			,getCampaignsDetails 			: getCampaignsDetails 				// 2.36 Get Campaigns Details
			,getValuesSalesMeetingSubject 	: getValuesSalesMeetingSubject 		// 2.37.1 Get Values SalesMeetingSubject
			,getValuesUsedKiaModels		 	: getValuesUsedKiaModels 			// 2.37.1 Get Values SUsedKiaModels
			,getValuesTransportOptions	 	: getValuesTransportOptions	 		// 2.37.1 Get Values TransportOptions
		}

		function check() {
			return 'Hello checked';
		}

		// 2.4 Get User Information
		function getUserInformation() {
			
			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.UserInformation;
				requestOption.data = {
					 CustomerId : User.getLoginInfo().CustomerId
				}
				
				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.UserInformation)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.8 Get All vehicle model images
		function getAllVehicleImages(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.AllVehicleImages;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.AllVehicleImages)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.11 mileage Updating
		function updateMileage(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.MileageUpdating;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.MileageUpdating)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.15 Get Dealer Information
		function getDealerInformation(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.DealerInformation;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.DealerInformation)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.16 Get All Dealer Location Information
		function getDealerLocation(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.DealerLocationInformation;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.DealerLocationInformation)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.17 Get Dealer Searching
		function DealerSearching(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.DealerSearching;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.DealerSearching)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.29 Get Token 
		function getToken() {
			var  deferred = $q.defer()
				,appInfo = Device().app()
			
			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetToken;
				
				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			console.log('PC')
			deferred.reject('PC');
			return deferred.promise;
		}

		// 2.27.1 Get Dealer Availability
		// @Date option.startDate 		: The start date for the calendar [Date]
		// @Numeric option.WindowSize 	: The amount of days (eg. 7 = days)
		// @Numeric option.AgendaType 	: 0 = sales | 1 = service
		function getDealerAvailability(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetDealerAvailability;
				requestOption.data = option;
				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetDealerAvailability)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.2 Get Appointments
		// @Boolean option.Historical 		: 0 = past | 1 = today and the future
		function getAppointments(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetAppointments;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetAppointments)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.3 Get Appointment Detail
		function getAppointmentDetails(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetAppointmentDetails;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetAppointmentDetails, option)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.3 Get Maintenance Operations
		// @String option.Vin 		: VIN number of the vehicle
		// @Numeric option.Mileage 	: Mileage of the vehicle
		function getMaintenanceOperations(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetMaintenanceOperations;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetMaintenanceOperations)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.4 Get Maintenance Operation Details
		// @Guid option.Id 		: The id of the service plan
		function getMaintenanceOperationDetails(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetMaintenanceOperationDetails;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetMaintenanceOperationDetails)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.5 Get Maintenance Operations Price
		// @String DealerId 		: The idenfitier of the dealer
		// @String ModelId 			: The identifier of the model
		// @Array Operation 		: List of operations to request price for
		//		@String Code 		: The identifier of the operation
		//		@String GroupVarId 	: The identifier of the group
		function getMaintenanceOperationsPrice(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetMaintenanceOperationsPrice;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.GetMaintenanceOperationsPrice)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.6.1 Save Service Appointment
		// @String VIN (*)  			: Vin of the vehicle
		// @Numeric CurrentMileage 		: Current mileage of the vehicle
		// @String ModelId 				: The identifier of the model
		// @String DealerId 			: The identifier of the dealer
		// @GUID RecallId 				: Safety recall for the vehicle
		// @GUID Id 					: Identifier of the service plan
		// @String GroupVarId 			: The external identifier
		// @String Code 				: The code of the operation
		// @String Description 			: The description of the operation
		// @String Interval 			: Interval of the service plan
		// @String Distance 			: Distance of the service plan
		// @Boolean AsMiles 			: Service plan in miles or km
		// @String Description 			: Details of the requested repairs
		// @String Operations 			: List of selected repairs
		// @String Code 				: The code of the repairs
		// @String Description 			: Description of the repairs
		// @Boolean IsMot 				: If a MOT has to be performed
		// @String Other 				: Field for any other request
		// @Double Price 				: Calculated price of the operations
		// @DateTime ScheduledDate 		: The date of the appointment
		// @String TransportOption 		: See list of values TransportOptions below
		// @String Comment 				: Last comments for the dealer
		// @Boolean CallbackByDealer 	: If the dealer needs to call back the customer
		// @Guid Campaigns 				: List of identfiers of the campaigns marked by the customer
		// @String CultureCode 			: The culture code for the MyKia app (it-IT, de-DE, etc…)
		function saveServiceAppointment(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.SaveServiceAppointment;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.SaveServiceAppointment)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.6.2 Save Contact Me For A Service
		// @String FirstName 	: Firstname from the mykia customer
		// @String LastName 	: Lastname from the mykia customer
		// @String Email 		: Email-address from the mykia customer
		// @String PhoneNumber 	: Phone number from the mykia customer
		// @String CultureCode	: The culture code for the MyKia app (it-IT, de-DE, etc…)
		function saveContactMeForAService(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.SaveContactMeForAService;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			RequestMock.getData(TR_CODE.SaveContactMeForAService)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.27.6.3 Save Sales Appointment
		// @Enum AppointmentTypeId : List of values, see specification below
		// @Enum AppointmentQuestionTypeId : List of values, see specification below. 
		//						Mandatory for appointment type “MeetSalesAdvisor”
		// @String ModelName : Modelname of the car. Mandatory for appointment types “TestDrive”, “GetQuote” 
		// 						and “MeetSalesAdvisor” with question type “BuyUsedKia”
		// @String SiebelModelCode : Model code which is provided by the markets to Siebel. 
		//						Custom values for each market. Mandatory for appointment types “TestDrive” and “GetQuote”
		// @String Question : The question to ask. Mandatory for appointment type “MeetSalesAdvisor”
		// @Decimal PriceFrom : The price range to search for. Mandatory for question type “BuyUsedKia”
		// @Decimal PriceTo : The price range to search for. Mandatory for question type “BuyUsedKia”
		// @Numeric MileageFrom : The mileage range to query. Mandatory for question type “BuyUsedKia”
		// @Numeric MileageTo : The mileage range to query. Mandatory for question type “BuyUsedKia”
		// @String VIN (*) : The identifier of the vehicle
		// @Numeric CurrentMileageInKilometers : Current mileage of the vehicle
		// @Numeric DealerId : The dealer where the appointment is made
		// @DateTime ScheduledDate : The date time of the appointment
		// @String Comment : The comment for the dealer
		// @Boolean CallbackByDealer : If the customer expects to be called back by the dealer
		// @Guid Campaigns : List of identifiers of the campaigns marked by the customer
		// @String CultureCode : The culture code for the MyKia app (it-IT, de-DE, etc…)
		function saveSalesAppointment(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.SaveSalesAppointment;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}

			RequestMock.getData(TR_CODE.SaveSalesAppointment)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.35 Get Campaign List
		// @Numeric CampaignType  : 0 = Seasonal
		// @String MarketId : MarketId
		// @String ModelCode : Model Code (eg. “SL”)
		// @String CultureCode : The culture code for the MyKia app (it-IT, de-DE, etc…)
		function getCampaignList(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetCampaignList;
				requestOption.data = option

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}

			RequestMock.getData(TR_CODE.GetCampaignList)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.36 Get Campaigns Details
		// @String CultureCode : The culture code for the MyKia app (it-IT, de-DE, etc…)
		// @Guid CampaignId : Y
		function getCampaignsDetails(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app();

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.trCode = TR_CODE.GetCampaignsDetails;
				requestOption.data = option;

				Request.getData(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				return deferred.promise;
			}
			
			RequestMock.getData(TR_CODE.GetCampaignsDetails)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		// 2.37.1 Get Values getValuesSalesMeetingSubject
		// RESTFul 방식임
		// @String CultureCode : The culture code for the MyKia app (it-IT, de-DE, etc…)
		// @Stirng ValueType : “SalesMeetingSubject”, “UsedKiaModels”, “TransportOptions”
		function getValuesSalesMeetingSubject(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app()
				,trcode

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.method = 'GET';
				requestOption.trCode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;

				Request.getRest(requestOption)
					.then(function(data) {
						var result = {}

						for (var i in data.Values) {
							data.Values[i].ValueTitle = $filter('i18n')(data.Values[i].ValueDescription, $filter('replaceToCodeInAppointmentType')(data.Values[i].ValueDescription) )
						}
						result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			trcode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;
			RequestMock.getRest(trcode)
				.then(function(data) {
					var result = {}

					for (var i in data.Values) {
						data.Values[i].ValueTitle = $filter('i18n')( $filter('replaceToCodeInAppointmentType')(data.Values[i].ValueDescription) )
					}
					result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		function getValuesUsedKiaModels(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app()
				,trcode

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.method = 'GET';
				requestOption.trCode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;

				Request.getRest(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			trcode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;
			RequestMock.getRest(trcode)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}

		function getValuesTransportOptions(option) {
			var  deferred = $q.defer()
				,appInfo = Device().app()
				,trcode

			if (!devMode && appInfo && !M.locale.VirtualMode) {
				requestOption.indicator = false;
				requestOption.method = 'GET';
				requestOption.trCode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;

				Request.getRest(requestOption)
					.then(function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.resolve(result);
					}, function(data) {
						var result = {
							 data: data
							,request: requestOption
						}
						deferred.reject(result);
					});
				
				return deferred.promise;
			}
			trcode = TR_CODE.GetValues + option.CultureCode + '/' + option.ValueType;
			RequestMock.getRest(trcode)
				.then(function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.resolve(result);
				}, function(data) {
					var result = {
						 data: data
						,request: requestOption
					}
					deferred.reject(result);
				});
			return deferred.promise;
		}
	}

	/**
	 * User Information
	 * myKia.factory.info 선언
	 */
	myKiaService.service('service.user', [
								 '$q'
								,'$filter'
								,'factory.request.mock'
								,'device'
								,'devMode'
								,User
							]);

	/**
	 * User Information
	 * User 에 모듈을 주입한다.
	 * @ $http 				: angular http service
	 * @ $q 				: angular q promise
	 */
	function User($q, $filter, requestMock, Device, devMode) {
		var appInfo = Device().app()

		return {
			 check 						: check
			,getAllVehicleImages 		: getAllVehicleImages
			,getBreakDownCall 			: getBreakDownCall
			,getDealerInfo 				: getDealerInfo
			,getDetailsInfo 			: getDetailsInfo
			,getLoginInfo 				: getLoginInfo
			,getPushInfo 				: getPushInfo
			,getRecallInformation 		: getRecallInformation
			,getSelectedVehiclesIndex 	: getSelectedVehiclesIndex
			,getSelectedVehiclesInfo 	: getSelectedVehiclesInfo
			,getSyncDate 				: getSyncDate
			,getVehiclesInfo 			: getVehiclesInfo
			,setVehiclesMilage 			: setVehiclesMilage
			,isLogin 					: isLogin
			,getI18n		 			: getI18n
			,getLocation		 		: getLocation
		}

		function check() {
			var  deferred = $q.defer()
			deferred.resolve('Hello Factory User Information checked');
			
			return deferred.promise;
		}

		function getAllVehicleImages() {
			var  deferred = $q.defer()
				,getData = LoginManager.getAllVehicleImages();

			deferred.resolve(getData);
			return deferred.promise;
		}
		
		/**
		 * 2.23 Get market specific info
		 * @ return Object
		 * EmergencyCallNumber: "112", 
		 * BreakdownCallNumberInternational: "+36 145 844 94", 
		 * BreakDownCallNumberLocal: "+36 80 204 421", 
		 * ResponseCode: 1, 
		 * ResponseMessage: "GEN-OK: Result ok"
		 */
		function getBreakDownCall() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getBreakDownCall();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getBreakDownCall();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 2.15 Get dealer information
		 * @ return Object 
		 * CountryCode : "hu"
		 * DealerImage : "/9j/4AAQSkZJRgABAQEBLAEsAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQE...
		 * DealerImageExtension : "image/jpeg"
		 * DealerSapCode : "C26VAHG640"
		 * DealerType : 3
		 * Description : ""
		 * Email : "kia.munkafelvetel@ompautohaz.hu "
		 * EmailService : "kia.munkafelvetel@ompautohaz.hu "
		 * GeoLatitude : "47.546315"
		 * GeoLongitude : "21.569892"
		 * IndicationEV : false
		 * Language : "hu"
		 * MarketId : "KMHU"
		 * Name : "OMP AUTÓHÁZ KFT."
		 * OpeningHours : Object
		 * Phone : "3652503510"
		 * ResponseCode : 1
		 * ResponseMessage : "GEN-OK: Result ok"
		 * Street : "Balmazújvárosi u. 10."
		 * Town : "DEBRECEN"
		 * Website : ""
		 * ZipCode : "4002"
		 */
		function getDealerInfo() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				/**
				딜러가 두명 이상일 경우에
				DealerType == 1(Sales) , DealerType = 3(Sales & Service)에 해당하는 딜러가
				My Appointments 의 딜러가 된다
				**/
				if(!!LoginManager.getSecondDealerInfo().DealerType){
					if(LoginManager.getDealerInfo().DealerType == 1 || LoginManager.getDealerInfo().DealerType == 3){
						getData = LoginManager.getDealerInfo();
					}else if(LoginManager.getSecondDealerInfo().DealerType == 1 || LoginManager.getSecondDealerInfo().DealerType == 3){
						getData = LoginManager.getSecondDealerInfo();
					}else{
						getData = LoginManager.getDealerInfo();
					}
				}else{
					getData = LoginManager.getDealerInfo();
				}
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getDealerInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 2.4 Get user Information
		 * @ return Object 
		 * City : "Milano"
		 * Email : "kmhu_mykia@mailinator.com"
		 * FirstName : "TestHU"
		 * Housenumber : "1"
		 * LastName : "Person"
		 * Male : ""
		 * MarketId : "KMHU"
		 * OptinOptions : Object
		 * Phone : "+39123456789"
		 * PostalCode : "00100"
		 * PreferredDealer : "C26VAHG640"
		 * ResponseCode : 1
		 * ResponseMessage : "GEN-OK: Result ok"
		 * Street : "Ustreet"
		 * Vehicles : Array[1]
		 */
		function getDetailsInfo() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getDetailsInfo();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getDetailsInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 2.1 Log in (User ID)
		 * @ return Object 
		 * Agreement : true
		 * CultureCode : "hu-HU"
		 * CustomerId : "2d098400-6d76-4174-b3f9-1a9426b05ce2"
		 * FirstTimeLogin : false
		 * Notification : Object
		 * 		How2VideoCnt : 0
		 * 		IsMaintenance : false
		 * 		IsRecall : false
		 * 		MyKiaNewsCnt : 2
		 * 		MyKiaVideoCnt : 0
		 * 		SalesNProCnt : 0
		 * TokenResponse : Object
		 * 		access_token : "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lk...
		 * 		expires_in : 82799
		 * 		refresh_token : "f81a088d21c649888ae001f6b789960c"
		 * 		token_type : "urn:ietf:params:oauth:token-type:jwt"
		 */
		function getLoginInfo() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getLoginInfo();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getLoginInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * @ return Object
		 * IsNewsPush: true
		 * IsSalesNProPush: true
		 * IsVideoPush: true
		 * IsHowToVideoPush: true
		 */
		function getPushInfo() {
			var  deferred = $q.defer()
				,getData = LoginManager.getPushInfo();

			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * @ return Array
		 * Recall: Array
		 */
		function getRecallInformation() {
			var  deferred = $q.defer()
				,getData
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getRecallInformation();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getRecallInformation();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 
		 * @ return number
		 */
		function getSelectedVehiclesIndex() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getSelectedVehiclesIndex();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getSelectedVehiclesIndex();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 2.6 Get user’s vehicle information (All)
		 * @ return Object
		 * CurrentMileageInKilometers : "5555"
		 * LastServiceDate : "20150506000000"
		 * LastServiceDealerName : null
		 * LastServiceMileageInKilometers : "4500"
		 * ModelYear : 2015
		 * NextServiceDate : "20170419193823"
		 * RegistrationDate : "20150420000000"
		 * RegistrationMileageInKilometers : 5000
		 * UsagePerYear : "4000"
		 * VIN : "U5YPB814AFL656021"
		 * VehicleImage : "iVBORw0KGgoAAAANSUhEUgAAAeAAAAEYCAYAAACEFSXhA...
		 * VehicleImageExtension : "image/png"
		 * VehicleModelCode : "SL"
		 * VehicleName : "Kia Sportage"
		 */
		function getSelectedVehiclesInfo() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getSelectedVehiclesInfo();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getSelectedVehiclesInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * @ return String
		 * return YYYYMMDD
		 */
		function getSyncDate() {
			var  deferred = $q.defer()
				,getData

			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getSyncDate();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getSyncDate();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * 2.6 Get user’s vehicle information (All)
		 * @ return Object
		 * ResponseCode : 1
		 * ResponseMessage : "GEN-OK: Result ok"
		 * Vehicles : Array[1]
		 * 		CurrentMileageInKilometers : "5555"
		 * 		LastServiceDate : "20150506000000"
		 * 		LastServiceDealerName : null
		 * 		LastServiceMileageInKilometers : "4500"
		 * 		ModelYear : 2015
		 * 		NextServiceDate : "20170419193823"
		 * 		RegistrationDate : "20150420000000"
		 * 		RegistrationMileageInKilometers : 5000
		 * 		UsagePerYear : "4000"
		 * 		VIN : "U5YPB814AFL656021"
		 * 		VehicleImage : "iVBORw0KGgoAAAANSUhEUgAAAeAAAAEYCAYAAACEFSXhAAAAAXNSR0IAr...
		 * 		VehicleImageExtension : "image/png"
		 * 		VehicleModelCode : "SL"
		 * 		VehicleName : "Kia Sportage"
		 */
		function getVehiclesInfo() {
			var  deferred = $q.defer()
				,getData
				
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.getVehiclesInfo();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getVehiclesInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		// 마일리지를 업데이트후 localstorage에 저장한다.
		function setVehiclesMilage(mileage) {
			var  deferred = $q.defer()
				,getData
				
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				var  vehicles = LoginManager.getVehiclesInfo()
					,selectedIndex = LoginManager.getSelectedVehiclesIndex()

				vehicles.Vehicles[selectedIndex].CurrentMileageInKilometers = mileage;
				LoginManager.setVehiclesInfo(vehicles);
				
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.getVehiclesInfo();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * @ return Boolean
		 */
		function isLogin() {
			var  deferred = $q.defer()
				,getData
			
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = LoginManager.isLogin();
				deferred.resolve(getData);
				return deferred.promise;
			}
			getData = requestMock.isLogin();
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * TODO: 다국어는 개발완료 전까지 한국어로 표시한다.
		 * 다국어 번역정보를 가져온다.
		 * @ return Boolean
		 */
		function getI18n(cultureCode) {
			var  deferred = $q.defer()
				,lang = M.locale.get() || 'en-US'
				,getData
			
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				getData = WNGetVariableFromStorage(lang)
				deferred.resolve( JSON.parse(getData) );
				return deferred.promise;
			}
			getData = requestMock.getI18n(cultureCode);
			deferred.resolve(getData);
			return deferred.promise;
		}

		/**
		 * GPS Coord를 가져온다.
		 * @ return Boolean
		 */
		function getLocation() {
			var  deferred = $q.defer()
				,getData
			
			if (!devMode() && appInfo && !M.locale.VirtualMode) {
				var msg = $filter('i18n')('Loading Google Map', 'S1_26');
				exWNShowIndicator(msg);
				
				M.plugin("location").current({
					timeout: 30000,
					maximumAge: 1,
					enableHighAccuracy: true,
					callback: function( result ) {
						exWNHideIndicator();
						if ( result.status === 'NS' ) {
							return $rootScope.$apply(function() {
								deferred.reject('This Location Plugin is not supported');
							})
						} else if ( result.status !== 'SUCCESS' ) {
							if ( result.message ) {
								return $rootScope.$apply(function() {
									deferred.reject(result.status + ":" + result.message);
								})
							} else {
								return $rootScope.$apply(function() {
									deferred.reject('Getting GPS coords is failed');
								})
							}
						} else {
							if ( result.coords ) {
								// 위/경도를 리턴한다.
								return $rootScope.$apply(function() {
									deferred.resolve( result.coords );
								})
							} else {
								return $rootScope.$apply(function() {
									deferred.reject('It cann\'t get GPS Coords.');
								})
							}
						}
					}
				});
				return deferred.promise;
			}
			getData = requestMock.getLocation();
			deferred.resolve(getData);
			return deferred.promise;
		}
	}

	/**
	 * UTILS
	 * service.move 선언
	 */
	myKiaService.service('service.utils', [
										 '$window'
										,'device'
										,Utils
									]);

	/**
	 * Move
	 * Move Service 에 모듈을 주입한다.
	 * @ $http 				: angular http service
	 * @ $q 				: angular q promise
	 */
	function Utils($window, Device) {
		return {
			 link 				: link
			,log 				: log
			,selectItems		: selectItems
			,hasSelectedItem	: hasSelectedItem
		}

		/*
		 * Link 
		 * @ return void
		 */
		function link(page, option) {
			var appInfo = Device().app();

			if (!appInfo) {
				$window.location = '/www/html/' + page;
			} else {
				M.page.html('/www/html/' + page, option);
			}
		}

		/*
		 * Log
		 * @ return void
		 */
		function log(str) {
			M.pop.instance(str, {time:'LONG'});
			console.info(str);
		}

		/*
		 * selectItem : 리스트에 값이 있으면, add, 없으면 remove한다.
		 * @ return list
		 */
		function selectItems(list, value) {
			var hasValue = _.find(list, function(_val) {
				return _val == value;
			})
			if ( angular.isNumber(hasValue) ) {
				// remove
				return _.without(list, value);
			}

			// add
			list.push(value);
			return list;
		}

		/*
		 * hasSelectedItem : 리스트에 값이 있는지 여부 체크
		 * @ return Boolean
		 */
		function hasSelectedItem(list, index) {
			var hasValue = _.find(list, function(_val) {
				return _val == index;
			})
			return hasValue == undefined ? true : false;
		}
	}

	return myKiaService;
});

})();






















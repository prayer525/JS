/**
 * MyKiaApp Factory.mock
 *
 * @ Develop Desc 		: 서버에 접속하지 않고 가상 데이터를 반환한다.(개발시)
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
], function(angular) {
	
	/**
	 * myKiaApp.factory.mock 정의
	 * @ Network Service
	 * @ Move Service
	 */
	var myKiaFactory = angular.module('myKiaApp.factory.mock', [
															'myKiaApp.constants'
														]);
	
	/**
	 * Request.mock
	 * myKia.factory.request.mock 선언
	 */
	myKiaFactory.factory('factory.request.mock', [
								 '$q'
								,'TR_CODE'
								,Factory
							]);

	/**
	 * Request.mock
	 * myKia.factory.request.mock 에 모듈을 주입한다.
	 * @ $http 				: angular http service
	 * @ $q 				: angular q promise
	 * @ $log 				: angular log
	 */
	function Factory($q, TR_CODE) {
		return {
			 check 						: check
			,getDealerInfo				: getDealerInfo
			,getVehiclesInfo 			: getVehiclesInfo
			,getSelectedVehiclesIndex 	: getSelectedVehiclesIndex
			,getSelectedVehiclesInfo 	: getSelectedVehiclesInfo
			,getRecallInformation		: getRecallInformation
			,getBreakDownCall 			: getBreakDownCall
			,getLoginInfo				: getLoginInfo
			,getDetailsInfo				: getDetailsInfo
			,getSyncDate 				: getSyncDate
			,isLogin					: isLogin
			,getI18n					: getI18n
			,getLocation				: getLocation
			,getData 					: getData
			,getRest 					: getRest
		}

		function check() {
			var  deferred = $q.defer()
			deferred.resolve('Hello Factory checked');
			
			return deferred.promise;
		}

		// 3.15
		function getDealerInfo() {
			//M.pop.instance('** 가상데이터 사용중 ** : getDealerInfo');
			//console.info('** 가상데이터 사용중 **', 'getDealerInfo');

			var  deferred = $q.defer()
				,data = {  
				   "DealerImageUrl":"https://kia-did.eu/NextGeneration/did/download/filePreview/file_id:1347177/contentHash:872501f4a8a3f423739d75213bd69ea6/width:400/height:800/",
				   "DealerSapCode":"C06VAFR753",
				   "DealerType":3,
				   "Name":"Kia Paris Suffren",
				   "Phone":"01.53.58.56.00",
				   "PhoneService":"01.53.58.56.00",
				   "Street":"76 Bis Avenue de Suffren ",
				   "Town":"PARIS",
				   "CountryCode":"fr",
				   "MarketId":"KMFR",
				   "ZipCode":"75015",
				   "Website":"",
				   "Email":"atelier@kia-paris-suffren.com",
				   "EmailService":"atelier@kia-paris-suffren.com",
				   "Description":"",
				   "OpeningHours":{  
				      "Sales":{  
				         "IsEmpty":false,
				         "Monday":   [{"From":"09:00:00", "To":"19:00:00" }],
				         "Tuesday":  [{"From":"09:00:00", "To":"19:00:00" }],
				         "Wednesday":[{"From":"09:00:00", "To":"19:00:00" }],
				         "Thursday": [{"From":"09:00:00", "To":"19:00:00" }],
				         "Friday":   [{"From":"09:00:00", "To":"19:00:00" }],
				         "Saturday": [{"From":"09:30:00", "To":"12:30:00" },{"From":"14:00:00", "To":"18:00:00" }],
				         "Sunday":null
				      },
				      "Service":{  
				         "IsEmpty":false,
				         "Monday":   [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Tuesday":  [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Wednesday":[{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Thursday": [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Friday":   [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Saturday":null,
				         "Sunday":null
				      }
				   },
				   "Language":"fr",
				   "GeoLatitude":"48.8520066",
				   "GeoLongitude":"2.2991779",
				   "IndicationEV":false,
				   "HasInfoMedia":true,
				   "ResponseCode":1,
				   "ResponseMessage":"GEN-OK: Result ok"
				}
			deferred.resolve(data);
			return deferred.promise;
		}

		function getVehiclesInfo() {
			//M.pop.instance('** 가상데이터 사용중 ** : getVehiclesInfo');
			//console.info('** 가상데이터 사용중 **', 'getVehiclesInfo');

			var  deferred = $q.defer()
				,data = {
					 ResponseCode: 1
					,ResponseMessage: "GEN-OK: Result ok"
					,Vehicles: []
				}
			deferred.resolve(data);
			return deferred.promise;
		}

		function getSelectedVehiclesIndex() {
			//M.pop.instance('** 가상데이터 사용중 ** : getSelectedVehiclesIndex');
			//console.info('** 가상데이터 사용중 **', 'getSelectedVehiclesIndex');

			var  deferred = $q.defer()
				,data = 0

			deferred.resolve(data);
			return deferred.promise;
		}

		function getSelectedVehiclesInfo() {
			//M.pop.instance('** 가상데이터 사용중 ** : getSelectedVehiclesInfo');
			//console.info('** 가상데이터 사용중 **', 'getSelectedVehiclesInfo');

			var  deferred = $q.defer()
				,data = {
					 CurrentMileageInKilometers 	: "3000"
					,LastServiceDate 				: ""
					,LastServiceDealerName 			: null
					,LastServiceMileageInKilometers : "0"
					,ModelYear 						: 2016
					,NextMotDate 					: "2018-01-04T00:00:00"
					,NextServiceDate 				: "20170102162505"
					,RegistrationDate 				: "20150805000000"
					,RegistrationMileageInKilometers: 15000
					,UsagePerYear 					: "18000"
					,VIN 							: "KNABE511AGT063014"
					,VehicleImageUrl 				: "https://www.accept.eu.kia.com/IT/webservices/mykia/getleadmodelimage.ashx?id=43253ff2-1463-4e4e-aa4e-250190c2716c&mw=800&mh=800"
					,VehicleModelCode 				: "TA"
					,VehicleName 					: "Kia Niro"
				}
				
			deferred.resolve(data);
			return deferred.promise;
		}

		function getBreakDownCall() {
			//M.pop.instance('** 가상데이터 사용중 ** : getBreakDownCall');
			//console.info('** 가상데이터 사용중 **', 'getBreakDownCall');

			var  deferred = $q.defer()
				,data = {
					 EmergencyCallNumber 				: "112"
					,BreakdownCallNumberInternational 	: "+33 1 48 97 74 57"
					,BreakDownCallNumberLocal 			: "01 48 97 74 57"
					,ResponseCode 						: 1
					,ResponseMessage 					: "GEN-OK: Result ok"
				}
			deferred.resolve(data);
			return deferred.promise;
		}

		function getRecallInformation() {
			//M.pop.instance('** 가상데이터 사용중 ** : getRecallInformation');
			//console.info('** 가상데이터 사용중 **', 'getRecallInformation');

			var  deferred = $q.defer()
				,data = {
					Recall: []
				}
			deferred.resolve(data);
			return deferred.promise;
		}

		function getLoginInfo() {
			//M.pop.instance('** 가상데이터 사용중 ** : getLoginInfo');
			//console.info('** 가상데이터 사용중 **', 'getLoginInfo');

			var  deferred = $q.defer()
				,data = {  
					"CustomerId":"jIxw5tovUNzbA6hn3BI+VF3LfyRpW1imZq7C51S84NEXBj4THiplQbtROTfVbl0o",
					"CultureCode":"fr-FR",
					"Agreement":true,
					"FirstTimeLogin":false,
					"TokenResponse":{  
						"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5c2VydmVyLmFjY2VwdC5raWEuZXUiLCJhdWQiOiJodHRwczovL2FwaWdhdGV3YXkuYWNjZXB0LmtpYS5ldS8iLCJuYmYiOjE0Njc3MjM2MzIsImV4cCI6MTQ2NzgwNjQzMiwiaHR0cHM6Ly9pZGVudGl0eXNlcnZlci5raWEuZGVtby9jbGFpbXMvY2xpZW50IjoibXlBd2Vzb21lQ2xpZW50IiwiaHR0cHM6Ly9pZGVudGl0eXNlcnZlci5raWEuZGVtby9jbGFpbXMvc2NvcGUiOiJodHRwczovL2FwaWdhdGV3YXkuYWNjZXB0LmtpYS5ldS8iLCJuYW1laWQiOiJrbWl0X3VyYWNsZUBtYWlsaW5hdG9yLmNvbSIsInVuaXF1ZV9uYW1lIjoia21pdF91cmFjbGVAbWFpbGluYXRvci5jb20iLCJhdXRobWV0aG9kIjoiT0F1dGgyIiwiYXV0aF90aW1lIjoiMjAxNi0wNy0wNVQxMzowMDozMi41NjdaIiwiZW1haWwiOiJrbWl0X3VyYWNsZUBtYWlsaW5hdG9yLmNvbSIsImN1c3RvbWVySWQiOiJiZWViOWU5My0wMGVlLTRkYTUtOThkYy1kMzI1ZWU4MWE3MzgiLCJyb2xlIjoiTXlLaWFDdXN0b21lcnMifQ.SNlgj-IU9bcWJlANWW0x_tPSklsUS9Op5p_xAPq8FK8",
						"token_type":"urn:ietf:params:oauth:token-type:jwt",
						"expires_in":82799,
						"refresh_token":"866594a90dcb4760a800c7c79ad24307"
					},
					"Notification":{  
						"IsRecall":false,
						"IsMaintenance":false,
						"How2VideoCnt":5,
						"MyKiaNewsCnt":0,
						"SalesNProCnt":0,
						"MyKiaVideoCnt":0
					},
					"ResponseCode":1,
					"ResponseMessage":"LOGIN-OK-0"
				}

			deferred.resolve(data);
			return deferred.promise;
		}

		function getDetailsInfo() {
			//M.pop.instance('** 가상데이터 사용중 ** : getDetailsInfo');
			//console.info('** 가상데이터 사용중 **', 'getDetailsInfo');

			var  deferred = $q.defer()
				,data = {
					 City 			: "PARIS"
					,Email 			: "guydebord@mailinator.com"
					,FirstName 		: "Guy"
					,Housenumber 	: ""
					,LastName 		: "Debord"
					,Male 			: true
					,MarketId 		: "KMFR"
					,OptinOptions 	: {
					 	 ReceiveEventFlag 		: false
					 	,ReceiveNewsletterFlag 	: false
					 	,ReceiveProductFlag 	: false
					 	,ReceiveResearchFlag 	: false
					 	,ReceiveRetailFlag 		: false
					 	,ReceiveServiceFlag 	: false
					}
					,Phone 			: "0123"
					,PostalCode 	: ""
					,PreferredDealer: "C06VAFR753"
					,SecondDealer  	: "C06VAFR755"
					,ResponseCode 	: 1
					,ResponseMessage: "GEN-OK: Result ok"
					,Street 		: "PARIS"
					,Vehicles 		: [  
						'jRZZ3dJSKSSyp07xIGRFt5oQoU8HcrizhODM1sHE1Ms=',
						'5qIR3P74W3FKfZ+SJ7BD9Zqi3o6CPnTwkWCDjzBHrTM='
					]
				}
			deferred.resolve(data);
			return deferred.promise;
		}

		function getSyncDate() {
			//M.pop.instance('** 가상데이터 사용중 ** : getSyncDate');
			//console.info('** 가상데이터 사용중 **', 'getSyncDate');

			var  deferred = $q.defer()
				,data = '20160418';

			deferred.resolve(data);
			return deferred.promise;
		}
		
		function isLogin() {
			//M.pop.instance('** 가상데이터 사용중 ** : isLogin');
			//console.info('** 가상데이터 사용중 **', 'isLogin');

			var  deferred = $q.defer()
				,data = true;

			deferred.resolve(data);
			return deferred.promise;
		}

		// 다국어 번역코드를 리턴한다.
		function getI18n(param) {
			//M.pop.instance('** 가상데이터 사용중 ** : getTranslateData');
			//console.info('** 가상데이터 사용중 **', 'getTranslateData');

			var  deferred = $q.defer()
				,data = {"C1_1":"E-mail Address","C1_2":"Password","C1_3":"Login","C1_4":"Stay logged in","C1_5":"Password forgotten","C1_6":"Login with <strong>Facebook</strong>","C1_7":"You will be redirected to your browser to complete registration","B1_14":"Downloading","B1_24":"My Vehicle","B1_26":"The list of cars owned by you","B1_4":"Select","B1_25":"Recall","B1_5":"Don’t show this message again","B1_18":"MY VEHICLE","B1_17":"MY SERVICE","B1_19":"DRIVING HELP","B1_20":"KIA NEWS","B1_27":"NEWS","B1_28":"Update<br/>Mileage","B1_29":"Dashboard<br/>Indicators","B1_30":"How to<br/>Videos","B1_31":"MyKia<br/>Dealer","B1_32":"Test Drive<br/>Request","B1_33":"Brochure<br/>Request","B1_34":"Maintenance<br/>Schedule","B1_35":"Dealer<br/>Locator","B1_36":"Parked Vehicle<br/>Locator","B1_37":"Breakdown<br/>Assistance","B1_38":"Emergency<br/>Call","B1_39":"MyKia<br/>News","B1_40":"Sales<br/>& Promotions","B1_41":"MyKia<br/>Video","B1_42":"DRIVING & HELP","B1_43":"Please select the app notifications you would like to receive.","B1_44":"How to Videos","B1_45":"Saved","B1_46":"Do you want to log out?","B1_21":"Settings","B1_22":"My Profile","B1_1":"Close","B1_3":"Save","B1_6":"Address","B1_8":"Last service checkup","B1_11":"Mileage","B1_15":"Registered","B1_16":"Usage","B1_12":"Notifications","B1_23":"Language","B1_10":"Logout","D1_1":"Update Mileage","D1_2":"Please select your car and input mileage.","D1_3":"Input mileage","D1_5":"Manuals","D1_6":"Owner's Manual","D1_7":"Quick Reference Guide","D1_8":"The manual is downloading","D1_9":"Cancel","D1_10":"Download complete","D1_13":"Car Model","D1_14":"Do you want to download the Quick Reference Guide? Due to the size of the file, we recommend using a WIFI connection.","D1_15":"Download failed. Please try again.","D1_16":"No search results","D1_11":"Dashboard Indicators","D1_12":"How to Videos","E1_1":"MyKia Dealer","E1_2":"Information","E1_3":"General Info.","E1_4":"Opening hours","E1_5":"Sales","E1_6":"Service","E1_7":"Sales & Service","E1_8":"Mon","E1_9":"Tue","E1_10":"Wed","E1_11":"Thu","E1_12":"Fri","E1_13":"Test Drive Request","E1_14":"Brochure Request","E1_15":"Contact","E1_17":"Telephone","E1_18":"E-mail","E1_19":"Homepage","E1_20":"Make a showroom appointment","E1_21":"Test Drive Request","E1_22":"Map","E1_23":"List","E1_24":"Dealers Found","E1_25":"Confirm","E1_26":"Info","E1_34":"Maintenance Schedule","E1_41":"Maintenance Checklist","E1_43":"Please update your mileage","E1_45":"Service Appointment","E1_46":"Select Service","E1_47":"My Assistance","E1_48":"Next","E1_50":"Select another Workshop","E1_51":"Call Dealer","E1_52":"Change Dealer","F1_1":"Dealer Locator","F1_10":"ZIP, City or Dealer name","F1_12":"No Search Result","F1_32":"Google map is not loading properly. Please try again.","F1_13":"Fuel Station Locator","F1_14":"Fuel Station","F1_18":"EV Battery Charger Locator","F1_19":"Parked Vehicle Locator","F1_20":"Memo","F1_21":"Your notes","F1_22":"Clear","F1_33":"Park here","F1_24":"Breakdown Assistance","F1_25":"<strong>Whenever you’re on the road</strong>,<p> it’s good to know you’re not alone. As a valued Kia owner, you have access to our Extra Care Roadside Assistance Program. Available 24 hours a day, 7 days a week from anywhere in Europe by dialing the numbers below</p>","F1_26":"24h Service-Hotline","F1_27":"Domestic","F1_28":"International","F1_29":"Emergency Call","F1_30":"In the unfortunate event of an accident make an emergency call using the number below. Keep calm and stay safe!","G1_1":"MyKia News","G1_3":"Sales & Promotions","G1_5":"MyKia Videos","A1_1":"The action exceeds your network request time limit. Please select \"Retry\" to repeat the action or select \"Close\" to close the app and try again later.","C1_8":"The ID or password you entered are incorrect. Please try again.","O1_2":"Hello %@,<br/>We have important information for you. Please read the following message.","O1_3":"Callback of %@","R1_1":"Your mileage is updated.","M1_1":"Do you want to download the Owner’s Manual? Due to the size of the file, we recommend using a WIFI connection.","K1_1":"Do you want to play the video? We recommend using a WIFI connection for this action.","L1_1":"This action requires the use of Google Maps. Would you like to install the Google Maps App now?","L1_3":"Download","H1_1":"Thank you for your request. You will receive an email where you can access the requested brochure.","P1_1":"To request an appointment please visit the MyKia Web or call your preferred dealer.","N1_3":"Do you want to save your parked vehicle location?","N1_4":"Parked location is saved","N1_5":"Do you want to delete your parked vehicle location?","N1_6":"No","N1_7":"Yes","N1_8":"Deleted","S1_1":"Exit","S1_2":"Retry","S1_3":"Your request cannot be processed. Please try again later.","S1_4":"Connecting to server","S1_5":"Your request cannot be processed. Please try again later.","S1_6":"Searching your location.","S1_7":"This page requires your MyKia account login. Would you like to login now?","S1_8":"Message","S1_9":"Input your e-mail","S1_10":"Input your password","S1_11":"Check your e-mail","S1_12":"No dealer information is available","S1_13":"Access certificate expired. Please login again.","S1_14":"Update Profile","S1_15":"Contact Us","S1_16":"Terms of Use","S1_17":"Privacy Policy","S1_18":"Opt Ins","S1_19":"Location","S1_20":"Telephony","S1_21":"Allow","S1_25":"Do you want to send a Test Drive Request to your selected %@ dealer?","S1_26":"Loading Google Map","S1_27":"Your next service checkup is due in","S1_28":"Approx. mileage :","S1_29":"Last update by you at %@","S1_31":"Telephoning via the app has not been enabled. Please change this setting in your profile and try again.","T1_4":"Country Selection","T1_5":"Legal Notice","T1_10":"You need to accept these terms to use this App. With close button, MyKia App will be closed.","V1_1":"Please select the country of your MyKia account","T1_6":"Deny","T1_7":"Accept","S1_35":"MyKia App","S1_36":"Disclaimer","S1_37":"You need to accept these terms to use this App. If you want to try it again, please choose accept button.","T1_1":"Sat","T1_2":"Sun","N1_2":"This action needs access to your location. Please turn on location access.","U1_2":"Turn on GPS","V1_2":"Using the location of your device via the app has not been enabled. Please change this setting in your profile and try again","V1_3":"Year","V1_4":"Do you want to send a Brochure Request?","V1_5":"You are not able to login, because your registration process is not yer finished. Please go to mykia website to complete your registration.","V1_6":"Due to bad network connection, the request cannot be processed. Please check your network or try again.","V1_7":"You need to accept these terms to use this App.","V1_8":"Start","V1_9":"Checkup is needed at","V1_10":"Due to the weak GPS reception, your request may not be completed successfully, You can improve the accuracy of your location at location settings.","V1_25":"Other","W0_1":"Register to MyKia","W0_2":"Not yer a MyKia member? Create an account and enjoy the benefits of MyKia","W0_3":"Update Mileage","W0_4":"Please describe your question","W0_5":"First Name","W0_6":"Surname","W0_12":"My Appointments","W0_13":"Showroom","W0_14":"Workshop","W0_15":"Scheduled","W0_16":"Unscheduled","W0_17":"History","W0_18":"Continue","W0_20":"Required field","W0_21":"Appointment Type","W0_22":"Selected Dealer","W0_23":"Date & Time","W0_24":"Note to the dealer","WS_1":"Create New Appointment","WS_2":"Type of Appointment","WS_4":"Test Drive","WS_5":"Sales","WS_6":"Quote","WS_7":"Meet A Sales Advisor","WS_8":"Get A Quote","WS_10":"Contact Dealer","WS_11":"Your preferred dealer does not have a showroom. Please select other aler","WS_22":"Appointment Details","WS_23":"Meeting Subject","WS_24":"Price","WS_25":"Mileage","WS_27":"km","WS_29":"EUR","WS_51":"Buy a Used Car","WS_53":"Model","WS_54":"Trade in Evaluation","WS_55":"Finance Question","WS_56":"Fleet Business","W1_31":"January","W1_32":"February","W1_33":"March","W1_34":"April","W1_35":"May","W1_36":"June","W1_37":"July","W1_38":"August","W1_39":"September","W1_20":"Octobet","W1_21":"November","W1_22":"December","W2_1":"SU","W2_2":"MO","W2_3":"TU","W2_4":"WE","W2_5":"TH","W2_6":"FR","W2_7":"SA","WD_1":"Sunday","WD_2":"Monday","WD_3":"Tuesday","WD_4":"Wednesday","WD_5":"Thursday","WD_6":"Friday","WD_7":"Saturday","W3_1":"Unavailable","W3_2":"Selected","W3_3":"Call back from Dealer","W3_4":"Dealer unavailable. Please select an alternative date & time","WS_41":"Confirmation","WW_1":"Your preferred dealer does not have a workshop. Please select other aler","WW_21":"Routine Maintenance","WW_22":"Repair","WW_23":"MOT","WW_24":"Other Question","WW_25":"Estimated cost","WW_26":"Disclaimer","WW_3":"Alternative transportation","WW_41":"Your car","Y1_1":"Months","Y1_6":"Your Appointment Submission is successfully completed","Y1_7":"Seasonal Campaign","Y1_8":"Please choose a date","Y1_9":"Please choose a time","Y1_10":"Please select a model","Y1_11":"No Vehicle Model is selected","Y1_12":"Vehicle & Dealer","Y1_15":"Courtesy vehicle","Y1_16":"Drop off","Y1_17":"Shuttle","Y1_18":"Wait in","Y1_20":"Next MOT","Y1_21":"Contact me for a service","Y1_22":"Workshop Appointment is not available in your market yet. We will contact you for a service.","Y1_23":"Calculating estimated cost","Y1_24":"Something has gone wrong. Please contact your dealer directly.","Y1_25":"Other","W0_URL":"https://www.kia.com/ie/mykia/register/?utm_source=MyKia%20app&utm_medium=Link&utm_campaign=App%20link","Y2_1":"Loading unsuccessful","Y2_2":"Loading unsuccessful . Please try again","Y2_6":"Invalid mileage, please try again","Y2_7":"Invalid price, please try again","Y2_8":"Dealer changed successfully","Y2_9":"Car changed successfully","Y2_10":"Car Selection change is completed","Y2_11":"Mileage updated successfully","Y2_12":"No available date this month.","Y2_13":"No upcoming appointment. Please schedule a new one above","Y2_15":"From","Y2_16":"To","Y2_17":"Loading appointments","d_i_01_title":"Air bag warning light (if equipped)","d_i_01_text":"Airbags are only activated when the ignition switch is turned to the ON or Start positions and are equipped to protect occupants from serious physical injury incase of a collision. When the ignition switch is turned to the ON position, the Airbag Warning light will illuminate for a few seconds and then go off.","d_i_01_action":"If the Airbag Warning light does not illuminate when the ignition switch is turned to the ON position, stays on after the initial 6 seconds, blinks or comes on and stays on whilst driving there could be a malfunction with the airbag system and/or SRS (Supplemental Restraint System). Contact your nearest Kia dealer as soon as possible to have the system checked.","d_i_02_title":"Air bag warning light (if equipped)","d_i_02_text":"Airbags are only activated when the ignition switch is turned to the ON or Start positions and are equipped to protect occupants from serious physical injury incase of a collision. When the ignition switch is turned to the ON position, the Airbag Warning light will illuminate for a few seconds and then go off.","d_i_02_action":"If the Airbag Warning light does not illuminate when the ignition switch is turned to the ON position, stays on after the initial 6 seconds, blinks or comes on and stays on whilst driving there could be a malfunction with the airbag system and/or SRS (Supplemental Restraint System). Contact your nearest Kia dealer as soon as possible to have the system checked.","d_i_03_title":"Charging system warning light","d_i_03_text":"The Charging System Warning light will illuminate when the ignition switch is turned to the ON position, and will remain illuminated until the engine has started.","d_i_03_action":"If this warning light remains illuminated after starting the engine or illuminates whilst driving there could be a malfunction of either the generator or electrical charging system (battery). Contact your nearest Kia dealer as soon as possible to check your vehicle.","d_i_04_title":"Engine coolant temperature warning light*","d_i_04_text":"When the ignition switch is turned to the ON position, the Engine Coolant Temperature Warning light will illuminate for a few seconds and then go off.","d_i_04_action":"If the Engine Coolant Temperature Warning light comes on and stays on in red, the temperature of the engine coolant is above 120±3.0°C and your engine could be overheating. Stop the car as soon as it is safe to do so and do not continue to drive. Contact your nearest Kia dealer or roadside assistance provider when this occurs.","d_i_05_title":"Door ajar warning light*","d_i_05_text":"The Door Ajar Warning Light indicates when a door is not securely closed.","d_i_05_action":"This warning light will come on in red if a door is not securely closed and stay on until the door is securely closed.","d_i_06_title":"Door ajar warning light*","d_i_06_text":"The Door Ajar Warning Light indicates when a door is not securely closed.","d_i_06_action":"This warning light will come on in red if a door is not securely closed and stay on until the door is securely closed.","d_i_07_title":"Door ajar warning light*","d_i_07_text":"The Door Ajar Warning Light indicates when a door is not securely closed.","d_i_07_action":"This warning light will come on in red if a door is not securely closed and stay on until the door is securely closed.","d_i_08_title":"Engine oil level warning light* (Diesel only)","d_i_08_text":"The Engine Oil Level Warning light will illuminate when the oil level is insufficient for continued safe operation of the engine.","d_i_08_action":"If the Engine Oil Level Warning light illuminates, check the engine oil level as soon as possible and add the recommended engine oil as required. Do not overfill, the engine oil level should not be above the F mark or maximum mark level on the dipstick. If the Engine Oil Level Warning Light remains illuminated after adding the engine oil and driving 50km - 100km, contact your nearest Kia dealer as soon as possible. Engine oil should be checked periodically and added if necessary.","d_i_09_title":"Engine oil pressure warning light*","d_i_09_text":"When the Engine Oil Pressure Warning light comes on, it means that the vehicle is no longer getting the pressure it needs to keep the engine running properly. The Engine Oil Pressure Warning Light will illuminate when the ignition switch is turned to the ON position and will go out once the engine has started.","d_i_09_action":"If the Engine Oil Pressure Warning light remains illuminated once the engine is started or comes on while driving, stop the car immediately when it is safe to do so and turn the engine off. Check the oil level and add the recommended engine oil as required. If the warning light remains illuminated after adding the engine oil or if the engine oil is unavailable, contact your nearest Kia dealer. Continuing to drive with the Engine Oil Pressure Warning Light illuminated will result in severe engine damage.","d_i_10_title":"Electric parking brake (EPB) malfunction indicator*","d_i_10_text":"The EPB (Electric Parking Brake) Malfunction Indicator illuminates when the ignition switch is turned to the ON position and will go out after a few seconds if the system is operating normally.","d_i_10_action":"If the EPB Malfunction Indicator does not illuminate or is constantly illuminated a malfunction of the EPB system is indicated. If this happens contact your nearest Kia dealer for the system to be checked. The EPB Malfunction indicator will also illuminate when the EPS (Electronic Stability Program) Indicator illuminates and stays on to indicate a malfunction with EPS. If this happens this does not mean the EPB has malfunctioned.","d_i_11_title":"Electric power steering (EPS) system warning light","d_i_11_text":"The Electronic Power Steering (EPS) warning light will illuminate when the ignition switch is turned to the ON position and will go out within a few seconds.","d_i_11_action":"If the EPS warning light is illuminated or blinks whilst driving, a malfunction within the steering system is indicated. Power assistance may not be available under these circumstances and therefore a greater degree of effort will be required to operate the steering. Contact your nearest Kia dealer as soon as possible to have the system checked.","d_i_12_title":"Electric power steering (EPS) system warning light*","d_i_12_text":"The Electric Power Steering (EPS) warning light will illuminate when the ignition switch is turned to the ON position and will go out within a few seconds.","d_i_12_action":"If the EPS warning light is illuminated or blinks whilst driving, a malfunction within the steering system is indicated. Power assistance may not be available under these circumstances and therefore a greater degree of effort will be required to operate the steering. Contact your nearest Kia dealer as soon as possible to have the system checked.","d_i_13_title":"EPS indicator* (if equipped)","d_i_13_text":"The  EPS (Electronic Stability Program) is an electronic system designed to assist the driver in maintaining vehicle control during adverse conditions. EPS checks where you are steering and where the vehicle is actually going and applies the brakes on individual wheels as well as intervening in the engine management system to stabilise the vehicle. Factors such as speed, road conditions and steering effort can all affect the effectiveness of EPS. When the ignition switch is turned to the ON position, the EPS indicator will illuminate and then go off after a few seconds. The EPS Indicator will blink when the system is activated according to the driving condition.","d_i_13_action":"If the EPS indicator is constantly illuminated, a malfunction with the EPS system is indicated. If this occurs have your vehicle checked by your nearest Kia dealer.","d_i_14_title":"Fuel filter warning light (Diesel only)*","d_i_14_text":"The fuel filter plays an important role in diesel engines by separating the water from the fuel and accumulating this at the bottom of the filter. If the water accumulates in the fuel filter then the Fuel Filter Warning light will illuminate when the ignition switch is turned to the ON position. If the water accumulated in the fuel filter is not drained at proper times this may cause damage to the fuel system. When the ignition switch is turned to the ON position the Fuel Filter Warning light will illuminate and go out after a few seconds.","d_i_14_action":"If the Fuel Filter Warning light continues to illuminate after the engine has started or comes on while driving, this means that water has accumulated inside the fuel filter. Continuing to drive with the Fuel Filter Warning light on can cause damage to engine parts and the fuel system. Contact your nearest Kia dealer to have the system checked.","d_i_15_title":"Parking brake &amp; Brake fluid warning light*","d_i_15_text":"The Parking Brake &amp; Brake Fluid Warning light illuminates when the parking brake is applied with the ignition switch turned to the ON or Start positions. This warning light should go out once the engine is started and the parking brake is released.","d_i_15_action":"If the Parking Brake &amp; Brake Fluid Warning light remains on after the engine has been started and the parking brake released, it may indicate that the brake fluid level in the reservoir is low. If the warning light remains on, stop the vehicle as soon as it is safe to do so and contact your nearest Kia dealer.","d_i_16_title":"Parking Brake & Brake Fluid Warning Light*","d_i_16_text":"The Parking Brake &amp; Brake Fluid Warning light illuminates when the parking brake is applied with the ignition switch turned to the ON or Start positions. This warning light should go out once the engine is started and the parking brake is released.","d_i_16_action":"If the Parking Brake &amp; Brake Fluid Warning light remains on after the engine has been started and the parking brake released, it may indicate that the brake fluid level in the reservoir is low. If the warning light remains on, stop the vehicle as soon as it is safe to do so and contact your nearest Kia dealer.","d_i_17_title":"Seat belt warning light*","d_i_17_text":"As a reminder to the driver, the Seat Belt Warning light will illuminate for approximately 6 seconds each time you turn the ignition switch to the ON position regardless of the seat belt being fastened. If the driver's seat belt is unfastened after the ignition switch is turned to the ON position, the seat belt warning light illuminates until the belt is fastened.","d_i_17_action":"If you continue not to fasten the seat belt and you drive over 9km/h, the illuminated warning light will start to blink until driven under a speed of 6km/h. If you continue not to fasten the seat belt and you drive over 20km/h the seat belt warning chime (if equipped) will sound for approximately 100 seconds and the corresponding seat belt warning light will blink (if equipped).","d_i_18_title":"4WD system warning light*","d_i_18_text":"While driving in 4WD Auto mode the vehicle will operate in normal conditions as a conventional 2WD vehicle, but will automatically shift to 4WD if a 4WD need is determined by the system. When the ignition switch is turned to the ON position the 4WD system warning light will illuminate and then go off in a few seconds.","d_i_18_action":"If the 4WD system warning light illuminates while driving, this indicates a malfunction with the 4WD system. If this occurs have the vehicle checked by your nearest Kia dealer.","d_i_19_title":"4WD LOCK indicator*","d_i_19_text":"4WD Lock is used for climbing or descending sharp grades, off road driving or similar conditions to maximise traction. 4WD Lock mode deactivates at speeds above 30km/h (19mph)and is shifted to 4WD Auto mode at speeds above 40km/h (25mph). If the vehicle decelerates with the 4WD Lock on, the transfer mode is shifted back to 4WD Lock. When the 4WD button is pushed the indicator light is constantly illuminated.","d_i_19_action":"If the 4WD lock indicator light constantly illuminates, this means that the 4WD lock is activated. Push the button to deactivate the 4WD lock. If the light does not go off once pressing the button contact your nearest Kia dealer to have your vehicle checked.","d_i_20_title":"ABS warning light* (if equipped)","d_i_20_text":"ABS (Anti-lock Brake System) continuously senses the speed of the wheels and if the system detects the wheels are going to lock, it will repeatedly modulate hydraulic brake pressure to the wheels. When the ignition switch is turned to the ON position, the ABS warning light will illuminate and then go off after a few seconds.","d_i_20_action":"If ABS warning light does not illuminate when the ignition switch is turned to the ON position or comes on while driving and stays on, this means that there is a malfunction with ABS. Contact your nearest Kia dealer if this happens as soon as possible . Normal braking will still be operational but without the assistance of ABS.","d_i_21_title":"Adaptive Front Lighting System (AFLS) malfunction indicator*","d_i_21_text":"Adaptive Front Lighting System (AFLS) will operate when the headlamps are on and uses steering angle and vehicle speed to keep the drivers field of vision wide, by swiveling and leveling the headlamp.","d_i_21_action":"If the AFLS Malfunction indicator flashes or continues to stay illuminated, drive to a safe location and restart the engine. If this indicator still stays on contact your nearest Kia dealer for the system to be checked.","d_i_22_title":"Passenger's front air bag OFF indicator (if equipped)","d_i_22_text":"The passenger's front airbag can be turned off. When this is turned off, the Passenger's Front Airbag Off indicator will illuminate for a few seconds when the ignition switch is turned to the ON position. This indicator will also illuminate when the passenger's front airbag switch is turned to the OFF position from the ON position.","d_i_22_action":"If the passenger's front airbag icon does not illuminate when the ignition switch is turned to the ON position or illuminates but only goes off after 60 seconds, contact your nearest Kia dealer as there could be a malfunction with the passenger's front airbag ON/OFF positions and/or SRS (Supplemental Restraint System).","d_i_23_title":"Passenger's front air bag OFF indicator (if equipped)","d_i_23_text":"The passenger's front airbag can be turned off. When this is turned off, the Passenger's Front Airbag Off indicator will illuminate for a few seconds when the ignition switch is turned to the ON position. This indicator will also illuminate when the passenger's front airbag switch is turned to the OFF position from the ON position.","d_i_23_action":"If the passenger's front airbag icon does not illuminate when the ignition switch is turned to the ON position or illuminates but only goes off after 60 seconds, contact your nearest Kia dealer as there could be a malfunction with the passenger's front airbag ON/OFF positions and/or SRS (Supplemental Restraint System).","d_i_24_title":"Auto stop for ISG system indicator*","d_i_24_text":"ISG (Idle Stop and Go) system reduces fuel consumption by automatically shutting down the engine whilst in a standstill. When vehicle speed is decreased to less than 5km/h (3mph), shift into neutral position and release the clutch pedal. The engine will stop and the Auto Stop icon will illuminate in green. When conditions are met, the vehicle automatically starts by depressing the clutch pedal, the Auto Stop icon will blink for 5 seconds and then turn off. Please note the ISG system will only operate correctly when certain conditions are met.","d_i_24_action":"If the ISG button (Auto Stop icon) indicator illuminates in amber and then goes off this means certain conditions are not met for the ISG system to operate. If the button indicator continues to illuminate in amber or does not go off after pressing the button please contact your nearest Kia dealer as there could be a malfunction with the system.","d_i_25_title":"EPS OFF indicator* (if equipped)","d_i_25_text":"During certain driving conditions you may want to turn the Electronic Stability Program (ESP) off . When you do need to turn the EPS off, make sure you press the EPS OFF button only when you are driving on a flat road surface. Never press the EPS OFF button while the EPS is operating as the vehicle may slip out of control. EPS will automatically be turned on after the ignition has been turned off. The EPS OFF indicator will illuminate for a few seconds when the ignition switch is turned to the ON position and then go out.","d_i_25_action":"The EPS OFF indicator will illuminate when the EPS system has been turned off. If the EPS OFF indicator remains illuminated after pressing the EPS OFF button again, contact your nearest Kia dealer to have the system checked as there could be a malfunction.","d_i_26_title":"EPS OFF indicator (if equipped)","d_i_26_text":"During certain driving conditions you may want to turn the Electronic Stability Program (ESP) off . When you do need to turn the EPS off, make sure you press the EPS OFF button only when you are driving on a flat road surface. Never press the EPS OFF button while the EPS is operating as the vehicle may slip out of control. EPS will automatically be turned on after the ignition has been turned off. The EPS OFF indicator will illuminate for a few seconds when the ignition switch is turned to the ON position and then go out.","d_i_26_action":"The EPS OFF indicator will illuminate when the EPS system has been turned off. If the EPS OFF indicator remains illuminated after pressing the EPS OFF button again, contact your nearest Kia dealer to have the system checked as there could be a malfunction.","d_i_27_title":"EPS indicator (if equipped)","d_i_27_text":"The EPS (Electronic Stability Program) is an electronic system designed to assist the driver in maintaining vehicle control during adverse conditions. EPS checks where you are steering and where the vehicle is actually going and applies the brakes on individual wheels as well as intervening in the engine management system to stabilise the vehicle. Factors such as speed, road conditions and steering effort can all affect the effectiveness of EPS. When the ignition switch is turned to the ON position, the EPS indicator will illuminate and then go off after a few seconds. The EPS Indicator will blink when the system is activated according to the driving condition.","d_i_27_action":"If the EPS indicator is constantly illuminated, a malfunction with the EPS system is indicated. If this occurs have your vehicle checked by your nearest Kia dealer.","d_i_28_title":"Glow indicator (Diesel only)","d_i_28_text":"Diesel engines need to be pre heated before starting EPSecially from cold, the glow plug acts as a starting aid. When the ignition switch is turned to the ON position the Glow Plug Indicator will illuminate for a few seconds and then go out. Once the indicator goes out the engine can be started. The illumination time varies depending on air temperature, water temperature and battery condition. If the engine makes a false start, turn the ignition switch to the LOCK/OFF position for 10 seconds and then turn the ignition switch to the ON position for the pre heating to happen again and start the engine again once the Glow Plug Indicator goes off","d_i_28_action":"If the Glow Plug Indicator continues to illuminate after a few seconds or flashes on and off after the engine has warmed up or comes on while driving, contact your nearest Kia dealer to have the system checked.","d_i_29_title":"Icy road warning light*","d_i_29_text":"The Icy Road Warning Light is equipped to warn the driver of icy road conditions. This will operate when the temperature range is below 4C (39.2F) and when the ignition switch is turned to the ON position. This will also operate while driving and when the vehicle detects a further drop in the above mentioned temperature.","d_i_29_action":"When the ignition switch is turned to the ON position or while driving, the Icy Road Warning Light will blink for 10 seconds and then illuminate when the temperature is below 4C (39.2F). Also a warning chime will sound to alert the driver.","d_i_30_title":"Immobilizer indicator (if equipped)","d_i_30_text":"The immobiliser system is an electronic security device fitted to vehicles to prevent the engine from starting unless the correct key is used or present. The immobiliser system comprises of a small transponder in the ignition key and electronic devices inside the vehicle. When the driver inserts the ignition key into the ignition switch and turns to the ON position, the immobiliser system checks, determines and verifies if the ignition key is valid or not. The driver will only be able to start the engine if the immobiliser system identifies the key is valid.When the ignition key is inserted and turned to the ON position the Immobiliser Indicator will illuminate and stay on until the engine is started. Once the engine is running the Immobiliser Indicator will go out. If the Immobiliser Indicator blinks when the ignition switch is turned to the ON position, contact your nearest Kia dealer for the system to be checked. With a Smart Key- When you press the start/stop button with the smart key present in the vehicle to the ACC or ON position, the Immobiliser Indicator will illuminate in amber for 30 seconds and then go out. If the Immobiliser Indicator illuminates in amber for only 2 seconds or blinks, contact your nearest Kia dealer to have the system checked. If the smart key is not present in the vehicle the Immobiliser will blink for a few seconds and the driver will be unable to start the engine unless the smart key is present. The Immobiliser Indicator will also blink if the battery in the smart key is weak or if there is a malfunction with the smart key system. Contact your nearest Kia dealer to have the system checked if this occurs. If the battery is weak you can still start the engine by pressing the start/stop button with the actual smart key.","d_i_30_action":"","d_i_31_title":"Key low battery indicator*","d_i_31_text":"The Key Low Battery Indicator is only available for Smart Key equipped vehicles, warning the driver to change the battery in the smart key.","d_i_31_action":"If the battery of smart key is discharged with engine start/stop button in the OFF position, this warning light will blink in amber for a few seconds. Replace the battery with a new one.","d_i_32_title":"Key out warning light*","d_i_32_text":"The Key Out Indicator Light is equipped with Smart Key vehicles. When the engine Start/Stop button is in the ACC or ON position the system checks for the presence of the smart key within the vehicle.","d_i_32_action":"When the Engine Start/Stop button is the ACC or ON position, the Key Out Indicator Light will blink for a few seconds in amber when the smart key is not present in the vehicle or if the doors are open. During this time If you close all the doors the chime will also sound for a few seconds and the indicator light will go off once the vehicle starts moving.","d_i_33_title":"Low fuel level warning light*","d_i_33_text":"The fuel gauge indicates the approximate amount of fuel remaining in the fuel tank. The fuel gauge is supplemented by a Low Fuel Level Warning Light, which will illuminate when the fuel tank is nearly empty.","d_i_33_action":"The Low Fuel Level Warning light will illuminate indicating that the fuel tank is nearly empty. When this warning light illuminates, add fuel as soon as possible. Driving with the fuel level warning light on or with the fuel level below 'E' can cause the engine to misfire and damage the catalytic converter.","d_i_34_title":"Low tire pressure telltale* TPMS (Tire Pressure Monitoring System) malfunction indicator*","d_i_34_text":"As an added safety feature and to assist the driver, certain vehicles are equipped with a Tyre Pressure Monitoring System (TPMS) that illuminates a low tyre pressure telltale when one or more of the tyres is significantly under-inflated. Accordingly, when the low tyre pressure telltale illuminates, stop and check your tyre pressure as soon as possible, and inflate them to the correct pressure. Driving on a significantly under-inflated tyre may cause the tyre to overheat and can lead to tyre failure. Under-inflated tyres can also reduces fuel efficiency and tyre tread life and may affect the vehicle�s handling and stopping ability.","d_i_34_action":"The TPMS malfunction indicator is combined with the low tyre pressure telltale. When the system detects a malfunction, the telltale will flash for approximately one minute and then remain continuously illuminated. This sequence will continue upon subsequent vehicle start-ups as long as the malfunction exists. When the malfunction indicator is illuminated, the system may not be able to detect or signal low tyre pressure as intended. TPMS malfunctions may occur for a variety of reasons, including the installation of replacement or alternate tyres or wheels. Contact your nearest Kia dealer for the system to be checked.","d_i_35_title":"Low windshield washer fluid level warning light* (if equipped)","d_i_35_text":"Sensors in the windshield washer fluid reservoir help determine the need to top up the washer fluid for the windshield.","d_i_35_action":"The Low Washer Fluid Level Warning Indicator will illuminate and stay on when the windshield washer fluid reservoir is nearly empty. Refill the reservoir as soon as possible for this indicator to go out.","d_i_36_title":"Malfunction indicator*","d_i_36_text":"The Malfunction Indicator lamp is a part of the Engine Control System which monitors various emission control system components. This indicator will illuminate when the ignition switch is turned to the ON position and will go out after a few seconds once the engine is started.","d_i_36_action":"If the Malfunction Indicator lamp illuminates whilst the engine is running , a potential problem within the emission control system is indicated. If it illuminates while driving, or does not illuminate when the ignition switch is turned to the ON position, contact your nearest Kia dealer and have the system checked. Generally the vehicle can be still driven but prolonged driving with this indicator illuminated can cause damage to the emission control system.","d_i_37_title":"Malfunction (Engine Malfunction) Indicator Lamp*","d_i_37_text":"The Malfunction Indicator lamp is a part of the Engine Control System which monitors various emission control system components. This indicator will illuminate when the ignition switch is turned to the ON position and will go out after a few seconds once the engine is started.","d_i_37_action":"If the Malfunction Indicator lamp illuminates whilst the engine is running , a potential problem within the emission control system is indicated. If it illuminates while driving, or does not illuminate when the ignition switch is turned to the ON position, contact your nearest Kia dealer and have the system checked. Generally the vehicle can be still driven but prolonged driving with this indicator illuminated can cause damage to the emission control system.","d_i_38_title":"Rear fog light indicator*","d_i_38_text":"Fog lights are used to provide improved visibility under conditions of seriously reduced visibility.","d_i_38_action":"With the ignition switch in the ON position and the light switch is in the Tail Light / Parking Light position, the rear fog lamps can be turned on. When this happens the Rear Fog Light Indicator will illuminate in amber and will stay on until it is turned off. To turn off the rear fog lights turn it to the OFF position. Rear fogs lights will also be turned off if the light switch is turned off or ignition switch is turned to the off position.","d_i_39_title":"Tailgate open warning light*","d_i_39_text":"The Tailgate Open Warning light illuminates when the tailgate is opened or not securely closed.","d_i_39_action":"","d_i_40_title":"High beam indicator","d_i_40_text":"To operate the high beam, turn the light switch to the headlight position and push the light control lever away from you or forward, the high beam will stay on. Bring the lever to the middle to switch this off. When you pull the lever towards you/backwards the high beam will flash acting as flashing lights. Do not use high beam when there are other vehicles around as this will obstruct the other driver's vision.","d_i_40_action":"When the high beam is switched on the High Beam Indicator will illuminate in blue. The High Beam Indicator will also blink in blue when you use this as flashing lights.","d_i_41_title":"High beam indicator","d_i_41_text":"To operate the high beam, turn the light switch to the headlight position and push the light control lever away from you or forward, the high beam will stay on. Bring the lever to the middle to switch this off. When you pull the lever towards you/backwards the high beam will flash acting as flashing lights. Do not use high beam when there are other vehicles around as this will obstruct the other driver's vision.","d_i_41_action":"When the high beam is switched on the High Beam Indicator will illuminate in blue. The High Beam Indicator will also blink in blue when you use this as flashing lights.","d_i_42_title":"Low tire pressure position telltale*","d_i_42_text":"When the Tyre Pressure Monitoring System warning indicators are illuminated, one or more of the tyres is significantly under-inflated. The Low Tyre Pressure Position Telltale light will indicate which tyre is significantly under-inflated by illuminating the corresponding position light.","d_i_42_action":"If either telltale illuminates, reduce your speed, avoid hard cornering and anticipate increased stopping distances. Stop and check your tyres as soon as possible. Inflate the tyres to the correct pressure as indicated on tyre inflation pressure label located on the driver�s side center pillar outer panel.","d_i_43_title":"Manual transaxle shift pattern indicator*","d_i_43_text":"The Manual Transaxle Shift indicator informs the driver which gear is desired while driving to improve fuel efficiency. In certain vehicles this indicator can be turned off by unticking the Shift Indicator in the user settings in the instrument cluster.","d_i_43_action":"An upwards arrow followed by the gear number indicates that shifting up to a higher gear is desired and a downwards arrow followed by the gear number indicates that shifting down to a lower gear is desired. if there is a malfunction with the system, the indicator (Up Down Arrow and gear) will not be displayed, unless it is turned off (This function can be turned off in certain vehicles). If this occurs contact your nearest Kia dealer to have the system checked.","d_i_44_title":"Overspeed warning light (if equipped)","d_i_44_text":"The Overspeed Warning Indicator alerts the driver of speeds of 120km/h or more.","d_i_44_action":"If the Overspeed Warning light blinks and the warning chime (if equipped) sounds, the vehicle speed is in excess of 120km/h.","d_i_45_title":"Automatic transaxle shift pattern indicator*","d_i_45_text":"The Shift Pattern Indicator is equipped for automatic transaxle vehicles. The indicator displays which automatic transaxle shift lever is selected.","d_i_45_action":"If there is a malfunction of the gear system the transaxle indicator will blink. For your safety, contact an authorised Kia dealer as soon as possible to have the system checked.","d_i_46_title":"Automatic transaxle shift pattern indicator*","d_i_46_text":"The Shift Pattern Indicator is equipped for automatic transaxle vehicles. The indicator displays which automatic transaxle shift lever is selected.","d_i_46_action":"If there is a malfunction of the gear system the transaxle indicator will blink. For your safety, contact an authorised Kia dealer as soon as possible to have the system checked.","d_i_47_title":"AUTO HOLD indicator*","d_i_47_text":"The Auto Hold Indicator will be illuminated in white when the system has been turned on. When the Auto Hold function is active, the indicator will turn to green.","d_i_47_action":"If the Auto Hold indicator is illuminated amber, the Auto Hold function system is not operating correctly. Contact your nearest Kia dealer to check the system.","d_i_48_title":"Auto stop for ISG system indicator*","d_i_48_text":"ISG (Idle Stop and Go) system reduces fuel consumption by automatically shutting down the engine whilst in a standstill. When vehicle speed is decreased to less than 5km/h (3mph), shift into neutral position and release the clutch pedal. The engine will stop and the Auto Stop icon will illuminate in green. When conditions are met, the vehicle automatically starts by depressing the clutch pedal, the Auto Stop icon will blink for 5 seconds and then turn off. Please note the ISG system will only operate correctly when certain conditions are met.","d_i_48_action":"If the ISG button (Auto Stop icon) indicator illuminates in amber and then goes off this means certain conditions are not met for the ISG system to operate. If the button indicator continues to illuminate in amber or does not go off after pressing the button please contact your nearest Kia dealer as there could be a malfunction with the system.","d_i_49_title":"Cruise indicator*","d_i_49_text":"The cruise control system allows you to program the vehicle to maintain a constant speed without the need to depress the accelerator pedal. The system is designed to function for speeds above 40km/h (25mph). When the cruise control is switched on, the cruise indicator will illuminate and stay on until turned off.","d_i_49_action":"If the cruise indicator is illuminated, the cruise control system is turned on. Press the cruise ON/OFF button on the steering wheel to switch it off. If after trying to turn the cruise control system off the icon still illuminates contact your nearest Kia dealer.","d_i_50_title":"Cruise SET indicator (if equipped)","d_i_50_text":"The cruise set button on the steering wheel sets the desired cruise control speed you wish to maintain. Turn the cruise control system on, the cruise indicator will illuminate. Accelerate until the desired speed (which must be more than 40km/h (25mph)) is reached and then press the SET button on the steering wheel. The SET indicator light will illuminate and the desired speed will be maintained without the need to depress the accelerator pedal.","d_i_50_action":"If the SET indicator is illuminated green the cruise speed has been set. To cancel the cruise control press the cruise control ON/OFF switch or the CANCEL button on the steering wheel. Cruise control can also be turned off by depressing the brake pedal (or the clutch pedal for manual transaxle vehicles).","d_i_51_title":"Cruise indicator (if equipped)","d_i_51_text":"The cruise control system allows you to program the vehicle to maintain a constant speed without the need to depress the accelerator pedal. The system is designed to function for speeds above 40km/h (25mph). When the cruise control is switched on, the cruise indicator will illuminate and stay on until turned off.","d_i_51_action":"If the cruise indicator is illuminated, the cruise control system is turned on. Press the cruise ON/OFF button on the steering wheel to switch it off. If after trying to turn the cruise control system off the icon still illuminates contact your nearest Kia dealer.","d_i_52_title":"DBC indicator*","d_i_52_text":"The Downhill Brake Control (DBC) system supports the driver when coming down a steep hill without the need to depress the brake pedal, as it slows the vehicle down allowing the driver to concentrate on steering the vehicle. DBC can be turned on or off by pressing the DBC icon button and can only be turned on when speeds are under 40km/h (25mph). The DBC indicator will be illuminated in green when the system is turned on and will blink if the system is activated during steep descents.","d_i_52_action":"If the DBC indicator illuminates in red, the system may have malfunctioned and DBC will not operate. If this occurs have your vehicle checked by your nearest Kia dealer.","d_i_53_title":"ECO indicator*","d_i_53_text":"Active ECO helps improve fuel efficiency by controlling engine and transaxle on automatic transaxle vehicles. When the Active ECO button is activated the acceleration may be slightly reduced even when depressing the accelerator pedal fully. The performance of the air conditioner maybe limited and the shift pattern of the automatic transaxle may change to optimise fuel efficiency. Also the engine noise may get louder.","d_i_53_action":"The Active ECO indicator will illuminate in green when the button is pressed. The Active ECO indicator will stay on in green even when the engine is restarted. To turn off the Active ECO press the button again.","d_i_54_title":"Active ECO indicator*","d_i_54_text":"Active ECO helps improve fuel efficiency by controlling engine and transaxle on automatic transaxle vehicles. When the Active ECO button is activated the acceleration may be slightly reduced even when depressing the accelerator pedal fully.","d_i_54_action":"The performance of the air conditioner maybe limited and the shift pattern of the automatic transaxle may change to optimise fuel efficiency. Also the engine noise may get louder.The Active ECO indicator will illuminate in green when the button is pressed. The Active ECO indicator will stay on in green even when the engine is restarted. To turn off the Active ECO press the button again.","d_i_55_title":"Front fog light indicator (if equipped)","d_i_55_text":"Fog lights are used to provide improved visibility under conditions of seriously reduced visibility.","d_i_55_action":"With the ignition switch in the ON position and the light switch is in the Tail Light / Parking Light position, the front fog lamps can be turned on. When this happens the Front Fog Light Indicator will illuminate in green and will stay on until it is turned off. To turn off the front fog lights turn it to the OFF position.","d_i_56_title":"Gasoline fuel indicator*","d_i_56_text":"The Gasoline Fuel Indicator is a feature on vehicles equipped with the LPG System","d_i_56_action":"The Gasoline Fuel Indicator illuminates or blinks in green in the following situations: Illuminates when driving on gasoline regardless of GSL switch condition. Blinks before converting to LPG. Blinks when engine starts on LPG (GSL switch off) for gasoline is empty or there is a problem with the gasoline fuel system. Then the indicator turns off when pressure is made to supply LPG.","d_i_57_title":"Tail (Parking) Light indicator","d_i_57_text":"To operate the lights, turn the knob at the end of the light control lever to one of the following positions - OFF position, Parking/Tail Light position, Headlight position or AUTO light position (if equipped)","d_i_57_action":"With the ignition switch in the ON position, the Tail Light Indicator illuminates in green when the light switch is in the tail light or the parking light position (1st position). When the Tail Light Indicator illuminates; the tail position, license and instrument panel lights are turned on.","d_i_58_title":"Low beam indicator","d_i_58_text":"To operate the lights, turn the knob at the end of the light control lever to one of the following positions - OFF position, Parking/Tail Light position, Headlight position or AUTO light position (if equipped)","d_i_58_action":"With the ignition switch in the ON position, the Low Beam Indicator illuminates in green when the light switch is in the Headlight position (2nd position). When the Low Beam Indicator illuminates; the headlights, tail position, license and instrument panel lights are turned on.","d_i_59_title":"Low beam indicator","d_i_59_text":"To operate the lights, turn the knob at the end of the light control lever to one of the following positions - OFF position, Parking/Tail Light position, Headlight position or AUTO light position (if equipped)","d_i_59_action":"With the ignition switch in the ON position, the Low Beam Indicator illuminates in green when the light switch is in the Headlight position (2nd position). When the Low Beam Indicator illuminates; the headlights, tail position, license and instrument panel lights are turned on.","d_i_60_title":"Speed limit indicator*","d_i_60_text":"A speed limit can be set when the driver does not wish to drive over a specific speed. If driven over the preset speed limit, the warning system operates (set speed limit will blink in green and chime will sound) until the vehicle speed returns to the preset speed limit. The indicator illuminates when the speed limit control system is enabled by pressing the button on the steering wheel. Press the button again and the system deactivates.","d_i_60_action":"If driven over the preset speed limit, the Speed Limiter Indicator will blink in green and a chime will sound until the vehicle speed returns to the preset speed limit. If there is a problem with the speed limit control system, the '---' indicator will blink. If this occurs, we recommend that the system be checked by an authorised Kia dealer.","d_i_61_title":"Turn signal indicator","d_i_61_text":"The ignition switch must be in the ON position for the turn signals to function. To turn on the turn signals move the light control lever up or down. The green arrow indicators will illuminate when turn signal is operating. They will self-cancel after a turn is completed","d_i_61_action":"When the ignition switch is turned to the ON position, the blinking green arrows will illuminate to show the direction indicated by the turn signals. If the arrow comes on but does not blink, blinks more rapidly than normal, or does not illuminate at all, a malfunction in the turn signal system has occurred. Contact your nearest Kia dealer for the system to be checked.","dashboard_disclaimer":"The information displayed is for your assistance only and cannot replace a proper examination of an error or damage that has occurred despite the lighted display of an icon. While KIA [insert full company name] is using the greatest possible care to ensure that the information displayed is complete, correct and up to date, KIA [insert full company name] cannot assume any warranty for the completeness or correctness of the information displayed.<br/><br/>Certain icons may be limited to certain KIA models and warning icons or other items dis-played may vary or may be of a different design depending on the KIA model.<br/><br/>For further information on the warning icons and other items displayed, please read the User Manual of your KIA vehicle carefully.","WS_disclaimer":"The price displayed is an estimation based on the maximum price charged by your dealer and is provided for information purposes only. The price has no contractual value and does not account for promotions, maintenance contracts, packages or loyalty programs. The date and time offered do not reflect in certainty the actual availability of the dealer. General terms and conditions apply.","WS_disclaimer_html":"The price displayed is an estimation based on the maximum price charged by your dealer and is provided for information purposes only. The price has no contractual value and does not account for promotions, maintenance contracts, packages or loyalty programs. The date and time offered do not reflect in certainty the actual availability of the dealer. <a href='http://www.kia.com/fr/contenus/mentionslegales/' target='_blank'>General terms and conditions apply.</a>","PN_01":"Plate Number","WL_01":"DEFA WarmUp","MC_01":"CORPORATE","MC_02":"LIFE AND EXPERIENCE\t","MC_03":"PRODOTTI\t","MC_04":"TECNOLOGIE","PGURL_01":"https://www.kia.com/it/mykia/resetpassword/"}
				,data_fr = {"C1_1":"Adresse eMail","C1_2":"Mot de passe","C1_3":"Connexion","C1_4":"Se souvenir de moi","C1_5":"Mot de passe oublié ?","C1_6":"Me connecter avec Facebook","C1_7":"Pour créer un compte MyKia rendez-vous sur Kia.com/fr/mykia","B1_24":"Ma Kia","B1_26":"La liste de mes véhicules Kia","B1_4":"Selectionner","B1_25":"Campagne de rappel Kia","B1_5":"Ne plus afficher ce message","B1_18":"MA KIA","B1_17":"MES SERVICES","B1_19":"AIDE A LA CONDUITE","B1_20":"MYKIA NEWS","B1_27":"MYKIA NEWS","B1_28":"Mise à jour kilométrage","B1_29":"Témoins lumineux","B1_30":"Tutoriels","B1_31":"Mon concessionnaire","B1_32":"Demande d'essai","B1_33":"Demande de brochure","B1_34":"Plan d'entretien personnalisé","B1_35":"Localiser une Concession Kia","B1_36":"Localiser ma Kia","B1_37":"Kia Assistance","B1_38":"Appel d'urgence","B1_39":"MyKia News","B1_40":"Offres MyKia","B1_41":"Vidéos MyKia","B1_42":"AIDE A LA CONDUITE","B1_43":"Selectionnez les notifications que vous souhaitez recevoir.","B1_44":"Tutoriels","B1_45":"Enregistré","B1_21":"Paramètres","B1_22":"Mon profil","B1_1":"Fermer","B1_3":"Enregistrer","B1_6":"Adresse","B1_14":"Chargement","B1_8":"Dernier entretien","B1_11":"Kilométrage","B1_15":"Première mise en circulation","B1_16":"Utilisation","B1_12":"Notifications","B1_23":"Langue","B1_10":"Déconnexion","D1_1":"Mise à jour","D1_2":"Selectionnez votre Kia et préciser votre kilométrage","D1_3":"Mon kilométrage actuel","D1_5":"Manuels","D1_6":"Manuels du conducteur","D1_7":"Guide de référence rapide","D1_8":"Le manuel est en cours de téléchargement","D1_9":"Annuler","D1_10":"Chargement terminé","D1_13":"Modèle","D1_14":"Souhaitez-vous vraiment télécharger le Guide de référence rapide ? Nous vous recommandons d'utiliser une connexion Wifi.","D1_15":"Echec du téléchargement","D1_16":"Aucun résultat trouvé","D1_11":"Témoins lumineux","D1_12":"Tutoriels","E1_1":"Mon concessionnaire","E1_2":"Informations","E1_3":"Informations Générales","E1_4":"Horaires d'ouverture","E1_5":"Ventes","E1_6":"Après-vente","E1_7":"Ventes et Après-vente","E1_8":"Lu","E1_9":"Ma","E1_10":"Me","E1_11":"Je","E1_12":"Ve","T1_1":"Sa","T1_2":"Di","E1_13":"Demande d'essai","E1_14":"Demande de brochure","E1_15":"Contact","E1_17":"Téléphone","E1_18":"eMail","E1_19":"Site internet","E1_20":"Prendre rendez-vous","E1_21":"Demande d'essai","E1_22":"Carte","E1_23":"Liste","E1_24":"Concessionnaires Kia trouvés","E1_25":"Confirmer","E1_26":"Plus d'informations","E1_34":"Plan d'entretien personnalisé","E1_41":"Travaux à réaliser ","E1_43":"Saisissez votre kilométrage actuel","E1_45":"RDV à l'atelier","E1_46":"Sélectionner un entretien","E1_47":"Kia Assistance","E1_48":"Suivant","E1_50":"Sélectionner un autre Atelier","E1_51":"Appeler mon Concessionnaire","F1_1":"Localiser une concession Kia","F1_10":"Code postal, Ville ou Concessionnaire","F1_12":"Aucun résultat trouvé","F1_32":"Google Map ne s'affiche pas correctement. Veuillez réessayer.","F1_13":"Localiser une station essence","F1_14":"Station essence","F1_18":"Localiser une borne de recharge","F1_19":"Localiser ma Kia","F1_20":"Mémo","F1_21":"…","F1_22":"Supprimer","F1_24":"Kia Assistance","F1_25":"Dès lors que vous êtes sur la route, sachez que vous n'êtes pas seul. En tant que possesseur Kia, vous avez accès à l'Assistance Kia 7jours/7, 24heures/24, où que vous soyez partout en France Métropolitaine, Corse et dans les autres pays membres de l'Union Européenne (Norvège, Islande, Gibraltar, Monaco, Andorre et Suisse inclus).","F1_26":"Service 24heures/24","F1_27":"En France","F1_28":"A l'international","F1_29":"Appel d'urgence","F1_30":"Dans le cas d'un accident, appelez le numéro d'appel d'urgence ci-dessous. Restez calme et mettez-vous en lieu sûr.","G1_1":"MyKia News","G1_3":"Offres MyKia","G1_5":"Vidéos MyKia","A1_1":"Le temps d'attente est dépassé. Relancez l'action ou fermez l'application et réessayez ultérieurement.","C1_8":"L'eMail ou le mot de passe saisi est incorrect. Veuillez réessayer.","O1_2":"Bonjour [Firsname],Nous avons une information importante à vous communiquer.","O1_3":"Rappel du modèle","R1_1":"Votre kilométrage a été mis à jour.","M1_1":"Souhaitez-vous vraiment télécharger le Manuel du Conducteur ? Nous vous recommandons d'utiliser une connexion Wifi.","K1_1":"Souhaitez-vous visionner la vidéo ? Nous vous recommandons d'utiliser une connexion Wifi.","L1_1":"Cette action requiert l'utilisation de Google Map. Souhaitez-vous installer l'Application Google Map maintenant ?","L1_3":"Télécharger","H1_1":"Votre demande a bien été prise en compte. Vous allez recevoir un eMail vous donnant accès à la brochure demandée.","P1_1":"Pour demander un RDV veuillez vous rendre sur Kia.com/fr/mykia ou contacter directement votre Concessionnaire.","N1_3":"Souhaitez-vous enregistrer la localisation de votre Kia ?","N1_4":"La localisation de votre Kia est enregistrée.","N1_5":"Souhaitez-vous supprimer la localisation de votre Kia ?","N1_6":"Non","N1_7":"Oui","N1_8":"Supprimé","S1_1":"Sortir","S1_2":"Réessayer","S1_3":"La connexion au serveur a échoué. Veuillez réessayer.","S1_4":"En cours de connexion au serveur","S1_5":"La connexion au serveur a échoué. Veuillez contacter réessayer.","S1_6":"Géolocalisation en cours","S1_7":"Cette page nécessite que vous vous connectiez à MyKia. Souhaitez-vous vous connectez maintenant ?","S1_8":"Message","S1_9":"Saisir votre adresse eMail","S1_10":"Saisir votre mot de passe","S1_11":"Vérifiez votre adresse eMail","S1_12":"Aucune information Concessionnaire n'est disponible","S1_13":"Session expirée. Veuillez vous connecter à nouveau.","S1_14":"Mettre à jour mon profil","S1_15":"Contactez-nous","S1_16":"Conditions d'utilisation","S1_17":"Politique de confidentialité","V1_1":"Merci de sélectionner votre pays","S1_27":"Votre prochain entretien doit être effectué le","S1_28":"Kilométrage","S1_29":"Dernier entretien effectué à","F1_33":"Garez-vous ici","S1_36":"Avertissement","U1_2":"Activer le GPS","S1_31":"La numérotation via l'application n'est pas activée. Merci d'activer l'option dans vos paramètres et essayez de nouveau.","T1_4":"Choix du pays","T1_5":"Mentions légales","T1_6":"Refuser","T1_7":"Accepter","N1_2":"Cette action nécessite votre géolocalisation. Veuillez accepter votre géolocalisation.","V1_2":"La localisation par satellite n'est pas activée. Merci de modifier les paramètres de votre profil et de réessayer.","S1_18":"Options","S1_19":"Position GPS","S1_20":"Numérotation téléphone","S1_26":"Chargement de Google map","B1_48":"Souhaitez-vous vous déconnecter ?","S1_35":"MyKia App","T1_10":"Merci d'accepter les conditions générales pour utiliser cette application.","S1_25":"Souhaitez-vous envoyer une demande d'essai routier à votre Concessionnaire ?","S1_37":"Vous devez accepter les conditions générales pour utiliser cette application.","S1_21":"Autoriser","V1_3":"an","B1_46":"Souhaitez-vous vous déconnecter ?","V1_4":"Souhaitez-vous effectuer une demande de brochure ?","V1_5":"Afin de vous connecter veuillez finaliser votre inscription en vous rendant sur la version PC de MyKia https://www.kia.com/fr/mykia/","V1_6":"Une erreur de connexion est survenue. Merci de réessayer ultérieurement.","V1_7":"Vous devez accepter les conditions générales pour utiliser cette application.","V1_8":"Première mise en circulation","V1_9":"Entretien nécessaire à ","V1_10":"Signal GPS trop faible, merci de réessayer ultérieurement.","d_i_18_title":"Témoin du système 4x4 (le cas échéant)","d_i_18_text":"Lorsque le contacteur d'allumage est en position ON, le témoin 4X4 s'allume puis s'éteint en quelques secondes. Ce voyant reste allumé si le système détecte une anomalie.","d_i_18_action":"Si le témoin du système 4x4 reste allumé, faites contrôler le véhicule dès que possible par un Réparateur Agréé Kia.","d_i_19_title":"Témoin de verrouillage du système 4x4 (le cas échéant)","d_i_19_text":"Le témoin de verrouillage 4x4 s'allume lorsque le bouton 4WD LOCK est actionné. Le but du mode 4WD LOCK est d'augmenter le potentiel de conduite. Utilisez le uniquement sur les chaussées humides, les routes enneigées et/ou pour le tout-terrain.","d_i_19_action":"Pour éteindre ce témoin et donc désactiver le système, appuyez de nouveau sur le bouton.","d_i_20_title":"Témoin du système d'antiblocage des freins (ABS) (le cas échéant)","d_i_20_text":"Ce témoin indique un dysfonctionnement au niveau du système ABS. Le système de freinage traditionnel continuera à fonctionner, mais sans l'assistance du système anti-blocage de frein.","d_i_20_action":"Si cela se produit, faites contrôler le véhicule dès que possible par un Réparateur Agréé Kia.","d_i_21_title":"Témoin de dysfonctionnement de l'AFLS (système de phares adaptatifs)","d_i_21_text":"Lorsque le témoin de l'AFLS s'allume, cela signifie que l'AFLS ne fonctionne pas correctement. Arrêtez-vous à l'endroit sûr le plus proche, puis redémarrez le moteur.","d_i_21_action":"Si le témoin reste allumé, nous vous conseillons de faire vérifier le système de votre véhicule par un Réparateur Agréé Kia.","d_i_02_title":"Témoin AIRBAG (le cas échéant)","d_i_02_text":"Ce témoin reste allumé pendant environ 6 secondes à chaque fois que vous tournez le contacteur d'allumage en position ON. Cette lumière s'allume également lorsque le système ne fonctionne pas correctement.","d_i_02_action":"Si le témoin AIRBAG ne s'allume pas ou alors reste allumé plus de 6 secondes, faites contrôler le système par un Réparateur Agréé Kia.","d_i_23_title":"Voyant d'airbag passager avant sur OFF (le cas échéant),Voyant d'airbag passager avant sur OFF (le cas échéant)","d_i_23_text":"Le témoin de désactivation de l'airbag du passager avant s'allume pendant environ 4 secondes une fois la clé de contact placée sur la position ON ou moteur démarré. Le témoin de désactivation de l'airbag passager reste allumé lorsque l'interrupteur de l'airbag du passager avant est placé sur la position OFF ou que le système détecte un dysfonctionnement.,Le témoin de désactivation de l'airbag du passager avant s'allume pendant environ 4 secondes une fois la clé de contact placée sur la position ON ou moteur démarré. Le témoin de désactivation de l'airbag passager reste allumé lorsque l'interrupteur de l'airbag du passager avant est placé sur la position OFF ou que le système détecte un dysfonctionnement.","d_i_23_action":"En cas de dysfonctionnement de l'interrupteur d'airbag du passager avant, le témoin de désactivation d'airbag du passager avant ne s'allume pas. Dans ce cas, l'airbag du passager avant se déclenche en cas d'impact frontal, et ce même si l'interrupteur de l'airbag du passager avant est réglé sur OFF. Si ce problème survient, faites inspecter dès que possible l'interrupteur d'airbag du passager avant et le système dairbag SRS par un Réparateur Agréé Kia.,En cas de dysfonctionnement de l'interrupteur d'airbag du passager avant, le témoin de désactivation d'airbag du passager avant ne s'allume pas. Dans ce cas, l'airbag du passager avant se déclenche en cas d'impact frontal, et ce même si l'interrupteur de l'airbag du passager avant est réglé sur OFF. Si ce problème survient, faites inspecter dès que possible l'interrupteur d'airbag du passager avant et le système dairbag SRS par un Réparateur Agréé Kia.","d_i_01_title":"Témoin d'airbag (le cas échéant)","d_i_01_text":"Ce témoin reste allumé pendant environ 6 secondes à chaque fois que vous tournez le contacteur d'allumage en position ON. Cette lumière s'allume également lorsque le système ne fonctionne pas correctement.","d_i_01_action":"Si le témoin AIRBAG ne s'allume pas lors de la mise sous contact ou alors reste allumé plus de 6 secondes, faites contrôler le système par un Réparateur Agréé Kia.","d_i_47_title":"AUTO HOLD (Maintien Automatique) (le cas échéant)","d_i_47_text":"Si vous appuyez sur l'interrupteur AUTO HOLD (Maintien Automatique), le témoin AUTO HOLD s'allume en blanc (prêt à fonctionner). Lorsque vous arrêtez complètement le véhicule en appuyant sur la pédale de frein, le témoin passe du blanc au vert et le système est actif.","d_i_47_action":"Si le témoin de dysfonctionnement AUTO HOLD (Maintien Automatique) devient jaune, cela indique un dysfonctionnement du maintien automatique. Le cas échéant, faites vérifier le système de votre véhicule par un Réparateur Agréé Kia.","d_i_48_title":"Voyant d'arrêt automatique ISG (le cas échéant)","d_i_48_text":"Le voyant d'arrêt automatique AUTO STOP (vert) du combiné d'instruments clignote pendant 5 secondes et un message \" Auto Start \" (Redémarrage moteur) s'affiche sur l'écran LCD. Ce voyant s'affiche lorsque le moteur s'arrête automatiquement.","d_i_48_action":"Si le combiné d'instruments est équipé d'un écran LCD, un signal s'affiche sur celui-ci. Si le voyant du bouton ISG OFF ne s'éteint pas lorsque vous appuyez dessus ou si le système ISG ne fonctionne pas correctement, veuillez contacter votre Réparateur Agréé KIA dès que possible.","d_i_03_title":"Témoin du système de charge","d_i_03_text":"Ce témoin indique un dysfonctionnement du système de charge électrique.","d_i_03_action":"Si le témoin s'allume, prenez contact avec votre Réparateur Agréé Kia .","d_i_04_title":"Témoin liquide de refroidissement moteur","d_i_04_text":"Ce témoin indique qu'une surchauffe du moteur est détectée.","d_i_04_action":"Si cela ce produit, arrêtez votre véhicule, vérifiez le niveau de liquide de refroidissement et faites vérifier le système par un Réparateur Agréé Kia.","d_i_49_title":"Témoin du régulateur de vitesse (le cas échéant)","d_i_49_text":"Le témoin s'allume lorsque vous activez le régulateur de vitesse en appuyant sur le bouton situé sur le volant.","d_i_49_action":"Le témoin s'éteint lorsque vous appuyez à nouveau sur le bouton pour désactiver le système.","d_i_50_title":"Témoin du régulateur de vitesse SET (le cas échéant)","d_i_50_text":"Le témoin s'allume lorsque vous appuyez sur le bouton de réglage du régulateur de vitesse (-SET ou RES+).","d_i_50_action":"Ce témoin s'allume en vert lorsque vous avez atteint la vitesse désirée. Pour arrêtez le système, appuyez sur le commutateur ON/OFF ou sur le bouton CANCEL du volant. Vous pouvez également stopper le système en appuyant sur la pédale de frein.","d_i_51_title":"Témoin du régulateur de vitesse (le cas échéant)","d_i_51_text":"Le régulateur de vitesse vous permet de maintenir une vitesse constante sans appuyer sur l'accélérateur (au delà de 40 km/h). Le témoin s'allume lorsque vous activez le régulateur de vitesse en appuyant sur le bouton situé sur le volant.","d_i_51_action":"Le témoin s'éteint lorsque vous appuyez à nouveau sur le bouton pour désactiver le système.Si le témoin reste allumé après la désactivation du système, contactez votre Réparateur Agréé Kia.","d_i_52_title":"Témoin DBC (le cas échéant)","d_i_52_text":"Ce témoin s'allume lorsque le système est activé. Lorsque vous descendez une pente à une vitesse inférieure à 40 km/h, le témoin DBC clignote pour indiquer que le système est en marche.","d_i_52_action":"Si un témoin rouge s'allume, il se peut que le système DBC fonctionne mal. Emmenez votre véhicule chez un Réparateur Agrée Kia et faites vérifier le système.","d_i_05_title":"Témoin de porte ouverte","d_i_05_text":"Ce témoin s'allume en rouge lorsqu'une porte n'est pas bien fermée, quelle que soit la position du contacteur d'allumage.","d_i_05_action":"Veillez à fermer correctement toutes les portes.","d_i_06_title":"Témoin de porte ouverte","d_i_06_text":"Ce témoin s'allume en rouge lorsqu'une porte n'est pas bien fermée, quelle que soit la position du contacteur d'allumage.","d_i_06_action":"Veillez à fermer correctement toutes les portes.","d_i_07_title":"Témoin de porte ouverte","d_i_07_text":"Ce témoin s'allume en rouge lorsqu'une porte n'est pas bien fermée, quelle que soit la position du contacteur d'allumage.","d_i_07_action":"Veillez à fermer correctement toutes les portes.","d_i_53_title":"Témoin ECO (le cas échéant)","d_i_53_text":"Ce mode ECO associé à une conduite adaptée permet d'obtenir un rendement optimal de la consommation de carburant.","d_i_53_action":"Ce voyant s'allume lorsque le mode ECO est activé.Pour le désactiver, appuyez à nouveau sur le bouton.","d_i_54_title":"Témoin Active ECO (le cas échéant)","d_i_54_text":"Ce mode ECO associé à une conduite adaptée permet d'obtenir un rendement optimal de la consommation de carburant.","d_i_54_action":"Ce voyant s'allume lorsque le mode ECO est activé.Pour le désactiver, appuyez à nouveau sur le bouton.","d_i_08_title":"Témoin de niveau d'huile moteur (Moteur diesel)","d_i_08_text":"Ce témoin s'allume lorsqu'il convient de vérifier le niveau d'huile. Si le témoin s'allume, vérifiez le niveau d'huile dès que possible puis réajustez-le si nécessaire.","d_i_08_action":"Pour ce faire, utilisez uniquement l'huile moteur préconisée par Kia tout en vous assurant que le niveau d'huile ne dépasse pas le repère MAXI (voir manuel d'utilisation).","d_i_09_title":"Témoin de pression d'huile","d_i_09_text":"Ce témoin indique que la pression d'huile est trop faible. Si le témoin s'allume pendant que vous conduisez : arrêtez-vous prudemment sur le bord de la route.","d_i_09_action":"Une fois le moteur coupé, vérifiez le niveau d'huile moteur. Si le niveau est bas, ajoutez de l'huile. Si le voyant d'avertissement reste allumé suite à l'ajout d'huile, veuillez contacter votre Réparateur Agréé Kia.","d_i_10_title":"Témoin de dysfonctionnement de l'EPB (frein de stationnement électrique)","d_i_10_text":"Le témoin de dysfonctionnement de l'EPB s'allume lorsque le contact est enclenché, mais s'éteint au bout de 3 secondes environ. Ce témoin reste allumé si un dysfonctionnement est détecté.","d_i_10_action":"Si le voyant d'avertissement ne s'allume pas ou ne s'éteint pas, nous vous conseillons de faire vérifier le système par votre Réparateur Agréé Kia.","d_i_27_title":"Voyant ESP (contrôle de trajectoire électronique) (le cas échéant),Voyant ESP (contrôle de trajectoire électronique) (le cas échéant)","d_i_27_text":"Le voyant ESP s'allume lorsque le contact est enclenché, mais doit s'éteindre environ 3 secondes après. Dans des conditions de conduite normales, l'ESP reste éteint.,Le voyant ESP s'allume lorsque le contact est enclenché, mais doit s'éteindre environ 3 secondes après. Dans des conditions de conduite normales, l'ESP reste éteint.","d_i_27_action":"En cas de glissade ou d'adhérence insuffisante, le système se met en marche et le voyant ESP clignote pour indiquer qu'il est actif. Cependant, si le système ESP est défaillant, le témoin s'allume de manière permanente. Emmenez votre véhicule chez un Réparateur Agréé Kia et faites vérifier le système.,En cas de glissade ou d'adhérence insuffisante, le système se met en marche et le voyant ESP clignote pour indiquer qu'il est actif. Cependant, si le système ESP est défaillant, le témoin s'allume de manière permanente. Emmenez votre véhicule chez un Réparateur Agréé Kia et faites vérifier le système.","text_dashboard__ESP_icon_Title":"Voyant ESP (contrôle de trajectoire électronique) (le cas échéant)","text_dashboard__ESP_icon_Icon_Explanation":"Le voyant ESP s'allume lorsque le contact est enclenché, mais doit s'éteindre environ 3 secondes après. Dans des conditions de conduite normales, l'ESP reste éteint.","text_dashboard__ESP_icon_Action":"En cas de glissade ou d'adhérence insuffisante, le système se met en marche et le voyant ESP clignote pour indiquer qu'il est actif. Cependant, si le système ESP est défaillant, le témoin s'allume de manière permanente. Emmenez votre véhicule chez un Réparateur Agréé Kia et faites vérifier le système.","d_i_26_title":"Voyant ESP OFF (contrôle de trajectoire électronique) (le cas échéant)","d_i_26_text":"Ce témoin s'allume lorsque le système ESP est désactivé. Veillez à ne pas désenclencher l'ESP lorsque ce denier est actif.","d_i_26_action":"Pour réenclencher le système, veuillez appuyer de nouveau sur le bouton.","d_i_25_title":"Voyant ESP OFF (contrôle de trajectoire électronique) (le cas échéant)","d_i_25_text":"Ce témoin s'allume lorsque le système ESP est désactivé. Veillez à ne pas désenclencher l'ESP lorsque ce denier est actif.","d_i_25_action":"Pour réenclencher le système, veuillez appuyer de nouveau sur le bouton.","d_i_55_title":"Voyant de feux antibrouillard avant (le cas échéant)","d_i_55_text":"Ce témoin s'allume lorsque les feux antibrouillard avant sont allumés.","d_i_55_action":"Pour éteindre les feux antibrouillard avant, tournez la commande de l'éclairage jusqu'à la position OFF.","d_i_14_title":"Témoin de filtre à carburant (Moteur Diesel)","d_i_14_text":"Ce témoin s'allume pendant 3 secondes après que le contact soit enclenché, puis s'éteint. Si le témoin reste allumé ou s'allume pendant que le moteur tourne, cela indique un dysfonctionnement au niveau du filtre à carburant.","d_i_14_action":"Si vous continuez à rouler avec le témoin allumé, vous risquez d'endommager des pièces du moteur ainsi que le système d'injection du common rail (système d'injection). Dans ce cas, nous vous conseillons de faire contrôler le système de votre véhicule par un Réparateur Agréé Kia.","d_i_28_title":"Voyant de préchauffage (Moteur Diesel)","d_i_28_text":"Le voyant s'allume lorsque le contact est enclenché. Une fois le voyant de préchauffage éteint, vous pouvez démarrer le moteur. La durée pendant laquelle le voyant de préchauffage est allumé varie en fonction de la température de leau, de lair, ainsi que de l'état de charge batterie.","d_i_28_action":"Si le témoin de préchauffage reste allumé ou clignote une fois le moteur chaud, nous vous conseillons de faire vérifier le système de votre véhicule par un Réparateur Agréé Kia.","d_i_56_title":"Témoin d'essence (le cas échéant)","d_i_56_text":"Le témoin s'allume en cas de conduite sur l'alimentation essence indépendamment de la condition de l'interrupteur GPL.","d_i_56_action":"Ce témoin clignote avant de passer au GPL, mais également lorsque le moteur démarre au GPL (interrupteur GSL désactivé) parce que le réservoir d'essence est vide ou qu'il y a un problème avec le circuit d'alimentation d'essence. Le témoin s'éteint ensuite lorsque la pression est suffisante pour alimenter le moteur en GPL.","d_i_40_title":"Voyant des feux de route","d_i_40_text":"Ce voyant indique que vos feux de route sont allumés.","d_i_40_action":"Ce voyant s'illumine également lorsque vous faites des \"appels de phares\".","d_i_41_title":"Voyant des feux de route","d_i_41_text":"Ce voyant indique que vos feux de route sont allumés.","d_i_41_action":"Ce voyant s'illumine également lorsque vous faites des \"appels de phares\".","d_i_38_title":"Voyant de feux antibrouillard arrière","d_i_38_text":"Ce témoin s'allume lorsque les feux antibrouillard arrière sont allumés.","d_i_38_action":"Voyant de feux antibrouillard arrière Ce témoin s'allume lorsque les feux antibrouillard arrière sont allumés.,Pour éteindre les feux antibrouillard arrière, tournez la commande de l'éclairage jusqu'à la position OFF.","d_i_29_title":"Témoin route verglacée","d_i_29_text":"Ce témoin s'allume lorsque la température extérieure est comprise entre -5 °C et 4 °C et qu'il y a risque de verglas.","d_i_29_action":"Si le témoin s'allume pendant que vous conduisez, il est recommandé de vous montrer plus attentif et d'éviter les vitesses excessives, les accélérations et freinages brusques ou les virages serrés, etc.","d_i_30_title":"Voyant d'antidémarrage (le cas échéant)","d_i_30_text":"L'antidémarrage est un système électronique qui empêche votre véhicule de démarrer si vous ne disposez pas de la bonne clé. Ce voyant s'allume lorsque vous mettez le contact. Une fois le moteur démarré, le voyant s'éteint.","d_i_30_action":"Si ce témoin clignote lorsque le contact est enclenché, avant le démarrage du moteur, nous vous conseillons de faire vérifier le système de votre véhicule par un Réparateur Agréé Kia,","d_i_31_title":"Témoin de décharge de pile de la Smart Key (clé intelligente).","d_i_31_text":"Ce témoin s'allume pendant 3 secondes si la pile de la Smart Key du véhicule est déchargée alors que le bouton d'arrêt/démarrage du moteur est sur la position OFF.","d_i_31_action":"En cas de décharge complète de la pile, remplacez la pile par une neuve.","d_i_32_title":"Témoin d'absence de clé dans la voiture (le cas échéant)","d_i_32_text":"Lorsque le bouton d'arrêt/démarrage du moteur est en position accessoire (ACC) ou ON, que l'une des portes est ouverte, le système recherche la Smart Key.","d_i_32_action":"Si la Smart Key n'est pas dans le véhicule, le voyant clignote, et si toutes les portes sont fermées, une alarme sonore retentit également pendant 5 secondes. Le voyant s'éteindra dès que le véhicule roulera. Laissez la Smart Key dans le véhicule ou insérez-la dans son support.","d_i_57_title":"Voyant de feux de position","d_i_57_text":"Ce voyant s'allume lorsque les feux de position sont activées.","d_i_57_action":"Pour éteindre les feux de position, tournez la commande de l'éclairage jusqu'à la position OFF.","d_i_58_title":"Voyant de feux de croisement,Voyant de feux de croisement","d_i_58_text":"Ce voyant s'allume lorsque les feux de croisement sont activés.,Ce voyant s'allume lorsque les feux de croisement sont activés.","d_i_58_action":"Pour éteindre les feux de croisement, tournez la commande de l'éclairage jusqu'à la position OFF.,Pour éteindre les feux de croisement, tournez la commande de l'éclairage jusqu'à la position OFF.","d_i_33_title":"Témoin de niveau de carburant faible","d_i_33_text":"Ce témoin indique que le réservoir de carburant est presque vide.","d_i_33_action":"Lorsqu'il s'allume, pensez à faire le plein de carburant dès que possible. Rouler avec un niveau de carburant trop bas peut causer des dommages à votre moteur.","d_i_34_title":"Témoin de pression des pneus","d_i_34_text":"Le témoin de pression des pneus vous renseigne quant au niveau de pression de vos pneus. Si celui-ci s'allume, cela signifie qu'au moins un de vos pneus est dégonflé. Vérifiez alors la pression de vos pneus dès que possible.","d_i_34_action":"Lorsqu'il y a un problème avec le système de surveillance de la pression des pneus le voyant de pression des pneus s'allume après avoir clignoté pendant environ une minute. Si cela se produit, faites contrôler le système dès que possible par un Réparateur Agréé Kia.","d_i_42_title":"Témoin de pression des pneus","d_i_42_text":"Indicateur de dysfonctionnement du système de contrôle de la pression des pneus. Le témoin de pression des pneus s'allume lorsque le contact est enclenché. et qu'au moins l'un de vos pneus est insuffisamment gonflé.","d_i_43_title":"Voyant de changement de rapport de la boîte de vitesses","d_i_35_title":"Témoin de faible niveau du liquide lave-glace","d_i_35_text":"Ce voyant s'allume pendant 10 secondes lorsque le réservoir de liquide lave-glace est presque vide.","d_i_35_action":"Remplissez-le dès que possible.","d_i_36_title":"Témoin d'anomalie moteur (témoin antipollution)","d_i_36_text":"Ce voyant fait partie du système de commande du moteur qui contrôle plusieurs composants du système antipollution.","d_i_36_action":"S'il s'allume pendant la conduite ou qu'il reste éteint lorsque le contact est allumé, nous vous conseillons de faire vérifier le système par un Réparateur Agréé Kia. En général, votre véhicule reste en état de marche.","d_i_37_title":"Témoin d'anomalie moteur (témoin antipollution)","d_i_37_text":"Ce voyant fait partie du système de commande du moteur qui contrôle plusieurs composants du système antipollution.","d_i_37_action":"S'il s'allume pendant la conduite ou qu'il reste éteint lorsque le contact est allumé, nous vous conseillons de faire vérifier le système par un Réparateur Agréé Kia. En général, votre véhicule reste en état de marche.","d_i_43_text":"Ce voyant vous informe du rapport de vitesse le plus approprié pour économiser du carburant pendant que vous roulez. Lorsque le système ne fonctionne pas correctement, les indicateurs de flèche haut et bas ainsi que le rapport à engager n'apparaissent pas.","d_i_43_action":"Dans ce cas, veuillez faire contrôler le système par un Réparateur Agréé Kia.","d_i_44_title":"Avertissements de dépassement de vitesse (le cas échéant)","d_i_44_text":"Si vous roulez à une vitesse supérieure à 120 km/h, le témoin de dépassement de vitesse clignote.","d_i_44_action":"Cela vous permet d'éviter les excès de vitesse.","d_i_15_title":"Témoin de frein de stationnement & de liquide de frein","d_i_15_text":"Ce voyant s'allume lorsque le frein de stationnement est serré. Le témoin doit s'éteindre lorsque le frein à main est desserré. Dans le cas où celui-ci est correctement desserré, ce voyant peut indiquer que le niveau de liquide de frein dans le réservoir est bas.","d_i_15_action":"Conduire prudemment jusquà ce que vous trouviez un endroit sûr et arrêtez le véhicule. Avec le moteur coupé, vérifiez immédiatement le niveau de liquide de frein et ajustez-le si nécessaire. NE REPRENEZ PAS LE VOLANT SI DES FUITES SONT CONSTATEES. Veuillez contacter un Réparateur Agréé Kia.","d_i_16_title":"Témoin de frein de stationnement & de liquide de frein","d_i_16_text":"Ce voyant s'allume lorsque le frein de stationnement est serré. Le témoin doit s'éteindre lorsque le frein à main est desserré. Dans le cas où celui-ci est correctement desserré, ce voyant peut indiquer que le niveau de liquide de frein dans le réservoir est bas.","d_i_16_action":"Conduire prudemment jusquà ce que vous trouviez un endroit sûr et arrêtez le véhicule. Avec le moteur coupé, vérifiez immédiatement le niveau de liquide de frein et ajustez-le si nécessaire. NE REPRENEZ PAS LE VOLANT SI DES FUITES SONT CONSTATEES. Veuillez contacter un Réparateur Agréé Kia.","d_i_17_title":"Témoin de ceinture de sécurité","d_i_17_text":"Le témoin de la ceinture de sécurité sert de rappel au conducteur : il clignote ou s'allume pendant environ 6 secondes à chaque fois que vous mettez le contact.","d_i_17_action":"Si votre ceinture de sécurité n'est pas attachée après le démarrage de votre véhicule et que vous dépassez les 9 km/h, ce témoin clignote. Il s'arrêtera dès que vous aurez ralenti pour atteindre une vitesse en dessous des 6 km/h. Si votre ceinture n'est toujours pas attachée et que votre vitesse est supérieure à 20 km/h, une alerte sonore retentit pendant environ 100 secondes et le voyant correspondant à la ceinture non-attachée clignotera.","d_i_46_title":"Indicateur de vitesse engagée (le cas échéant)","d_i_46_text":"Ce voyant s’allume en mode séquentielle pour indiquer la vitesse engagée actuelle de la boîte-automatique.","d_i_46_action":"En cas de dysfonctionnement du système, contactez votre Réparateur Agréé Kia dès que possible.","d_i_60_title":"Avertisseur de survitesse","d_i_60_text":"L'indicateur d'activation du limiteur de vitesse s'allume lorsque le bouton sur le volant reçoit une impulsion vers le haut. L'indicateur s'éteint lorsque le bouton reçoit une nouvelle impulsion vers le haut, ce qui désactive le système.","d_i_60_action":"En cas de problème avec le limiteur de vitesse, le témoin clignote. Dans ce cas, nous vous conseillons de faire contrôler le système de votre véhicule par un Réparateur Agréé Kia.","d_i_39_title":"Témoin d'ouverture du coffre","d_i_39_text":"Ce témoin s’allume lorsque le coffre n’est pas bien fermé.","d_i_39_action":"","d_i_45_title":"Voyant de changement de vitesse de la boîte de vitesses automatique (le cas échéant)","d_i_45_text":"Ce voyant s’allume en mode automatique pour indiquer la position actuelle du levier de vitesse de la boîte-pont automatique.","d_i_45_action":"En cas de dysfonctionnement du système, contactez votre Réparateur Agréé Kia dès que possible.","d_i_61_title":"Voyants de clignotant","d_i_61_text":"Les flèches vertes clignotent lorsque l'indicateur de direction est enclenché.","d_i_61_action":"Si les flèches s'allument sans clignoter, clignotent plus rapidement que d'habitude ou ne s'allument plus du tout, le système est victime d'un dysfonctionnement. Il est recommandé de le faire réparer auprès d'un Réparateur Agréé Kia.","dashboard_disclaimer":"* Certains voyants ou témoins ne sont disponibles que pour certains modèles ou certaines finitions. * La couleur des voyants peut differer en fonction des modèles. * Les indications présentes sont fournies à titre indicatif et ne peuvent en aucun cas se substituer au diagnostic de votre Réparateur Agréé Kia. * Pour plus d'informations sur les différents voyants ou témoins, veuillez vous référer à votre manuel d'utilisateur.","W0_1":"Inscrivez-vous au programme MyKia","W0_2":"Vous n'êtes pas encore membre MyKia ? Créez un compte pour bénéficier des avantages de MyKia","W0_3":"Mise à jour du kilométrage","W0_4":"Précisez votre demande","W0_5":"Prénom","W0_6":"Nom","W0_12":"Mes rendez-vous","W0_13":"Prendre rendez-vous chez votre concessionnaire","W0_14":"Prendre rendez-vous à l'atelier","W0_15":"Planifié","W0_16":"En attente","W0_17":"Effectué","W0_18":"Continuer","W0_20":"Champ obligatoire","W0_21":"Type de rendez-vous","W0_22":"Concessionnaire sélectionné ","W0_23":"Date & heure","W0_24":"Informations complémentaires","WS_1":"Nouveau rendez-vous","WS_2":"Type de rendez-vous","WS_4":"Faire un essai","WS_5":"Autres besoins","WS_6":"Financer un modèle","WS_7":"Votre rendez-vous commercial","WS_10":"Contacter votre concessionnaire","WS_11":"Votre réparateur agréé de préférence ne dispose pas d'un showroom. Merci de sélectionner un autre concessionnaire.","WS_22":"Détails du rendez-vous","WS_23":"Objet du rendez-vous","WS_24":"Prix","WS_25":"Kilométrage","WS_27":"km","WS_29":"EUR","WS_51":"Acheter une Kia d'occasion","WS_53":"Modèle","WS_54":"Reprise de ma Kia","WS_55":"Demande de financement","WS_56":"Achat entreprise","W1_31":"Janvier","W1_32":"Février","W1_33":"Mars","W1_34":"Avril","W1_35":"Mai","W1_36":"Juin","W1_37":"Juillet","W1_38":"Août","W1_39":"Septembre","W1_20":"Octobre","W1_21":"Novembre","W1_22":"Décembre","W2_1":"Di","W2_2":"Lu","W2_3":"Ma","W2_4":"Me","W2_5":"Je","W2_6":"Ve","W2_7":"Sa","WD_1":"Dimanche","WD_2":"Lundi","WD_3":"Mardi","WD_4":"Mercredi","WD_5":"Jeudi","WD_6":"Vendredi","WD_7":"Samedi","W3_1":"Non disponible","W3_2":"Sélectionné","W3_3":"Etre rappelé par la concession","W3_4":"Créneau non disponible. Merci de sélectionner un autre créneau horaire.","WS_41":"Confirmation","WW_1":"Votre concessionnaire de préférence ne dispose pas d'un atelier. Merci de sélectionner un autre réparateur agréé.","WW_21":"Entretien périodique","WW_22":"Réparations","WW_23":"Contrôle technique","WW_24":"Autres","WW_25":"Coût estimé*","WW_26":"Réclamation ","WW_3":"Solution de mobilité","WW_41":"Votre véhicule","Y1_6":"Votre demande de RDV a été envoyée","Y1_7":"Campagne saisonnière","Y1_8":"Merci de sélectionner une date","Y1_9":"Merci de sélectionner un horaire ","Y1_10":"Merci de sélectionner une option","Y1_11":"Merci de sélectionner un modèle","Y1_12":"Informations véhicule et Réparateur Agréé","Y1_15":"J'ai besoin d'un véhicule de courtoise pour la journée","Y1_16":"Je déposerai mon véhicule et reviendrai utlérieurement","Y1_17":"J'ai besoin d'un titre de transport","Y1_18":"Je patienterai dans la salle d'attente","Y1_20":"Prochain contrôle technique","Y1_21":"Me contacter pour l'entretien de ma Kia","Y1_22":"Prise de rendez-vous non disponible","Y1_23":"Estimation du prix","Y1_24":"Une erreur est survenue. Merci de contacter votre concessionnaire","Y2_1":"Erreur de chargement ","Y2_2":"Erreur de chargement. Merci de réessayer","Y2_6":"Kilométrage invalide, merci de réessayer","Y2_7":"Prix invalide, merci de réessayer","Y2_8":"Concessionnaire changé avec succès","Y2_9":"Véhicule changé avec succès ","Y2_11":"Kilométrage mis à jour avec succès","Y2_12":"Aucune date disponible ce mois ci","Y2_13":"Vous n'avez aucun rendez-vous en attente. Si vous souhaitez prendre rendez-vous, merci de cliquez sur l'un des choix ci-dessus.","Y2_15":"De","Y2_16":"à","Y2_17":"Chargement","W0_URL":"https://www.kia.com/ie/mykia/register/?utm_source=MyKia%20app&utm_medium=Link&utm_campaign=App%20link","Y1_1":"Mois","WS_8":"Obtenir une estimation","V1_25":"Autres","WS_disclaimer":"Le tarif indiqué est une estimation, sur la base du prix public maximum pratiqué par votre concessionnaire et est fourni à titre indicatif, hors promotion, forfait, contrat d’entretien ou programme de fidélisation. Valeur non contractuelle. Les jours et heures proposés ici ne reflètent pas avec certitude les disponibilités réelles du Réparateur Agréé. <a href='http://www.kia.com/fr/contenus/mentionslegales/' target='_blank'>Cliquez ici pour consulter les Conditions Générales d'Utilisation.</a>","Y1_25":"Autre","PN_01":"Immatriculation","WL_01":"DEFA WarmUp","MC_01":"A PROPOS DE KIA","MC_02":"EXPERIENCE KIA","MC_03":"PRODUITS KIA","MC_04":"ASTUCES KIA","PGURL_01":"https://www.kia.com/fr/mykia/resetpassword/","d_i_11_title":"Témoin d'avertissement du système ESP (contrôle électronique de stabilité)* (le cas échéant)","d_i_11_text":"Ce témoin s'allume dans les cas suivants : • Lorsque la clé de contact ou le bouton de démarrage/arrêt du moteur est en position ON. - Il reste allumé jusqu'au démarrage du moteur. • En cas de mauvais fonctionnement de l' ESP .","d_i_11_action":"Dans ce cas, nous vous conseillons de faire vérifier votre véhicule par un concessionnaire Kia agréé.","d_i_12_title":"Témoin d'avertissement du système ESP (contrôle électronique de stabilité) (le cas échéant)*","d_i_12_text":"Ce témoin s'allume dans les cas suivants : • Lorsque la clé de contact ou le bouton de démarrage/arrêt du moteur est en position ON. - Il reste allumé jusqu'au démarrage du moteur.","d_i_12_action":"En cas de mauvais fonctionnement de l' ESP . Dans ce cas, nous vous conseillons de faire vérifier votre véhicule par un concessionnaire Kia agréé.","d_i_13_title":"Témoin d'avertissement du système ESP (contrôle électronique de stabilité)* (le cas échéant)","d_i_13_text":"Ce témoin s'allume dans les cas suivants : • Lorsque la clé de contact ou le bouton de démarrage/arrêt du moteur est en position ON. - Il reste allumé jusqu'au démarrage du moteur.","d_i_13_action":"En cas de mauvais fonctionnement de l' ESP . Dans ce cas, nous vous conseillons de faire vérifier votre véhicule par un concessionnaire Kia agréé.","d_i_22_title":"Témoin Airbag passager avant OFF *","d_i_22_text":"En cas de dysfonctionnement de l'interrupteur ON/OFF de l'airbag du passager avant, le témoin de l'airbag ( ) du tableau de bord s'allume. De plus, l'indicateur OFF de l'airbag avant du passager ( )ne s'allume pas (l'indicateur ON de l'airbag avant du passager s'allume, puis s'éteint au bout de 60 secondes environ), et le module de commande du SRS réactive l'airbag avant du passager, lequel se gonfle en cas d'impact frontal, même si l'interrupteur ON/OFF de l'airbag avant du passager est en position OFF. Si ce problème survient, faites contrôler dès que possible l'interrupteur ON/OFF de l'airbag du passager avant, le système de ceintures de sécurité à prétension ainsi que le système d'airbag SRS par un concessionnaire Kia agréé.","d_i_22_action":"Si le voyant d'avertissement de l'airbag SRS clignote ou ne s'allume pas lorsque le contact est en position ON ou s'il s'allume pendant la conduite, nous vous conseillons de faire inspecter le système de votre véhicule par un concessionnaire Kia agréé.","d_i_24_title":"Indicateur lumineux de maintien automatique (le cas échéant)*","d_i_24_text":"Ce témoin s'allume dans les cas suivants : • [Blanc] Lorsque vous activez le système de maintien automatique en appuyant sur le bouton AUTO HOLD (Maintien automatique). • [Vert] Lorsque vous arrêtez totalement le véhicule en appuyant sur la pédale de frein tandis que le système de maintien automatique est activé. • [Jaune] En cas de mauvais fonctionnement du système de maintien automatique.","d_i_24_action":"Dans ce cas, nous vous conseillons de faire vérifier votre véhicule par un concessionnaire Kia agréé.","d_i_42_action":"Si l'un des témoins lumineux s'allume, ralentissez immédiatement, adoptez une conduite souple et augmentez les distances de freinage. Arrêtez-vous dès que possible et vérifiez vos pneus sans attendre. Gonflez les pneus à la pression indiquée sur l'étiquette située au niveau du montant central (côté conducteur).","d_i_59_title":"Voyant de feux de croisement (le cas échéant)*","d_i_59_text":"Ce témoin s'allume dans les cas suivants : • Lorsque les phares sont allumés.","d_i_59_action":"Quand le contact est en position ON, l'indicateur de feux de croisement s'éclairera en vert lorsque le commutateur d'éclairage est en position phare (2e position). Lorsque le le voyant de feux de croisement éclaire; les phares, les feux arrières, la plaque d'immatriculation et le tableau de bord s'allumeront.","E1_52":"Chercher concessionnaire"}

			if(M.locale.get() == 'fr-FR'){
				deferred.resolve(data_fr);
			}else{
				deferred.resolve(data);
			}
			
			return deferred.promise;
		}

		// GPS 포지션을 리턴한다.
		function getLocation() {
			//M.pop.instance('** 가상데이터 사용중 ** : getLocation');
			//console.info('** 가상데이터 사용중 **', 'getLocation');

			var  deferred = $q.defer()
				,data = {
					 latitude 	: 50.1064073
					,longitude 	: 8.736026
				}

			deferred.resolve(data);
			return deferred.promise;
		}

		// 서버에서 데이터를 가져옴 HTTP 방식
		function getData(trcode, option) {
			//M.pop.instance('** 가상데이터 사용중 ** : ' + trcode);
			//console.info('** 가상데이터 사용중 **', trcode);

			var  deferred = $q.defer()
				,result = {};

			// 2.8 Get All vehicle model images
			if (trcode == TR_CODE.AllVehicleImages) {
				result = {
					 "ModelImages": [],
						"ResponseCode": 1,
						"ResponseMessage": "GEN-OK: Result ok"
					}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.11 mileage Updating
			if (trcode == TR_CODE.MileageUpdating) {
				result = {
					 ResponseCode 			: 1
					,ResponseMessage 		: "GEN-OK: Result ok"
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.15 Get All Dealer Location Information
			if (trcode == TR_CODE.DealerInformation) {
				result = {  
				   "DealerImageUrl":"https://kia-did.eu/NextGeneration/did/download/filePreview/file_id:1347177/contentHash:872501f4a8a3f423739d75213bd69ea6/width:400/height:800/",
				   "DealerSapCode":"C06VAFR753",
				   "DealerType":3,
				   "Name":"Kia Paris Suffren",
				   "Phone":"01.53.58.56.00",
				   "PhoneService":"01.53.58.56.00",
				   "Street":"76 Bis Avenue de Suffren",
				   "Town":"PARIS",
				   "CountryCode":"fr",
				   "MarketId":"KMFR",
				   "ZipCode":"75015",
				   "Website":"",
				   "Email":"atelier@kia-paris-suffren.com",
				   "EmailService":"atelier@kia-paris-suffren.com",
				   "Description":"",
				   "OpeningHours":{  
				      "Sales":{  
				         "IsEmpty":false,
				         "Monday":   [{"From":"09:00:00", "To":"19:00:00" }],
				         "Tuesday":  [{"From":"09:00:00", "To":"19:00:00" }],
				         "Wednesday":[{"From":"09:00:00", "To":"19:00:00" }],
				         "Thursday": [{"From":"09:00:00", "To":"19:00:00" }],
				         "Friday":   [{"From":"09:00:00", "To":"19:00:00" }],
				         "Saturday": [{"From":"09:30:00", "To":"12:30:00" },{"From":"14:00:00", "To":"18:00:00" }],
				         "Sunday":null
				      },
				      "Service":{  
				         "IsEmpty":false,
				         "Monday":   [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Tuesday":  [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Wednesday":[{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Thursday": [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Friday":   [{"From":"08:00:00", "To":"12:30:00" },{"From":"13:30:00","To":"18:00:00"}],
				         "Saturday":null,
				         "Sunday":null
				      }
				   },
				   "Language":"fr",
				   "GeoLatitude":"48.8520066",
				   "GeoLongitude":"2.2991779",
				   "IndicationEV":false,
				   "HasInfoMedia":true,
				   "ResponseCode":1,
				   "ResponseMessage":"GEN-OK: Result ok"
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.16 Get All Dealer Location Information
			if (trcode == TR_CODE.DealerLocationInformation) {
				result = {
					"Dealers": [
						{
							 "DealerSapCode": "C07VA02656"
							,"DealerType": 1
							,"Name": "Kia Paris Suffren"
							,"Phone": "02773-94150"
							,"Street": "76 Bis Avenue de Suffren"
							,"Town": "PARIS"
							,"CountryCode": "de"
							,"MarketId": "KMDE"
							,"ZipCode": "35708"
							,"Distance": 8.0904903414743767
							,"Latitude": "48.9800315"
							,"Longitude": "2.5164418"
						},{
							 "DealerSapCode": "C07VA02369"
							,"DealerType": 2
							,"Name": "Autohaus Sch&auml;fer & Grimm GmbH"
							,"Phone": "02772-41031"
							,"Street": "Burger Landstra&szlig;e 3-5"
							,"Town": "Herborn"
							,"CountryCode": "de"
							,"MarketId": "KMDE"
							,"ZipCode": "35745"
							,"Distance": 14.281571235804375
							,"Latitude": "50.685264"
							,"Longitude": "8.301538"
						},{
							 "DealerSapCode": "C07VA02473"
							,"DealerType": 3
							,"Name": "Autohaus Menn GmbH"
							,"Phone": "0271/890270-0"
							,"Street": "In der Steinwiese 2"
							,"Town": "Siegen-Kaan"
							,"CountryCode": "de"
							,"MarketId": "KMDE"
							,"ZipCode": "57074"
							,"Distance": 18.919055792622551
							,"Latitude": "50.869660"
							,"Longitude": "8.077600"
						}
					],
					 "ResponseCode": 1
					,"ResponseMessage": "GEN-OK: Result ok"
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.17 Get Dealer Searching
			if (trcode == TR_CODE.DealerSearching) {
				result = {
					"Dealers": [
						{
							"DealerSapCode": "C14VC50545",
							"DealerType": 1,
							"Name": "AutoDrome Nederland",
							"Phone": "0180 590 540",
							"Street": "Stormsweg 28",
							"Town": "KRIMPEN ad IJSSEL",
							"CountryCode": "nl",
							"MarketId": "KMNL",
							"ZipCode": "2921LZ",
							"Distance": 279.15505531957234,
							"Latitude": "51.909761",
							"Longitude": "4.577732"
						},{
							"DealerSapCode": "C07VA02545",
							"DealerType": 2,
							"Name": "Autohaus Gades GmbH & Co. KG -",
							"Phone": "05833 - 95500 0",
							"Street": "Porschestra&szlig;e 1",
							"Town": "Brome",
							"CountryCode": "de",
							"MarketId": "KMDE",
							"ZipCode": "38465",
							"Distance": 286.64129074255925,
							"Latitude": "52.595248",
							"Longitude": "10.920820"
						},{
							"DealerSapCode": "C17VC00258",
							"DealerType": 3,
							"Name": "ELECTROMEC&Aacute;NICA SAN JUAN, S.L.",
							"Phone": "948316397",
							"Street": "PolIgono Industrial Agustinos. Calle D, nave 2, planta 1.",
							"Town": "Pamplona",
							"CountryCode": "es",
							"MarketId": "KMES",
							"ZipCode": "31013",
							"Distance": 1144.8841070171704,
							"Latitude": "42.839555",
							"Longitude": "-1.663924"
						},{
							"DealerSapCode": "C17VC00479",
							"DealerType": 2,
							"Name": "TALLERES ROMERO DE DON BENITO, S.L.",
							"Phone": "924802806",
							"Street": "PolIgono las Cumbres. Calle Marconi n&ordm; 10",
							"Town": "Don Benito",
							"CountryCode": "es",
							"MarketId": "KMES",
							"ZipCode": "06400",
							"Distance": 1701.7291112481673,
							"Latitude": "38.960502",
							"Longitude": "-5.880125"
						}
					],
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok"
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.4
			if (trcode == TR_CODE.UserInformation) {
				result = {
					 "FirstName":"J2u4IRT4NvyARpifE8yH8w=="
					,"LastName":"06+FMUVBL17xm0a6grv7EA=="
					,"Phone":"FurKWA5hg2oWqiiKdMUy1Q=="
					,"Street":""
					,"Housenumber":""
					,"PostalCode":""
					,"City":""
					,"Email":"nXY4BCE06qEmt/ffBnJnjrBtioUpAVXw/X6l/ClH2BA="
					,"PreferredDealer":"EWGQtPFooesRpxNvGzcutQ=="
					,"Male":false
					,"MarketId":"KMIT"
					,"OptinOptions":{
						"ReceiveProductFlag":false
						,"ReceiveRetailFlag":false
						,"ReceiveServiceFlag":false
						,"ReceiveNewsletterFlag":false
						,"ReceiveEventFlag":false
						,"ReceiveResearchFlag":false
					}
					,"Vehicles":["KNABE511AGT063014"]
					,"ResponseCode":1
					,"ResponseMessage":"GEN-OK: Result ok"
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.1
			if (trcode == TR_CODE.GetDealerAvailability) {
				result = {  
				   "CalendarSlots":[{  
				         "ClosingTime":"2016-10-05 10:00:00",
				         "OpeningsTime":"2016-10-05 09:00:00",
				         "Date":"2016-10-05 00:00:00",
				         "TimeSlots":[
							 {"Start":"2016-10-05 09:00:00", "Status":0,"End":"2016-10-05 10:00:00"}
							,{"Start":"2016-10-05 09:30:00", "Status":0,"End":"2016-10-05 10:30:00"}
							,{"Start":"2016-10-05 10:00:00", "Status":0,"End":"2016-10-05 11:00:00"}
							,{"Start":"2016-10-05 10:30:00", "Status":0,"End":"2016-10-05 11:30:00"}
							,{"Start":"2016-10-05 11:00:00", "Status":0,"End":"2016-10-05 12:00:00"}
							,{"Start":"2016-10-05 11:30:00", "Status":0,"End":"2016-10-05 12:30:00"}
							,{"Start":"2016-10-05 12:00:00", "Status":0,"End":"2016-10-05 13:00:00"}
							,{"Start":"2016-10-05 12:30:00", "Status":0,"End":"2016-10-05 13:30:00"}
							,{"Start":"2016-10-05 13:00:00", "Status":0,"End":"2016-10-05 14:00:00"}
							,{"Start":"2016-10-05 13:30:00", "Status":0,"End":"2016-10-05 14:30:00"}
							,{"Start":"2016-10-05 14:00:00", "Status":0,"End":"2016-10-05 15:00:00"}
							,{"Start":"2016-10-05 14:30:00", "Status":0,"End":"2016-10-05 15:30:00"}
							,{"Start":"2016-10-05 15:00:00", "Status":0,"End":"2016-10-05 16:00:00"}
							,{"Start":"2016-10-05 15:30:00", "Status":0,"End":"2016-10-05 16:30:00"}
							,{"Start":"2016-10-05 17:00:00", "Status":0,"End":"2016-10-05 18:00:00"}
							,{"Start":"2016-10-05 17:30:00", "Status":0,"End":"2016-10-05 18:30:00"}
							,{"Start":"2016-10-05 18:00:00", "Status":0,"End":"2016-10-05 19:00:00"}
							,{"Start":"2016-10-05 18:30:00", "Status":0,"End":"2016-10-05 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-06 10:00:00",
				         "OpeningsTime":"2016-10-06 09:00:00",
				         "Date":"2016-10-06 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-06 09:00:00", "Status":0,"End":"2016-10-06 10:00:00"}
							,{"Start":"2016-10-06 09:30:00", "Status":0,"End":"2016-10-06 10:30:00"}
							,{"Start":"2016-10-06 10:00:00", "Status":0,"End":"2016-10-06 11:00:00"}
							,{"Start":"2016-10-06 10:30:00", "Status":0,"End":"2016-10-06 11:30:00"}
							,{"Start":"2016-10-06 11:00:00", "Status":0,"End":"2016-10-06 12:00:00"}
							,{"Start":"2016-10-06 11:30:00", "Status":0,"End":"2016-10-06 12:30:00"}
							,{"Start":"2016-10-06 12:00:00", "Status":0,"End":"2016-10-06 13:00:00"}
							,{"Start":"2016-10-06 12:30:00", "Status":0,"End":"2016-10-06 13:30:00"}
							,{"Start":"2016-10-06 13:00:00", "Status":0,"End":"2016-10-06 14:00:00"}
							,{"Start":"2016-10-06 13:30:00", "Status":0,"End":"2016-10-06 14:30:00"}
							,{"Start":"2016-10-06 14:00:00", "Status":0,"End":"2016-10-06 15:00:00"}
							,{"Start":"2016-10-06 14:30:00", "Status":0,"End":"2016-10-06 15:30:00"}
							,{"Start":"2016-10-06 15:00:00", "Status":0,"End":"2016-10-06 16:00:00"}
							,{"Start":"2016-10-06 15:30:00", "Status":0,"End":"2016-10-06 16:30:00"}
							,{"Start":"2016-10-06 17:00:00", "Status":0,"End":"2016-10-06 18:00:00"}
							,{"Start":"2016-10-06 17:30:00", "Status":0,"End":"2016-10-06 18:30:00"}
							,{"Start":"2016-10-06 18:00:00", "Status":0,"End":"2016-10-06 19:00:00"}
							,{"Start":"2016-10-06 18:30:00", "Status":0,"End":"2016-10-06 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-07 10:00:00",
				         "OpeningsTime":"2016-10-07 09:00:00",
				         "Date":"2016-10-07 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-07 09:00:00", "Status":0,"End":"2016-10-07 10:00:00"}
							,{"Start":"2016-10-07 09:30:00", "Status":0,"End":"2016-10-07 10:30:00"}
							,{"Start":"2016-10-07 10:00:00", "Status":0,"End":"2016-10-07 11:00:00"}
							,{"Start":"2016-10-07 10:30:00", "Status":0,"End":"2016-10-07 11:30:00"}
							,{"Start":"2016-10-07 11:00:00", "Status":0,"End":"2016-10-07 12:00:00"}
							,{"Start":"2016-10-07 11:30:00", "Status":0,"End":"2016-10-07 12:30:00"}
							,{"Start":"2016-10-07 12:00:00", "Status":0,"End":"2016-10-07 13:00:00"}
							,{"Start":"2016-10-07 12:30:00", "Status":0,"End":"2016-10-07 13:30:00"}
							,{"Start":"2016-10-07 13:00:00", "Status":0,"End":"2016-10-07 14:00:00"}
							,{"Start":"2016-10-07 13:30:00", "Status":0,"End":"2016-10-07 14:30:00"}
							,{"Start":"2016-10-07 14:00:00", "Status":0,"End":"2016-10-07 15:00:00"}
							,{"Start":"2016-10-07 14:30:00", "Status":0,"End":"2016-10-07 15:30:00"}
							,{"Start":"2016-10-07 15:00:00", "Status":0,"End":"2016-10-07 16:00:00"}
							,{"Start":"2016-10-07 15:30:00", "Status":0,"End":"2016-10-07 16:30:00"}
							,{"Start":"2016-10-07 17:00:00", "Status":0,"End":"2016-10-07 18:00:00"}
							,{"Start":"2016-10-07 17:30:00", "Status":0,"End":"2016-10-07 18:30:00"}
							,{"Start":"2016-10-07 18:00:00", "Status":0,"End":"2016-10-07 19:00:00"}
							,{"Start":"2016-10-07 18:30:00", "Status":0,"End":"2016-10-07 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-08 09:00:00",
				         "OpeningsTime":"2016-10-08 09:00:00",
				         "Date":"2016-10-08 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-08 09:00:00", "Status":0,"End":"2016-10-08 10:00:00"}
							,{"Start":"2016-10-08 09:30:00", "Status":0,"End":"2016-10-08 10:30:00"}
							,{"Start":"2016-10-08 10:00:00", "Status":0,"End":"2016-10-08 11:00:00"}
							,{"Start":"2016-10-08 10:30:00", "Status":0,"End":"2016-10-08 11:30:00"}
							,{"Start":"2016-10-08 11:00:00", "Status":0,"End":"2016-10-08 12:00:00"}
							,{"Start":"2016-10-08 11:30:00", "Status":0,"End":"2016-10-08 12:30:00"}
							,{"Start":"2016-10-08 12:00:00", "Status":0,"End":"2016-10-08 13:00:00"}
							,{"Start":"2016-10-08 12:30:00", "Status":0,"End":"2016-10-08 13:30:00"}
							,{"Start":"2016-10-08 13:00:00", "Status":0,"End":"2016-10-08 14:00:00"}
							,{"Start":"2016-10-08 13:30:00", "Status":0,"End":"2016-10-08 14:30:00"}
							,{"Start":"2016-10-08 14:00:00", "Status":0,"End":"2016-10-08 15:00:00"}
							,{"Start":"2016-10-08 14:30:00", "Status":0,"End":"2016-10-08 15:30:00"}
							,{"Start":"2016-10-08 15:00:00", "Status":0,"End":"2016-10-08 16:00:00"}
							,{"Start":"2016-10-08 15:30:00", "Status":0,"End":"2016-10-08 16:30:00"}
							,{"Start":"2016-10-08 17:00:00", "Status":0,"End":"2016-10-08 18:00:00"}
							,{"Start":"2016-10-08 17:30:00", "Status":0,"End":"2016-10-08 18:30:00"}
							,{"Start":"2016-10-08 18:00:00", "Status":0,"End":"2016-10-08 19:00:00"}
							,{"Start":"2016-10-08 18:30:00", "Status":0,"End":"2016-10-08 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-09 09:00:00",
				         "OpeningsTime":"2016-10-09 09:00:00",
				         "Date":"2016-10-09 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-09 09:00:00", "Status":0,"End":"2016-10-09 10:00:00"}
							,{"Start":"2016-10-09 09:30:00", "Status":0,"End":"2016-10-09 10:30:00"}
							,{"Start":"2016-10-09 10:00:00", "Status":0,"End":"2016-10-09 11:00:00"}
							,{"Start":"2016-10-09 10:30:00", "Status":0,"End":"2016-10-09 11:30:00"}
							,{"Start":"2016-10-09 11:00:00", "Status":0,"End":"2016-10-09 12:00:00"}
							,{"Start":"2016-10-09 11:30:00", "Status":0,"End":"2016-10-09 12:30:00"}
							,{"Start":"2016-10-09 12:00:00", "Status":0,"End":"2016-10-09 13:00:00"}
							,{"Start":"2016-10-09 12:30:00", "Status":0,"End":"2016-10-09 13:30:00"}
							,{"Start":"2016-10-09 13:00:00", "Status":0,"End":"2016-10-09 14:00:00"}
							,{"Start":"2016-10-09 13:30:00", "Status":0,"End":"2016-10-09 14:30:00"}
							,{"Start":"2016-10-09 14:00:00", "Status":0,"End":"2016-10-09 15:00:00"}
							,{"Start":"2016-10-09 14:30:00", "Status":0,"End":"2016-10-09 15:30:00"}
							,{"Start":"2016-10-09 15:00:00", "Status":0,"End":"2016-10-09 16:00:00"}
							,{"Start":"2016-10-09 15:30:00", "Status":0,"End":"2016-10-09 16:30:00"}
							,{"Start":"2016-10-09 17:00:00", "Status":0,"End":"2016-10-09 18:00:00"}
							,{"Start":"2016-10-09 17:30:00", "Status":0,"End":"2016-10-09 18:30:00"}
							,{"Start":"2016-10-09 18:00:00", "Status":0,"End":"2016-10-09 19:00:00"}
							,{"Start":"2016-10-09 18:30:00", "Status":0,"End":"2016-10-09 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-10 10:00:00",
				         "OpeningsTime":"2016-10-10 09:00:00",
				         "Date":"2016-10-10 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-10 09:00:00", "Status":0,"End":"2016-10-10 10:00:00"}
							,{"Start":"2016-10-10 09:30:00", "Status":0,"End":"2016-10-10 10:30:00"}
							,{"Start":"2016-10-10 10:00:00", "Status":0,"End":"2016-10-10 11:00:00"}
							,{"Start":"2016-10-10 10:30:00", "Status":0,"End":"2016-10-10 11:30:00"}
							,{"Start":"2016-10-10 11:00:00", "Status":0,"End":"2016-10-10 12:00:00"}
							,{"Start":"2016-10-10 11:30:00", "Status":0,"End":"2016-10-10 12:30:00"}
							,{"Start":"2016-10-10 12:00:00", "Status":0,"End":"2016-10-10 13:00:00"}
							,{"Start":"2016-10-10 12:30:00", "Status":0,"End":"2016-10-10 13:30:00"}
							,{"Start":"2016-10-10 13:00:00", "Status":0,"End":"2016-10-10 14:00:00"}
							,{"Start":"2016-10-10 13:30:00", "Status":0,"End":"2016-10-10 14:30:00"}
							,{"Start":"2016-10-10 14:00:00", "Status":0,"End":"2016-10-10 15:00:00"}
							,{"Start":"2016-10-10 14:30:00", "Status":0,"End":"2016-10-10 15:30:00"}
							,{"Start":"2016-10-10 15:00:00", "Status":0,"End":"2016-10-10 16:00:00"}
							,{"Start":"2016-10-10 15:30:00", "Status":0,"End":"2016-10-10 16:30:00"}
							,{"Start":"2016-10-10 17:00:00", "Status":0,"End":"2016-10-10 18:00:00"}
							,{"Start":"2016-10-10 17:30:00", "Status":0,"End":"2016-10-10 18:30:00"}
							,{"Start":"2016-10-10 18:00:00", "Status":0,"End":"2016-10-10 19:00:00"}
							,{"Start":"2016-10-10 18:30:00", "Status":0,"End":"2016-10-10 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-11 09:00:00",
				         "OpeningsTime":"2016-10-11 09:00:00",
				         "Date":"2016-10-11 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-11 09:00:00", "Status":0,"End":"2016-10-11 10:00:00"}
							,{"Start":"2016-10-11 09:30:00", "Status":0,"End":"2016-10-11 10:30:00"}
							,{"Start":"2016-10-11 10:00:00", "Status":0,"End":"2016-10-11 11:00:00"}
							,{"Start":"2016-10-11 10:30:00", "Status":0,"End":"2016-10-11 11:30:00"}
							,{"Start":"2016-10-11 11:00:00", "Status":0,"End":"2016-10-11 12:00:00"}
							,{"Start":"2016-10-11 11:30:00", "Status":0,"End":"2016-10-11 12:30:00"}
							,{"Start":"2016-10-11 12:00:00", "Status":0,"End":"2016-10-11 13:00:00"}
							,{"Start":"2016-10-11 12:30:00", "Status":0,"End":"2016-10-11 13:30:00"}
							,{"Start":"2016-10-11 13:00:00", "Status":0,"End":"2016-10-11 14:00:00"}
							,{"Start":"2016-10-11 13:30:00", "Status":0,"End":"2016-10-11 14:30:00"}
							,{"Start":"2016-10-11 14:00:00", "Status":0,"End":"2016-10-11 15:00:00"}
							,{"Start":"2016-10-11 14:30:00", "Status":0,"End":"2016-10-11 15:30:00"}
							,{"Start":"2016-10-11 15:00:00", "Status":0,"End":"2016-10-11 16:00:00"}
							,{"Start":"2016-10-11 15:30:00", "Status":0,"End":"2016-10-11 16:30:00"}
							,{"Start":"2016-10-11 17:00:00", "Status":0,"End":"2016-10-11 18:00:00"}
							,{"Start":"2016-10-11 17:30:00", "Status":0,"End":"2016-10-11 18:30:00"}
							,{"Start":"2016-10-11 18:00:00", "Status":0,"End":"2016-10-11 19:00:00"}
							,{"Start":"2016-10-11 18:30:00", "Status":0,"End":"2016-10-11 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-12 10:00:00",
				         "OpeningsTime":"2016-10-12 09:00:00",
				         "Date":"2016-10-12 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-12 09:00:00", "Status":0,"End":"2016-10-12 10:00:00"}
							,{"Start":"2016-10-12 09:30:00", "Status":0,"End":"2016-10-12 10:30:00"}
							,{"Start":"2016-10-12 10:00:00", "Status":0,"End":"2016-10-12 11:00:00"}
							,{"Start":"2016-10-12 10:30:00", "Status":0,"End":"2016-10-12 11:30:00"}
							,{"Start":"2016-10-12 11:00:00", "Status":0,"End":"2016-10-12 12:00:00"}
							,{"Start":"2016-10-12 11:30:00", "Status":0,"End":"2016-10-12 12:30:00"}
							,{"Start":"2016-10-12 12:00:00", "Status":0,"End":"2016-10-12 13:00:00"}
							,{"Start":"2016-10-12 12:30:00", "Status":0,"End":"2016-10-12 13:30:00"}
							,{"Start":"2016-10-12 13:00:00", "Status":0,"End":"2016-10-12 14:00:00"}
							,{"Start":"2016-10-12 13:30:00", "Status":0,"End":"2016-10-12 14:30:00"}
							,{"Start":"2016-10-12 14:00:00", "Status":0,"End":"2016-10-12 15:00:00"}
							,{"Start":"2016-10-12 14:30:00", "Status":0,"End":"2016-10-12 15:30:00"}
							,{"Start":"2016-10-12 15:00:00", "Status":0,"End":"2016-10-12 16:00:00"}
							,{"Start":"2016-10-12 15:30:00", "Status":0,"End":"2016-10-12 16:30:00"}
							,{"Start":"2016-10-12 17:00:00", "Status":0,"End":"2016-10-12 18:00:00"}
							,{"Start":"2016-10-12 17:30:00", "Status":0,"End":"2016-10-12 18:30:00"}
							,{"Start":"2016-10-12 18:00:00", "Status":0,"End":"2016-10-12 19:00:00"}
							,{"Start":"2016-10-12 18:30:00", "Status":0,"End":"2016-10-12 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-13 10:00:00",
				         "OpeningsTime":"2016-10-13 09:00:00",
				         "Date":"2016-10-13 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-13 09:00:00", "Status":0,"End":"2016-10-13 10:00:00"}
							,{"Start":"2016-10-13 09:30:00", "Status":0,"End":"2016-10-13 10:30:00"}
							,{"Start":"2016-10-13 10:00:00", "Status":0,"End":"2016-10-13 11:00:00"}
							,{"Start":"2016-10-13 10:30:00", "Status":0,"End":"2016-10-13 11:30:00"}
							,{"Start":"2016-10-13 11:00:00", "Status":0,"End":"2016-10-13 12:00:00"}
							,{"Start":"2016-10-13 11:30:00", "Status":0,"End":"2016-10-13 12:30:00"}
							,{"Start":"2016-10-13 12:00:00", "Status":0,"End":"2016-10-13 13:00:00"}
							,{"Start":"2016-10-13 12:30:00", "Status":0,"End":"2016-10-13 13:30:00"}
							,{"Start":"2016-10-13 13:00:00", "Status":0,"End":"2016-10-13 14:00:00"}
							,{"Start":"2016-10-13 13:30:00", "Status":0,"End":"2016-10-13 14:30:00"}
							,{"Start":"2016-10-13 14:00:00", "Status":0,"End":"2016-10-13 15:00:00"}
							,{"Start":"2016-10-13 14:30:00", "Status":0,"End":"2016-10-13 15:30:00"}
							,{"Start":"2016-10-13 15:00:00", "Status":0,"End":"2016-10-13 16:00:00"}
							,{"Start":"2016-10-13 15:30:00", "Status":0,"End":"2016-10-13 16:30:00"}
							,{"Start":"2016-10-13 17:00:00", "Status":0,"End":"2016-10-13 18:00:00"}
							,{"Start":"2016-10-13 17:30:00", "Status":0,"End":"2016-10-13 18:30:00"}
							,{"Start":"2016-10-13 18:00:00", "Status":0,"End":"2016-10-13 19:00:00"}
							,{"Start":"2016-10-13 18:30:00", "Status":0,"End":"2016-10-13 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-14 10:00:00",
				         "OpeningsTime":"2016-10-14 09:00:00",
				         "Date":"2016-10-14 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-14 09:00:00", "Status":0,"End":"2016-10-14 10:00:00"}
							,{"Start":"2016-10-14 09:30:00", "Status":0,"End":"2016-10-14 10:30:00"}
							,{"Start":"2016-10-14 10:00:00", "Status":0,"End":"2016-10-14 11:00:00"}
							,{"Start":"2016-10-14 10:30:00", "Status":0,"End":"2016-10-14 11:30:00"}
							,{"Start":"2016-10-14 11:00:00", "Status":0,"End":"2016-10-14 12:00:00"}
							,{"Start":"2016-10-14 11:30:00", "Status":0,"End":"2016-10-14 12:30:00"}
							,{"Start":"2016-10-14 12:00:00", "Status":0,"End":"2016-10-14 13:00:00"}
							,{"Start":"2016-10-14 12:30:00", "Status":0,"End":"2016-10-14 13:30:00"}
							,{"Start":"2016-10-14 13:00:00", "Status":0,"End":"2016-10-14 14:00:00"}
							,{"Start":"2016-10-14 13:30:00", "Status":0,"End":"2016-10-14 14:30:00"}
							,{"Start":"2016-10-14 14:00:00", "Status":0,"End":"2016-10-14 15:00:00"}
							,{"Start":"2016-10-14 14:30:00", "Status":0,"End":"2016-10-14 15:30:00"}
							,{"Start":"2016-10-14 15:00:00", "Status":0,"End":"2016-10-14 16:00:00"}
							,{"Start":"2016-10-14 15:30:00", "Status":0,"End":"2016-10-14 16:30:00"}
							,{"Start":"2016-10-14 17:00:00", "Status":0,"End":"2016-10-14 18:00:00"}
							,{"Start":"2016-10-14 17:30:00", "Status":0,"End":"2016-10-14 18:30:00"}
							,{"Start":"2016-10-14 18:00:00", "Status":0,"End":"2016-10-14 19:00:00"}
							,{"Start":"2016-10-14 18:30:00", "Status":0,"End":"2016-10-14 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-15 09:00:00",
				         "OpeningsTime":"2016-10-15 09:00:00",
				         "Date":"2016-10-15 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-15 09:00:00", "Status":0,"End":"2016-10-15 10:00:00"}
							,{"Start":"2016-10-15 09:30:00", "Status":0,"End":"2016-10-15 10:30:00"}
							,{"Start":"2016-10-15 10:00:00", "Status":0,"End":"2016-10-15 11:00:00"}
							,{"Start":"2016-10-15 10:30:00", "Status":0,"End":"2016-10-15 11:30:00"}
							,{"Start":"2016-10-15 11:00:00", "Status":0,"End":"2016-10-15 12:00:00"}
							,{"Start":"2016-10-15 11:30:00", "Status":0,"End":"2016-10-15 12:30:00"}
							,{"Start":"2016-10-15 12:00:00", "Status":0,"End":"2016-10-15 13:00:00"}
							,{"Start":"2016-10-15 12:30:00", "Status":0,"End":"2016-10-15 13:30:00"}
							,{"Start":"2016-10-15 13:00:00", "Status":0,"End":"2016-10-15 14:00:00"}
							,{"Start":"2016-10-15 13:30:00", "Status":0,"End":"2016-10-15 14:30:00"}
							,{"Start":"2016-10-15 14:00:00", "Status":0,"End":"2016-10-15 15:00:00"}
							,{"Start":"2016-10-15 14:30:00", "Status":0,"End":"2016-10-15 15:30:00"}
							,{"Start":"2016-10-15 15:00:00", "Status":0,"End":"2016-10-15 16:00:00"}
							,{"Start":"2016-10-15 15:30:00", "Status":0,"End":"2016-10-15 16:30:00"}
							,{"Start":"2016-10-15 17:00:00", "Status":0,"End":"2016-10-15 18:00:00"}
							,{"Start":"2016-10-15 17:30:00", "Status":0,"End":"2016-10-15 18:30:00"}
							,{"Start":"2016-10-15 18:00:00", "Status":0,"End":"2016-10-15 19:00:00"}
							,{"Start":"2016-10-15 18:30:00", "Status":0,"End":"2016-10-15 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-16 09:00:00",
				         "OpeningsTime":"2016-10-16 09:00:00",
				         "Date":"2016-10-16 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-16 09:00:00", "Status":0,"End":"2016-10-16 10:00:00"}
							,{"Start":"2016-10-16 09:30:00", "Status":0,"End":"2016-10-16 10:30:00"}
							,{"Start":"2016-10-16 10:00:00", "Status":0,"End":"2016-10-16 11:00:00"}
							,{"Start":"2016-10-16 10:30:00", "Status":0,"End":"2016-10-16 11:30:00"}
							,{"Start":"2016-10-16 11:00:00", "Status":0,"End":"2016-10-16 12:00:00"}
							,{"Start":"2016-10-16 11:30:00", "Status":0,"End":"2016-10-16 12:30:00"}
							,{"Start":"2016-10-16 12:00:00", "Status":0,"End":"2016-10-16 13:00:00"}
							,{"Start":"2016-10-16 12:30:00", "Status":0,"End":"2016-10-16 13:30:00"}
							,{"Start":"2016-10-16 13:00:00", "Status":0,"End":"2016-10-16 14:00:00"}
							,{"Start":"2016-10-16 13:30:00", "Status":0,"End":"2016-10-16 14:30:00"}
							,{"Start":"2016-10-16 14:00:00", "Status":0,"End":"2016-10-16 15:00:00"}
							,{"Start":"2016-10-16 14:30:00", "Status":0,"End":"2016-10-16 15:30:00"}
							,{"Start":"2016-10-16 15:00:00", "Status":0,"End":"2016-10-16 16:00:00"}
							,{"Start":"2016-10-16 15:30:00", "Status":0,"End":"2016-10-16 16:30:00"}
							,{"Start":"2016-10-16 17:00:00", "Status":0,"End":"2016-10-16 18:00:00"}
							,{"Start":"2016-10-16 17:30:00", "Status":0,"End":"2016-10-16 18:30:00"}
							,{"Start":"2016-10-16 18:00:00", "Status":0,"End":"2016-10-16 19:00:00"}
							,{"Start":"2016-10-16 18:30:00", "Status":0,"End":"2016-10-16 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-17 10:00:00",
				         "OpeningsTime":"2016-10-17 09:00:00",
				         "Date":"2016-10-17 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-17 09:00:00", "Status":0,"End":"2016-10-17 10:00:00"}
							,{"Start":"2016-10-17 09:30:00", "Status":0,"End":"2016-10-17 10:30:00"}
							,{"Start":"2016-10-17 10:00:00", "Status":0,"End":"2016-10-17 11:00:00"}
							,{"Start":"2016-10-17 10:30:00", "Status":0,"End":"2016-10-17 11:30:00"}
							,{"Start":"2016-10-17 11:00:00", "Status":0,"End":"2016-10-17 12:00:00"}
							,{"Start":"2016-10-17 11:30:00", "Status":0,"End":"2016-10-17 12:30:00"}
							,{"Start":"2016-10-17 12:00:00", "Status":0,"End":"2016-10-17 13:00:00"}
							,{"Start":"2016-10-17 12:30:00", "Status":0,"End":"2016-10-17 13:30:00"}
							,{"Start":"2016-10-17 13:00:00", "Status":0,"End":"2016-10-17 14:00:00"}
							,{"Start":"2016-10-17 13:30:00", "Status":0,"End":"2016-10-17 14:30:00"}
							,{"Start":"2016-10-17 14:00:00", "Status":0,"End":"2016-10-17 15:00:00"}
							,{"Start":"2016-10-17 14:30:00", "Status":0,"End":"2016-10-17 15:30:00"}
							,{"Start":"2016-10-17 15:00:00", "Status":0,"End":"2016-10-17 16:00:00"}
							,{"Start":"2016-10-17 15:30:00", "Status":0,"End":"2016-10-17 16:30:00"}
							,{"Start":"2016-10-17 17:00:00", "Status":0,"End":"2016-10-17 18:00:00"}
							,{"Start":"2016-10-17 17:30:00", "Status":0,"End":"2016-10-17 18:30:00"}
							,{"Start":"2016-10-17 18:00:00", "Status":0,"End":"2016-10-17 19:00:00"}
							,{"Start":"2016-10-17 18:30:00", "Status":0,"End":"2016-10-17 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-18 09:00:00",
				         "OpeningsTime":"2016-10-18 09:00:00",
				         "Date":"2016-10-18 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-18 09:00:00", "Status":0,"End":"2016-10-18 10:00:00"}
							,{"Start":"2016-10-18 09:30:00", "Status":0,"End":"2016-10-18 10:30:00"}
							,{"Start":"2016-10-18 10:00:00", "Status":0,"End":"2016-10-18 11:00:00"}
							,{"Start":"2016-10-18 10:30:00", "Status":0,"End":"2016-10-18 11:30:00"}
							,{"Start":"2016-10-18 11:00:00", "Status":0,"End":"2016-10-18 12:00:00"}
							,{"Start":"2016-10-18 11:30:00", "Status":0,"End":"2016-10-18 12:30:00"}
							,{"Start":"2016-10-18 12:00:00", "Status":0,"End":"2016-10-18 13:00:00"}
							,{"Start":"2016-10-18 12:30:00", "Status":0,"End":"2016-10-18 13:30:00"}
							,{"Start":"2016-10-18 13:00:00", "Status":0,"End":"2016-10-18 14:00:00"}
							,{"Start":"2016-10-18 13:30:00", "Status":0,"End":"2016-10-18 14:30:00"}
							,{"Start":"2016-10-18 14:00:00", "Status":0,"End":"2016-10-18 15:00:00"}
							,{"Start":"2016-10-18 14:30:00", "Status":0,"End":"2016-10-18 15:30:00"}
							,{"Start":"2016-10-18 15:00:00", "Status":0,"End":"2016-10-18 16:00:00"}
							,{"Start":"2016-10-18 15:30:00", "Status":0,"End":"2016-10-18 16:30:00"}
							,{"Start":"2016-10-18 17:00:00", "Status":0,"End":"2016-10-18 18:00:00"}
							,{"Start":"2016-10-18 17:30:00", "Status":0,"End":"2016-10-18 18:30:00"}
							,{"Start":"2016-10-18 18:00:00", "Status":0,"End":"2016-10-18 19:00:00"}
							,{"Start":"2016-10-18 18:30:00", "Status":0,"End":"2016-10-18 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-19 10:00:00",
				         "OpeningsTime":"2016-10-19 09:00:00",
				         "Date":"2016-10-19 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-19 09:00:00", "Status":0,"End":"2016-10-19 10:00:00"}
							,{"Start":"2016-10-19 09:30:00", "Status":0,"End":"2016-10-19 10:30:00"}
							,{"Start":"2016-10-19 10:00:00", "Status":0,"End":"2016-10-19 11:00:00"}
							,{"Start":"2016-10-19 10:30:00", "Status":0,"End":"2016-10-19 11:30:00"}
							,{"Start":"2016-10-19 11:00:00", "Status":0,"End":"2016-10-19 12:00:00"}
							,{"Start":"2016-10-19 11:30:00", "Status":0,"End":"2016-10-19 12:30:00"}
							,{"Start":"2016-10-19 12:00:00", "Status":0,"End":"2016-10-19 13:00:00"}
							,{"Start":"2016-10-19 12:30:00", "Status":0,"End":"2016-10-19 13:30:00"}
							,{"Start":"2016-10-19 13:00:00", "Status":0,"End":"2016-10-19 14:00:00"}
							,{"Start":"2016-10-19 13:30:00", "Status":0,"End":"2016-10-19 14:30:00"}
							,{"Start":"2016-10-19 14:00:00", "Status":0,"End":"2016-10-19 15:00:00"}
							,{"Start":"2016-10-19 14:30:00", "Status":0,"End":"2016-10-19 15:30:00"}
							,{"Start":"2016-10-19 15:00:00", "Status":0,"End":"2016-10-19 16:00:00"}
							,{"Start":"2016-10-19 15:30:00", "Status":0,"End":"2016-10-19 16:30:00"}
							,{"Start":"2016-10-19 17:00:00", "Status":0,"End":"2016-10-19 18:00:00"}
							,{"Start":"2016-10-19 17:30:00", "Status":0,"End":"2016-10-19 18:30:00"}
							,{"Start":"2016-10-19 18:00:00", "Status":0,"End":"2016-10-19 19:00:00"}
							,{"Start":"2016-10-19 18:30:00", "Status":0,"End":"2016-10-19 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-20 10:00:00",
				         "OpeningsTime":"2016-10-20 09:00:00",
				         "Date":"2016-10-20 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-20 09:00:00", "Status":0,"End":"2016-10-20 10:00:00"}
							,{"Start":"2016-10-20 09:30:00", "Status":0,"End":"2016-10-20 10:30:00"}
							,{"Start":"2016-10-20 10:00:00", "Status":0,"End":"2016-10-20 11:00:00"}
							,{"Start":"2016-10-20 10:30:00", "Status":0,"End":"2016-10-20 11:30:00"}
							,{"Start":"2016-10-20 11:00:00", "Status":0,"End":"2016-10-20 12:00:00"}
							,{"Start":"2016-10-20 11:30:00", "Status":0,"End":"2016-10-20 12:30:00"}
							,{"Start":"2016-10-20 12:00:00", "Status":0,"End":"2016-10-20 13:00:00"}
							,{"Start":"2016-10-20 12:30:00", "Status":0,"End":"2016-10-20 13:30:00"}
							,{"Start":"2016-10-20 13:00:00", "Status":0,"End":"2016-10-20 14:00:00"}
							,{"Start":"2016-10-20 13:30:00", "Status":0,"End":"2016-10-20 14:30:00"}
							,{"Start":"2016-10-20 14:00:00", "Status":0,"End":"2016-10-20 15:00:00"}
							,{"Start":"2016-10-20 14:30:00", "Status":0,"End":"2016-10-20 15:30:00"}
							,{"Start":"2016-10-20 15:00:00", "Status":0,"End":"2016-10-20 16:00:00"}
							,{"Start":"2016-10-20 15:30:00", "Status":0,"End":"2016-10-20 16:30:00"}
							,{"Start":"2016-10-20 17:00:00", "Status":0,"End":"2016-10-20 18:00:00"}
							,{"Start":"2016-10-20 17:30:00", "Status":0,"End":"2016-10-20 18:30:00"}
							,{"Start":"2016-10-20 18:00:00", "Status":0,"End":"2016-10-20 19:00:00"}
							,{"Start":"2016-10-20 18:30:00", "Status":0,"End":"2016-10-20 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-21 10:00:00",
				         "OpeningsTime":"2016-10-21 09:00:00",
				         "Date":"2016-10-21 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-21 09:00:00", "Status":0,"End":"2016-10-21 10:00:00"}
							,{"Start":"2016-10-21 09:30:00", "Status":0,"End":"2016-10-21 10:30:00"}
							,{"Start":"2016-10-21 10:00:00", "Status":0,"End":"2016-10-21 11:00:00"}
							,{"Start":"2016-10-21 10:30:00", "Status":0,"End":"2016-10-21 11:30:00"}
							,{"Start":"2016-10-21 11:00:00", "Status":0,"End":"2016-10-21 12:00:00"}
							,{"Start":"2016-10-21 11:30:00", "Status":0,"End":"2016-10-21 12:30:00"}
							,{"Start":"2016-10-21 12:00:00", "Status":0,"End":"2016-10-21 13:00:00"}
							,{"Start":"2016-10-21 12:30:00", "Status":0,"End":"2016-10-21 13:30:00"}
							,{"Start":"2016-10-21 13:00:00", "Status":0,"End":"2016-10-21 14:00:00"}
							,{"Start":"2016-10-21 13:30:00", "Status":0,"End":"2016-10-21 14:30:00"}
							,{"Start":"2016-10-21 14:00:00", "Status":0,"End":"2016-10-21 15:00:00"}
							,{"Start":"2016-10-21 14:30:00", "Status":0,"End":"2016-10-21 15:30:00"}
							,{"Start":"2016-10-21 15:00:00", "Status":0,"End":"2016-10-21 16:00:00"}
							,{"Start":"2016-10-21 15:30:00", "Status":0,"End":"2016-10-21 16:30:00"}
							,{"Start":"2016-10-21 17:00:00", "Status":0,"End":"2016-10-21 18:00:00"}
							,{"Start":"2016-10-21 17:30:00", "Status":0,"End":"2016-10-21 18:30:00"}
							,{"Start":"2016-10-21 18:00:00", "Status":0,"End":"2016-10-21 19:00:00"}
							,{"Start":"2016-10-21 18:30:00", "Status":0,"End":"2016-10-21 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-22 09:00:00",
				         "OpeningsTime":"2016-10-22 09:00:00",
				         "Date":"2016-10-22 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-22 09:00:00", "Status":0,"End":"2016-10-22 10:00:00"}
							,{"Start":"2016-10-22 09:30:00", "Status":0,"End":"2016-10-22 10:30:00"}
							,{"Start":"2016-10-22 10:00:00", "Status":0,"End":"2016-10-22 11:00:00"}
							,{"Start":"2016-10-22 10:30:00", "Status":0,"End":"2016-10-22 11:30:00"}
							,{"Start":"2016-10-22 11:00:00", "Status":0,"End":"2016-10-22 12:00:00"}
							,{"Start":"2016-10-22 11:30:00", "Status":0,"End":"2016-10-22 12:30:00"}
							,{"Start":"2016-10-22 12:00:00", "Status":0,"End":"2016-10-22 13:00:00"}
							,{"Start":"2016-10-22 12:30:00", "Status":0,"End":"2016-10-22 13:30:00"}
							,{"Start":"2016-10-22 13:00:00", "Status":0,"End":"2016-10-22 14:00:00"}
							,{"Start":"2016-10-22 13:30:00", "Status":0,"End":"2016-10-22 14:30:00"}
							,{"Start":"2016-10-22 14:00:00", "Status":0,"End":"2016-10-22 15:00:00"}
							,{"Start":"2016-10-22 14:30:00", "Status":0,"End":"2016-10-22 15:30:00"}
							,{"Start":"2016-10-22 15:00:00", "Status":0,"End":"2016-10-22 16:00:00"}
							,{"Start":"2016-10-22 15:30:00", "Status":0,"End":"2016-10-22 16:30:00"}
							,{"Start":"2016-10-22 17:00:00", "Status":0,"End":"2016-10-22 18:00:00"}
							,{"Start":"2016-10-22 17:30:00", "Status":0,"End":"2016-10-22 18:30:00"}
							,{"Start":"2016-10-22 18:00:00", "Status":0,"End":"2016-10-22 19:00:00"}
							,{"Start":"2016-10-22 18:30:00", "Status":0,"End":"2016-10-22 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-23 09:00:00",
				         "OpeningsTime":"2016-10-23 09:00:00",
				         "Date":"2016-10-23 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-23 09:00:00", "Status":0,"End":"2016-10-23 10:00:00"}
							,{"Start":"2016-10-23 09:30:00", "Status":0,"End":"2016-10-23 10:30:00"}
							,{"Start":"2016-10-23 10:00:00", "Status":0,"End":"2016-10-23 11:00:00"}
							,{"Start":"2016-10-23 10:30:00", "Status":0,"End":"2016-10-23 11:30:00"}
							,{"Start":"2016-10-23 11:00:00", "Status":0,"End":"2016-10-23 12:00:00"}
							,{"Start":"2016-10-23 11:30:00", "Status":0,"End":"2016-10-23 12:30:00"}
							,{"Start":"2016-10-23 12:00:00", "Status":0,"End":"2016-10-23 13:00:00"}
							,{"Start":"2016-10-23 12:30:00", "Status":0,"End":"2016-10-23 13:30:00"}
							,{"Start":"2016-10-23 13:00:00", "Status":0,"End":"2016-10-23 14:00:00"}
							,{"Start":"2016-10-23 13:30:00", "Status":0,"End":"2016-10-23 14:30:00"}
							,{"Start":"2016-10-23 14:00:00", "Status":0,"End":"2016-10-23 15:00:00"}
							,{"Start":"2016-10-23 14:30:00", "Status":0,"End":"2016-10-23 15:30:00"}
							,{"Start":"2016-10-23 15:00:00", "Status":0,"End":"2016-10-23 16:00:00"}
							,{"Start":"2016-10-23 15:30:00", "Status":0,"End":"2016-10-23 16:30:00"}
							,{"Start":"2016-10-23 17:00:00", "Status":0,"End":"2016-10-23 18:00:00"}
							,{"Start":"2016-10-23 17:30:00", "Status":0,"End":"2016-10-23 18:30:00"}
							,{"Start":"2016-10-23 18:00:00", "Status":0,"End":"2016-10-23 19:00:00"}
							,{"Start":"2016-10-23 18:30:00", "Status":0,"End":"2016-10-23 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-24 10:00:00",
				         "OpeningsTime":"2016-10-24 09:00:00",
				         "Date":"2016-10-24 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-24 09:00:00", "Status":0,"End":"2016-10-24 10:00:00"}
							,{"Start":"2016-10-24 09:30:00", "Status":0,"End":"2016-10-24 10:30:00"}
							,{"Start":"2016-10-24 10:00:00", "Status":0,"End":"2016-10-24 11:00:00"}
							,{"Start":"2016-10-24 10:30:00", "Status":0,"End":"2016-10-24 11:30:00"}
							,{"Start":"2016-10-24 11:00:00", "Status":0,"End":"2016-10-24 12:00:00"}
							,{"Start":"2016-10-24 11:30:00", "Status":0,"End":"2016-10-24 12:30:00"}
							,{"Start":"2016-10-24 12:00:00", "Status":0,"End":"2016-10-24 13:00:00"}
							,{"Start":"2016-10-24 12:30:00", "Status":0,"End":"2016-10-24 13:30:00"}
							,{"Start":"2016-10-24 13:00:00", "Status":0,"End":"2016-10-24 14:00:00"}
							,{"Start":"2016-10-24 13:30:00", "Status":0,"End":"2016-10-24 14:30:00"}
							,{"Start":"2016-10-24 14:00:00", "Status":0,"End":"2016-10-24 15:00:00"}
							,{"Start":"2016-10-24 14:30:00", "Status":0,"End":"2016-10-24 15:30:00"}
							,{"Start":"2016-10-24 15:00:00", "Status":0,"End":"2016-10-24 16:00:00"}
							,{"Start":"2016-10-24 15:30:00", "Status":0,"End":"2016-10-24 16:30:00"}
							,{"Start":"2016-10-24 17:00:00", "Status":0,"End":"2016-10-24 18:00:00"}
							,{"Start":"2016-10-24 17:30:00", "Status":0,"End":"2016-10-24 18:30:00"}
							,{"Start":"2016-10-24 18:00:00", "Status":0,"End":"2016-10-24 19:00:00"}
							,{"Start":"2016-10-24 18:30:00", "Status":0,"End":"2016-10-24 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-25 09:00:00",
				         "OpeningsTime":"2016-10-25 09:00:00",
				         "Date":"2016-10-25 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-25 09:00:00", "Status":0,"End":"2016-10-25 10:00:00"}
							,{"Start":"2016-10-25 09:30:00", "Status":0,"End":"2016-10-25 10:30:00"}
							,{"Start":"2016-10-25 10:00:00", "Status":0,"End":"2016-10-25 11:00:00"}
							,{"Start":"2016-10-25 10:30:00", "Status":0,"End":"2016-10-25 11:30:00"}
							,{"Start":"2016-10-25 11:00:00", "Status":0,"End":"2016-10-25 12:00:00"}
							,{"Start":"2016-10-25 11:30:00", "Status":0,"End":"2016-10-25 12:30:00"}
							,{"Start":"2016-10-25 12:00:00", "Status":0,"End":"2016-10-25 13:00:00"}
							,{"Start":"2016-10-25 12:30:00", "Status":0,"End":"2016-10-25 13:30:00"}
							,{"Start":"2016-10-25 13:00:00", "Status":0,"End":"2016-10-25 14:00:00"}
							,{"Start":"2016-10-25 13:30:00", "Status":0,"End":"2016-10-25 14:30:00"}
							,{"Start":"2016-10-25 14:00:00", "Status":0,"End":"2016-10-25 15:00:00"}
							,{"Start":"2016-10-25 14:30:00", "Status":0,"End":"2016-10-25 15:30:00"}
							,{"Start":"2016-10-25 15:00:00", "Status":0,"End":"2016-10-25 16:00:00"}
							,{"Start":"2016-10-25 15:30:00", "Status":0,"End":"2016-10-25 16:30:00"}
							,{"Start":"2016-10-25 17:00:00", "Status":0,"End":"2016-10-25 18:00:00"}
							,{"Start":"2016-10-25 17:30:00", "Status":0,"End":"2016-10-25 18:30:00"}
							,{"Start":"2016-10-25 18:00:00", "Status":0,"End":"2016-10-25 19:00:00"}
							,{"Start":"2016-10-25 18:30:00", "Status":0,"End":"2016-10-25 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-26 10:00:00",
				         "OpeningsTime":"2016-10-26 09:00:00",
				         "Date":"2016-10-26 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-26 09:00:00", "Status":0,"End":"2016-10-26 10:00:00"}
							,{"Start":"2016-10-26 09:30:00", "Status":0,"End":"2016-10-26 10:30:00"}
							,{"Start":"2016-10-26 10:00:00", "Status":0,"End":"2016-10-26 11:00:00"}
							,{"Start":"2016-10-26 10:30:00", "Status":0,"End":"2016-10-26 11:30:00"}
							,{"Start":"2016-10-26 11:00:00", "Status":0,"End":"2016-10-26 12:00:00"}
							,{"Start":"2016-10-26 11:30:00", "Status":0,"End":"2016-10-26 12:30:00"}
							,{"Start":"2016-10-26 12:00:00", "Status":0,"End":"2016-10-26 13:00:00"}
							,{"Start":"2016-10-26 12:30:00", "Status":0,"End":"2016-10-26 13:30:00"}
							,{"Start":"2016-10-26 13:00:00", "Status":0,"End":"2016-10-26 14:00:00"}
							,{"Start":"2016-10-26 13:30:00", "Status":0,"End":"2016-10-26 14:30:00"}
							,{"Start":"2016-10-26 14:00:00", "Status":0,"End":"2016-10-26 15:00:00"}
							,{"Start":"2016-10-26 14:30:00", "Status":0,"End":"2016-10-26 15:30:00"}
							,{"Start":"2016-10-26 15:00:00", "Status":0,"End":"2016-10-26 16:00:00"}
							,{"Start":"2016-10-26 15:30:00", "Status":0,"End":"2016-10-26 16:30:00"}
							,{"Start":"2016-10-26 17:00:00", "Status":0,"End":"2016-10-26 18:00:00"}
							,{"Start":"2016-10-26 17:30:00", "Status":0,"End":"2016-10-26 18:30:00"}
							,{"Start":"2016-10-26 18:00:00", "Status":0,"End":"2016-10-26 19:00:00"}
							,{"Start":"2016-10-26 18:30:00", "Status":0,"End":"2016-10-26 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-27 10:00:00",
				         "OpeningsTime":"2016-10-27 09:00:00",
				         "Date":"2016-10-27 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-27 09:00:00", "Status":0,"End":"2016-10-27 10:00:00"}
							,{"Start":"2016-10-27 09:30:00", "Status":0,"End":"2016-10-27 10:30:00"}
							,{"Start":"2016-10-27 10:00:00", "Status":0,"End":"2016-10-27 11:00:00"}
							,{"Start":"2016-10-27 10:30:00", "Status":0,"End":"2016-10-27 11:30:00"}
							,{"Start":"2016-10-27 11:00:00", "Status":0,"End":"2016-10-27 12:00:00"}
							,{"Start":"2016-10-27 11:30:00", "Status":0,"End":"2016-10-27 12:30:00"}
							,{"Start":"2016-10-27 12:00:00", "Status":0,"End":"2016-10-27 13:00:00"}
							,{"Start":"2016-10-27 12:30:00", "Status":0,"End":"2016-10-27 13:30:00"}
							,{"Start":"2016-10-27 13:00:00", "Status":0,"End":"2016-10-27 14:00:00"}
							,{"Start":"2016-10-27 13:30:00", "Status":0,"End":"2016-10-27 14:30:00"}
							,{"Start":"2016-10-27 14:00:00", "Status":0,"End":"2016-10-27 15:00:00"}
							,{"Start":"2016-10-27 14:30:00", "Status":0,"End":"2016-10-27 15:30:00"}
							,{"Start":"2016-10-27 15:00:00", "Status":0,"End":"2016-10-27 16:00:00"}
							,{"Start":"2016-10-27 15:30:00", "Status":0,"End":"2016-10-27 16:30:00"}
							,{"Start":"2016-10-27 17:00:00", "Status":0,"End":"2016-10-27 18:00:00"}
							,{"Start":"2016-10-27 17:30:00", "Status":0,"End":"2016-10-27 18:30:00"}
							,{"Start":"2016-10-27 18:00:00", "Status":0,"End":"2016-10-27 19:00:00"}
							,{"Start":"2016-10-27 18:30:00", "Status":0,"End":"2016-10-27 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-28 10:00:00",
				         "OpeningsTime":"2016-10-28 09:00:00",
				         "Date":"2016-10-28 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-28 09:00:00", "Status":0,"End":"2016-10-28 10:00:00"}
							,{"Start":"2016-10-28 09:30:00", "Status":0,"End":"2016-10-28 10:30:00"}
							,{"Start":"2016-10-28 10:00:00", "Status":0,"End":"2016-10-28 11:00:00"}
							,{"Start":"2016-10-28 10:30:00", "Status":0,"End":"2016-10-28 11:30:00"}
							,{"Start":"2016-10-28 11:00:00", "Status":0,"End":"2016-10-28 12:00:00"}
							,{"Start":"2016-10-28 11:30:00", "Status":0,"End":"2016-10-28 12:30:00"}
							,{"Start":"2016-10-28 12:00:00", "Status":0,"End":"2016-10-28 13:00:00"}
							,{"Start":"2016-10-28 12:30:00", "Status":0,"End":"2016-10-28 13:30:00"}
							,{"Start":"2016-10-28 13:00:00", "Status":0,"End":"2016-10-28 14:00:00"}
							,{"Start":"2016-10-28 13:30:00", "Status":0,"End":"2016-10-28 14:30:00"}
							,{"Start":"2016-10-28 14:00:00", "Status":0,"End":"2016-10-28 15:00:00"}
							,{"Start":"2016-10-28 14:30:00", "Status":0,"End":"2016-10-28 15:30:00"}
							,{"Start":"2016-10-28 15:00:00", "Status":0,"End":"2016-10-28 16:00:00"}
							,{"Start":"2016-10-28 15:30:00", "Status":0,"End":"2016-10-28 16:30:00"}
							,{"Start":"2016-10-28 17:00:00", "Status":0,"End":"2016-10-28 18:00:00"}
							,{"Start":"2016-10-28 17:30:00", "Status":0,"End":"2016-10-28 18:30:00"}
							,{"Start":"2016-10-28 18:00:00", "Status":0,"End":"2016-10-28 19:00:00"}
							,{"Start":"2016-10-28 18:30:00", "Status":0,"End":"2016-10-28 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-10-29 09:00:00",
				         "OpeningsTime":"2016-10-29 09:00:00",
				         "Date":"2016-10-29 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-29 09:00:00", "Status":0,"End":"2016-10-29 10:00:00"}
							,{"Start":"2016-10-29 09:30:00", "Status":0,"End":"2016-10-29 10:30:00"}
							,{"Start":"2016-10-29 10:00:00", "Status":0,"End":"2016-10-29 11:00:00"}
							,{"Start":"2016-10-29 10:30:00", "Status":0,"End":"2016-10-29 11:30:00"}
							,{"Start":"2016-10-29 11:00:00", "Status":0,"End":"2016-10-29 12:00:00"}
							,{"Start":"2016-10-29 11:30:00", "Status":0,"End":"2016-10-29 12:30:00"}
							,{"Start":"2016-10-29 12:00:00", "Status":0,"End":"2016-10-29 13:00:00"}
							,{"Start":"2016-10-29 12:30:00", "Status":0,"End":"2016-10-29 13:30:00"}
							,{"Start":"2016-10-29 13:00:00", "Status":0,"End":"2016-10-29 14:00:00"}
							,{"Start":"2016-10-29 13:30:00", "Status":0,"End":"2016-10-29 14:30:00"}
							,{"Start":"2016-10-29 14:00:00", "Status":0,"End":"2016-10-29 15:00:00"}
							,{"Start":"2016-10-29 14:30:00", "Status":0,"End":"2016-10-29 15:30:00"}
							,{"Start":"2016-10-29 15:00:00", "Status":0,"End":"2016-10-29 16:00:00"}
							,{"Start":"2016-10-29 15:30:00", "Status":0,"End":"2016-10-29 16:30:00"}
							,{"Start":"2016-10-29 17:00:00", "Status":0,"End":"2016-10-29 18:00:00"}
							,{"Start":"2016-10-29 17:30:00", "Status":0,"End":"2016-10-29 18:30:00"}
							,{"Start":"2016-10-29 18:00:00", "Status":0,"End":"2016-10-29 19:00:00"}
							,{"Start":"2016-10-29 18:30:00", "Status":0,"End":"2016-10-29 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-30 09:00:00",
				         "OpeningsTime":"2016-10-30 09:00:00",
				         "Date":"2016-10-30 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-30 09:00:00", "Status":0,"End":"2016-10-30 10:00:00"}
							,{"Start":"2016-10-30 09:30:00", "Status":0,"End":"2016-10-30 10:30:00"}
							,{"Start":"2016-10-30 10:00:00", "Status":0,"End":"2016-10-30 11:00:00"}
							,{"Start":"2016-10-30 10:30:00", "Status":0,"End":"2016-10-30 11:30:00"}
							,{"Start":"2016-10-30 11:00:00", "Status":0,"End":"2016-10-30 12:00:00"}
							,{"Start":"2016-10-30 11:30:00", "Status":0,"End":"2016-10-30 12:30:00"}
							,{"Start":"2016-10-30 12:00:00", "Status":0,"End":"2016-10-30 13:00:00"}
							,{"Start":"2016-10-30 12:30:00", "Status":0,"End":"2016-10-30 13:30:00"}
							,{"Start":"2016-10-30 13:00:00", "Status":0,"End":"2016-10-30 14:00:00"}
							,{"Start":"2016-10-30 13:30:00", "Status":0,"End":"2016-10-30 14:30:00"}
							,{"Start":"2016-10-30 14:00:00", "Status":0,"End":"2016-10-30 15:00:00"}
							,{"Start":"2016-10-30 14:30:00", "Status":0,"End":"2016-10-30 15:30:00"}
							,{"Start":"2016-10-30 15:00:00", "Status":0,"End":"2016-10-30 16:00:00"}
							,{"Start":"2016-10-30 15:30:00", "Status":0,"End":"2016-10-30 16:30:00"}
							,{"Start":"2016-10-30 17:00:00", "Status":0,"End":"2016-10-30 18:00:00"}
							,{"Start":"2016-10-30 17:30:00", "Status":0,"End":"2016-10-30 18:30:00"}
							,{"Start":"2016-10-30 18:00:00", "Status":0,"End":"2016-10-30 19:00:00"}
							,{"Start":"2016-10-30 18:30:00", "Status":0,"End":"2016-10-30 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-10-31 10:00:00",
				         "OpeningsTime":"2016-10-31 09:00:00",
				         "Date":"2016-10-31 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-10-31 09:00:00", "Status":0,"End":"2016-10-31 10:00:00"}
							,{"Start":"2016-10-31 09:30:00", "Status":0,"End":"2016-10-31 10:30:00"}
							,{"Start":"2016-10-31 10:00:00", "Status":0,"End":"2016-10-31 11:00:00"}
							,{"Start":"2016-10-31 10:30:00", "Status":0,"End":"2016-10-31 11:30:00"}
							,{"Start":"2016-10-31 11:00:00", "Status":0,"End":"2016-10-31 12:00:00"}
							,{"Start":"2016-10-31 11:30:00", "Status":0,"End":"2016-10-31 12:30:00"}
							,{"Start":"2016-10-31 12:00:00", "Status":0,"End":"2016-10-31 13:00:00"}
							,{"Start":"2016-10-31 12:30:00", "Status":0,"End":"2016-10-31 13:30:00"}
							,{"Start":"2016-10-31 13:00:00", "Status":0,"End":"2016-10-31 14:00:00"}
							,{"Start":"2016-10-31 13:30:00", "Status":0,"End":"2016-10-31 14:30:00"}
							,{"Start":"2016-10-31 14:00:00", "Status":0,"End":"2016-10-31 15:00:00"}
							,{"Start":"2016-10-31 14:30:00", "Status":0,"End":"2016-10-31 15:30:00"}
							,{"Start":"2016-10-31 15:00:00", "Status":0,"End":"2016-10-31 16:00:00"}
							,{"Start":"2016-10-31 15:30:00", "Status":0,"End":"2016-10-31 16:30:00"}
							,{"Start":"2016-10-31 17:00:00", "Status":0,"End":"2016-10-31 18:00:00"}
							,{"Start":"2016-10-31 17:30:00", "Status":0,"End":"2016-10-31 18:30:00"}
							,{"Start":"2016-10-31 18:00:00", "Status":0,"End":"2016-10-31 19:00:00"}
							,{"Start":"2016-10-31 18:30:00", "Status":0,"End":"2016-10-31 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-11-01 09:00:00",
				         "OpeningsTime":"2016-11-01 09:00:00",
				         "Date":"2016-11-01 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-11-01 09:00:00", "Status":0,"End":"2016-11-01 10:00:00"}
							,{"Start":"2016-11-01 09:30:00", "Status":0,"End":"2016-11-01 10:30:00"}
							,{"Start":"2016-11-01 10:00:00", "Status":0,"End":"2016-11-01 11:00:00"}
							,{"Start":"2016-11-01 10:30:00", "Status":0,"End":"2016-11-01 11:30:00"}
							,{"Start":"2016-11-01 11:00:00", "Status":0,"End":"2016-11-01 12:00:00"}
							,{"Start":"2016-11-01 11:30:00", "Status":0,"End":"2016-11-01 12:30:00"}
							,{"Start":"2016-11-01 12:00:00", "Status":0,"End":"2016-11-01 13:00:00"}
							,{"Start":"2016-11-01 12:30:00", "Status":0,"End":"2016-11-01 13:30:00"}
							,{"Start":"2016-11-01 13:00:00", "Status":0,"End":"2016-11-01 14:00:00"}
							,{"Start":"2016-11-01 13:30:00", "Status":0,"End":"2016-11-01 14:30:00"}
							,{"Start":"2016-11-01 14:00:00", "Status":0,"End":"2016-11-01 15:00:00"}
							,{"Start":"2016-11-01 14:30:00", "Status":0,"End":"2016-11-01 15:30:00"}
							,{"Start":"2016-11-01 15:00:00", "Status":0,"End":"2016-11-01 16:00:00"}
							,{"Start":"2016-11-01 15:30:00", "Status":0,"End":"2016-11-01 16:30:00"}
							,{"Start":"2016-11-01 17:00:00", "Status":0,"End":"2016-11-01 18:00:00"}
							,{"Start":"2016-11-01 17:30:00", "Status":0,"End":"2016-11-01 18:30:00"}
							,{"Start":"2016-11-01 18:00:00", "Status":0,"End":"2016-11-01 19:00:00"}
							,{"Start":"2016-11-01 18:30:00", "Status":0,"End":"2016-11-01 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":false
				      },{  
				         "ClosingTime":"2016-11-02 10:00:00",
				         "OpeningsTime":"2016-11-02 09:00:00",
				         "Date":"2016-11-02 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-11-02 09:00:00", "Status":0,"End":"2016-11-02 10:00:00"}
							,{"Start":"2016-11-02 09:30:00", "Status":0,"End":"2016-11-02 10:30:00"}
							,{"Start":"2016-11-02 10:00:00", "Status":0,"End":"2016-11-02 11:00:00"}
							,{"Start":"2016-11-02 10:30:00", "Status":0,"End":"2016-11-02 11:30:00"}
							,{"Start":"2016-11-02 11:00:00", "Status":0,"End":"2016-11-02 12:00:00"}
							,{"Start":"2016-11-02 11:30:00", "Status":0,"End":"2016-11-02 12:30:00"}
							,{"Start":"2016-11-02 12:00:00", "Status":0,"End":"2016-11-02 13:00:00"}
							,{"Start":"2016-11-02 12:30:00", "Status":0,"End":"2016-11-02 13:30:00"}
							,{"Start":"2016-11-02 13:00:00", "Status":0,"End":"2016-11-02 14:00:00"}
							,{"Start":"2016-11-02 13:30:00", "Status":0,"End":"2016-11-02 14:30:00"}
							,{"Start":"2016-11-02 14:00:00", "Status":0,"End":"2016-11-02 15:00:00"}
							,{"Start":"2016-11-02 14:30:00", "Status":0,"End":"2016-11-02 15:30:00"}
							,{"Start":"2016-11-02 15:00:00", "Status":0,"End":"2016-11-02 16:00:00"}
							,{"Start":"2016-11-02 15:30:00", "Status":0,"End":"2016-11-02 16:30:00"}
							,{"Start":"2016-11-02 17:00:00", "Status":0,"End":"2016-11-02 18:00:00"}
							,{"Start":"2016-11-02 17:30:00", "Status":0,"End":"2016-11-02 18:30:00"}
							,{"Start":"2016-11-02 18:00:00", "Status":0,"End":"2016-11-02 19:00:00"}
							,{"Start":"2016-11-02 18:30:00", "Status":0,"End":"2016-11-02 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-11-03 10:00:00",
				         "OpeningsTime":"2016-11-03 09:00:00",
				         "Date":"2016-11-03 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-11-03 09:00:00", "Status":0,"End":"2016-11-03 10:00:00"}
							,{"Start":"2016-11-03 09:30:00", "Status":0,"End":"2016-11-03 10:30:00"}
							,{"Start":"2016-11-03 10:00:00", "Status":0,"End":"2016-11-03 11:00:00"}
							,{"Start":"2016-11-03 10:30:00", "Status":0,"End":"2016-11-03 11:30:00"}
							,{"Start":"2016-11-03 11:00:00", "Status":0,"End":"2016-11-03 12:00:00"}
							,{"Start":"2016-11-03 11:30:00", "Status":0,"End":"2016-11-03 12:30:00"}
							,{"Start":"2016-11-03 12:00:00", "Status":0,"End":"2016-11-03 13:00:00"}
							,{"Start":"2016-11-03 12:30:00", "Status":0,"End":"2016-11-03 13:30:00"}
							,{"Start":"2016-11-03 13:00:00", "Status":0,"End":"2016-11-03 14:00:00"}
							,{"Start":"2016-11-03 13:30:00", "Status":0,"End":"2016-11-03 14:30:00"}
							,{"Start":"2016-11-03 14:00:00", "Status":0,"End":"2016-11-03 15:00:00"}
							,{"Start":"2016-11-03 14:30:00", "Status":0,"End":"2016-11-03 15:30:00"}
							,{"Start":"2016-11-03 15:00:00", "Status":0,"End":"2016-11-03 16:00:00"}
							,{"Start":"2016-11-03 15:30:00", "Status":0,"End":"2016-11-03 16:30:00"}
							,{"Start":"2016-11-03 17:00:00", "Status":0,"End":"2016-11-03 18:00:00"}
							,{"Start":"2016-11-03 17:30:00", "Status":0,"End":"2016-11-03 18:30:00"}
							,{"Start":"2016-11-03 18:00:00", "Status":0,"End":"2016-11-03 19:00:00"}
							,{"Start":"2016-11-03 18:30:00", "Status":0,"End":"2016-11-03 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      },{  
				         "ClosingTime":"2016-11-04 10:00:00",
				         "OpeningsTime":"2016-11-04 09:00:00",
				         "Date":"2016-11-04 00:00:00",
				         "TimeSlots":[
				         	 {"Start":"2016-11-04 09:00:00", "Status":0,"End":"2016-11-04 10:00:00"}
							,{"Start":"2016-11-04 09:30:00", "Status":0,"End":"2016-11-04 10:30:00"}
							,{"Start":"2016-11-04 10:00:00", "Status":0,"End":"2016-11-04 11:00:00"}
							,{"Start":"2016-11-04 10:30:00", "Status":0,"End":"2016-11-04 11:30:00"}
							,{"Start":"2016-11-04 11:00:00", "Status":0,"End":"2016-11-04 12:00:00"}
							,{"Start":"2016-11-04 11:30:00", "Status":0,"End":"2016-11-04 12:30:00"}
							,{"Start":"2016-11-04 12:00:00", "Status":0,"End":"2016-11-04 13:00:00"}
							,{"Start":"2016-11-04 12:30:00", "Status":0,"End":"2016-11-04 13:30:00"}
							,{"Start":"2016-11-04 13:00:00", "Status":0,"End":"2016-11-04 14:00:00"}
							,{"Start":"2016-11-04 13:30:00", "Status":0,"End":"2016-11-04 14:30:00"}
							,{"Start":"2016-11-04 14:00:00", "Status":0,"End":"2016-11-04 15:00:00"}
							,{"Start":"2016-11-04 14:30:00", "Status":0,"End":"2016-11-04 15:30:00"}
							,{"Start":"2016-11-04 15:00:00", "Status":0,"End":"2016-11-04 16:00:00"}
							,{"Start":"2016-11-04 15:30:00", "Status":0,"End":"2016-11-04 16:30:00"}
							,{"Start":"2016-11-04 17:00:00", "Status":0,"End":"2016-11-04 18:00:00"}
							,{"Start":"2016-11-04 17:30:00", "Status":0,"End":"2016-11-04 18:30:00"}
							,{"Start":"2016-11-04 18:00:00", "Status":0,"End":"2016-11-04 19:00:00"}
							,{"Start":"2016-11-04 18:30:00", "Status":0,"End":"2016-11-04 19:30:00"}
				         ],
				         "Duration":30,
				         "IsOpen":true
				      }],
				   "ResponseMessage":"GEN-OK: Result ok",
				   "ResponseCode":1
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.2 Get Appointments
			if (trcode == TR_CODE.GetAppointments) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"ServiceAppointments": [
						{
							"ModelName": "Kia Picanto",
							"AppointmentId": "87409553-5918-e611-80d6-005056ba3ae5",
							"ScheduledDate": "2016-05-20T10:00:00",
							"DealerName": "Estimated cost: 222 EU Automobiles Paris Suffren",
							"Status": "Scheduled"
						}
					 ],
					 "SalesAppointments": [
						{
					      "AppointmentType": "TestDrive",
					      "AppointmentId": "245aa890-6c08-e611-80d3-005056ba3ae6",
					      "ScheduledDate": "2016-08-25T11:30:00",
					      "DealerName": "GARAGE MONTET 20 RUE GUESANT PARIS",
					      "Status": "Done"
						}
					]
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.3 Get Appointment Detail
			if (trcode == TR_CODE.GetAppointmentDetails) {
				var  appointmentId = option.AppointmentId
					,mockData = {
						"87409553-5918-e611-80d6-005056ba3ae5": {
						    "ResponseCode": 1,
						    "ResponseMessage": "GEN-OK: Result ok",
						    "AppointmentId": "87409553-5918-e611-80d6-005056ba3ae5",
						    "AppointmentStatus": "Scheduled",
						    "ScheduledDate": "2016-08-25T11:30:00",
						    "Dealer": {
						        "Name": "Kia Paris Suffren",
						        "Address": "76 Bis Avenue de Suffren ",
						        "City": "PARIS"
						    },
						    "Service": {
						        "Vin": "KNABE511AGT063014",
						        "Price": 222,
						        "Recall": null,
						        "ServicePlan": {
						            "ServicePlanId": "1f29d5af-6701-e611-80d3-005056ba3ae5",
						            "Description": "Eseguire assistenza a 15.000km/12 mesi come da manuale.",
						            "Mileage": 15000,
						            "Month": 12
						        },
						        "Repairs": {},
						        "IsMot": false,
						        "OtherRequests": "",
						        "TransportOption": "CourtesyVehicle"
						    },
						    "Sales": null,
						    "Comment": '',
						    "CallbackByDealer": false
						},
						"245aa890-6c08-e611-80d3-005056ba3ae6": {
						    "ResponseCode": 1,
						    "ResponseMessage": "GEN-OK: Result ok",
						    "AppointmentId": "1670bcbc-2b28-e611-80d8-005056ba3ae5",
						    "AppointmentStatus": "Done",
						    "ScheduledDate": "2016-07-03T10:00:00",
						    "Dealer": {
						        "Name": "GARAGE MONTET",
						        "Address": " 20 RUE GUESANT",
						        "City": "PARIS"
						    },
						    "Service": null,
						    "Sales": {
								 "AppointmentType": "Testdrive"
								,"AppointmentQuestionType": ""
								,"ModelName": "Kia Sportage"
								,"PriceFrom": ""
								,"PriceTo": ""
								,"MileageFrom": ""
								,"MileageTo": ""
								,"Vin": ""
								,"VehicleRegistrationDate": ""
						    },
						    "Comment": 'I would like to test the GT version',
						    "CallbackByDealer": false
						}
					}
				deferred.resolve( mockData[appointmentId] );
				return deferred.promise;
			}

			// 2.27.3 Get Maintenance Operations
			if (trcode == TR_CODE.GetMaintenanceOperations) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"ServicePlans": [
						{
							"Distance": 15000,
							"Months": 12,
							"Description": "Eseguire assistenza a 15.000km/12 mesi come da manuale.",
							"Code": "S15K12M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924182",
							"Id": "1f29d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 30000,
							"Months": 24,
							"Description": "Eseguire assistenza a 30.000km/24 mesi come da manuale.",
							"Code": "S30K24M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924183",
							"Id": "2029d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 45000,
							"Months": 36,
							"Description": "Eseguire assistenza a 45.000km/36 mesi come da manuale.",
							"Code": "S45K36M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924184",
							"Id": "2129d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 60000,
							"Months": 48,
							"Description": "Eseguire assistenza a 60.000km/48 mesi come da manuale.",
							"Code": "S60K48M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924185",
							"Id": "2229d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 75000,
							"Months": 60,
							"Description": "Eseguire assistenza a 75.000km/60 mesi come da manuale.",
							"Code": "S75K60M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924186",
							"Id": "2329d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 90000,
							"Months": 72,
							"Description": "Eseguire assistenza a 90.000km/72 mesi come da manuale.",
							"Code": "S90K72M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924187",
							"Id": "2429d5af-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 105000,
							"Months": 84,
							"Description": "Eseguire assistenza a 105.000km/84 mesi come da manuale.",
							"Code": "S105K84M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924188",
							"Id": "d710e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 120000,
							"Months": 96,
							"Description": "Eseguire assistenza a 120.000km/96 mesi come da manuale.",
							"Code": "S120K96M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924189",
							"Id": "d810e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 135000,
							"Months": 108,
							"Description": "Eseguire assistenza a 135.000km/108 mesi come da manuale.",
							"Code": "S135K108M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924190",
							"Id": "d910e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 150000,
							"Months": 120,
							"Description": "Eseguire assistenza a 150.000km/120 mesi come da manuale.",
							"Code": "S150K120M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924191",
							"Id": "da10e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 165000,
							"Months": 132,
							"Description": "Eseguire assistenza a 165.000km/132 mesi come da manuale.",
							"Code": "S165K132M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924192",
							"Id": "db10e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 180000,
							"Months": 144,
							"Description": "Eseguire assistenza a 180.000km/144 mesi come da manuale.",
							"Code": "S180K144M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924193",
							"Id": "dc10e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 195000,
							"Months": 156,
							"Description": "Eseguire assistenza a 195.000km/156 mesi come da manuale.",
							"Code": "S195K156M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924194",
							"Id": "dd10e5b5-6701-e611-80d3-005056ba3ae5"
						},{
							"Distance": 210000,
							"Months": 168,
							"Description": "Eseguire assistenza a 210.000km/168 mesi come da manuale.",
							"Code": "S210K168M",
							"SectionId": "21",
							"ModelId": "50649",
							"GroupVarId": "32924195",
							"Id": "de10e5b5-6701-e611-80d3-005056ba3ae5"
						}
					],
					"RepairOptions": [
						{
							"Description": "Ruitenwisserblad achter vervangen",
							"Code": "RWBR.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189687",
							"Id": "RWBR.IS"
						},{
							"Description": "Beide voorruitenwisser bladen vervangen",
							"Code": "RWBFB.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189700",
							"Id": "RWBFB.IS"
						},{
							"Description": "Achterremblokken vervangen",
							"Code": "RBPR.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189722",
							"Id": "RBPR.IS"
						},{
							"Description": "Voorruit vervangen",
							"Code": "RFW.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189890",
							"Id": "RFW.IS"
						},{
							"Description": "Voorremblokken vervangen",
							"Code": "RBPF.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189907",
							"Id": "RBPF.IS"
						},{
							"Description": "Accu vervangen",
							"Code": "RB.IS",
							"SectionId": "IS",
							"ModelId": "50649",
							"GroupVarId": "33189958",
							"Id": "RB.IS"
						}
					]
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.4 Get Maintenance Operation Details
			if (trcode == TR_CODE.GetMaintenanceOperationDetails) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"Description": "Eseguire assistenza a 210.000km/168 mesi come da manuale.",
					"OperationId": "S210K168M",
					"InvoiceLines": [
						"--- Campagna di assistenza ---",
						"Controllare veicolo per richiamo straordinario o campagna manutenzione.",
						"--- Veicolo in officina ---",
						"Effettuare test autodiagnostico con GDS.",
						"Controllare il funzionamento del telecomando di chiusura delle portiere.",
						"Controllo del gruppo luci interno comprese le spie di avvertimento della dashboard.",
						"Verifica dei sistemi di riscaldamento e dell'aria condizionata (se adatti).",
						"Esaminare cinture di sicurezza.",
						"Lubrificare cerniere, cilindri bloccaggio, sgancio cofano e riscontro.",
						"Controllo stato del parabrezza, funzionalità dei getti di lavaggio e spazzole tergi e di tutti gli specchietti",
						"Controllo del funzionamento del clacson e delle luci esterne.",
						"Verifica e regolazione allineamento fari.",
						"Sostituire filtro climatizzazione aria esterna.",
						"Controllo del kit di pronto soccorso e data scadenza",
						"Pressione pneumatico Ant.SX____bar  Ant.DX bar____Post.SX___bar  Post.DX_____bar",
						"Pneumatico di scorta_____mm +0,5 bar come normale",
						"--- Sotto cofano motore ---",
						"Controllare filtro dell'aria.",
						"Verifica del livello del liquido del lavacristallo.",
						"Esaminare impianto refrigerante.",
						"Sostituire liquido refrigerante motore.",
						"Esaminare cinghia trasmissione.",
						"Sostituire liquido freni.",
						"Verifica della condizioni della batteria.",
						"Controllo compressore A/C, sistema condizionamento e carica refrigerante",
						"Controllo dei condotti e dei tubi dello scomparto del motore.",
						"--- Veicolo sollevato ---",
						"Sostituire olio motore e filtro olio.",
						"Esaminare tenuta bulloni e dadi chassis e carrozzeria.",
						"Profilo pneumatico Ant.SX____mm  Ant.DX mmr____Post.SX___mm  Post.DX___mm.",
						"Controllare il filtro del carburante.",
						"Ispezione pastiglie e dischi dei freni a disco.",
						"Verifica dei tubi, dei condotti e dei collegamenti del freno.",
						"Verifica regolazione e funzionamento del freno a mano.",
						"Controllare la carrozeria sotto vettura per qualsiasi presenza di corrosione, danno o ruggine.",
						"Verificare assenza perdite liquidi.",
						"Verifica guida, tiranteria e parapolvere del sistema di sterzo.",
						"Esaminare semiassi comprese guaine giunto CV.",
						"Verificare guarnizioni di tenuta sospensioni anteriori.",
						"Esaminare impianto scappamento per usura o avarie.",
						"--- Prova su strada ---",
						"Ispezionare funzionamento leva cambio manuale",
						"Controllo della funzionalità del pedale acceleratore, freno e frizione",
						"Controllare funzionamento freno di stazionamento.",
						"Collaudare veicolo su strada e segnalare eventuali anomalie.",
						"Resettare l'indicatore di servizio (se montato).",
						"Questionario \"Family-like Care\" posizionato su specchietto posteriore."
					]
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.5 Get Maintenance Operation Price
			if (trcode == TR_CODE.GetMaintenanceOperationsPrice) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"OriginalPrice": 65.85,
					"Discount": 1.5,
					"TotalPrice": 299.38
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.6.1 Save Service Appointment
			if (trcode == TR_CODE.SaveServiceAppointment) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"AppointmentId": "bd8a5dd7-e0fb-e511-9873-005056b31f37"
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.6.2 Save Contact Me For A Service
			if (trcode == TR_CODE.SaveContactMeForAService) {
				result = {
					 "ResponseCode"		: 1
					,"ResponseMessage"	: "GEN-OK: Result ok"
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.27.6.3 Save Sales Appointment
			if (trcode == TR_CODE.SaveSalesAppointment) {
				result = {
					 "ResponseCode"		: 1
					,"ResponseMessage"	: "GEN-OK: Result ok"
					,"AppointmentId"	: "66bd604f-befc-e511-9873-005056b31f37"
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.35 Get Campaign List
			if (trcode == TR_CODE.GetCampaignList) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"Campaigns": []
				}
				deferred.resolve(result);
				return deferred.promise;
			}

			// 2.36 Get Campaign Detail
			if (trcode == TR_CODE.GetCampaignsDetails) {
				result = {
					"ResponseCode": 1,
					"ResponseMessage": "GEN-OK: Result ok",
					"CampaignImageUrl": "https://www.accept.eu.kia.com/IT/webservices/mykia/getnewsitemimage.ashx?id=0fa3b66e-c82a-4d55-b89e-ad0aa732a4a7&mw=800&mh=800",
					//"CampaignImageUrl": "http://cdn.spacetelescope.org/archives/images/large/heic1307a.jpg?4",
					"CampaignTitle": "Free service on you Kia",
					"CampaignText": "Temporarily free service on all Kia models bought after 2010!"
				}
				deferred.resolve(result);
				return deferred.promise;
			}
			
			deferred.reject();
			return deferred.promise;
		}

		// 서버에서 데이터를 가져옴 RESTFul 방식
		function getRest(trcode) {
			//M.pop.instance('** 가상데이터 사용중 ** : ' + trcode);
			//console.info('** 가상데이터 사용중 **', trcode);

			var  deferred = $q.defer()
				,result = {};

			if (trcode == 'api/v2/generic/values/fr-FR/SalesMeetingSubject') {
				result = {
					 "ResponseCode": 1
					,"ResponseMessage": "GEN-OK: Result ok"
					,"Values": [
						{
							 "ValueId": "0"
							,"ValueDescription": "Other"
						},{
							 "ValueId": "1"
							,"ValueDescription": "Finance"
						},{
							 "ValueId": "2"
							,"ValueDescription": "TradeIn"
						},{
							 "ValueId": "3"
							,"ValueDescription": "FleetBusiness"
						},{
							 "ValueId": "5"
							,"ValueDescription": "BuyUsedKia"
						}
					]
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			if (trcode == 'api/v2/generic/values/fr-FR/UsedKiaModels') {
				result = {
					 "ResponseCode": 1
					,"ResponseMessage": "GEN-OK: Result ok"
					,"Values": [
						{
							 "ValueId": "Kia Picanto"
							,"ValueDescription": "Kia Picanto"
						},{
							 "ValueId": "Kia Rio"
							,"ValueDescription": "Kia Rio"
						},{
							 "ValueId": "Kia cee'd"
							,"ValueDescription": "Kia cee'd"
						},{
							 "ValueId": "Kia pro_cee'd"
							,"ValueDescription": "Kia pro_cee'd"
						},{
							 "ValueId": "Kia Venga"
							,"ValueDescription": "Kia Venga"
						},{
							 "ValueId": "KIa Sportage"
							,"ValueDescription": "KIa Sportage"
						},{
							 "ValueId": "Kia Sorento"
							,"ValueDescription": "Kia Sorento"
						},{
							 "ValueId": "Kia Optima"
							,"ValueDescription": "Kia Optima"
						},{
							 "ValueId": "Kia Optima Hybrid"
							,"ValueDescription": "Kia Optima Hybrid"
						},{
							 "ValueId": "Kia Soul"
							,"ValueDescription": "Kia Soul"
						},{
							 "ValueId": "Kia Soul EV"
							,"ValueDescription": "Kia Soul EV"
						},{
							 "ValueId": "Kia Carens"
							,"ValueDescription": "Kia Carens"
						},{
							 "ValueId": "Kia Carnival"
							,"ValueDescription": "Kia Carnival"
						}
					]
				}

				deferred.resolve(result);
				return deferred.promise;
			}

			if (trcode == 'api/v2/generic/values/fr-FR/TransportOptions') {
				result = {
					 "ResponseCode": 1
					,"ResponseMessage": "GEN-OK: Result ok"
					,"Values": [
						{
							 "ValueId": "1"
							,"ValueDescription": "CourtesyVehicle"
						},{
							 "ValueId": "2"
							,"ValueDescription": "DropOff"
						},{
							 "ValueId": "3"
							,"ValueDescription": "ShuttleService"
						},{
							 "ValueId": "4"
							,"ValueDescription": "WaitInServiceDepartment"
						}
					]
				}

				deferred.resolve(result);
				return deferred.promise;
			}
		}
	}

	return myKiaFactory;
});

})();





















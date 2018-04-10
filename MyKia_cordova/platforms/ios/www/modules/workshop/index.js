/**
 * Module Loader
 *
 * @ Develop Desc 		: Workshop 모듈에 Controller 를 로드함
 * @ Author 			: Brian Paek (<a mailto="romeoh78@gmail.com">romeoh78@gmail.com</a>)
 * @ Version 			: Release 1.3
 * @ Develop Date 		: 31 MAR 2016
 * @ Change History
 *  					: 31 MAR 2016 - initial
 */

(function(){

'use strict';

define([
	 './CtrlWorkshop'
	,'./CtrlAppointment'
	,'./CtrlDate'
	,'./CtrlConfirmation'
	,'./CtrlVehicle'
], function(angular) {});

})();
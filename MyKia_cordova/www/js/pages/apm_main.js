fnList.pageApmMain = function(){
	var userInfo = Data.getData('UserInformation');
	var param = {
		'Historical' : true
	}

	getApi('GetAppointments', param, fnMakeAppointList)

	function fnMakeAppointList(data){
		var _salesList = data.SalesAppointments;
		var _serviceList = data.ServiceAppointments;
		var appointments = activeAppointment = historyAppointment = resultAppointment = []

		if(_salesList.length == 0 && _serviceList.length == 0){
			return false;
		}

		$.each(_salesList, function(idx, _sale){
			var isBefore = moment(_sale.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').isBefore(moment())

			_sale.date = moment(_sale.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(userInfo.CultureCode).format('D MMM YYYY HH:mm')
			if (isBefore) {
				_sale.scheduleStatusCode = 'W0_17';
			} else {
				_sale.scheduleStatusCode = fnConvertStatus(_sale.Status);
			}
			_sale.AppointmentTypeString = i18n(fnReplaceToCodeInAppointmentType(_sale.AppointmentType), 'text' )
			appointments.push(_sale);
		})

		$.each(_serviceList, function(idx, _service){
			var isBefore = moment(_service.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').isBefore(moment())

			_service.date = moment(_service.ScheduledDate, 'YYYY-MM-DDTHH:mm:SS').locale(userInfo.CultureCode).format('D MMM YYYY HH:mm')
			if (isBefore) {
				_service.scheduleStatusCode = 'W0_17';
			} else {
				_service.scheduleStatusCode = fnConvertStatus(_service.Status);
			}
			_service.AppointmentTypeString = i18n('W0_14', 'text' )
			appointments.push(_service);
		});

		$.each(appointments, function(idx, appointment) {
			if (appointment.scheduleStatusCode == 'W0_17') {
				historyAppointment.push(appointment);
			} else {
				activeAppointment.push(appointment);
			}
		})

		if(historyAppointment.length > 2){
			historyAppointment.length = 2;
		}

		resultAppointment.push(activeAppointment);
		resultAppointment.push(historyAppointment);


		resultAppointment.sort(function(a, b) {
		    var dateA = new Date(a.ScheduledDate), dateB = new Date(b.ScheduledDate);
		    return dateA - dateB;
		});

		var _elem = $('<li><a href="apm_detail.html" data-href="apm_detail" data-role="none"><strong></strong><p class="date"></p><span></span><p class="model"></p></a><i class="ico-group"></i></li>');

		$.each(resultAppointment, function(idx,item){
			var _el = _elem.clone();

			console.log('item : ' , item)

			if(item.scheduleStatusCode === 'W0_17'){
				_el.addClass('history');
			}

			_el.find('strong').text(item.AppointmentTypeString);
			_el.find('span').text(item.DealerName);
			_el.find('.date').text(item.date);
			_el.find('.model').text(item.model);

			if(item.scheduleStatusCode == 'W0_15'){
				_el.find('i').addClass('ico-checked-red');
			}else if(item.scheduleStatusCode == 'W0_16'){
				_el.find('i').addClass('ico-checked-red-dot');
			}else if(item.scheduleStatusCode == 'W0_17'){
				_el.find('i').addClass('ico-circle-gray');
			}

			$('#list-appointments').append(_el);

		});



		console.log('appointments : ' , appointments)

	}

	function fnConvertStatus(string){
		if (string.toUpperCase() == 'SCHEDULED') {
			return 'W0_15'
		}
		if (string.toUpperCase() == 'NEW' || 
			string.toUpperCase() == 'OPEN' ||
			string.toUpperCase() == 'UNCONFIRMED' ) {
			return 'W0_16'
		}
		if (string.toUpperCase() == 'DECLINED' || 
			string.toUpperCase() == 'CLOSE' || 
			string.toUpperCase() == 'CLOSED' || 
			string.toUpperCase() == 'DONE' ) {
			return 'W0_17'
		}
		return string;
	};

	function fnReplaceToCodeInAppointmentType(string){
		if (string.toUpperCase() == 'TESTDRIVE') 		return 'WS_4';
		if (string.toUpperCase() == 'MEETSALESADVISOR') return 'WS_7';
		if (string.toUpperCase() == 'GETQUOTE') 		return 'WS_8';
		if (string.toUpperCase() == 'OTHER') 			return 'WW_24';
		if (string.toUpperCase() == 'FINANCE') 			return 'WS_55';
		if (string.toUpperCase() == 'TRADEIN') 			return 'WS_54';
		if (string.toUpperCase() == 'FLEETBUSINESS') 	return 'WS_56';
		if (string.toUpperCase() == 'BUYUSEDKIA') 		return 'WS_51';
		return string;
	};
}
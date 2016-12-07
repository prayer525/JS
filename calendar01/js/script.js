/* Kurien / Kurien's Blog / http://blog.kurien.co.kr */
/* 주석만 제거하지 않는다면, 어떤 용도로 사용하셔도 좋습니다. */

if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}
var idOp = {};

function keyCheck(obj, key){
	for(var p in obj){
		if(p == key){
			return true;

			break;
		}
	}

	return false;
}

function kCalendar(id, _op) {
	var kCalendar = document.getElementById(id);
	var date = null;

	if(typeof _op !== 'undefined'){
		idOp[id] = _op

		if(!keyCheck(idOp[id], 'initDate')){
			idOp[id].initDate = null;
		}
	}else{
		idOp[id] = {
			initDate:null,
			callBack:null
		}
	}

	if( idOp[id].initDate !== null ) {
		date = idOp[id].initDate.split('-');
		date[1] = date[1] - 1;
		date = new Date(date[0], date[1], date[2]);
	} else {
		date = new Date();
	}
	var currentYear = date.getFullYear();
	//년도를 구함
	
	var currentMonth = date.getMonth() + 1;
	//연을 구함. 월은 0부터 시작하므로 +1, 12월은 11을 출력
	
	var currentDate = date.getDate();
	//오늘 일자.
	
	date.setDate(1);
	var currentDay = date.getDay();
	//이번달 1일의 요일은 출력. 0은 일요일 6은 토요일
	
	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//각 달의 마지막 일을 계산, 윤년의 경우 년도가 4의 배수이고 100의 배수가 아닐 때 혹은 400의 배수일 때 2월달이 29일 임.

	// 현재 월에 이전 달의 날짜를 표시하기 위함
	var prevLastDate = lastDate[currentMonth-2];
	// 현재 월이 1월이면 이전 달은 12월이 됨
	if(currentMonth == 1){
		prevLastDate = lastDate[11];
	}
	var currentLastDate = lastDate[currentMonth-1];

	// 현재 월에 다음 달의 날짜를 표시하기 위함
	var nextLastDate = lastDate[currentMonth];
	// 현재 월이 12월이면 다음 달은 1월이 됨
	if(currentMonth == 12){
		nextLastDate = lastDate[0]
	}
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//총 몇 주인지 구함.
	
	if(currentMonth != 1)
		var prevDate = currentYear + '-' + ( currentMonth - 1 ) + '-' + currentDate;
	else
		var prevDate = ( currentYear - 1 ) + '-' + 12 + '-' + currentDate;
	//만약 이번달이 1월이라면 1년 전 12월로 출력.
	
	if(currentMonth != 12) 
		var nextDate = currentYear + '-' + ( currentMonth + 1 ) + '-' + currentDate;
	else
		var nextDate = ( currentYear + 1 ) + '-' + 1 + '-' + currentDate;
	//만약 이번달이 12월이라면 1년 후 1월로 출력.

	
	if( currentMonth < 10 )
		var currentMonth = '0' + currentMonth;
	//10월 이하라면 앞에 0을 붙여준다.
	
	var calendar = '';
	
	calendar += '		<div id="header">';
	if(idOp[id].callBack !== 'undefined' && typeof idOp[id].callBack === 'function'){
		calendar += '			<span><a href="#" class="button left" onclick="kCalendar(\'' +  id + '\', {initDate:\'' + prevDate + '\', callBack:'+idOp[id].callBack+'}); return false;"><</a></span>';
	}else{
		calendar += '			<span><a href="#" class="button left" onclick="kCalendar(\'' +  id + '\', {initDate:\'' + prevDate + '\'}); return false;"><</a></span>';
	}
	calendar += '			<span id="date">' + currentYear + '년 ' + currentMonth + '월</span>';
	if(idOp[id].callBack !== 'undefined' && typeof idOp[id].callBack === 'function'){
		calendar += '			<span><a href="#" class="button left" onclick="kCalendar(\'' +  id + '\', {initDate:\'' + nextDate + '\', callBack:'+idOp[id].callBack+'}); return false;">></a></span>';
	}else{
		calendar += '			<span><a href="#" class="button right" onclick="kCalendar(\'' + id + '\', {initDate:\'' + nextDate + '\', callBack:'+idOp[id].callBack+'}); return false;">></a></span>';
	}
	calendar += '		</div>';
	calendar += '		<table border="0" cellspacing="0" cellpadding="0">';
	calendar += '			<caption>' + currentYear + '년 ' + currentMonth + '월 달력</caption>';
	calendar += '			<thead>';
	calendar += '				<tr>';
	calendar += '				  <th class="sun" scope="row">일</th>';
	calendar += '				  <th class="mon" scope="row">월</th>';
	calendar += '				  <th class="tue" scope="row">화</th>';
	calendar += '				  <th class="wed" scope="row">수</th>';
	calendar += '				  <th class="thu" scope="row">목</th>';
	calendar += '				  <th class="fri" scope="row">금</th>';
	calendar += '				  <th class="sat" scope="row">토</th>';
	calendar += '				</tr>';
	calendar += '			</thead>';
	calendar += '			<tbody>';
	
	var dateNum = 1 - currentDay;
	
	for(var i = 0; i < week; i++) {
		calendar += '			<tr>';
		for(var j = 0; j < 7; j++, dateNum++) {

			if( dateNum < 1) {
				calendar += '				<td class="' + dateString[j] + ' diabled">' + (prevLastDate+dateNum) + '</td>';
				continue;
			}else if(dateNum > currentLastDate){
				calendar += '				<td class="' + dateString[j] + ' diabled">' + (dateNum - currentLastDate) + ' </td>';
				continue;
			}
			if(currentDate == dateNum){
				calendar += '				<td class="' + dateString[j] + '"><a href="#">' + dateNum + '</a></td>';
			}else{
				calendar += '				<td class="' + dateString[j] + '"><a href="#">' + dateNum + '</a></td>';
			}
			
		}
		calendar += '			</tr>';
	}
	
	calendar += '			</tbody>';
	calendar += '		</table>';
	
	kCalendar.innerHTML = calendar;

	var _td = kCalendar.querySelectorAll('tbody a')

	for(var i=0; i<_td.length; i++){
		_td[i].addEventListener('click' , getDay, false)
	}

	function getDay(e){
		e.preventDefault();
		if(idOp[id].callBack !== 'undefined' && typeof idOp[id].callBack === 'function'){
			var _day = this.innerHTML.trim();
			if(_day.length == 1){
				_day = '0'+_day
			}
			idOp[id].callBack(currentYear+''+currentMonth+''+_day)
		}
	}
}

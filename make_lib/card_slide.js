var cardSlide = {
	init:function(_target, _op){
		_this = this;

		/*
			start, end, different position variable
		*/
		_this.point = {
			xDown:null,
			yDown:null,
			xDiff:null,
			yDiff:null
		}

		// _target 아래에 있는 모든 list 를 선택
		_this.li = document.querySelectorAll(_target);

		// 첫번째 list 에 class=current(z-index:3) 를 주어 리스트의 맨 앞으로 보낸다.
		_this.addClass(_this.li[0], 'current');

		// 두번째 list 에 class=next(z-index:2) 를 주어 맨 앞의 list가 좌우로 움직일 때 뒤에 보여지게 한다.
		_this.addClass(_this.li[1], 'next');

		// list 의 width 를 구해 저장한다. slide 속도 및 slide 종료 위치 지정에 사용된다.
		_this.liWidth = _this.li[0].offsetWidth;

		/*
			slide 속도에 영향 전체 넓이를 40 으로 나눈만큼 interval 에서 움직인다.
			나누는 숫자(40)가 작을수록 slide 속도가 빨라진다.
			후에 사용자로부터 입력 받아서 사용 가능하다.
		*/
		_this.step = _this.liWidth / 40;

		/*
			slide animation 동작중 추가 이벤트를 막기 위한 변수.
			animation 이 시작할 때 true, 종료될 때 false 로 바뀌며,
			추가 이벤트(click, touchstart)가 발생할 때 체크 후 true 일 경우 return false 시킨다.
		*/
		_this.animation = false;

		/*
			width:100% 의 slide 나 반응형 웹일 경우 넓이가 변경이되면
			slide의 넓이와 넓이에 따라 변화된 step size 를 변경해준다.
		*/
		window.onresize = function(){
			_this.liWidth = _this.li[0].offsetWidth;
			_this.step = _this.liWidth / 40;
		}

		// slide list 의 length : 빈번하게 사용되는 값이라 변수에 저장해서 사용
		_this.length = _this.li.length;

		_this.styleProp = _this.getStyleProperty('transform');

		console.log(_this.styleProp)

		/*
			issue : touchmove, left/right animation 시 event.target 의 translate 의 위치값을 변경
					- event target 이 li가 아니라 다른 자식노드 (li > div > span) 가 됐을 때
					- event target의 translate 값이 변경 되어서 slide 에 에러 발생
			modify : 현재 가장 앞에 보여지고 있는 li의 index 번호를 저장.
					event target 이 아닌 li[index] 로 slide animation 동작
		*/
		_this.liIdx = 0;

		// 옵션이 있는경우 : 향후 옵션은 추가 가능
		if(_op){
			// pageArrow(좌우 화살표) 가 있으면
			if(_op.pageArrow){
				// 좌우 화살표에 event 등록
				_this.arrowEvent(_target);
			}
		}

		// ㅣㅑ
		_this.regEvt(_this.li)

		

	},

	/*
		list 에 event 등록 현재는 mobile & pc 를 동시에 등록.
		후에 해당 target device 에만 event 등록하게 변경
	*/
	regEvt:function(_li){
		for(var i=0; i<_this.length; i++){
			// mobile, tablet device
			_li[i].addEventListener('touchstart', _this.fnTouchStart, false);
			_li[i].addEventListener('touchmove', _this.fnTouchMove, false);
			_li[i].addEventListener('touchend', _this.fnTouchEnd, false);

			// PC 
			_li[i].addEventListener('mousedown', _this.fnTouchStart, false);
			_li[i].addEventListener('mousemove', _this.fnTouchMove, false);
			_li[i].addEventListener('mouseup', _this.fnTouchEnd, false);

			// PC mouse pointer 가 list 를 벗어나는 경우 end event 로 간주
			_li[i].addEventListener('mouseleave', _this.fnTouchEnd, false);
		}
	},

	/*
		좌우 화살표 버튼의 event 등록
	*/
	arrowEvent:function(_target){
		// 좌우 화살표 버튼의 사용 여부와 함께 좌우 화살표 버튼으로 사용할 className 도 받아서 사용 가능
		_this.leftArrow = document.querySelector(_target+' .btn-left-arrow');
		_this.rightArrow = document.querySelector(_target+' .btn-right-arrow');

		// left button event
		_this.leftArrow.addEventListener('click', _this.fnLeftArrow, false);
		_this.leftArrow.addEventListener('touchend', _this.fnLeftArrow, false);

		// right button event
		_this.rightArrow.addEventListener('click', _this.fnRightArrow, false);
		_this.rightArrow.addEventListener('touchend', _this.fnRightArrow, false);
	},

	/* touch start, mouse down */
	fnTouchStart:function(evt){
		// animation 동작 체크후 동작중이면 return
		if(_this.animation){
			return false;
		}

		// event type 설정 touch device 나 PC나 동일 이벤트 변수 사용 
		if(evt.type.indexOf('touch') > -1){
			evt = evt.touches[0];
		}

		// start position X, Y 좌표 저장
		_this.point.xDown = evt.clientX;
		_this.point.yDown = evt.clientY;
	},
	/* touch move, mouse move */
	fnTouchMove:function(evt){
		// 값이 없을 경우 return
		if ( ! _this.point.xDown || ! _this.point.yDown ) {
			return;
		}

		// event type 설정 touch device 나 PC나 동일 이벤트 변수 사용 
		if(evt.type.indexOf('touch') > -1){
			evt = evt.touches[0];
		}

		document.getElementById('slideconsole').innerHTML = _this.li[_this.liIdx].style[_this.styleProp];

		// slide 동작시 화면의 위 아래 슬라이드를 막기 위해 body 에 스타일 지정
		document.body.setAttribute('style','overflow:hidden;');

		// start , end position 의 차이를 구한다.
		_this.point.xDiff = evt.clientX - _this.point.xDown;
		_this.point.yDiff = evt.clientY - _this.point.yDown;

		// X 축의 변화 값이 Y 축의 변화 값 보다 크면 좌우 슬라이드 동작
		if ( Math.abs( _this.point.xDiff ) > Math.abs( _this.point.yDiff ) ) {
			_this.li[_this.liIdx].style[_this.styleProp] ='translate3d('+_this.point.xDiff+'px,0,0)';
		}
	},
	/* touch end, mouse up */
	fnTouchEnd:function(evt){
		// X 축 변화 값이 +100 보다 크면 right slide
		if(_this.point.xDiff > 100){
			_this.rightAni(_this.li[_this.liIdx], _this.point.xDiff);
		}
		// X 축 변화 값이 -100 보다 작으면 left slide
		else if(_this.point.xDiff < -100){
			_this.leftAni(_this.li[_this.liIdx], _this.point.xDiff);
		}
		// X 축 변화 값이 -100 < X < 100 이면 원점으로
		else{
			_this.initAni(_this.li[_this.liIdx], _this.point.xDiff);
		}

		// 이벤트가 종료 되면 body 의 overflow:hidden 을 제거한다.		
		document.body.removeAttribute('style');

		// position 값을 초기화 한다.
		_this.point = {
			xDown:null,
			yDown:null,
			xDiff:null,
			yDiff:null
		}
	},
	// left arrow button event : right button 과 merge 가능
	fnLeftArrow:function(e){
		// <a /> 의 기본 이벤트를 막는다.
		e.preventDefault();

		// slide animation 동작중이면 return 
		if(_this.animation){
			return false;
		}

		// 현재 class='current' 인 li 를 찾아 slide animation 을 한다.
		for(var i = 0; i < _this.length; i++){
			if((_this.li[i].className).indexOf('current') > -1){
				_this.leftAni(_this.li[i], 0)
			}
		}
	},
	// right arrow button event : left button 과 merge 가능
	fnRightArrow:function(e){
		// <a /> 의 기본 이벤트를 막는다.
		e.preventDefault();

		// slide animation 동작중이면 return 
		if(_this.animation){
			return false;
		}

		// 현재 class='current' 인 li 를 찾아 slide animation 을 한다.
		for(var i = 0; i < _this.length; i++){
			if((_this.li[i].className).indexOf('current') > -1){
				_this.rightAni(_this.li[i], 0)
			}
		}
	},
	// diff position 이 충당 되지 않았을 때 재자리를 찾는 animation
	initAni:function(_target, currentPoint){
		// animation 동작 체크후 동작중이면 return
		_this.animation = true;

		// inverval
		var leftInterval = setInterval(function(){
			// -100 < currentPoint < 100 이면 currentPoint 를 0으로 animation 한다.
			if(currentPoint > 0){
				currentPoint-=3;
				if(currentPoint < 0){
					currentPoint = 0;

					// currentPoint가 0이면 animation 을 종료한다.
					clearInterval(leftInterval);

					// animation 종료시 animation 상태를 false로 한다.
					_this.animation = false;
				}
			}else{
				currentPoint+=3;
				if(currentPoint > 0){
					currentPoint = 0;

					// currentPoint가 0이면 animation 을 종료한다.
					clearInterval(leftInterval);

					// animation 종료시 animation 상태를 false로 한다.
					_this.animation = false;
				}
			}

			// 변경된 값만큼 animation 한다.
			_target.style.webkitTransform = 'translate3d('+currentPoint+'px,0,0)';
		}, 10)
	},
	// right animation : left animaion 과 통합해서 사용 가능
	rightAni:function(_target, currentPoint){
		// animation 상태를 true로 변환
		_this.animation = true;
		var leftInterval = setInterval(function(){
			// currentPoint 가 li의 넓이보다 작을 경우 step 만큼 translate 한다.
			if(currentPoint < _this.liWidth){
				currentPoint+=_this.step;
				_target.style.webkitTransform = 'translate3d('+currentPoint+'px,0,0)';
			}
			// currentPoint 가 li의 넓이보다 클경우 끝까지 이동한걸로 판단 animation 을 종료시키고 list 를 초기화 한다.
			else{
				clearInterval(leftInterval);

				// list element 초기화
				_this.elementInit(_target);

				// animation 상태를 false로 저장
				_this.animation = false;
			}
		}, 10)
	},
	// left animation : right animation 과 통합해서 사용 가능
	leftAni:function(_target, currentPoint){
		// animation 상태를 true 로 변환
		_this.animation = true;
		var leftInterval = setInterval(function(){
			if(currentPoint > -_this.liWidth){
				currentPoint-=_this.step;
				_target.style.webkitTransform = 'translate3d('+currentPoint+'px,0,0)';
			}else{
				clearInterval(leftInterval);
				_this.elementInit(_target);
				_this.animation = false;
			}
		}, 10)
	},
	// jQuery 의 addClass 에서 착안
	addClass:function(_t, _cName){
		var _c = _t.className;

		// 해당 클래스가 이미 있는 경우 return false;
		if(_c.indexOf(_cName) > -1){
			return false;
		}

		// 기존 class 가 있을 경우
		if(_c != null && _c != ''){
			// 기존 class 에 class 를 추가한다.
			_t.className = _c + ' ' + _cName;
		}
		// 기존 class 가 없을 경우
		else{
			// class를 추가한다.
			_t.className = _cName;
		}
	},
	// jQuery 의 removeClass 에서 착안
	removeClass:function(_t, _cName){
		var _c = _t.className;

		// 해당 class 제거 후 공백 제거
		_c = _c.replace(_cName, '').trim();

		// 제거한 class를 재 할당
		_t.className = _c;
	},
	// list element 초기화 : animation 동작 후 실행
	elementInit:function(_target){
		// _index 값을 현재 가장 앞에 보이는 list 로 초기화 한다.
		var _index = _this.liIdx;

		// 현재 li 의 style 을 제거 한다.
		_this.li[_index].removeAttribute('style');

		// 현재 li 에서 class='current' 를 제거한다.
		_this.removeClass(_this.li[_index], 'current')

		// current list 가 last-child 이면
		if(_index == _this.length-1){
			// list 의 first-child 에서 next 클래스를 제거하고
			_this.removeClass(_this.li[0], 'next')

			// list 의 first-child 를 current 로 만든다.
			_this.addClass(_this.li[0], 'current')

			// list 의 second child 가 다음 list 가 된다.
			_this.addClass(_this.li[1], 'next')

			// current list 의 index 는 0
			_this.liIdx = 0;
		}
		// current list 가 last-child 가 아니면
		else{
			// current list 의 다음 list 에서 next 를 제거하고
			_this.removeClass(_this.li[_index+1], 'next')
			// 다음 list 에 current 를 추가한다.
			_this.addClass(_this.li[_index+1], 'current')
			
			// current 의 다음 list 가 last-child 일 경우
			if(_index == _this.length - 2){
				// first child가 next 가 된다.
				_this.addClass(_this.li[0], 'next')
			}
			// current 의 다음 list가 last-child 가 아닐 경우
			else{
				// 다음 list가 next 가 된다.
				_this.addClass(_this.li[_index+2], 'next')
			}

			// current list 의 index 는 current index + 1
			_this.liIdx = _index+1;
		}
	},
	getStyleProperty:function(propName, element) {
 
		var prefixes = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms', "webkit"];
		var _cache = { };
		element = element || document.documentElement;
		var style = element.style,
		prefixed,
		uPropName;

		// check cache only when no element is given
		if (arguments.length == 1 && typeof _cache[propName] == 'string') {
			return _cache[propName];
		}
		// test standard property first
		if (typeof style[propName] == 'string') {
			return (_cache[propName] = propName);
		}

		// capitalize
		uPropName = propName.charAt(0).toUpperCase() + propName.slice(1);

		// test vendor specific properties
		for (var i=0, l=prefixes.length; i<l; i++) {
			prefixed = prefixes[i] + uPropName;
			if (typeof style[prefixed] == 'string') {
				return (_cache[propName] = prefixed);
			}
		}
	}
}
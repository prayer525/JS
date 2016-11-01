var cardSlide = {
    init:function(_target){
        _this = this;

        _this.point = {
            xDown:null,
            yDown:null,
            xUp:null,
            yUp:null,
            xDiff:null,
            yDiff:null
        }
        _this.li = document.querySelectorAll(_target);
        _this.addClass(_this.li[0], 'current');
        _this.addClass(_this.li[1], 'next');
        _this.liWidth = _this.li[0].offsetWidth;
        _this.step = _this.liWidth / 40;
        _this.animation = false;
        window.onresize = function(){
            _this.liWidth = _this.li[0].offsetWidth;
            _this.step = _this.liWidth / 40;
        }
        _this.length = _this.li.length;
        _this.unlock = true;


        _this.regEvt(_this.li)
    },
    regEvt:function(_li){
        for(var i=0; i<_this.length; i++){
            _li[i].addEventListener('touchstart', _this.fnTouchStart, false);
            _li[i].addEventListener('touchmove', _this.fnTouchMove, false);
            _li[i].addEventListener('touchend', _this.fnTouchEnd, false);

            _li[i].addEventListener('mousedown', _this.fnTouchStart, false);
            _li[i].addEventListener('mousemove', _this.fnTouchMove, false);
            _li[i].addEventListener('mouseup', _this.fnTouchEnd, false);
            _li[i].addEventListener('mouseleave', _this.fnTouchEnd, false);
        }
    },
    fnTouchStart:function(evt){
    	if(_this.animation){
    		return false;
    	}
        if(evt.type.indexOf('touch') > -1){
            evt = evt.touches[0];
        }
        _this.point.xDown = evt.clientX;
        _this.point.yDown = evt.clientY;
    },
    fnTouchMove:function(evt){
        if ( ! _this.point.xDown || ! _this.point.yDown ) {
            return;
        }
        if(evt.type.indexOf('touch') > -1){
            evt = evt.touches[0];
        }

        if(_this.unlock){
        	_this.addClass(document.body, 'lock');
            // document.ontouchmove = function(evt){
            //     evt.preventDefault();
            // }
            _this.unlock = false;
        }

        _this.point.xUp = evt.clientX;
        _this.point.yUp = evt.clientY;
        _this.point.xDiff = _this.point.xUp - _this.point.xDown;
        _this.point.yDiff = _this.point.yUp - _this.point.yDown;

        if ( Math.abs( _this.point.xDiff ) > Math.abs( _this.point.yDiff ) ) {
            evt.target.style.webkitTransform = 'translate3d('+_this.point.xDiff+'px,0,0)';
        }
    },
    fnTouchEnd:function(evt){
        if(_this.point.xDiff > 100){
            _this.rightAni(evt.target, _this.point.xDiff);
        }else if(_this.point.xDiff < -100){
            _this.leftAni(evt.target, _this.point.xDiff);
        }else{
            _this.initAni(evt.target, _this.point.xDiff);
        }
        if(!_this.unlock){
            // document.ontouchmove = null;
            _this.removeClass(document.body, 'lock')
            _this.unlock = true;
        }

        _this.point = {
            xDown:null,
            yDown:null,
            xUp:null,
            yUp:null,
            xDiff:null,
            yDiff:null
        }
    },
    initAni:function(_target, currentPoint){
        var leftInterval = setInterval(function(){
            if(currentPoint > 0){
                currentPoint-=3;
                if(currentPoint < 0){
                    currentPoint = 0;

                    clearInterval(leftInterval);
                }
            }else{
                currentPoint+=3;
                if(currentPoint > 0){
                    currentPoint = 0;

                    clearInterval(leftInterval);
                }
            }

            _target.style.webkitTransform = 'translate3d('+currentPoint+'px,0,0)';
        }, 10)
    },
    rightAni:function(_target, currentPoint){
    	_this.animation = true;
        var leftInterval = setInterval(function(){
            if(currentPoint < _this.liWidth){
                currentPoint+=_this.step;
                _target.style.webkitTransform = 'translate3d('+currentPoint+'px,0,0)';
            }else{
                clearInterval(leftInterval);
                _this.elementInit(_target);
                _this.animation = false;
            }
        }, 10)
    },
    leftAni:function(_target, currentPoint){
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
    addClass:function(_t, _cName){
        var _c = _t.getAttribute('class')
        if(_c != null){
            _t.setAttribute('class', _c + ' ' + _cName)
        }else{
            _t.setAttribute('class',  _cName)
        }
    },
    removeClass:function(_t, _cName){
        var _c = _t.getAttribute('class')
        _c = _c.replace(_cName, '').trim();
        _t.setAttribute('class',  _c);
    },
    elementInit:function(_target){
        var _index = null;
        for(var i = 0; i<_this.length; i++){
            if(_this.li[i] == _target){
                _index = i;
            }
        }
        _this.li[_index].removeAttribute('style');
        _this.removeClass(_this.li[_index], 'current')

        if(_index == _this.length-1){
            _this.removeClass(_this.li[0], 'next')
            _this.addClass(_this.li[0], 'current')
            _this.addClass(_this.li[1], 'next')
        }else{
            _this.removeClass(_this.li[_index+1], 'next')
            _this.addClass(_this.li[_index+1], 'current')

            if(_index == _this.length - 2){
                _this.addClass(_this.li[0], 'next')
            }else{
                _this.addClass(_this.li[_index+2], 'next')
            }
        }
    }
}
var fnList = {};
var Data = {
	data:{
	},
	apiData:{
	},
	set:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.data[k] = v;
	},
	get:function(k){
		if(Data.data[k] === undefined){
			Data.data[k] = '';
		}
		return Data.data[k];
	},
	setData:function(k,v){
		if(v === undefined){
			v = '';
		}
		Data.apiData[k] = v;
		Data.put();
	},
	getData:function(k){
		if(Data.apiData[k] === undefined){
			Data.apiData[k] = '';
		}
		return Data.apiData[k];
	},
	getItem:function(k, v){
		var itemValue = '';
		if(Data.apiData[k] === undefined || Data.apiData[k][v] === undefined){
			itemValue = '';
		}else{
			itemValue = Data.apiData[k][v];
		}
		return itemValue;
	},
	put:function(callBack){
		window.localStorage.setItem("data", JSON.stringify(Data.data));
		window.localStorage.setItem("apiData", JSON.stringify(Data.apiData));
		if(callBack !== undefined){
			callBack();
		}
	},
	withdraw:function(callBack){
		var _data = window.localStorage.getItem("data");

		if(_data != undefined){
			Data.data = JSON.parse(_data);

			var _apiData = window.localStorage.getItem("apiData");

			if(_apiData != undefined){
				Data.apiData = JSON.parse(_apiData);

				if(callBack !== undefined){
					callBack();
				}
			}
		}
	}
}
window.Data = Data;
Data.withdraw();

// 공통 이벤트 바인드
$(function(){
	// detail popup - comment show more
	$(document).off('click', '.lead-comment').on('click', '.lead-comment', function(){
		$(this).find('.comment').toggleClass('show');
	})
	/********************************************************************************************
	 * select-layer-wrap hide
	 ********************************************************************************************/
	$('.select-layer-wrap').off('click', '.btn-select-layer-close').on('click', '.btn-select-layer-close', function(){
		$('.back-pannel').removeClass('show');
		$(this).parent('div').parent('div').removeClass('show');
	})

	/* scroll top/down to header hide */
	// Hide Header on on scroll down
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = 50;

	$('.scroll-wrap').scroll(function(event){
		hasScrolled($(this).scrollTop());
	});

	function hasScrolled(st) {

		// Make sure they scroll more than delta
		if(Math.abs(lastScrollTop - st) <= delta)
			return;
		if (st > lastScrollTop && st > navbarHeight){
			$('.controll-btn-wrap, .main-swipe-cont .tit-h2').addClass('nav-up');
		} else {
			if(st + $('.scroll-wrap').height() < $(document).height()) {
				$('.controll-btn-wrap, .main-swipe-cont .tit-h2').removeClass('nav-up');
			}
		}

		lastScrollTop = st;
	}
})
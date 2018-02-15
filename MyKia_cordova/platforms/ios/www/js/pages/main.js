fnList.pageMain = function(){

	$("#main-tab-body").touchSlider({
	    initComplete : function (e) {
	        var _this = this;
	        var $this = $(this);
	        var paging = $('.main-tab-menu');
	        var len = Math.ceil(this._len / this._view);
	        
	        paging.find(".btn-page").on("click", function (e) {
	            _this.go_page($(this).index());
	        });
	    },
	    counter : function (e) {
	        $('.main-tab-menu').find('.btn-page').removeClass('on').eq(e.current-1).addClass('on');
	    }
	});

	// Event
	$('.ve-set').click(function(){
		$.mobile.changePage( 'change_vehicle.html', { transition: 'slide'} );
	});

	$('.setting').click(function(){
		$.mobile.changePage( 'setting.html', { transition: 'slide'} );
	});

	// Page Link
	$('.main-sub-menu button').on('click', function(){
		var _href = $(this).data('href') + '.html';

		$.mobile.changePage( _href, { transition: "slide"} );
	})

	// Page Create 

	function fnInitPage(){
		if(Data.getData('Login') == ''){
			$.mobile.changePage( 'login.html', { transition: 'slide'} );
		}

		// Vehicle Image 
		$('#mycar').attr('src', Data.getData('VehiclesImagesV2').Vehicles[0].VehicleImageUrl);

		var userInfo = Data.getData('UserInformation');
		var vehiclesInformation = Data.getData('VehiclesInformation');

		if(vehiclesInformation.Vehicles.length > 1){
			$('.ve-set').show();
		}

		/*
		# SecondDealer가 있고, PreferredDealer와 SapCode가 다르면 dealer detail에서 탭 표시 - 스웨덴
		*/

		// show // hide app link
		if (userInfo.MarketId === 'KMSE') {
			$('.my-appointments').attr('style', 'width: 50% !important');
			$('.app-link').show().on('click', function(){
				var platform = (device.platform).lowerCase();

				if (platform == 'android') {
					var openDefa = startApp.set({
						"application":"com.application.name"
					});

					sApp.start(function() { /* success */
						// console.log("OK");
					}, function(error) { /* fail */
						window.open('https://play.google.com/store/apps/details?id=com.est.defa', '_system');
					});

					return false;
				}else if (platform == 'ios' || platform == 'iphone os') {
					var openDefa = startApp.set('DEFALink://');

					sApp.start(function() { /* success */
						// console.log("OK");
					}, function(error) { /* fail */
						window.open('https://itunes.apple.com/lb/app/truecaller-caller-id-number/id542334548?mt=8','_system')
					});

					return false;
				}
			});
			$('.sub-menu-kmd').hide();
			$('.sub-menu-eu').show();
		}else if(userInfo.MarketId === 'KMDE') {
			$('.sub-menu-kmd').show();
			$('.sub-menu-eu').hide();
		}else if(userInfo.MarketId === 'KMAT' || userInfo.MarketId === 'KMIE') {
			$('.my-appointments').attr('style', 'width: 50% !important');
			$('.contact-kia').show();
			$('.sub-menu-kmd').hide();
			$('.sub-menu-eu').show();
		}else {
			$('.my-appointments').attr('style', '');
			$('.app-link').hide();
			$('.app-link-it').hide();
			$('.sub-menu-kmd').hide();
			$('.sub-menu-eu').show();
			$('.contact-kia').hide();
		}

		// header logo
		var LanguageCode = Data.get('LanguageCode');
		if (LanguageCode == 'es-ES') {
			$(".header > h1").attr("class", "lang-es");
		}
		else if (LanguageCode == 'pl-PL') {
			$(".header > h1").attr("class", "lang-pl");
		}
		else if (LanguageCode == 'cs-CZ') {
			$(".header > h1").attr("class", "lang-cs");
		}
		else {
			$(".header > h1").attr("class", "lang-en");
		}
		$(".header > h1").text("MyKia");

		// Recall Check
		var recallInfo = Data.getData('RecallInformation');
		if (recallInfo!=''&&recallInfo!=null) {
			var recallList = recallInfo.Recall,
				item = recallList.shift();

			if (item != undefined) {
				gfnRecallInfo(item, recallList);
			}
		}
	}

	function gfnRecallInfo(target, list){
		var dealerInfo = Data.getData('DealerInformation');
		var Vehicles = Data.getData('VehiclesInformation').Vehicles;
		var userInfo = Data.getData('UserInformation');

		$('#pageMain .lightbox').removeClass('none');
		$('#pageMain .popup').removeClass('none');

		$('#pageMain .p-data-top').html('');
		$('#pageMain .p-data-bottom').html('');

		$('<div class="hbox jc"></div>').append($('<img src="../img/p_usr.png"/>)')).append(
			$('<strong class="flex"></strong>').html(
				dealerInfo.Name
			)).appendTo($(".p-data-top"));
		$('<p></p>').html(JsUtil.fnStringFomatter(i18n('O1_2','text'), [userInfo.FirstName])).appendTo($(".p-data-top"));
		$('<p></p>').html(target.RecallMessage).appendTo($(".p-data-top"));


		var recallCarName = "";
		$(Vehicles).each(function(idx, car) {
			if (car.VIN == target.VIN) {
				recallCarName = car.VehicleName;
				return false;
			}
		});

		$("#pageMain .p-data-bottom").append($("<strong></strong>").html(JsUtil.fnMomentDate(target.RecallDate, 'LL')))
			.append($("<p></p>").html(JsUtil.fnStringFomatter(i18n('O1_3', 'text'), [recallCarName])))
			.append($("<p></p>").html(target.RecallTitle))
			.append($("<button></button>")
				.html(i18n('E1_51','text'))
				.addClass("btn-white")
				//.data(Scheme.PhoneNumber, "+"+dealerInfo.Phone)
				.off("click")
				.click(function(){
					directCall(dealerInfo.Phone);
					// Direct Call
				})
			)

		$("#pageMain .pbtn.close").off("click").click(function() {
			if ($("#chk01").prop("checked")) {
				var tempList = Data.getData('RecallInformation');
				$(tempList.Recall).each(function(idx, item) {
					if (JSON.stringify(target) == JSON.stringify(item)) {
						var pushInfo=Data.getData('pushInfo');
						if(pushInfo ==''){
							pushInfo = {};
						}
						pushInfo[item.RecallId]=false;
						Data.setData('pushInfo', pushInfo);
						tempList.Recall.splice(idx, 1);
						Data.getData('RecallInformation', tempList);
						$("#chk01").prop("checked", false);
						return false;
					}
				});
			}

			var next = list.shift();
			if (next == undefined) {
				$("#pageMain .lightbox").addClass("none");
				$("#pageMain .popup").addClass("none");
			}else {
				gfnRecallInfo(next, list);
			}
		});
	}

	fnInitPage();

	// gfnRecallInfo({'RecallMessage':'test', 'VIN':'123123123'}, []);
}





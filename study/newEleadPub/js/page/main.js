fnList.pageMain = function(){
    console.log("page main");
    
    // Main Tab Navigation
	var pageMain = fnList.pageMain;
	var elem = document.getElementById('main-swipe-cont-wrap');

	pageMain.mainSwipeLoop = null;
	pageMain.mainSwipeLoop = Swipe(elem, {
		startSlide: 0,
		continuous: true,
		callback: function(index, element) {
            if(isNaN(index)){
                fnList.pageMain();
            }

			$('.main-swipe-cont-wrap .main-swipe-cont>li').scrollTop(0)
			$('.main-tab-navi').find('li').removeClass('on')
		},
		transitionEnd: function(index, element) {
			$('.main-tab-navi').find('li').eq(index).addClass('on')
		}
	});

	$('.lead-list, .first-contact-summary-wrap').off('touchstart').on('touchstart', function(){
		pageMain.mainSwipeLoop.freez();
	}).off('touchend').on('touchend', function(){
		pageMain.mainSwipeLoop.unfreez();
	})

	$('.main-tab-navi').find('a').off('click').on('click', function(){
		pageMain.mainSwipeLoop.slide($(this).parent('li').index(), 500)
		return false;
    })

    // GNB menu 
    $('.btn-toggle-menu').off('click').on('click', function(){
        if($(this).hasClass('show-menu')){
            $(this).removeClass('show-menu');
            $('html, body').removeClass('over-hidden');
            $('.content-wrap').removeClass('show-menu');
            $('.menu-cover').hide();
        }else{
            $(this).addClass('show-menu');
            $('html, body').addClass('over-hidden');
            $('.content-wrap').addClass('show-menu');
            $('.menu-cover').show();
        }

        return false;
    });
    $('.menu-cover').off('click').on('click', function(){
        $('.btn-toggle-menu').trigger('click');
    })
    
    /* lead summary slider */
    $("#dashboard-lead-list").touchSlider({
        roll:false,
        flexible:true,
        initComplete : function (e) {
            
        },
        counter : function (e) {
            //console.log('counter e : ' , e)
        }
    });

    /* OPEN LEAD */
    var openleadTab = $('#openlead-tab-list').swipeTab({
        pageNavigation:$('#openlead-tab-list').next('ul'),
        moveEnd : function(idx){
            if(idx == 4){
				$('#takeover-lead-list').show();
				$('#open-lead-list').hide()
			}else{
				$('#takeover-lead-list').hide();
				$('#open-lead-list').show()
			}
        }
	});
	
	/* OPEN LEAD LIST SWIPE */
	var listSwipe = Swiped.init({
        query: '.lead-list li',
        list: true,
        right: 65
	});
	
	/* Lead list accordion event */
	$('.lead-list-wrap h3').off('click').on('click', function(){
		$(this).parent('li').toggleClass('show');
	})

	/* Takeover list accordion event */
	$('.takeover-lead-list dt').off('click').on('click', function(){
		$(this).next('dd').toggleClass('show');
	})

	/* MY TASK */
	var mytaskleadTab = $('#mytask-tab-list').swipeTab({
        pageNavigation:$('#mytask-tab-list').next('ul'),
        moveEnd : function(idx){
            
        }
	});

	var firstContactLeadSlide = null;
	$("#first-contact-lead-list").touchSlider({
        roll:true,
		flexible:false,
		btn_prev:$('.first-contact-slide-navi .btn-prev'),
		btn_next:$('.first-contact-slide-navi .btn-next'),
        initComplete : function (e) {
            firstContactLeadSlide = this;
        },
        counter : function (e) {
			$(firstContactLeadSlide).find('>ul>li').scrollTop(0);
        }
	});

	$('.first-contact-summary-list li').off('click', 'a').on('click', 'a', function(){
		var idx = $(this).parent('li').index();

		firstContactLeadSlide.go_page(idx);

		setTimeout(function(){
			$('.layer-popup-wrap, .first-contact-wrap').addClass('show');
		}, 150)
	})

	$('.first-contact-wrap .btn-skip').off('click').on('click', function(){
		$('.layer-popup-wrap, .first-contact-wrap').removeClass('show');
	})

	/* Performance */
	var ctxR = document.getElementById("radar-chart").getContext('2d');
	window.myRadarChart = new Chart(ctxR, {
		type: 'radar',
		data: {
			labels: [" ", " ", " "],
			datasets: [{
					label: "Current Month",
					data: [5, 5, 5],
					backgroundColor: [
						'rgba(235, 11, 11, .77)',
					],
					borderColor: [
						'rgba(235, 11, 11, .77)',
					],
					borderWidth: 1,
					radius:0
				},{
					label: "Previous Month",
					data: [4, 5, 6],
					backgroundColor: [
						'rgba(196, 198, 200, 1)',
					],
					borderColor: [
						'rgba(196, 198, 200, 1)',
					],
					borderWidth: 1,
					radius:0
				},{
					label: "dummy",
					data: [0, 0, 0],
					backgroundColor: [
						'rgba(196, 198, 200, 0)',
					],
					borderColor: [
						'rgba(196, 198, 200, 0)',
					],
					borderWidth: 1,
					radius:0
				}
			]
		},
		options: {
			responsive: true,
			legend: {
				display: false
			},
			scale: {
				display: false
			},
			pointer:{
				display:false
			}
		}
	});
	$('.radar-chart-wrap').css('height', $(document).width() / 2 + 'px');

	var optLineGraph = {
							responsive: true,
							legend: {
								display: false
							},
							scales: {
								xAxes:[{
									display:false
								}],
								yAxes: [{
									display: false,
									type: 'linear',
									position: 'left',
									ticks: {
										min: 0
									}
								}],
							},
							pointer:{
								display:false
							}
						};
	var ctxLO = document.getElementById("chart-lead-to-offer").getContext('2d');
	var chartLeadToOffer = new Chart(ctxLO, {
		type: 'line',
		data: {
			"labels": ["", "", "", "", "", ""],
			"datasets": [{
				"label": "value",
				"data": [, , , , 23, ],
				"fill": false,
				"borderWidth":0,
				"lineTension": 0,
				"pointRadius":4,
				"pointBackgroundColor":"rgb(255,90,38)",
				"pointBorderColor":"rgb(255,90,38)"
			},{
				"label": "value",
				"data": [10, 10, 10, 10, 23, 23],
				"fill": true,
				"backgroundColor":"rgba(255,90,38, 0.55)",
				"borderWidth":0,
				"borderColor": "rgba(255,90,38, 0)",
				"lineTension": 0,
				"pointRadius":0
			}]
		},
		options: optLineGraph
	});

	var ctxLC = document.getElementById("chart-leat-to-contract").getContext('2d');
	var chartLeadToContract = new Chart(ctxLC, {
		type: 'line',
		data: {
			"labels": ["", "", "", "", "", ""],
			"datasets": [{
				"label": "value",
				"data": [, , , , 23, ],
				"fill": false,
				"borderWidth":0,
				"lineTension": 0,
				"pointRadius":4,
				"pointBackgroundColor":"rgb(255,145,48)",
				"pointBorderColor":"rgb(255,145,48)"
			},{
				"label": "value",
				"data": [10, 10, 10, 10, 23, 23],
				"fill": true,
				"backgroundColor":"rgba(255,145,48, 0.55)",
				"borderColor": "rgba(255,145,48, 0)",
				"lineTension": 0,
				"pointRadius":0
			}]
		},
		options: optLineGraph
	});

}
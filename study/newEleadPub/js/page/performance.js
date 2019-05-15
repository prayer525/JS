fnList.pagePerformance = function(){
	console.log('pagePerformance');

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
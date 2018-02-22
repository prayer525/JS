fnList.pageLoading = function(){
	/*
	1. Get User Detail Info : UserInformation
	2. Get All Vehicle : VehiclesInformation
	3. Get Vehicle Image : VehiclesImagesV2

	# Data Field Encryption // Decryption
	*/

	var arrApi = ['UserInformation', 'VehiclesInformation', 'VehiclesImagesV2', 'RecallInformation', 'DealerInformation'];
	var cnt = 0;
	var dealerSapCode, secondDealerSapCode;
	var params = {
		CustomerId : Data.getData('Login').CustomerId
	}

	function fnGetApi(){
		if(arrApi[cnt] == 'DealerInformation'){
			var dealerParam = $.extend({'DealerSapCode':dealerSapCode}, params)
			getApi(arrApi[cnt], dealerParam, fnExtendData)
		}else{
			getApi(arrApi[cnt], params, fnExtendData)
		}
		
	}

	function fnExtendData(data){
		// second dealer check
		if(arrApi[cnt] == 'UserInformation'){
			dealerSapCode = data.PreferredDealer;
			secondDealerSapCode = data.SecondDealer;
		}
		if(arrApi[cnt] == 'DealerInformation'){
			if(Data.getData('DealerInformation') == ''){
				Data.setData('DealerInformation', data);
			}else{
				Data.setData('secondDealerSapCode', data);
			}
			if(secondDealerSapCode != ''){
				cnt--;

				dealerSapCode = secondDealerSapCode;

				secondDealerSapCode = ''
			}
		}else{
			Data.setData(arrApi[cnt], data);
		}

		cnt++;

		if(cnt >= arrApi.length){
			$('#per-bar').animate({'width':'100%'},300,function(){
				cnt = 0;

				fnMergeVehicle();

				$.mobile.changePage( 'main.html', { transition: 'slide'} );
			});
		}else{
			$('#per-bar').animate({'width':( ( cnt+1 ) * 100 / arrApi.length ) + '%'},300);
			fnGetApi();
		}
	}

	fnGetApi();
}





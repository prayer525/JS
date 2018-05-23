fnList.pageSetting = function(){
	var loginInfo = Data.getData('Login');

	if(Data.getData('Login') != null){
		$('#logout, #sync').removeClass('none');
	}else{
		$.mobile.changePage( 'login.html', { transition: 'slide'} );
	}

	$('#logout').click(function(){
		var params = {
			CustomerId : Data.getData('Login').CustomerId
		}

		getApi('Logout', params, function(){
			Data.apiData = {}

			$.mobile.changePage( 'login.html', { transition: 'slide'} );
		})
	});

	$('#sync').click(function(){
		$.mobile.changePage( 'loading.html', { transition: 'slide'} );
	})

	// Contact Us, Terms of use, Privacy Policy
	$('[data-param]').click(function(){
		Data.setData('licenseParam', $(this).data('param'));
	});

	$('.eShop').click(function(){
		var options = "location=yes,zoom=no";
		var _token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2lkZW50aXR5c2VydmVyLWttZGUuc2VydmljZS5raWEuZXUiLCJhdWQiOiJodHRwczovL215a2lhd2ViYXBpLWttZGUuc2VydmljZS5raWEuZXUvIiwibmJmIjoxNTIzODY4Nzk1LCJleHAiOjE1MjM5NTE1OTUsImh0dHBzOi8vaWRlbnRpdHlzZXJ2ZXIua2lhLmRlbW8vY2xhaW1zL2NsaWVudCI6Im15QXdlc29tZUNsaWVudCIsImh0dHBzOi8vaWRlbnRpdHlzZXJ2ZXIua2lhLmRlbW8vY2xhaW1zL3Njb3BlIjoiaHR0cHM6Ly9teWtpYXdlYmFwaS1rbWRlLnNlcnZpY2Uua2lhLmV1LyIsIm5hbWVpZCI6ImNybWttZUBnbWFpbC5jb20iLCJ1bmlxdWVfbmFtZSI6ImNybWttZUBnbWFpbC5jb20iLCJhdXRobWV0aG9kIjoiT0F1dGgyIiwiYXV0aF90aW1lIjoiMjAxOC0wNC0xNlQwODo1MzoxNS4zMDRaIiwiZW1haWwiOiJjcm1rbWVAZ21haWwuY29tIiwiY3VzdG9tZXJJZCI6ImI1MzYyMWQ0LTI3YTUtNGQ5ZC1hYzMzLTYxMzdhYjc5ZWZjOSIsInJvbGUiOiJNeUtpYUN1c3RvbWVycyJ9.23xq5Dy7wdcSX1h9Q18csC0q9P0BX7Bm-rJEXTbW6-c";
		if(loginInfo.CultureCode == 'de-DE'){
			_token = userInfo.TokenResponse.access_token;
		}
        var shop = cordova.InAppBrowser.open("https://mykia.kia-shop.eu/mykiasso/grantAccess?token="+_token+"&culture=de-DE", "_blank", options)
        return false;
	})
}

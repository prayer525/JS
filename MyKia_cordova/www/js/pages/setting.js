fnList.pageSetting = function(){

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
	})
}



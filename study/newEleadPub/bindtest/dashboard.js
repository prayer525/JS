
requirejs([
	'component/bind',
	'component/select',
	'component/utils',
], function(bind, select, utils) {
	
	// jquery 통신성공함
	function jqueryMovieSuccess(data) {
		$.kia.movie = data;
		bind.update('movie').then(function(){
			var a = {'a':'a','b':'b'}
			return fnCallback(a);
		}).then(function(e){
			fnCallback2(e);
		})
	}

	// jquery 통신성공함
	function jqueryCitySuccess(data) {
		$.kia.city = data;
		select.update('city')
	}

	function fnCallback(a){
		a.c = 'c'
		return a;
	}

	function fnCallback2(e){
		console.log('callback final : ' , e)
	}

	setTimeout(function() {
		var movie = {
			 title: 'toystory'
			,actor: 'woody'
			,description: 'very nice movie'
		}
		jqueryMovieSuccess(movie)



		var city = [{
			 key: 'seoul'
			,value: 'seo'
		},{
			 key: 'newyorn'
			,value: 'ny'
		}]
		jqueryCitySuccess(city)
	}, 300)
})





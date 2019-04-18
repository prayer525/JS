
var kia = {}

requirejs([
	'component/bind1',
	'component/bind2'
	], function(dataBind) {
	
	// jquery 통신성공함
	function jqueryMovieSuccess(data) {
		kia.movie = data;
		dataBind.update('movie')
	}


	setTimeout(function() {
		var data = {
			 title: 'toystory'
			,actor: 'woody'
			,description: 'very nice movie'
		}
		jqueryMovieSuccess(data)
	}, 1000)
})





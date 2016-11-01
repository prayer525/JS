/* one page ajax */
var contentXHR = null;
$('a[data-xhr="content"]').on('click', function(){
	var _target = $(this).attr('href').replace('#','');

	if(_target == '' || _target == '#'){
		return false;
	}

	contentXHR = fnContentXHR(_target)
})

function fnContentXHR(_target){
	$.ajax({
		url: _target,
		data:{},
		dataType:'html',
		success: function(data){
			$('.content-wrapper').html(data);
			contentXHR = null;
		},
		error:function(error){
			console.log('the page was not loaded : ' , error)
		},
		complete:function(){
			// event initialize
			init();
		}
	});
}

function fnLocationPath(){
	var docUrl = document.location.hash.replace('#','');

	if(docUrl == '' || docUrl == null){
		fnContentXHR('dashboard.html');
	}else{
		fnContentXHR(docUrl)
	}
}

window.onpopstate = function(){
	fnLocationPath()
}

fnLocationPath()
/* // one page ajax */
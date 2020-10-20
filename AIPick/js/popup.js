/*
	Function : Css transition animate status check.
 */
function fnWhichTransitionEvent(target, eType){
	var type,
	el = document.createElement("fakeelement");

	var transitions = {
		'transition'		: 'transitionend',
		'OTransition'		: 'oTransitionEnd',
		'MozTransition'		: 'transitionend',
		'WebkitTransition'	: 'webkitTransitionEnd'
	}

	var animations = {
		"animation"			: "animationend",
		"OAnimation"		: "oAnimationEnd",
		"MozAnimation"		: "animationend",
		"WebkitAnimation"	: "webkitAnimationEnd"
	}

	for (type in transitions){
		if (el.style[type] !== undefined){
			type = transitions[type] + ' ';

			break;
		}
	}

	for (type in animations){
		if (el.style[type] !== undefined){
			type = animations[type];

			break;
		}
	}

	return type;
}

$(function(){
	var $target = $('.detail-layer-wrap');

	$('html').addClass('ui-mobile');

	var transitionEnd = fnWhichTransitionEvent($target, 'end');

	$('.recommended-list li a, .video-list li a').on('click', function(){
		$target.addClass('ui-page ui-page-active slide in');

		$target.one(transitionEnd, function(){
			$target.removeClass('slide in');
		})

		return false;
	})

	$('.detail-layer-wrap .btn-close-popup').on('click', function(){
		$target.one(transitionEnd, function(){
			$target.removeClass('ui-page ui-page-active slide out reverse');
		})
	
		$target.addClass('slide out reverse');
	})
})

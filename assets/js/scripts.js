/*----------------------------------------------------
	MOBILE NAV
----------------------------------------------------*/

$('.mobile-nav').click(function() {
	$('.navigation nav').toggleClass('active');
});

/*----------------------------------------------------
	WORK CODE
----------------------------------------------------*/

var text_input = document.getElementById ('secure');
$('.work-secure').click(function() {
	$('.work-secure__input').slideToggle(200);
	text_input.focus ();
	text_input.select ();
});

// $( window ).konami({
// 	code : [72,73,82,69,77,69],
// 	cheat: function() {
// 		alert( 'Private work collection accessed' );
// 		$('.work-secure__projects').addClass('active');
// 		$('.work-secure__input').fadeOut(200);
// 		$('.work-secure__link').fadeOut(200);
// 		$('ul.blocks').addClass('no-margin');
// 	}
// });

/*----------------------------------------------------
	MASONRY
----------------------------------------------------*/

// var $grid = $('.masonry').masonry({
// 	itemSelector: '.masonry__item',
// 	percentPosition: true
// });

// $grid.imagesLoaded().progress( function() {
// 	$grid.masonry('layout');
// });

// $('.masonry__interior img').click(function () {
// 	if ($(this).parent().hasClass('active')) {
// 		$(this).parent().removeClass('active');
// 	} else {
// 		$('.masonry__interior').removeClass('active');
// 		$(this).parent().addClass('active');
// 	}
// });

/*----------------------------------------------------
	LAKES PROGRESS
----------------------------------------------------*/

$(document).ready(function(){	
	function delayView() { 
		$('.progress-bar').addClass('active');

		$({countNum: $('.progress-bar span').text()}).animate({countNum: 66}, {
			duration: 800,
			easing:'linear',
			step: function() {
				$('.progress-bar span').text(Math.floor(this.countNum));
			},
			complete: function() {
				$('.progress-bar span').text(this.countNum);
			}
		});
	}

	setTimeout(delayView, 500);
});

var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

// Current scale & translateX being applied to #wrap (used by click handler)
window._wrapScale = 1;
window._wrapTranslateX = 0;

// Mobile tree phase: scale to fill full viewport height, center horizontally
function scaleWrapFullscreen() {
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var vh = window.innerHeight || document.documentElement.clientHeight;
    var WRAP_W = 1100;
    var WRAP_H = 680;
    var scale = vh / WRAP_H;
    var tx = vw / 2 - (WRAP_W / 2) * scale;
    window._wrapScale = scale;
    window._wrapTranslateX = tx;
    var $wrap = $('#wrap');
    var $main = $('#main');
    $wrap.css('transform', 'translateX(' + tx + 'px) scale(' + scale + ')');
    $main.css('height', vh + 'px');
    $('body').css('overflow', 'hidden');
}

// Text phase: scale to fit viewport width
function scaleWrapToFit() {
    var vw = window.innerWidth || document.documentElement.clientWidth;
    var WRAP_W = 1100;
    var WRAP_H = 680;
    var $wrap = $('#wrap');
    var $main = $('#main');
    if (vw < WRAP_W) {
        var scale = vw / WRAP_W;
        window._wrapScale = scale;
        window._wrapTranslateX = 0;
        $wrap.css('transform', 'scale(' + scale + ')');
        $main.css('height', Math.round(WRAP_H * scale) + 'px');
        $('body').css('overflow', 'auto');
    } else {
        window._wrapScale = 1;
        window._wrapTranslateX = 0;
        $wrap.css('transform', '');
        $main.css('height', '');
        $('body').css('overflow', 'auto');
    }
}

$(document).ready(function() {
    if (window.innerWidth < 1100) {
        scaleWrapFullscreen();
    } else {
        scaleWrapToFit();
    }
});

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    if (newWidth != clientWidth && newHeight != clientHeight) {
        clientWidth = newWidth;
        clientHeight = newHeight;
    }
});

(function($) {
	$.fn.typewriter = function() {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					$ele.trigger('typewriter:done');
				}
			}, 75);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	seconds = seconds % 60;
	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	var result = "<span class=\"digit\">" + days + "</span> ngày <span class=\"digit\">" + hours + "</span> giờ <span class=\"digit\">" + minutes + "</span> phút <span class=\"digit\">" + seconds + "</span> giây"; 
	$("#clock").html(result);
}

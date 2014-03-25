/*
This JS relies on jquery, jquery UI (just easing),smartresize.js (resize debounce) and Skrollr.js.
All this files are being automatically concatinated with this file by 
CodeKit
*/

$(document).ready(function () {
	var recruit ={
		isTouch: false,
		header: $('header'),
		headerDrawer: $('.head-wrap'),
		headerCta: $('.head-wrap .cta'),
		touchTest: function(){
			return !!('ontouchstart' in window) || !!('onmsgesturechange' in window) || (navigator.appVersion.toLowerCase().indexOf("mobile") !== -1);
		},
		toggleMailheader: function(){
			if(recruit.headerDrawer.hasClass('closed')){
				recruit.slideMailheaderOpen();
			} else{
				recruit.slideMailheaderClose();
			}
		},
		slideMailheaderClose: function(){
			recruit.headerDrawer.addClass('working');
			recruit.headerCta.fadeOut('fast',
				function(){
						recruit.headerDrawer.animate({
						width: "0"
					}, 300, function(){
						recruit.headerDrawer.addClass('closed');
						recruit.headerDrawer.removeClass('working');
					});
				});
		},
		slideMailheaderOpen: function(){
			recruit.headerDrawer.addClass('working');
			recruit.headerDrawer.animate({
						width: "100%"
					}, 500, 'easeOutQuad', function(){
						recruit.headerCta.fadeIn('fast');
						recruit.headerDrawer.removeClass('closed');
						recruit.headerDrawer.removeClass('working');
			});
			
		},
		init: function(){
			var ieCheck = $('html').hasClass('lt-ie9');

			// older versions of IE get a warning message

			if(ieCheck){
				$('.ie-message .close-it').click(function(){
					$('.ie-message').fadeOut('fast');
					return false;
				});
			}

			$('.activate-mail').on('click', function(e){
				e.preventDefault();

				if(!recruit.headerDrawer.hasClass('working')){
					recruit.toggleMailheader();
				}
			});
			
			recruit.isTouch = recruit.touchTest();
			if(recruit.isTouch === false && !ieCheck){
				// intialize skrollr parallax plugin if not a touch device.
				var headerThreshold = 70;
				var scrollEFX = skrollr.init({
					beforerender: function(data){
						//beforerender taps into the scroll listening of the skrollr plugin
						if(!$('html').hasClass('lt-ie10')){
							if (!recruit.header.hasClass('scrolled')){
								if(data.curTop>headerThreshold){
									recruit.header.addClass('scrolled');
									recruit.slideMailheaderClose();
								}
							} else {
								if(recruit.header.hasClass('scrolled') && data.curTop<=headerThreshold){
										recruit.header.removeClass('scrolled');
										recruit.slideMailheaderOpen();
								}
							}
						}
					}
				});

				// force skrollr to reasses window height on resize (throttled by smartresize plugin)
				// this fixes an error where skrollr would make the page too short sometimes.
				$(window).smartresize(function(){
					scrollEFX.refresh();
				});

			}
		}
	};

	recruit.init();

});

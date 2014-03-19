/*
This JS relies on jquery, jquery UI (just easing), and Skrollr.js.
All this files are being automatically concatinated with this file by 
CodeKit
*/

$(document).ready(function () {
	var recruit ={
		isTouch: false,
		footer: $('footer'),
		footerDrawer: $('.foot-wrap'),
		footerCta: $('.foot-wrap .cta'),
		touchTest: function(){
			return !!('ontouchstart' in window) || !!('onmsgesturechange' in window) || (navigator.appVersion.toLowerCase().indexOf("mobile") !== -1);
		},
		toggleMailFooter: function(){
			if(recruit.footerDrawer.hasClass('closed')){
				recruit.slideMailFooterOpen();
			} else{
				recruit.slideMailFooterClose();
			}
		},
		slideMailFooterClose: function(){
			recruit.footerDrawer.addClass('working');
			recruit.footerCta.fadeOut('fast');
			recruit.footerDrawer.animate({
				width: "0"
			}, 300, function(){
				recruit.footerDrawer.addClass('closed');
				recruit.footer.animate({
				top: "90%"
				}, 1100, 'easeOutBounce', function(){
					recruit.footerDrawer.removeClass('working');
				});
			});
		},
		slideMailFooterOpen: function(){
			recruit.footerDrawer.addClass('working');
			recruit.footer.animate({
				top: '93%'
			}, 200, 'easeOutCubic', function(){
				recruit.footer.animate({
				top: "0"
				}, 200, function(){
					recruit.footerDrawer.animate({
						width: "100%"
					}, 500, 'easeOutQuad', function(){
						recruit.footerCta.fadeIn('fast');
						recruit.footerDrawer.removeClass('closed');
						recruit.footerDrawer.removeClass('working');
					});
				});
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

				if(!recruit.footerDrawer.hasClass('working')){
					recruit.toggleMailFooter();
				}
			});
			
			recruit.isTouch = recruit.touchTest();
			if(recruit.isTouch === false && !ieCheck){
				// intialize skrollr parallax plugin if not a touch device.
				var footerThreshold = 70;
				skrollr.init({
					beforerender: function(data){

						if(!$('html').hasClass('lt-ie10')){

							//beforerender taps into the scroll listening of the skrollr plugin
							if (!recruit.footer.hasClass('scrolled')){
								if(data.curTop>footerThreshold){
									recruit.footer.addClass('scrolled');
									recruit.slideMailFooterClose();
								}
							}
						}
					}
				});

			}
		}
	};

	recruit.init();

});

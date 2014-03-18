
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
				}, 200, function(){
					recruit.footerDrawer.removeClass('working');
				});
			});
		},
		slideMailFooterOpen: function(){
			recruit.footerDrawer.addClass('working');
			recruit.footer.animate({
				top: "0"
				}, 200, function(){
					recruit.footerDrawer.animate({
						width: "100%"
					}, 500, function(){
						recruit.footerCta.fadeIn('fast');
						recruit.footerDrawer.removeClass('closed');
						recruit.footerDrawer.removeClass('working');
					});
				});
		},
		init: function(){
			$('.activate-mail').on('click', function(e){
				e.preventDefault();

				if(!recruit.footerDrawer.hasClass('working')){
					recruit.toggleMailFooter();
				}
			});
			
			recruit.isTouch = recruit.touchTest();
			if(recruit.isTouch === false){
				// intialize skrollr parallax plugin if not a touch device.
				var footerThreshold = 70;
				skrollr.init({
					beforerender: function(data){
						//beforerender taps into the scroll listening of the skrollr plugin
						if (!recruit.footer.hasClass('scrolled')){
							if(data.curTop>footerThreshold){
								recruit.footer.addClass('scrolled');
								recruit.slideMailFooterClose();
							}
						}
						/*
						if (!recruit.footer.hasClass('un-scrolled')){
							if(data.curTop<=footerThreshold){
								recruit.footer.removeClass('scrolled');
								recruit.footer.addClass('un-scrolled');
								if(recruit.footerDrawer.hasClass('closed')){
									recruit.slideMailFooterOpen();
								}
							}
						}
						*/
					}
				});

			}
		}
	};

	recruit.init();

});

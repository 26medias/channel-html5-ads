



// Isolated scope, can't be accessed by scripts and the console. Prevent people from accessing and playing with the code.
(function() {
	
	// --- Start editing here --- \\
	
	// DOM Targets
	var el				= {
		container:	document.getElementById("ad_300x600"),
		bg:			document.getElementById("ad_300x600_bg"),
		window:		document.getElementById("ad_300x600_window"),
		anim:		document.getElementById("ad_300x600_anim"),
		footer:		document.getElementById("ad_300x600_footer")
	}
	
	// Ad size
	var s_ad			= {
		width:	300,
		height:	600
	};
	// Static image size (background, top)
	var s_bg	= {
		width:	300,
		height:	430
	};
	// Footer size
	var s_footer	= {
		width:	300,
		height:	170
	};
	
	// ANimation start delay
	var animDelay = 1000;
	
	// --- Stop editing here --- \\
	
	// Ratios and pre-calculated vars
	var ratio		= {
		container:		s_ad.width/s_ad.height,
		bg:				s_bg.width/s_bg.height,
		footer:			s_footer.width/s_footer.height
	};
	var dist		= {
		bg:				s_bg.height/(s_bg.height+s_footer.height),
		footer:			s_footer.height/(s_bg.height+s_footer.height)
	}
	
	// Function to get the viewport size, cross-browser
	var getViewport = function() {
	
		var viewPortWidth;
		var viewPortHeight;
	
		// the more standards compliant browsers (mozilla/netscape/opera/IE7) use window.innerWidth and window.innerHeight
		if (typeof window.innerWidth != 'undefined') {
			viewPortWidth = window.innerWidth,
			viewPortHeight = window.innerHeight
		} else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0) {
			// IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
			viewPortWidth = document.documentElement.clientWidth,
			viewPortHeight = document.documentElement.clientHeight
		} else {
			// older versions of IE
			viewPortWidth = document.getElementsByTagName('body')[0].clientWidth,
			viewPortHeight = document.getElementsByTagName('body')[0].clientHeight
		}
		return {width:viewPortWidth, height:viewPortHeight};
	}
	
	// Resize the ad
	var resizeAd = function() {
		// Get the available viewport size
		var available	= getViewport();
		
		// Calculate the current screen ratio
		var screenRatio	= available.width/available.height;
		
		// Calculate the new container size
		if (screenRatio >= ratio.container) {
			// Width based on height
			var newSize = {
				width:	available.height*ratio.container,
				height:	available.height
			}
		} else {
			// height based on width
			var newSize = {
				width:	available.width,
				height:	available.width/ratio.container
			}
		}
		
		// Calculate the width and height of each component
		var sizes = {
			container:	{
				width:		newSize.width+"px",
				height:		newSize.height+"px"
			},
			window:			{
				width:		newSize.width+"px",
				height:		(newSize.height*dist.bg)+"px"
			},
			bg:			{
				width:		newSize.width+"px",
				height:		(newSize.height*dist.bg)+"px"
			},
			anim:		{
				width:		newSize.width+"px",
				height:		(newSize.height*dist.bg)+"px"
			},
			footer:		{
				width:		newSize.width+"px",
				height:		(newSize.height*dist.footer)+"px"
			}
		}
		
		// Apply those width/height
		var i;
		for (i in sizes) {
			el[i].style.width	= sizes[i].width;
			el[i].style.height	= sizes[i].height;
		}
		
		return true;
	}
	
	// Resize the ad
	var initAnim = function() {
		// Init the styles
		/*TweenLite.set(el.anim, {
			scale:		1.5,
			opacity:	0
		});
		*/
		move(el.anim).scale(1.5).set('opacity', 0).duration('0ms').end();
		setTimeout(function() {
			move(el.anim).set('opacity', 0.6).duration('2s').end();
			setTimeout(function() {
				move(el.anim).scale(1).set('opacity', 1).duration('2s').end(function() {
					// bugfix, remove the transition duration
					move(el.anim).duration('0ms').end();
					el.bg.style.display = 'none';
				})
			}, 1000);
		}, animDelay);
		
	}
	
	
	
	// Resize the ad when the window resize
	window.onresize = function(e) {
	    resizeAd();
	};
	// Resize the ad when the page loads
	window.onload = function() {
		resizeAd();
		initAnim();
	}
})();
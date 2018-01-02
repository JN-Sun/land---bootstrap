(function(){
	var me = {};
	me.toggleToActiveLink = function(target){
		var links = document.querySelectorAll('.menu_link');
		var showdSections = target.dataset.link;
		for(var i = 0; i < links.length; i++){
			if(links[i].classList.contains('menu_link-active')){
				links[i].classList.remove('menu_link-active');

			}
		}
		target.classList.add('menu_link-active');
		scrollToActiveSection(showdSections);
	};

	function scrollToActiveSection(showdSections){
		var sections = document.querySelector('.' + showdSections);
		var coords = sections.getBoundingClientRect();
		var animateTime = 0.4;

		var timerId = setInterval(function(){
			if(window.pageYOffset < coords.top){
				window.scrollBy(0, 10);
			}else{
				clearInterval(timerId);
			}
		}, animateTime || 0.4);
	}

	NAVIG.navigation = me;
}());
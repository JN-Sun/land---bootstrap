(function(){
	var nav = document.querySelector('.menu');
	var scrollElem = document.querySelector('.up_btn');
	if(nav){
		nav.addEventListener('click', function(e){
			e.preventDefault();
			var target = e.target;
			if(target.tagName.toLowerCase() !== 'a'){
				return;
			}

			NAVIG.navigation.toggleToActiveLink(target);
		});
	}

	if(scrollElem){
		scrollElem.addEventListener('click', function(e){
		var target = e.target;
		NAVIG.arrowUp.showHideArrow(target);
		});
	}

	//Scroll up function
	window.onscroll = function(){

		if((window.pageYOffset || document.documentElement.scrollTop) > document.documentElement.clientHeight){
			scrollElem.style.opacity = "1";
		}else{
			scrollElem.style.opacity = "0";
		}
	};
}());







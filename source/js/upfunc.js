(function(){

var me = {};

me.showHideArrow = function(target){
	var timerOut;
	var top = Math.max(document.body.scrollTop,window.pageYOffset);

	if(top > 0){
		window.scrollBy(0,-100);
		timerOut = setTimeout(me.showHideArrow, 20);
	}else clearTimeout(timerOut);
};

NAVIG.arrowUp = me;


}());


jQuery(function(){
	function  add() {
	    var html=document.documentElement;
	    var hei=html.clientWidth;
	    var fz=hei/375*20+"px";
	    html.style.fontSize=fz;
	};
	add();
	window.addEventListener("resize",add,false);
})
	

(function(w){

document.addEventListener('plusready',function(){
	console.log("Immersed-UserAgent: "+navigator.userAgent);
},false);

var immersed = 0;
var ms=(/Html5Plus\/.+\s\(.*(Immersed\/(\d+\.?\d*).*)\)/gi).exec(navigator.userAgent);
if(ms&&ms.length>=3){
	immersed=parseFloat(ms[2]);
}
w.immersed=immersed;

if(!immersed){
	return;
}
$('header').css({
	'margin-top':immersed+'px',
});
$('.mui-fullscreen').css({
	'margin-top':immersed+'px',
});

})(window);
let canvas, c, radio, animation, w, h, w2, h2, txt, pos, ini, fin, iAnim, u;

function init(){

	iAnim = 0;
	count = 0;

	radio = new Radio();

	canvas = document.createElement('canvas');
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	c = canvas.getContext('2d');

	w2 = w>>1;
	h2 = h>>1;

	document.body.appendChild(canvas);
	
	listAnimations = [
		Animation01,
		Animation02,
		Animation03
	];
	
	animation = new listAnimations[iAnim]();

	addEvents();
	update();
}

function showPaused(){
	txt = "Play";
	c.font = "bold italic 3em serif";
	pos = {
		x: (w-c.measureText(txt).width)/2,
		y: h2
	};
	c.fillStyle = "black";
	c.fillRect(0,0,w,h);
	c.fillStyle = "white";
	c.fillText(txt, pos.x, pos.y);
}

function update(){

	if( radio.player.paused ){
		showPaused();
		return;
	}

	u = requestAnimationFrame(update);

	radio.analyser.getByteTimeDomainData(radio.data);

	animation.show();

	if(!ini)
		ini = Date.now();
	fin = Date.now();
	
	if( fin - ini > 7000 ){
		iAnim = (iAnim + 1) % listAnimations.length;
		animation = new listAnimations[iAnim]();
		ini = null;
	}	

}

function addEvents(){

	canvas.addEventListener('click', function(){
		radio.togglePlay();
		cancelAnimationFrame(u);
		update();
	});
	
	window.addEventListener('resize',function(){
		canvas.width = w = innerWidth;
		canvas.height = h = innerHeight;
		w2 = w>>1;
		h2 = h>>1;
		cancelAnimationFrame(u);
		update();
	});

}

window.onload = function(){
	init();
};

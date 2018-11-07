let canvas, c, canvasgl, gl, radio, animation, w, h, w2, h2, txt, pos, ini, fin, iAnim, u;

function init(){

	iAnim = 0;
	count = 0;

	radio = new Radio();

	canvas = document.createElement('canvas');
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	
	canvasgl = canvas.cloneNode(false);
	canvasgl.style.display = 'none';
	
	c = canvas.getContext('2d');
	gl = canvasgl.getContext('webgl') || canvasgl.getContext("experimental-webgl");

	w2 = w>>1;
	h2 = h>>1;

	document.body.appendChild(canvas);
	document.body.appendChild(canvasgl);
	
	listAnimations = [
		Animation01,
		Animation02,
		Animation03,
		Animation05
	];
	
	if(gl){
		listAnimations.push( Animation04 );
	}
	
	animation = new listAnimations[iAnim]();

	addEvents();
	update();
}

function changeCanvas(ctx){
	switch(ctx){
		case '2d' :
				canvas.style.display = 'block';
				canvasgl.style.display = 'none';
			break;
		case 'webgl' :
				canvasgl.style.display = 'block';
				canvas.style.display = 'none';
				c.clearRect(0,0,w,h);
			break;
	}
}

function showPaused(){
	changeCanvas('2d');
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
		changeCanvas(animation.context);
		ini = null;
	}	

}

function addEvents(){

	canvas.addEventListener('click', function(){
		changeCanvas(animation.context);
		radio.togglePlay();
		cancelAnimationFrame(u);
		update();
	});
	
	canvasgl.addEventListener('click', function(){
		changeCanvas(animation.context);
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

let canvas, c, canvasgl, gl, radio, animation, w, h, w2, h2, txt, pos, ini, fin, iAnim, u, listAnimations, lastAnim, lastCtx, time;

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
		{index: 0, anim: Animation01},
		{index: 1, anim: Animation02},
		{index: 2, anim: Animation03},
		{index: 3, anim: Animation05},
		{index: 4, anim: Animation06}
	];
	
	if(gl){
		listAnimations.push( {index: 5, anim: Animation04 } );
	}
	
	//selectAnimation();
	
	animation = new Animation06();
	
	addEvents();
	update();
}

function selectAnimation(){
	time = (Math.random() * 7000) + 7000;
	let currentAnimation = listAnimations[Math.floor(Math.random()*listAnimations.length)];
	if( lastAnim !== currentAnimation.index){
		lastAnim = currentAnimation.index;
		let anim = new currentAnimation.anim();
		if( lastCtx !== anim.context ){
			changeCanvas( anim.context );
			lastCtx = anim.context;
		}
		animation = anim;
	}
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
	
	if( fin - ini > time ){
		iAnim = (iAnim + 1) % listAnimations.length;
		//selectAnimation();
		ini = null;
	}	
	
}

function togglePlay(){
	changeCanvas(animation.context);
	radio.togglePlay();
	cancelAnimationFrame(u);
	update();
}

function addEvents(){

	canvas.addEventListener('click', togglePlay );
	
	canvas.addEventListener('touchstart' togglePlay );
	
	canvasgl.addEventListener('click', togglePlay );
	
	canvasgl.addEventListener('touchstart' togglePlay );
	
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

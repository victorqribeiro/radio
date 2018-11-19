let canvas, c, canvasgl, gl, radio, animation, w, h, w2, h2, txt, pos, ini, fin, iAnim, u, listAnimations, lastAnim, lastCtx, time, pause;

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
	
	createUI();
	
	selectAnimation();
	
	addEvents();
	update();
}

function createUI(){
	pause = document.createElement('div');
	pause.id = 'pause';
	let select = document.createElement('select');
	select.id = 'playlist';
	for(let i = 0; i < radio.playlist.length; i++){
		let opt = document.createElement('option');
		opt.value = i;
		opt.innerText = radio.playlist[i].name;
		select.appendChild( opt );
	}
	select.addEventListener('change',function(){
		radio.player.src = radio.playlist[this.value].src;
	});
	let btn = document.createElement('button');
	btn.id = 'btnPlay';
	btn.innerText = "Play";
	btn.addEventListener('click', (e)=>{ togglePlay(e) } );
	pause.appendChild( select );
	pause.appendChild( btn );
	document.body.appendChild( pause );
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
		case 'pause' :
				pause.style.display = 'flex';
				canvas.style.display = 'none';
				canvasgl.style.display = 'none';
			break;
		case '2d' :
				pause.style.display = 'none';
				canvas.style.display = 'block';
				canvasgl.style.display = 'none';
			break;
		case 'webgl' :
				pause.style.display = 'none';
				canvasgl.style.display = 'block';
				canvas.style.display = 'none';
				c.clearRect(0,0,w,h);
			break;
	}
}

function showPaused(){
	changeCanvas('pause');
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
		selectAnimation();
		ini = null;
	}	
	
}

function togglePlay(e){
	e.preventDefault();
	changeCanvas(animation.context);
	radio.togglePlay();
	cancelAnimationFrame(u);
	update();
}

function addEvents(){

	canvas.addEventListener('click', (e)=>{ togglePlay(e) } );
		
	canvasgl.addEventListener('click', (e)=>{ togglePlay(e) } );
	
	window.addEventListener('resize', ()=>{
		canvas.width = w = innerWidth;
		canvas.height = h = innerHeight;
		w2 = w>>1;
		h2 = h>>1;
		cancelAnimationFrame(u);
		update();
	});

}

window.onload = ()=>{	init(); };

if('serviceWorker' in navigator) {
  navigator.serviceWorker
           .register('/radio/sw.js')
           .then(function() { });
}

// Code to handle install prompt on desktop

let deferredPrompt;
const addBtn = document.createElement('button');

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {

        } else {

        }
        deferredPrompt = null;
      });
  });
});

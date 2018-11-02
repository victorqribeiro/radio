let audio = new Audio();
audio.preload = 'auto';
audio.src = 'http://ice1.somafm.com/indiepop-128-mp3';
audio.crossOrigin = 'anonymous';

let audioCtx = new (window.AudioContext || window.webkitAudioContext)();
let analyser = audioCtx.createAnalyser();
analyser.fftSize = 2048;

let bufferLength = analyser.frequencyBinCount;
let dataArray = new Uint8Array(bufferLength);
analyser.getByteTimeDomainData(dataArray);

let source = audioCtx.createMediaElementSource( audio );
source.connect( analyser );
source.connect( audioCtx.destination );

let canvas = document.createElement('canvas');

canvas.width = w = innerWidth;
canvas.height = h = innerHeight;

let c = canvas.getContext('2d');

document.body.appendChild(canvas);

let txt = "Play";
c.font = "bold italic 3em serif";
let pos = {
	x: (w-c.measureText(txt).width)/2,
	y: h/2
};

let a = 0;

function update(){
	
	requestAnimationFrame(update);
	
	a = (a+1)%360;
	
	let gradient = c.createRadialGradient(w/2,h/2,1,w/2,h/2, h);
	gradient.addColorStop(0, 'hsl('+(a%360)+',100%,50%)');
	gradient.addColorStop(1, 'hsl('+((a+90)%360)+',100%,50%)');
	
	if( audio.paused ){
		c.fillStyle = "black";
		c.fillRect(0,0,w,h);
		c.fillStyle = gradient;
		c.fillText(txt, pos.x, pos.y);
		return;
	}

	analyser.getByteTimeDomainData(dataArray);

  c.fillStyle = 'rgba(0,0,0,0.2)';
 
  c.fillRect(0, 0, w, h);


  c.lineWidth = 0.5;
  c.strokeStyle = gradient;

  c.beginPath();

  let sliceWidth = w * 1.0 / bufferLength;
  let x = 0;

  for(let i = 0; i < bufferLength; i++) {

    let v = dataArray[i] / 128.0;	
    let y = v * h/2;

    if(i === 0) {
      c.moveTo(x, y);
    } else {
      c.lineTo(x, y);
    }
		
    x += sliceWidth;
  }

  c.lineTo(canvas.width, canvas.height/2);
  c.stroke();
	
}

function togglePlay(e){
	if( audio.paused ){
		audio.play();
	}else{
		audio.pause();
	}
}

window.onload = function(){
	update();
	canvas.addEventListener('click', togglePlay);
};

window.addEventListener('resize',function(){
	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;
	c.font = "bold italic 3em serif";
	pos = {
		x: (w-c.measureText(txt).width)/2,
		y: h/2
	};
});

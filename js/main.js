let canvas, c, radio, a, w, h, txt, pos;


function init(){

	radio = new Radio();

	canvas = document.createElement('canvas');

	canvas.width = w = innerWidth;
	canvas.height = h = innerHeight;

	c = canvas.getContext('2d');

	document.body.appendChild(canvas);

	txt = "Play";
	c.font = "bold italic 3em serif";
	pos = {
		x: (w-c.measureText(txt).width)/2,
		y: h/2
	};
	
	a = 0;
	
	addEvents();
	update();
}

function update(){
	
	requestAnimationFrame(update);
	
	a = (a+1)%360;
	
	let gradient = c.createRadialGradient(w/2,h/2,1,w/2,h/2, h);
	gradient.addColorStop(0, 'hsl('+(a%360)+',100%,50%)');
	gradient.addColorStop(1, 'hsl('+((a+90)%360)+',100%,50%)');
	
	if( radio.player.paused ){
		c.fillStyle = "black";
		c.fillRect(0,0,w,h);
		c.fillStyle = gradient;
		c.fillText(txt, pos.x, pos.y);
		return;
	}

	radio.analyser.getByteTimeDomainData(radio.data);

  c.fillStyle = 'rgba(0,0,0,0.2)';
 
  c.fillRect(0, 0, w, h);


  c.lineWidth = 0.5;
  c.strokeStyle = gradient;

  c.beginPath();

  let sliceWidth = w * 1.0 / radio.bufferLength;
  let x = 0;

  for(let i = 0; i < radio.bufferLength; i++) {

    let v = radio.data[i] / 128.0;	
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

function addEvents(){

	canvas.addEventListener('click', function(){
		radio.togglePlay();
	});
	
	window.addEventListener('resize',function(){
		canvas.width = w = innerWidth;
		canvas.height = h = innerHeight;
		c.font = "bold italic 3em serif";
		pos = {
			x: (w-c.measureText(txt).width)/2,
			y: h/2
		};
	});

}

window.onload = function(){
	init();
};

class Animation01 {

	constructor(){
		this.context = '2d';
		radio.analyser.fftSize = 2048;
		radio.update();
		this.angle = 0;
		this.sliceWidth = w * 1.0 / radio.bufferLength;
		this.createGradient();
	}
	
	createGradient(){
		this.gradient = c.createRadialGradient(w2,h2,1,w2,h2,h);
		this.gradient.addColorStop(0, 'hsl('+(this.angle%360)+',100%,50%)');
		this.gradient.addColorStop(1, 'hsl('+((this.angle+90)%360)+',100%,50%)');
	}
	
	update(){
		this.angle = (this.angle+1)%360;
		this.createGradient();
	}
	
	show(){
		c.fillStyle = 'rgba(0,0,0,0.2)';
		c.fillRect(0, 0, w, h);
		c.lineWidth = 0.5;
		c.strokeStyle = this.gradient;
		c.beginPath();
		
		let x = 0;

		for(let i = 0; i < radio.bufferLength; i++) {

		  let v = radio.data[i] / 128.0;	
		  let y = v * h2;

		  if( !i ) {
		    c.moveTo(x, y);
		  } else {
		    c.lineTo(x, y);
		  }
		
		  x += this.sliceWidth;
		}

		c.lineTo(w, h2);
		c.stroke();
		this.update();
	}

}

class Animation02 {

	constructor(){
		radio.analyser.fftSize = 64;
		radio.update();
		this.angle = 0;
		this.gradient = c.createRadialGradient(0,0,10,0,0,h);
		this.gradient.addColorStop(0, 'black');
		this.gradient.addColorStop(0.15, 'purple');
		this.gradient.addColorStop(0.35, 'orange');
		this.gradient.addColorStop(0.55, 'red');
		this.step = (2*Math.PI) / radio.bufferLength;
	}
	
	show(){
		this.angle = 0;
		c.fillStyle = 'rgba(0,0,0,0.1)';
		c.fillRect(0,0,w,h);
		c.fillStyle = this.gradient;
		c.save();
		c.translate(w2,h2);
		for(let i = 0; i < radio.bufferLength; i++){

			c.rotate(this.angle);
			for(let j = 0; j < radio.data[i]-128; j+=2){
				let s = (j>>1) + 2;
				c.fillRect(0, j<<4, s, s);
			}
			this.angle += this.step;
		}
		c.restore();
	}

}

class Animation02 {

	constructor(){
		this.context = '2d';
		if(radio.canPlay){
			radio.analyser.fftSize = 64;
			radio.update();
		}
		this.angle = 0;
		this.ini = Math.floor(Math.random() * 360);
		this.gradient = c.createRadialGradient(0,0,10,0,0,Math.max(w,h));
		this.gradient.addColorStop(0, 'black');
		this.gradient.addColorStop(0.15, 'hsl('+this.ini+',100%,50%)');
		this.gradient.addColorStop(0.35, 'hsl('+(this.ini+90)%360+',100%,50%)');
		this.gradient.addColorStop(0.55, 'hsl('+(this.ini+160)%360+',100%,50%)');
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
			for(let j = 0; j < radio.data[i]/12; j++){
				c.fillRect(0, j*j, 0.1*j*j, 0.1*j*j);
			}
			this.angle += this.step;
		}
		c.restore();
	}

}

class Animation06 {

	constructor(){
		this.context = '2d';
		radio.analyser.fftSize = 128;
		radio.update();
		this.step = Math.PI / radio.data.length;
		this.stroke = Math.random()*360;
	}
	
	show(){
		let angle = 0;
		c.fillStyle = "rgba(0,0,0,0.1)";
		c.fillRect(0,0,w,h);
		c.strokeStyle = "hsl("+this.stroke%360+",100%,50%)";

		c.beginPath();
		
		for(let i = radio.data.length-1; i >= 0; i--){
			
			c.save();
			c.translate(w2,h2);
			c.rotate(angle);
			
			c.lineTo(0, radio.data[i]);
			
			c.restore();
			
			angle += this.step;
			
		}
		
		for(let i = 0; i < radio.data.length; i++){
			
			angle += this.step;
			
			c.save();
			c.translate(w2,h2);
			c.rotate(angle);
			
			c.lineTo(0, radio.data[i]);
			
			c.restore();
			
		}
		
		c.stroke();
		this.stroke += 0.1;
		
	}

}

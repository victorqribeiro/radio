class Animation03 {

	constructor(){
		radio.analyser.fftSize = 32;
		radio.update();
		this.particles = [];
		this.twopi = 2*Math.PI;
	}
	
	createParticle(x,y,size,direction,speed){
		return {
			x: x || 0,
			y: y || 0,
			size: size || 5,
			lifeSpan: Math.random(),
			isAlive: true,
			twopi: 2*Math.PI,
			g: Math.random() * 255,
			b: Math.random() < 0.5 ? 255: 0,
			direction: direction,
			speed: speed || 1,
			update: function(){
				this.x += Math.cos(this.direction) * this.speed;
				this.y += Math.sin(this.direction) * this.speed;
				this.lifeSpan -= 0.01;
				this.speed *= 0.99;
				if( this.lifeSpan <= 0 || this.x < 0 || this.x > w || this.y < 0 || this.y > h){
					this.isAlive = false;
				}
			},
			show: function(){
				c.beginPath();
				c.fillStyle = 'rgba(255,255,255,'+this.lifeSpan+')';
				c.arc(this.x,this.y,this.size,0,this.twopi);
				c.fill();
				this.update();
			}
		}
	}
	
	show(){

		let sum = Math.floor( radio.data.reduce( (a,b) => a+b, 0 ) / radio.data.length / 128 );

		if( sum ){
			for(let i = 0, end = Math.random() * 5; i < end; i++){
				this.particles.push( this.createParticle(w2,h2,Math.random()*5,2*Math.PI*Math.random(),Math.random()*10) );
			}
		}

		c.clearRect(0,0,w,h);
		for(let i = 0; i < this.particles.length; i++){
			this.particles[i].show();
		}
		for(let i = this.particles.length-1; i >= 0; i--){
			if( !this.particles[i].isAlive ){
				this.particles.splice(i, 1);
			}
		}
		
	}

}

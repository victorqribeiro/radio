class Animation03 {

	constructor(){
		radio.analyser.fftSize = 32;
		radio.update();
		this.particles = [];
		this.twopi = 2*Math.PI;
		this.gradient = c.createRadialGradient(w2,h2,0,w2,h2,Math.min(w,h));
		this.gradient.addColorStop(0, 'transparent');
		this.gradient.addColorStop(0.02, 'blue');
		this.gradient.addColorStop(0.1, 'yellow');
		this.gradient.addColorStop(0.2, 'orange');
		this.gradient.addColorStop(0.4, 'red');
		this.gradient.addColorStop(1, 'gray');
	}
	
	createParticle(x,y,size,direction,speed,color){
		return {
			x: x || 0,
			y: y || 0,
			size: size || 5,
			lifeSpan: Math.random(),
			isAlive: true,
			twopi: 2*Math.PI,
			color: color,
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
				c.fillStyle = this.color;
				c.arc(this.x,this.y,this.size,0,this.twopi);
				c.fill();
				this.update();
			}
		}
	}
	
	show(){
	
		let sum = ( radio.data.reduce( (a,b)=>Math.max(a,b) ) );

		for(let i = 0; i < (sum > 150 ? sum>>3 : 0); i++){
			this.particles.push( this.createParticle(w2,h2,Math.random()*3,2*Math.PI*Math.random(),Math.random()*sum>>4,this.gradient) );
		}

		c.fillStyle = 'rgb(0,0,0,0.5)';
		c.fillRect(0,0,w,h);
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

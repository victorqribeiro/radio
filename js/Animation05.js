/**
 * Animation with rising bars and falling floppy bits inspired by the
 * visualization "Bars" in Windows Media Player
 */
class Animation05 {

	constructor() {
		this.context = '2d';
		radio.analyser.fftSize = 512;
		radio.update();

		this.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)'; // random color

		this.oldRadioData = new Array(radio.data.length).fill(0);
		this.floppiez = new Array(radio.data.length).fill(0); // falling floppies
		this.fallspeed = new Array(radio.data.length); // falling speed of each floppy
	}

	show() {
		c.clearRect(0,0,w,h); // clear the screen, from (0,0) to (w,h)
		c.fillStyle = this.fillStyle;

  	for(let i = 0; i < radio.data.length; i++) {
			if(radio.data[i] - this.oldRadioData[i] > 20) {
				// draw the floppy
				this.floppiez[i] = h2 * 3/2 + -radio.data[i];
				this.fallspeed[i] = 0;
				c.fillRect(i * 10, this.floppiez[i], 8, 2);

				// draw the bar
				c.fillRect( i * 10 , h2 * 3/2 , 8, -radio.data[i] );
				this.oldRadioData[i] = radio.data[i];
			} else {
				// shrink the bar
				this.oldRadioData[i] -= 1;
				c.fillRect( i * 10 , h2 * 3/2 , 8, -this.oldRadioData[i] );

				// lower the floppy
				this.floppiez[i] += this.fallspeed[i];
				this.fallspeed[i] += 0.01;
				if(this.floppiez[i] > h2 * 3/2)	// do not allow floppy to fall under bar
					continue;
				c.fillRect(i * 10, this.floppiez[i], 8, 2);
			}
		}
	}

}

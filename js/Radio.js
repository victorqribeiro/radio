class Radio {

	constructor(){
		this.player = new Audio();
		this.player.src = 'http://ice1.somafm.com/indiepop-128-mp3';
		this.player.preload = 'auto';
		this.player.crossOrigin = 'anonymous';
		this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
		this.analyser = this.audioContext.createAnalyser();
		this.analyser.fftSize = 1024;
		this.bufferLength = this.analyser.frequencyBinCount;
		this.data = new Uint8Array(this.bufferLength);
		this.analyser.getByteTimeDomainData(this.data);
		this.source = this.audioContext.createMediaElementSource( this.player );
		this.source.connect( this.analyser );
		this.source.connect( this.audioContext.destination );
	}
	
	togglePlay(){
		if( this.player.paused ){
			this.player.play();
		}else{
			this.player.pause();
		}
	}
	
	update(){
		this.bufferLength = this.analyser.frequencyBinCount;
		this.data = new Uint8Array(this.bufferLength);
		this.analyser.getByteTimeDomainData(this.data);
	}

}

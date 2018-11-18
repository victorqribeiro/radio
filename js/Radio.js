class Radio {

	constructor(){
		this.player = new Audio();
		this.playlist = [{name: 'Top 40', src: 'http://uk7.internet-radio.com:8226/stream'},
										 {name: 'Box UK', src: 'http://212.83.150.15:8189/stream?type=http&nocache=112476'},
										 {name: 'Dance UK', src: 'http://212.83.150.15:8022//stream?type=http&nocache=112476'}];
		this.player.src = this.playlist[0].src;
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

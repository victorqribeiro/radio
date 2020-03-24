class Radio {

	constructor(){
		this.player = new Audio();
		this.playlist = [/*{name: 'Box UK', slug: 'boxuk', src: 'http://192.227.85.169:6191/stream'},*/
										 {name: 'Classic Rock Florida HD', slug: 'classicrockflorida', src: 'http://198.58.98.83:8258/stream'},
										 {name: 'She Radio', slug: 'sheradio', src: 'http://airspectrum.cdnstream1.com:8136/1139_128'},
										 {name: 'Rock And Roll Channel', slug: 'rockandrollchannel', src: 'http://uk2.internet-radio.com:8054/stream'},
										 {name: 'Nightwave Plaza', slug: 'nightwave', src: 'http://radio.plaza.one/mp3'},
				 						 /*{name: 'Brokenbeats', slug: 'brokenbeats', src: 'https://stream.brokenbeats.net/tune'}*/
										];
		this.player.src = this.playlist[0].src;
		this.player.preload = 'auto';
		this.player.crossOrigin = 'anonymous';
		this.canPlay = false;
	}
	
	init(){
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
		if(!this.canPlay){
			this.init();
			this.canPlay = true;
		}
		if( this.player.paused ){
			this.audioContext.resume();
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

class Animation04 {

	constructor(){
		this.context = 'webgl';
		if(radio.canPlay){
			radio.analyser.fftSize = 32;
			radio.update();
		}
		this.rotation = Math.random();
		this.shapes = [
			{
	  	posItemSize: 3,
	  	posNumItems: 24,
	  	colItemSize: 4,
	  	colNumItems: 24,
	  	indItemSize: 1,
	  	indNumItems: 36,
			colors: 96,
			indices: [
				0,  1,  2, 0,  2,  3,    
				4,  5,  6, 4,  6,  7,    
				8,  9,  10, 8,  10, 11,   
				12, 13, 14, 12, 14, 15,   
				16, 17, 18, 16, 18, 19,  
				20, 21, 22, 20, 22, 23,   
			],
			data: [
				-1.0, -1.0,  1.0,
				 1.0, -1.0,  1.0,
				 1.0,  1.0,  1.0,
				-1.0,  1.0,  1.0,
				-1.0, -1.0, -1.0,
				-1.0,  1.0, -1.0,
				 1.0,  1.0, -1.0,
				 1.0, -1.0, -1.0,
				-1.0,  1.0, -1.0,
				-1.0,  1.0,  1.0,
				 1.0,  1.0,  1.0,
				 1.0,  1.0, -1.0,
				-1.0, -1.0, -1.0,
				 1.0, -1.0, -1.0,
				 1.0, -1.0,  1.0,
				-1.0, -1.0,  1.0,
				 1.0, -1.0, -1.0,
				 1.0,  1.0, -1.0,
				 1.0,  1.0,  1.0,
				 1.0, -1.0,  1.0,
				-1.0, -1.0, -1.0,
				-1.0, -1.0,  1.0,
				-1.0,  1.0,  1.0,
				-1.0,  1.0, -1.0,
				]
			},
			{
	  	posItemSize: 3,
	  	posNumItems: 12,
	  	colItemSize: 4,
	  	colNumItems: 12,
			colors: 48,
			data: [
				 0.0,  1.0,  0.0,
				-1.0, -1.0,  1.0,
				 1.0, -1.0,  1.0,
				 0.0,  1.0,  0.0,
				 1.0, -1.0,  1.0,
				 1.0, -1.0, -1.0,
				 0.0,  1.0,  0.0,
				 1.0, -1.0, -1.0,
				-1.0, -1.0, -1.0,
				 0.0,  1.0,  0.0,
				-1.0, -1.0, -1.0,
				-1.0, -1.0,  1.0
  			]
  		}
		];
		this.shape = this.shapes[Math.floor(Math.random()*this.shapes.length)];
		this.vertexShader = `
		  attribute vec4 aVertexPosition;
		  attribute vec4 aVertexColor;
		  uniform mat4 uModelViewMatrix;
		  uniform mat4 uProjectionMatrix;
		  varying lowp vec4 vColor;
		  void main(void) {
		    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
		    vColor = aVertexColor;
		  }
		`;
		this.fragmentShader = `
		  varying lowp vec4 vColor;
		  void main(void) {
		    gl_FragColor = vColor;
		  }
		`;
		this.buffers = this.initBuffers();
		this.shaderProgram = this.initShaderProgram();
		this.programInfo = {
		  program: this.shaderProgram,
		  attribLocations: {
		    vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
		    vertexColor: gl.getAttribLocation(this.shaderProgram, 'aVertexColor'),
		  },
		  uniformLocations: {
		    projectionMatrix: gl.getUniformLocation(this.shaderProgram, 'uProjectionMatrix'),
		    modelViewMatrix: gl.getUniformLocation(this.shaderProgram, 'uModelViewMatrix'),
		  },
		};
		this.buffers = this.initBuffers(gl);
	}
	
	initShaderProgram(){
	  const vertexShader = this.loadShader(gl.VERTEX_SHADER, this.vertexShader);
		const fragmentShader = this.loadShader(gl.FRAGMENT_SHADER, this.fragmentShader);

		const shaderProgram = gl.createProgram();
		gl.attachShader(shaderProgram, vertexShader);
		gl.attachShader(shaderProgram, fragmentShader);
		gl.linkProgram(shaderProgram);

		if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
		  console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
		  return null;
		}

		return shaderProgram;
	}
	
	loadShader(type, source) {
		const shader = gl.createShader(type);

		gl.shaderSource(shader, source);

		gl.compileShader(shader);

		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
		  console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
		  gl.deleteShader(shader);
		  return null;
		}

		return shader;
	}
	
	initBuffers(){
		const positionBuffer = gl.createBuffer();
  	positionBuffer.itemSize = this.shape.posItemSize;
  	positionBuffer.numItems = this.shape.posNumItems;
		gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.shape.data), gl.STATIC_DRAW);

		let colors = [];

		for (let j = 0; j < this.shape.colors; j++) {
			colors.push( Math.random() );
		}

		const colorBuffer = gl.createBuffer();
		colorBuffer.itemSize = this.shape.colItemSize;
		colorBuffer.numItems = this.shape.colNumItems;
		gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

		const indexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
			  new Uint16Array(this.shape.indices), gl.STATIC_DRAW);

		return {
			position: positionBuffer,
			color: colorBuffer,
			indices: indexBuffer,
		};
			
	}
	
	show(){
		gl.clearColor(0.0, 0.0, 0.0, 1.0);
		gl.clearDepth(1.0);
		gl.enable(gl.DEPTH_TEST);
		gl.depthFunc(gl.LEQUAL);

		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		const fieldOfView = 45 * Math.PI / 180;
		const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
		const zNear = 0.1;
		const zFar = 100.0;
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

		const modelViewMatrix = mat4.create();
		
		let v = radio.data[radio.data.length>>1]/128;

		mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -12.0+v]);
		
		let rot = this.shape.indices ? [0,0,1] : [0,1,0];
		
		mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation, rot);
		       
		mat4.rotate(modelViewMatrix, modelViewMatrix, this.rotation * .7, [0, 1, 0]);

		  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
		  gl.vertexAttribPointer(
		      this.programInfo.attribLocations.vertexPosition,
		      this.shape.posItemSize,
		      gl.FLOAT,
		      false,
		      0,
		      0);
		  gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexPosition );

		  gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
		  gl.vertexAttribPointer(
		      this.programInfo.attribLocations.vertexColor,
		      this.shape.colItemSize,
		      gl.FLOAT,
		      false,
		      0,
		      0);
		  gl.enableVertexAttribArray( this.programInfo.attribLocations.vertexColor );

		if(this.shape.indices){
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices);
		}

		gl.useProgram(this.programInfo.program);

		gl.uniformMatrix4fv(
		    this.programInfo.uniformLocations.projectionMatrix,
		    false,
		    projectionMatrix);
		gl.uniformMatrix4fv(
		    this.programInfo.uniformLocations.modelViewMatrix,
		    false,
		    modelViewMatrix);

		if(this.shape.indices){
		
			gl.drawElements(gl.TRIANGLES, this.shape.indNumItems, gl.UNSIGNED_SHORT, 0);
			
		}else{
			
			gl.drawArrays(gl.TRIANGLES, 0, this.shape.posNumItems);
					
		}

		this.rotation += 0.01;
	}

}

var video;
(function (video) {
	var Screen = (function () {



        function Screen(cpu, canvas, width, height) {
		this.width = width;
		this.height = height;
		var gl = WebGLUtils.setupWebGL(canvas /* ,{antialias:false} */);
		gl.viewport(-(gl.drawingBufferWidth), -(gl.drawingBufferHeight), 2.0*(gl.drawingBufferWidth), 2.0*(gl.drawingBufferHeight));

		this.gl = gl;
		this.textureVideoMemory = 0;
		this.textureBitTest = 1;
		//this.transparent = transparent;
		//this.fillColor = fillColor;
		this.canvas = canvas;
		this.cpu = cpu;
		//this.imageData = this.canvas.createImageData(width, height);
		this.bg = 0xFFFF00FF;
		this.fg = 0xFF00FF00;
		this.vmem = null;
		
		this.vertexShader = this.loadShader("screen3d.vs");
		this.fragmentShader = this.loadShader("screen3d.fs");

		this.compileShaders(this.vertexShader, this.fragmentShader);

		this.mapMemory( cpu.ram.buffer, 0x2400 + cpu.ram.byteOffset, 7168 );
		var loc = this.gl.getUniformLocation(this.prog, "operation");
		this.attrOperation = loc;
		this.gl.useProgram(this.prog);
		this.gl.uniform1i(loc, 0);
		this.gl.uniform4f(this.gl.getUniformLocation(this.prog, "background"),0.0, 0.0, 0.0, 1.0);
		this.createVertexArray();
		
		// this.data32 = new Uint32Array(this.imageData.data.buffer);

		//this.canvas.fillStyle = css_color(this.bg);
		//this.canvas.strokeStyle = css_color(this.fg);
        }

	Screen.prototype.rttFB = null;
	Screen.prototype.rttTex = null;
	Screen.prototype.vmem = null;
	Screen.prototype.vmemTexture = null;
	Screen.prototype.vArray = null;
	Screen.prototype.attrOption = -1;
	Screen.prototype.prog = null;

	Screen.prototype.compileShaders = function(vertexShader, fragmentShader){
		var gl = this.gl;
		var prog = gl.createProgram();
		var vs = gl.createShader(gl.VERTEX_SHADER);
		gl.shaderSource(vs, vertexShader);
		gl.compileShader(vs);
		if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS))
			throw gl.getShaderInfoLog(vs);
		gl.attachShader(prog,vs);
		var fs = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(fs,fragmentShader);
		gl.compileShader(fs);
		if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS))
			throw gl.getShaderInfoLog(fs);
		gl.attachShader(prog,fs);
		gl.linkProgram(prog);
		if(!gl.getProgramParameter(prog,gl.LINK_STATUS))
			throw "Shader program failed to link."
		this.prog = prog;
	}

	Screen.prototype.createVertexArray = function()
	{
		var gl = this.gl;
		var buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
		var minx = 0.0;
		var maxx = 1.0;
		var miny =0.0;
		var maxy = 1.0;
		var arr = [
			minx, miny,
			minx, maxy,
			maxx, miny,
			maxx, maxy
		];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		this.vArray = buffer;
	}

	Screen.prototype.mapMemory = function( buffer, byteOffset, byteLength ) {
		this.vmem = new Uint8Array( buffer, byteOffset, byteLength );
		var gl = this.gl;
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
//		gl.texImage2D( gl.TEXTURE_2D, 0, gl.ALPHA, 32, 224, 0, gl.ALPHA, gl.UNSIGNED_BYTE, null);
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 224*8, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		
		//gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		//gl.generateMipmap(gl.TEXTURE_2D);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
		// gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.vmemTexture = texture;
	}

	Screen.prototype.render = function(){
		this.copyScreen();
	}

	Screen.prototype.copyScreen = function() {
		var gl = this.gl;
		// bind the video memory texture
		gl.bindTexture(gl.TEXTURE_2D, this.vmemTexture);
		
		// copy the video memory to the texture
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 224*8, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, this.vmem );
//		gl.texSubImage2D( gl.TEXTURE_2D, 0, 0, 0, 1, 224*32, gl.ALPHA, gl.UNSIGNED_BYTE, this.vmem);
// 		gl.texSubImage2D( gl.TEXTURE_2D, 0, 0, 0, 32, 224, gl.ALPHA, gl.UNSIGNED_BYTE, this.vmem);
		
		gl.uniform1i(this.attrOperation,1);
		// draw the quad from (0.0, 0.0) to (1.0,1.0)
		gl.bindBuffer(gl.ARRAY_BUFFER,this.vArray );
		var attr = gl.getAttribLocation(this.prog, "pos");
		gl.enableVertexAttribArray(attr);
		gl.vertexAttribPointer(attr, 2, gl.FLOAT, gl.TRUE, 0, 0);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
		gl.enableVertexAttribArray(null);
		
		// this.render();
		// unbind the texture
		gl.bindTexture(gl.TEXTURE_2D, null);
	}

	Screen.prototype.initTexextureFB = function() {
		var gl = this.gl;
		this.rttFB = gl.createFramebuffer();
		this.gl.bindFramebuffer(gl.FRAMEBUFFER, this.rttFB);
		this.rttFB.width = this.width;
		this.rttFB.height = this.height;
		this.rttTex = gl.createTexture();

		var target = gl.TEXTURE_2D;

		gl.bindTexture(target, this.rttTex);

		gl.texParameteri(target, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(target, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(target);

		gl.texImage2D(target, 0, gl.RGBA, rttFramebuffer.width, rttFramebuffer.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		var renderbuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderbuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.rttFB.width, this.rttFB.height);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.rttTex, 0);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderbuffer);

		gl.bindTexture(target, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	}

	Screen.prototype.clear = function() {
		var gl = this.gl;
		gl.uniform1i(this.attrOperation,0);
		this.render();
	}

	Screen.prototype.draw = function() {
		var gl = this.gl;
		gl.uniform1i(this.attrOperation,1);
		this.render();
	}
	
	Screen.prototype.loadShader = function(url)
	{
		var shader = "";
		var req = this.getXMLHttpRequest();
		req.open("GET",url,false);
		req.send(null);
		if( req.status === 200)
			shader = req.responseText;
		return shader;
	}

	Screen.prototype.XMLHttpFactories = [
	    function () {return new XMLHttpRequest()},
	    function () {return new ActiveXObject("Msxml2.XMLHTTP")},
	    function () {return new ActiveXObject("Msxml3.XMLHTTP")},
	    function () {return new ActiveXObject("Microsoft.XMLHTTP")}
	];
	
	Screen.prototype.getXMLHttpRequest = function() {
		var xmlhttp = null;
		for (var i=0;i<this.XMLHttpFactories.length;i++) {
			try {
				xmlhttp = this.XMLHttpFactories[i]();
			}
			catch (e) {
				continue;
			}
	        break;
	    }
	    return xmlhttp;
	}

        return Screen;
    })();
    video.Screen = Screen;
})(video || (video = {}));



function make_bitlookup() {
	var arr = new Uint8Array( 2048 );

	for( var i=0; i<256; ++i )
	{
		for( var j=0; j<8; ++j )
		{
			var m = (1<<j);
			if(  (i & m) != 0 )
			{
				var index = i+j*256
				arr[index] = 255;
			}
		}
	}
	return arr;
}

var arr = make_bitlookup();

function bitSet(val, bit) {
	var index = val+(bit*256);
	return (arr[index] == 255);
}

function testit() {
	for( var i=0; i<256; ++i )
	{
		for( var j=0; j<8; ++j )
		{
			var m = (1<<j);
			// print( ((i & m) != 0) == bitSet(i,j) );
		}
	}
}

testit();

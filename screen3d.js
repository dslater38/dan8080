var video;
(function (video) {
	var Screen = (function () {

	function TRACE(str) {
		document.getElementById("output").innerHTML += str + "<br/>\n";
	}
		
        function Screen(cpu, canvas, width, height, cc) {
		this.width = width;
		this.height = height;
		var gl = WebGLUtils.setupWebGL(canvas );
		// gl.viewport(-(gl.drawingBufferWidth), -(gl.drawingBufferHeight), 2.0*(gl.drawingBufferWidth), 2.0*(gl.drawingBufferHeight));
		gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

		TRACE("MAX_TEXTURE_SIZE == " + gl.getParameter(gl.MAX_TEXTURE_SIZE) );
		var vp = gl.getParameter(gl.VIEWPORT);
		TRACE("VIEWPORT == " + [vp[0], vp[1], vp[2], vp[3]]);
		TRACE("VERSION == " + gl.getParameter(gl.VERSION) );
		TRACE("VENDOR == " + gl.getParameter(gl.VENDOR) );
		TRACE("UNPACK_ALIGNMENT == " + gl.getParameter(gl.UNPACK_ALIGNMENT) );
		TRACE("TEXTURE_BINDING_2D == " + gl.getParameter(gl.TEXTURE_BINDING_2D) );
		TRACE("PACK_ALIGNMENT == " + gl.getParameter(gl.PACK_ALIGNMENT) );
		TRACE("MAX_RENDERBUFFER_SIZE == " + gl.getParameter(gl.MAX_RENDERBUFFER_SIZE) );
		TRACE("IMPLEMENTATION_COLOR_READ_FORMAT == " + gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_FORMAT) );
		TRACE("IMPLEMENTATION_COLOR_READ_TYPE == " + gl.getParameter(gl.IMPLEMENTATION_COLOR_READ_TYPE) );
		
		this.gl = gl;
		this.textureVideoMemory = 0;
		this.textureBitTest = 1;

		this.canvas = canvas;
		this.cpu = cpu;

		this.bg = 0xFFFF00FF;
		this.fg = 0xFF00FF00;
		this.vmem = null;
		
		var that = this;
		
		this.vertexShader = this.loadShader("screen3d.vs", function(responseText) {
			that.vertexShader =  responseText;
			that.loadShader("screen3d.fs", function(responseText) {
				that.fragmentShader = responseText;
				that.compileShaders(that.vertexShader, that.fragmentShader);
				var gl = that.gl;
				var prog = that.prog;
				that.mapMemory( cpu.ram.buffer, 0x2400 + cpu.ram.byteOffset, 7168 );
				
				var pos_loc = that.gl.getAttribLocation(that.prog, "pos");
				that.posLoc = pos_loc;
				that.gl.useProgram(prog);
				
				that.attrBG = gl.getUniformLocation(prog, "background");	
				that.attrSCORE = gl.getUniformLocation(prog, "score");
				that.attrMAIN = gl.getUniformLocation(prog, "main_");
				that.attrBUNKERS = gl.getUniformLocation(prog, "bunkers");
				that.attrPLAYER = gl.getUniformLocation(prog, "player");
				that.attrBASELINE = gl.getUniformLocation(prog, "baseline");
				that.attrRESERVES = gl.getUniformLocation(prog, "reserves");
				that.gl.uniform4f(that.attrBG,0.0, 0.0, 0.0, 1.0);
				that.createVertexArray();
				if( typeof(cc) == 'function' ) {
					cc();
				}
			});
		}
		);
		// this.fragmentShader = this.loadShader("screen3d.fs");

        }

	Screen.prototype.getHexColor = function(colorStr) {
	    var a = document.createElement('div');
	    a.style.color = colorStr;
	    var colors = window.getComputedStyle( document.body.appendChild(a) ).color.match(/\d+/g).map(function(a){ return parseInt(a,10); });
	    document.body.removeChild(a);
	    return (colors.length >= 3) ? '#' + (((1 << 24) + (colors[0] << 16) + (colors[1] << 8) + colors[2]).toString(16).substr(1)) : false;
	}	

	Screen.prototype.color2rgba = function(color) {
		
		if( color.charAt(0) != "#" )
			color = this.getHexColor(color);

		var clr = color.substring(1,7);
		var clr = parseInt("0xFF" + clr);
	
		return {
			r : ((clr & 0x0000000000FF0000) >> 16)/255.0,
			g : ((clr & 0x000000000000FF00) >> 8) / 255.0,
			b : (clr & 0x00000000000000FF) / 255.0,
			a :  ((clr>>24) & 0xFF) / 255.0
		};
	}
	
	Screen.prototype.vmem = null;
	Screen.prototype.vmemTexture = null;
	Screen.prototype.vArray = null;
	Screen.prototype.attrOption = -1;
	Screen.prototype.prog = null;

	Screen.prototype.setBackground = function(color) {
		var c = this.color2rgba(color);
		this.gl.uniform4f(this.attrBG, c.r, c.g, c.b, c.a);
	}

	Screen.prototype.setColors = function(score,main_,bunkers,player,baseline,reserves) {
		var c = this.color2rgba(score);
		this.gl.uniform4f(this.attrSCORE, c.r, c.g, c.b, c.a);
		c = this.color2rgba(main_);
		this.gl.uniform4f(this.attrMAIN, c.r, c.g, c.b, c.a);
		c = this.color2rgba(bunkers);
		this.gl.uniform4f(this.attrBUNKERS, c.r, c.g, c.b, c.a);
		c = this.color2rgba(player);
		this.gl.uniform4f(this.attrPLAYER, c.r, c.g, c.b, c.a);
		c = this.color2rgba(baseline);
		this.gl.uniform4f(this.attrBASELINE, c.r, c.g, c.b, c.a);
		c = this.color2rgba(reserves);
		this.gl.uniform4f(this.attrRESERVES, c.r, c.g, c.b, c.a);
	}
	
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
		var arr = new Float32Array([
			0, 0,
			0, 1,
			1, 0,
			1, 1
		]);
		gl.bufferData(gl.ARRAY_BUFFER, arr, gl.STATIC_DRAW);
		gl.enableVertexAttribArray(this.posLoc);
		gl.vertexAttribPointer(this.posLoc, 2, gl.FLOAT, gl.TRUE, 0, 0);
		
		this.vArray = buffer;
	}

	Screen.prototype.mapMemory = function( buffer, byteOffset, byteLength ) {
		this.vmem = new Uint8Array( buffer, byteOffset, byteLength );
		var gl = this.gl;
		var texture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, texture);
		var initBuffer = new Uint8Array( 16384 );
		gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, 64, 64, 0, gl.RGBA, gl.UNSIGNED_BYTE, initBuffer);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
//		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
//		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);		
		this.vmemTexture = texture;
	}

	Screen.prototype.render = function(){
		this.copyScreen();
	}

	Screen.prototype.copyScreen = function() {
		var gl = this.gl;
		// copy the video memory to the texture
		gl.texSubImage2D(gl.TEXTURE_2D, 0, 0, 0, 64, 28, gl.RGBA, gl.UNSIGNED_BYTE, this.vmem );	
		// draw the quad from (0.0, 0.0) to (1.0,1.0)
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	}

	Screen.prototype.draw = function() {
		var gl = this.gl;
		this.render();
	}
	
	Screen.prototype.loadShader = function(url, cc)
	{
		var shader = "";
		var req = this.getXMLHttpRequest();
		var isAsync = (typeof(cc) == 'function');
		req.open("GET",url,isAsync);
		if( isAsync ) {
			req.onreadystatechange = function() {
				if(req.readyState == 4)
					cc(req.response);
			}
			req.send();
		}else{
			req.send(null);
			if( req.status === 200)
				shader = req.responseText;
			return shader;
		}
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

var video;
(function (video) {
	var Screen = (function () {
	    
		function hexToRgb(hex) {
			// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
			var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthandRegex, function(m, r, g, b) {
				return r + r + g + g + b + b;
			});

			var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			return result ? {
				r: parseInt(result[1], 16),
				g: parseInt(result[2], 16),
				b: parseInt(result[3], 16)
			} : null;
		}
	
	function rgb2int( rgb ) {
		return (0xFF000000|rgb.b<<16|rgb.g<<8|rgb.r);
	}
	    
	function css_color(clr){
		var a = (clr >>24) & 0xFF;
		var r = (clr >>16)  & 0xFF;
		var g = (clr>>8)  & 0xFF;
		var b = clr & 0xFF;
		return "rgba(" + r.toString() + "," + g.toString() + "," + b.toString() + "," + a.toString() + ")";
	}
	
	function color2value( color ) {
		var canvas = document.createElement("canvas");
		canvas.width = 10;
		canvas.height = 10;
		var ctx = canvas.getContext('2d');
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 10, 10);
		var imageData = ctx.getImageData(0, 0, 10, 10);
		var data = imageData.data;
		var arr = new Uint32Array(data.buffer);
		return arr[0];
		//~ var r = data[0];
		//~ var g = data[1];
		//~ var b = data[2];
		//~ var a = data[3];
		//~ return ((a<<24)|(r<<16)|(g<<8)|b);
	}

	
        function Screen(cpu, canvas, width, height, transparent, fillColor) {
		this.width = width;
		this.height = height;
		this.transparent = transparent;
		this.fillColor = fillColor;
		this.canvas = canvas;
		this.cpu = cpu;
		this.imageData = this.canvas.createImageData(width, height);
		this.bg = 0xFFFF00FF;
		this.fg = 0xFF00FF00;

		// var buffer = new ArrayBuffer(this.imageData.data.length );
		// this.data8 = new Uint8ClampedArray(buffer);
		this.data32 = new Uint32Array(this.imageData.data.buffer);
		
		this.canvas.fillStyle = css_color(this.bg);
		this.canvas.strokeStyle = css_color(this.fg);				
        }
	Screen.prototype.clear = function() {
		this.canvas.fillRect(0, 0, this.width, this.height);
	}
        Screen.prototype.render = function () {
		var a = 0;
		this.canvas.fillRect(0, 0, this.width, this.height);
		this.copyScreen();
        };
	Screen.prototype.setBackground = function(color) {
		// this.bg = rgb2int(hexToRgb(color));
		this.bg = color2value(color);
		this.canvas.fillStyle = color;// css_color(this.bg);
	}
	Screen.prototype.setForeground = function(color) {
		// this.fg = rgb2int(hexToRgb(color));
		this.fg = color2value(color);
		this.canvas.strokeStyle = color;// css_color(this.fg);				
	}
	
	Screen.prototype.RandomColor = function() {
		var r = (Math.floor(Math.random() * 256) + 0) & 0xFF;
		var g = (Math.floor(Math.random() * 256) + 0) & 0xFF;
		var b = (Math.floor(Math.random() * 256) + 0) & 0xFF;
		return 0xFF000000|r<<16|g<<8|b;
	}
	
        Screen.prototype.copyScreen = function () {
		var color = 0;
		var k = 0;
		var src;
		var vram;
		for(var j = 0; j < this.height; j++) {
			src = 0x2400 + (j << 5);
			k = 0;
			for(var i = 0; i < 32; i++) {
				// vram = this.cpu.memory[src];
				vram = this.cpu.ram.getUint8(src);
				src += 1;
				for(var b = 0; b < 8; b++) {
					color =  this.bg
					if(vram & 1) {
						color = this.fg
					}
					this.setPixel(this.data32, k, j, color);
					k++;
					vram = vram >> 1;
				}
			}
		}
		this.canvas.putImageData(this.imageData, 0, 0);
        };
        Screen.prototype.setPixel = function (imagedata, x, y, color) {
		var i = (y * this.width + x) ;
		imagedata[i] = color;
        };
        return Screen;
    })();
    video.Screen = Screen;    
})(video || (video = {}));
//@ sourceMappingURL=screen.js.map

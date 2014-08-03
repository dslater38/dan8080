var video;
(function (video) {
    var Screen = (function () {
        function Screen(cpu, canvas, width, height, transparent, fillColor) {
            this.width = width;
            this.height = height;
            this.transparent = transparent;
            this.fillColor = fillColor;
            this.canvas = canvas;
            this.cpu = cpu;
            this.canvas.fillRect(0, 0, width, height);
            this.imageData = this.canvas.createImageData(width, height);
        }
	Screen.prototype.clear = function() {
            this.canvas.fillRect(0, 0, this.width, this.height);
	}
        Screen.prototype.render = function () {
            var a = 0;
            this.canvas.fillRect(0, 0, this.width, this.height);
            this.copyScreen();
        };
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
                        color = 0xFF000000;
                        if(vram & 1) {
                            color = 0xFFFFFFFF;
                        }
                        this.setPixel(this.imageData, k, j, color);
                        k++;
                        vram = vram >> 1;
                    }
                }
            }
            this.canvas.putImageData(this.imageData, 0, 0);
        };
        Screen.prototype.setPixel = function (imagedata, x, y, color) {
            var i = (y * imagedata.width + x) * 4;
            imagedata.data[i++] = (color >> 16) & 0xFF;
            imagedata.data[i++] = (color >> 8) & 0xFF;
            imagedata.data[i++] = color & 0xFF;
            imagedata.data[i] = (color >> 24) & 0xFF;
        };
        return Screen;
    })();
    video.Screen = Screen;    
})(video || (video = {}));
//@ sourceMappingURL=screen.js.map

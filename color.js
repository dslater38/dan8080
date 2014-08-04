

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


var video;
(function(k){var l=function(){function g(a){return"rgba("+(a>>16&255).toString()+","+(a>>8&255).toString()+","+(a&255).toString()+","+(a>>24&255).toString()+")"}function h(a){var c=document.createElement("canvas");c.width=10;c.height=10;c=c.getContext("2d");c.fillStyle=a;c.fillRect(0,0,10,10);a=c.getImageData(0,0,10,10).data;return(new Uint32Array(a.buffer))[0]}function b(a,c,d,b,e,f){this.width=d;this.height=b;this.transparent=e;this.fillColor=f;this.canvas=c;this.cpu=a;this.imageData=this.canvas.createImageData(d,
b);this.bg=4294902015;this.fg=4278255360;this.vmem=null;this.mapMemory(a.ram.buffer,9216+a.ram.byteOffset,7168);this.data32=new Uint32Array(this.imageData.data.buffer);this.canvas.fillStyle=g(this.bg);this.canvas.strokeStyle=g(this.fg)}b.prototype.clear=function(){this.canvas.fillRect(0,0,this.width,this.height)};b.prototype.render=function(){this.copyScreen()};b.prototype.setBackground=function(a){this.bg=h(a);this.canvas.fillStyle=a};b.prototype.setForeground=function(a){this.fg=h(a);this.canvas.strokeStyle=
a};b.prototype.RandomColor=function(){var a=Math.floor(256*Math.random())+0&255,c=Math.floor(256*Math.random())+0&255,d=Math.floor(256*Math.random())+0&255;return 4278190080|a<<16|c<<8|d};b.prototype.rowColor=function(a){return 2>a?4294967040:3>a?4294967295:6>a?4278190335:8>a?4278255360:28>a?4294902015:4294901760};b.prototype.mapMemory=function(a,c,d){this.vmem=new Uint8Array(a,c,d)};b.prototype.copyScreen=function(){for(var a=0;a<this.width;++a)for(var c=a<<5,d=this.height+1,b=0;32>b;++b){var e=
this.rowColor(b),f=this.vmem[c];++c;this.setPixel(a,--d,f&1?e:this.bg);this.setPixel(a,--d,f&2?e:this.bg);this.setPixel(a,--d,f&4?e:this.bg);this.setPixel(a,--d,f&8?e:this.bg);this.setPixel(a,--d,f&16?e:this.bg);this.setPixel(a,--d,f&32?e:this.bg);this.setPixel(a,--d,f&64?e:this.bg);this.setPixel(a,--d,f&128?e:this.bg)}this.canvas.putImageData(this.imageData,0,0)};b.prototype.setPixel=function(a,c,b){this.data32[c*this.width+a]=b};return b}();k.Screen=l})(video||(video={}));

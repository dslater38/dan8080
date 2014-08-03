(function(_global){
	"use strict"
	
	var shim = {};
	  if (typeof(exports) === 'undefined') {
	    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
	      shim.exports = {};
	      define(function() {
		return shim.exports;
	      });
	    } else {
	      // gl-matrix lives in a browser, define its namespaces in global
	      shim.exports = typeof(window) !== 'undefined' ? window : _global;
	    }
	  }
	  else {
	    // gl-matrix lives in commonjs, define its namespaces in exports
	    shim.exports = exports;
	  }
	
	  (function(exports) {
		  
		var cpu8080 = {
			};
		
		cpu8080.create = function(memsize) {
			
			var ctx = this;
			//~ var cpu = {
				//~ cycles : 0,
				//~ instructions : []
				//~ };
			var cycles = 0;
			var instructions = [];
			var buffer = new ArrayBuffer( 12 );
			var regs = new DataView( buffer, 0, 12);
			var r8 = new Uint8Array( buffer, 0, 12);
			// var r16 = new Uint16Array( buffer, 0, 12 );
			
			var mem = new ArrayBuffer( memsize );
			var ram = new DataView( mem, 0, memsize );
			
			var interrupt_code=0;
			var interrupted = false;
			
			var executed = 0;
			var check = [ 0,0,0,195,49,6,205,17,33,195,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,26,119,35,19,5,194,201,205,205,33,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194,54,35,124,254,194 ];
			
			//   index of register in array buffer
				
			// encoding of register in instructions
			var eB = 0, eC = 1, eD = 2, eE = 3, eH = 4, eL = 5, e_HL_ = 6, eA = 7;
			// index_map[encoding] == index of register in r8
			// for example, r8[ index_map[eA] ] refers to the A register in r8
			// i.e. A == r8[ index_map[eA] ] == r8[ index_map[7] ] == r8[iA]
			var index_map = [3,     2,    5,    4,    7,   6,    6,      1 ];
			var reg_names = ["B", "C", "D", "E", "H", "L", "iHL", "A"];
			
			var iA = 1;
			var iF = 0;
			
			// 16-bit register encodings
			var eBC = 0, eDE = 1, eHL = 2, eSP = 3;
			// same as r8 above except for the 16-bit regs.
			var index16_map = [  2,    4,     6,     8,     10 ];
			var reg16_names = ["BC","DE","HL","SP","PC"];
			
			var iBC = index16_map[eBC];
			var iDE = index16_map[eDE];
			var iHL = index16_map[eHL];
			var iPC = 10;
			var iSP = 8;
			var iPSW = 0;
			
			// bit indices of the flags in F
			var iCF = 0x01;
			var iPF = 0x04;
			var iHF = 0x10;
			var iIF = 0x20;
			var iZF = 0x40;
			var iSF = 0x80;
			
			var flag_names = ["CF", "PF", "HF", "IF", "ZF", "SF"];
			var flag_indexes = [iCF, iPF, iHF, iIF, iZF, iSF];
			var condition_codes = [iZF, iZF, iCF, iCF, iPF, iPF, iSF, iSF]
			
			var i;
						
			function readImm8( ) {
				var p = regs.getUint16( iPC, true );
				regs.setUint16(iPC, p+1, true );
				return ram.getUint8(p);
			}
			
			function readImm16( ) {
				var p = regs.getUint16( iPC, true );
				regs.setUint16(iPC, p+2, true );
				return ram.getUint16(p, true);
			}
			
			function push16( val ) {
				var sp = regs.getUint16( iSP, true );
				sp -= 2;
				ram.setUint16( sp, val, true );
				regs.setUint16( iSP, sp, true );
			}
			
			function pop16() {
				var sp = regs.getUint16( iSP, true );
				var val = ram.getUint16( sp, true );
				sp += 2;
				regs.setUint16(iSP, sp, true );
				return val;
			}

			function reset() {
				for( var i=0; i<regs.byteLength; ++i )
					regs.setUint8(i, 0);
				for( var i=0; i<ram.byteLength; ++i )
					ram.setUint8(i, 0);
				cycles = 0;
			}

			function loadDDT( base_addr, hexstr ) {
				
			}
			
			function load( base_addr, prog ) {
				if( base_addr >=0 && base_addr < 65536 )
				{
					if( prog.length >0 && prog.length < (65536-base_addr) )
					{
						for( var i=0; i<prog.length; ++i )
						{
							ram.setUint8( base_addr+i, prog[ i ] );
						}
						return true;
					}
				}
				return false;
			}
		
			function step() {
				var code = readImm8();
				/////var p =  regs.getUint16( iPC, true );
				/////var code = ram.getUint8( p );
				
				//~ if( executed < check.length )
				//~ {
					//~ if( code != check[executed] )
					//~ {
						//~ DebugBreak();;
					//~ }
					//~ ++executed;
				//~ }
				++executed;
				//////++p;
				//////regs.setUint16( iPC, p, true );
				var exec = instructions[code];
				if( typeof( exec ) == 'function' )
				{
					exec();
					processInterrupt();
					return true;
				}
				return false;
			}

			function run() {
				for(;step();) {
				}
			}
		
			function processInterrupt() {
				if( r8[iF] & iIF )
				{
					if( interrupted )
					{
						// disable interrupts
						r8[iF] &= (~iIF);
						// reset interrupted 
						interrupted = false;
						var exec = instructions[interrupt_code];
						if( typeof( exec ) == 'function' )
						{
							exec();
						}
					}
				}
			}
		
			function interrupt( code ) {
				if( r8[iF] & iIF )
				{
					interrupted = true;
					interrupt_code = code;
					return true;
				}
				return false;
			}
			
			var cpu = {
				cycles : 0
				};

			var config = {
				writable: true,
				enumerable: true,
				configurable: true
			};
			var defineProperty = function(obj, name, value) {
				config.value = value;
				Object.defineProperty(obj, name, config);
			}
			
			defineProperty( cpu, "interrupt", function(code) {
				return interrupt(code);
			});
			
			defineProperty( cpu, "step", function() {
				step();
			});
			
			defineProperty( cpu, "run", function() {
				run();
			});
			
			defineProperty( cpu, "reset", function() {
				reset();
			});
			
			defineProperty( cpu, "load", function( base_addr, prog) {
				load( base_addr, prog);
			});
		
			// add memory			
			Object.defineProperty( cpu, "ram", {
				enumerable : true,
				get : function() {
					return  ram;
				}
			});
			
			function makeRegProp(name,  r ) {
				if( i == index_map[e_HL_] )
				{
					Object.defineProperty( cpu, name, {
						enumerable : true,
						get : function() {
							return  ram.getUint8( r8[ r ] );
						},
						set : function(val) {
							ram.setUint8(  r8[ r ],  val );
						}
					});
				}
				else
				{
					Object.defineProperty( cpu, name, {
						enumerable : true,
						get : function() {
							return r8[ r ];
						},
						set : function(val) {
							r8[ r ] = val;
						}
					});
				}
			}
			
			// add the registers to cpu as properties.
			for( i=0; i<reg_names.length; ++i )
			{
				makeRegProp(reg_names[i],  index_map[i] );
			}
			makeRegProp("F",  0 );
			
			function makeReg16Prop(name, rID ) {
				Object.defineProperty(cpu, name, {
					enumerable : true,
					get : function() {
						return regs.getUint16( rID, true );
					},
					set : function(val) {
						regs.setUint16( rID, val, true );
					}
				});
			}
			
			for( var i=0; i<reg16_names.length; ++i )
			{
				makeReg16Prop(reg16_names[i], index16_map[i]);
			}
			
			function makeFlagProp(name, flag ) {
				Object.defineProperty( cpu, name, {
					enumerable : true,
					get : function() {
						return  ((r8[iF] & flag) == flag);
					},
					set : function(val) {
						if( val )
							r8[iF] |= flag;
						else
							r8[iF] &= ~(flag);
					}
				});
			}
			
			for( var i =0; i<flag_names.length; ++i  )
			{
				makeFlagProp(flag_names[i], flag_indexes[i]);
			}

			
			
			var parityTable = [
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			];
			
			function ZF(v) {			
				if( v==0 )
					r8[iF] |= iZF;
				else
					r8[iF] &= ~(iZF);
			}
			
			function SF(v) {			
				if(  v<0 )
					r8[iF] |= iSF;
				else
					r8[iF] &= ~(iSF);
			}
			
			function CF(v) {			
				if(  (v & 0x0100) != 0 )
					r8[iF] |= iCF;
				else
					r8[iF] &= ~(iCF);
			}
			
			function getCF() {
				return ((r8[iF] & iCF) != 0);
			}
			
			function PF(v) {			
				if( parityTable[ (v & 0xFF) ] )
					r8[iF] |= iPF;
				else
					r8[iF] &= ~(iPF);
			}
			
			function HF(lhs, rhs, v ) {			
				if( (( ((rhs ^ v) ^ lhs) & 0x10 ) != 0) )
					r8[iF] |= iHF;
				else
					r8[iF] &= ~(iHF);
			}
				
				
			function setFlagsZSP(a) {

				var fl = r8[iF];
				
				if( a == 0 )
					fl |= iZF;
				else
					fl &= (~iZF);
				
				if( a & 0x80 )
					fl |= iSF;
				else
					fl &= (~iSF);
				
				if( parityTable[a] )
					fl |= iPF;
				else
					fl &= (~iPF);
							
				r8[iF] = fl;
			}
			
			function setFlagsZSPC(a) {
				var fl = r8[iF];
				
				if( a == 0 )
					fl |= iZF;
				else
					fl &= (~iZF);
				
				if( a & 0x80 )
					fl |= iSF;
				else
					fl &= (~iSF);
				
				if( parityTable[a] )
					fl |= iPF;
				else
					fl &= (~iPF);
				
				if( a > 255 )
					fl |= iCF;
				else
					fl &= (~iCF);
				
				r8[iF] = fl;
			}
			
			function make1ArgFcn(fcn, s ) {
				return fcn.bind(ctx, s );
			}
			
			function make2ArgFcn(fcn, d, s ) {
				return fcn.bind(ctx, d, s );
			}
			
			
			// NOP
			instructions[0x00] = function() { cycles += 4; }
			
			//~ function MOVR_HL_( s ) {
				//~ r8[ s ] = ram.getUint8( regs.getUint16( iHL, true ) );
			//~ }
			//~ function MOV_HL_R( d ) {
				//~ ram.setUint8( regs.getUint16( iHL, true ), r8[ d ] );
			//~ }
			
			//~ function MOV_R_R( d, s ) {
				//~ r8[d] = r8[s];
			//~ }
		
			
			//~ var prefix = 0x40;

			//~ for( var d = 0; d<8; ++d )
			//~ {
				//~ for( var s = 0; s<8; ++s )
				//~ {
					//~ if( d == e_HL_ && s == e_HL_ )	// MOV (HL),(HL) not allowed - would be a NOP enyway
						//~ continue;
					
					//~ var instruction = prefix | (d << 3) | s;
					
					//~ if( d == e_HL_ )
					//~ {
						//~ instructions[instruction] = make1ArgFcn( MOV_HL_R, index_map[s] );
					//~ }
					//~ else if ( s == e_HL_ )
					//~ {
						//~ instructions[instruction] = make1ArgFcn( MOVR_HL_, index_map[d] );
					//~ }
					//~ else
					//~ {
						//~ instructions[instruction] = make2ArgFcn( MOV_R_R, index_map[d], index_map[s] );
					//~ }
				//~ }
			//~ }
									
			// MOV ddd,sss - (0x40 | (ddd<<3)|sss
			// register byte offsets: A==0, B==2, C==3, D==4, E==5, H==6, L==7
			// 16-bit registers BC == 2, DE == 4, HL == 6, SP ==8, PC == 10
			instructions[0x40] = function() {  }     // MOV B, B == NOP
			instructions[0x41] = function() { r8[0x03] = r8[0x02]; }         // MOV B, C
			instructions[0x42] = function() { r8[0x03] = r8[0x05]; }         // MOV B, D
			instructions[0x43] = function() { r8[0x03] = r8[0x04]; }         // MOV B, E
			instructions[0x44] = function() { r8[0x03] = r8[0x07]; }         // MOV B, H
			instructions[0x45] = function() { r8[0x03] = r8[0x06]; }         // MOV B, L
			instructions[0x46] = function() { r8[0x03] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV B, m
			instructions[0x47] = function() { r8[0x03] = r8[0x01]; }         // MOV B, A
			instructions[0x48] = function() { r8[0x02] = r8[0x03]; }         // MOV C, B
			instructions[0x49] = function() {  }     // MOV C, C == NOP
			instructions[0x4a] = function() { r8[0x02] = r8[0x05]; }         // MOV C, D
			instructions[0x4b] = function() { r8[0x02] = r8[0x04]; }         // MOV C, E
			instructions[0x4c] = function() { r8[0x02] = r8[0x07]; }         // MOV C, H
			instructions[0x4d] = function() { r8[0x02] = r8[0x06]; }         // MOV C, L
			instructions[0x4e] = function() { r8[0x02] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV C, m
			instructions[0x4f] = function() { r8[0x02] = r8[0x01]; }         // MOV C, A
			instructions[0x50] = function() { r8[0x05] = r8[0x03]; }         // MOV D, B
			instructions[0x51] = function() { r8[0x05] = r8[0x02]; }         // MOV D, C
			instructions[0x52] = function() {  }     // MOV D, D == NOP
			instructions[0x53] = function() { r8[0x05] = r8[0x04]; }         // MOV D, E
			instructions[0x54] = function() { r8[0x05] = r8[0x07]; }         // MOV D, H
			instructions[0x55] = function() { r8[0x05] = r8[0x06]; }         // MOV D, L
			instructions[0x56] = function() { r8[0x05] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV D, m
			instructions[0x57] = function() { r8[0x05] = r8[0x01]; }         // MOV D, A
			instructions[0x58] = function() { r8[0x04] = r8[0x03]; }         // MOV E, B
			instructions[0x59] = function() { r8[0x04] = r8[0x02]; }         // MOV E, C
			instructions[0x5a] = function() { r8[0x04] = r8[0x05]; }         // MOV E, D
			instructions[0x5b] = function() {  }     // MOV E, E == NOP
			instructions[0x5c] = function() { r8[0x04] = r8[0x07]; }         // MOV E, H
			instructions[0x5d] = function() { r8[0x04] = r8[0x06]; }         // MOV E, L
			instructions[0x5e] = function() { r8[0x04] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV E, m
			instructions[0x5f] = function() { r8[0x04] = r8[0x01]; }         // MOV E, A
			instructions[0x60] = function() { r8[0x07] = r8[0x03]; }         // MOV H, B
			instructions[0x61] = function() { r8[0x07] = r8[0x02]; }         // MOV H, C
			instructions[0x62] = function() { r8[0x07] = r8[0x05]; }         // MOV H, D
			instructions[0x63] = function() { r8[0x07] = r8[0x04]; }         // MOV H, E
			instructions[0x64] = function() {  }     // MOV H, H == NOP
			instructions[0x65] = function() { r8[0x07] = r8[0x06]; }         // MOV H, L
			instructions[0x66] = function() { r8[0x07] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV H, m
			instructions[0x67] = function() { r8[0x07] = r8[0x01]; }         // MOV H, A
			instructions[0x68] = function() { r8[0x06] = r8[0x03]; }         // MOV L, B
			instructions[0x69] = function() { r8[0x06] = r8[0x02]; }         // MOV L, C
			instructions[0x6a] = function() { r8[0x06] = r8[0x05]; }         // MOV L, D
			instructions[0x6b] = function() { r8[0x06] = r8[0x04]; }         // MOV L, E
			instructions[0x6c] = function() { r8[0x06] = r8[0x07]; }         // MOV L, H
			instructions[0x6d] = function() {  }     // MOV L, L == NOP
			instructions[0x6e] = function() { r8[0x06] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV L, m
			instructions[0x6f] = function() { r8[0x06] = r8[0x01]; }         // MOV L, A
			instructions[0x70] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x03] ); }         // MOV m, B
			instructions[0x71] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x02] ); }         // MOV m, C
			instructions[0x72] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x05] ); }         // MOV m, D
			instructions[0x73] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x04] ); }         // MOV m, E
			instructions[0x74] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x07] ); }         // MOV m, H
			instructions[0x75] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x06] ); }         // MOV m, L
			instructions[0x77] = function() { ram.setUint8( regs.getUint16(0x06,true), r8[0x01] ); }         // MOV m, A
			instructions[0x78] = function() { r8[0x01] = r8[0x03]; }         // MOV A, B
			instructions[0x79] = function() { r8[0x01] = r8[0x02]; }         // MOV A, C
			instructions[0x7a] = function() { r8[0x01] = r8[0x05]; }         // MOV A, D
			instructions[0x7b] = function() { r8[0x01] = r8[0x04]; }         // MOV A, E
			instructions[0x7c] = function() { r8[0x01] = r8[0x07]; }         // MOV A, H
			instructions[0x7d] = function() { r8[0x01] = r8[0x06]; }         // MOV A, L
			instructions[0x7e] = function() { r8[0x01] = ram.getUint8( regs.getUint16(0x06, true) ); }       // MOV A, m
			instructions[0x7f] = function() {  }     // MOV A, A == NOP

			// MVI ddd - (0x00 | (ddd<<3)|0x06
			instructions[0x06] = function() { r8[0x03] = readImm8(); }      // MVI B, imm8
			instructions[0x0e] = function() { r8[0x02] = readImm8(); }      // MVI C, imm8
			instructions[0x16] = function() { r8[0x05] = readImm8(); }      // MVI D, imm8
			instructions[0x1e] = function() { r8[0x04] = readImm8(); }      // MVI E, imm8
			instructions[0x26] = function() { r8[0x07] = readImm8(); }      // MVI H, imm8
			instructions[0x2e] = function() { r8[0x06] = readImm8(); }      // MVI L, imm8
			instructions[0x36] = function() { ram.setUint8( regs.getUint16( 0x06, true ), readImm8() ); }   // MVI m, imm8
			instructions[0x3e] = function() { r8[0x01] = readImm8(); }      // MVI A, imm8			//~ function MVI_HL_() {
				//~ var imm = readImm8();
				//~ ram.setUint8( regs.getUint16( iHL, true ), imm );
			//~ }
			
			//~ function MVI_R( d ) {
				//~ r8[ d ] = readImm8();
			//~ }
			
			//~ prefix = 0x00;
			//~ for( var d = 0; d < 8; ++d )
			//~ {
				//~ var instruction = prefix | (d<<3) | 0x06;
				
				//~ if( d == e_HL_ )
				//~ {
					//~ instructions[instruction] = MVI_HL_;
				//~ }
				//~ else
					//~ instructions[instruction] = make1ArgFcn(MVI_R, index_map[d] );
			//~ }
			
			function LXI( d ) {
				regs.setUint16( d, readImm16(), true );
			}
			
			function makeLXI( d ) {
				return LXI.bind( ctx, d );
			}
			
			// prefix still == 0
			for( var d = 0; d <4; ++d )
			{
				var instruction = prefix | (d<<4) | 0x01;
				instructions[instruction] = makeLXI( index16_map[d] );
			}
			// LDA addr A <== ram[ addr ]
			instructions[0x3A] = function() {
				r8[iA] = ram.getUint8( readImm16() );
			}
			// STA addr ram[addr] <== A
			instructions[0x32] = function() {
				ram.setUint8( readImm16(), r8[iA] );
			}
			// LHLD addr HL <== ram[addr]
			instructions[0x2A] = function() {
				regs.setUint16( iHL, ram.getUint16( readImm16(), true ), true );
			}
			// SHLD addr ram[addr] <== HL
			instructions[0x22] = function() {
				ram.setUint16( readImm16(), regs.getUint16( iHL, true ), true );
			}
			
			function LDAX( s ) {
				r8[iA] = ram.getUint8( regs.getUint16( s, true ) );
			}
			function STAX( d ) {
				ram.setUint8( regs.getUint16( d, true ), r8[iA]);
			}
			
			// prefix still 0
			instructions[ prefix | (eBC<<4) | 0x0A ] = LDAX.bind( ctx, iBC );
			instructions[ prefix | (eDE<<4) | 0x0A ] = LDAX.bind( ctx, iDE );
			
			instructions[ prefix | (eBC<<4) | 0x02 ] = STAX.bind( ctx, iBC );
			instructions[ prefix | (eDE<<4) | 0x02 ] = STAX.bind( ctx, iDE );
			// XCHG
			instructions[ 0xEB] = function() {
				var tmp = regs.getUint16( iDE, true );
				regs.setUint16( iDE, regs.getUint16( iHL, true ) ,true );
				regs.setUint16( iHL, tmp, true );
			}

			function doADD( rhs ) {
				var lhs = r8[iA];
				var s = lhs+rhs;
				r8[iA] = s;
				setFlagsZSPC( s );
				HF( lhs, rhs, s);
			}
			
			
			// ADD A, r
			function ADD_HL_() {
				doADD( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ADD_R( s ) {
				doADD( r8[s] );
			}
			
			var prefix = 0x80;
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = ADD_HL_;
				else
					instructions[instruction] = make1ArgFcn(ADD_R, index_map[s]);
			}
			
			// ADI a, imm8
			prefix = 0xC0;
			instructions[ 0xC6 ] = function() {
				doADD( readImm8() );
			}
			
			prefix = 0x88;
			
			// ADC A, (HL)
			function ADC_HL_() {	
				doADD( ram.getUint8( regs.getUint16( iHL, true) )+ (getCF() ? 1 : 0) );
			}		

			// ADC A, r
			function ADC_R( s ) {
				doADD( r8[ s ]+ (getCF() ? 1 : 0) );
			}		
			
			
			// ADC A, r	
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] =  ADC_HL_;
				else
					instructions[instruction] = make1ArgFcn(ADC_R, index_map[s] );
			}
			// ACI
			instructions[ 0xCE ] = function() {
				doADD( readImm8() + (getCF() ? 1 : 0) );
			}
			

			function doSUB( rhs ) {
				var lhs = r8[iA];
				var s = lhs-rhs;
				r8[iA] = s;
				setFlagsZSPC( s );
				HF( lhs, rhs, s);
			}
			
			
			// SUB A, r
			function SUB_HL_( ) {
				doSUB( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function SUB_R( s ) {
				doSUB( r8[s] );
			}
			
			prefix = 0x90;
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = SUB_HL_;
				else
					instructions[instruction] = make1ArgFcn(SUB_R,index_map[s]);
			}
			
			// SUI a, imm8
			prefix = 0xC0;
			instructions[ 0xD6 ] = function() {
				doSUB( readImm8() );
			}
			
			prefix = 0x98;
			
			// SBB A, r
			
			
			// SBB A, r
			function SBB_HL_( ) {
				doSUB( ram.getUint8( regs.getUint16( iHL, true) ) + (getCF() ? 1 : 0) );
			}
			
			function SBB_R( s ) {
				doSUB( r8[s] + (getCF() ? 1 : 0) );
			}
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = SBB_HL_;
				else
					instructions[instruction] = make1ArgFcn(SBB_R,index_map[s]);
			}
			// SBI
			instructions[ 0xDE ] = function() {
				doSUB( readImm8() + (getCF() ? 1 : 0) );
			}
			
			
			function doINR( v ) {
				++v;
				setFlagsZSP(v);
				if( (v & 0x0F) != 0 )
					r8[iF] |= iHF;
				else
					r8[iF] &= (~iHF);
				return v;
			}
			
			
			function INR_HL_() {
				var hl = regs.getUint16(iHL, true);		
				ram.setUint8(hl, doINR( ram.getUint8( hl ) ) );
			}

			function INR_R( d ) {
				r8[d] = doINR( r8[d] );
			}
		
			prefix = 0x04;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | (i<<3));
				if( i == e_HL_ )
					instructions[instruction] = INR_HL_;
				else
					instructions[instruction] = make1ArgFcn(INR_R,  index_map[i]);
			}


			
			function doDCR( v ) {
				--v;
				setFlagsZSP(v);
				if( (v & 0x0F) == 0 )
					r8[iF] |= iHF;
				else
					r8[iF] &= (~iHF);
				return v;
			}
			
			function DCR_HL_() {
				var hl = regs.getUint16(iHL, true);		
				ram.setUint8( hl, doDCR( ram.getUint8( hl ) ) );
			}

			function DCR_R( d ) {
				r8[d] = doDCR( r8[d] );
			}

			prefix = 0x05;

			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | (i<<3));
				if( i == e_HL_ )
					instructions[instruction] = DCR_HL_;
				else
					instructions[instruction] = make1ArgFcn(DCR_R, index_map[i]);
			}


			function INX(rp) {
				regs.setUint16( rp, (regs.getUint16(rp, true)+1), true );
			}

			prefix = 0x03;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( INX, index16_map[ i ] );
			}
			

			function DCX(rp) {
				regs.setUint16( rp , (regs.getUint16( rp, true )-1), true );
			}

			prefix = 0x0B;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( DCX,  index16_map[ i ] );
			}

			function DAD( rp ) {
				var sum = regs.getUint16( iHL, true ) + regs.getUint16( rp, true );
				if( sum > 65535 )
					r8[iF] |= iCF;
				else
					r8[iF] &= (~iCF);
					
			}
			
			prefix = 0x09;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( DAD, index16_map[ i ] );
			}

			
			// DAA
			instructions[0x27] = function() {
				
				if( ((r8[iA] & 0x0F) > 0x09 ) || (r8[iF] & iHF) )
				{
					r8[iA] += 6;
					r8[iF] |= iHF;
				}
				else
					r8[iF] &= ~iHF;
				
				if( (r8[iA] > 0x9F) || (r8[iF] & iCF) )
				{
					r8[iA] += 0x60;
					r8[iF] |= iCF;
				}
				else
					r8[iF] &= ~iCF;
				
				ZF(r8[iA]);
				SF(r8[iA]);
			}
			
			function doANA( rhs ) {
				var lhs = r8[iA];
				var s = lhs & rhs;
				setFlagsZSPC( s );		
				r8[iA] = (s & 0xFF);
				r8[iF] &= (~iHF);			
			}
		
			function ANA_HL_() {
				doANA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ANA_R( s ) {
				doANA( r8[ s ] );
			}
			
			prefix = 0xA0;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = ANA_HL_;
				else
					instructions[instruction] = make1ArgFcn(ANA_R, index_map[ i ]);
			}
					
			// ANI
			instructions[0xE6] = function() {
				doANA( readImm8() );
			}
			
			function doORA( rhs ) {
				var lhs = r8[iA];
				var s = lhs | rhs;
				setFlagsZSPC( s );		
				r8[iA] = (s & 0xFF);
				r8[iF] &= (~iHF);			
			}
		
			function ORA_HL_() {
				doORA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ORA_R( s ) {
				doORA( r8[ s ] );
			}
			
			
			prefix = 0xB0;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = ORA_HL_;
				else
					instructions[instruction] = make1ArgFcn(ORA_R, index_map[i]);
			}
			
			
			// ORI
			instructions[0xF6] = function() {
				doORA( readImm8() );
			}
			
			
			
			function XRA( r ) {
				var lhs = r8[iA];
				var rhs = (s!=e_HL_) ? r8[ index_map[s] ] : ram.getUint8( regs.getUint16( iHL, true) );
				var s = lhs ^ rhs;
				setFlagsZSPC( s );		
				r8[iA] = (s ^ 0xFF);
				r8[iF] &= (~iHF);			
			}
			
			function doXRA( rhs ) {
				var lhs = r8[iA];
				var s = lhs ^ rhs;
				setFlagsZSPC( s );		
				r8[iA] = (s & 0xFF);
				r8[iF] &= (~iHF);			
			}
		
			function XRA_HL_() {
				doXRA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function XRA_R( s ) {
				doXRA( r8[ s ] );
			}
			
			
			prefix = 0xA8;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = XRA_HL_;
				else
					instructions[instruction] = make1ArgFcn(XRA_R, index_map[i]);
			}
			
			
			// XRI
			instructions[0xEE] = function() {
				doXRA( readImm8() );
			}
			
			function doCMP( rhs ) {
				var cmp = ((r8[iA] - rhs) & 0xFF);
				
				var fl = r8[iF];
				if( (rhs != 0) && (cmp >= r8[iA]) )
					fl |= iCF;
				else
					fl &= (~iCF);
				
				if( (r8[iA] ^ rhs ^ cmp) & 0x10 )
					fl |= iHF;
				else
					fl &= (~iHF);
				
				if( cmp == 0 )
					fl |= iZF;
				else
					fl &= (~iZF);
				
				if( cmp & 0x80 )
					fl |= iSF;
				else
					fl &= (~iSF);
				
				r8[iF] = (fl & 0xFF);
				
				//~ var setf = 0;
				//~ var clrf = 0xFF;
				//~ if( (rhs != 0) && (cmp >= r8[iA]) )
					//~ setf |= iCF;
				//~ else
					//~ clrf ^= iCF;
				
				//~ if( (r8[iA] ^ rhs ^ cmp) & 0x10 )
					//~ setf |= iHF;
				//~ else
					//~ clrf ^= iHF;
				
				//~ if( cmp == 0 )
					//~ setf |= iZF;
				//~ else
					//~ clrf ^= iZF;
				
				//~ if( cmp & 0x80 )
					//~ setf |= iSF;
				//~ else
					//~ clrf ^= iSF;
				//~ r8[iF] |= setf;
				//~ r8[iF] &= clrf;
				
			}
			
			function CMP_HL_() {
				doCMP( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			
			function CMP_R( s ) {
				doCMP( r8[s] );
			}
			
			//~ // CMP S		
			//~ function CMP( s ) {
				//~ var rhs = (s!=e_HL_) ? r8[ index_map[s] ] : ram.getUint8( regs.getUint16( iHL, true) );
				//~ var cmp = ((r8[iA] - rhs) & 0xFF);
				
				
				
				//~ var fl = r8[iF];
				//~ if( (rhs != 0) && (cmp >= r8[iA]) )
					//~ fl |= iCF;
				//~ else
					//~ fl &= (~iCF);
				
				//~ if( (r8[iA] ^ rhs ^ cmp) & 0x10 )
					//~ fl |= iHF;
				//~ else
					//~ fl &= (~iHF);
				
				//~ if( cmp == 0 )
					//~ fl |= iZF;
				//~ else
					//~ fl &= (~iZF);
				
				//~ if( cmp & 0x80 )
					//~ fl |= iSF;
				//~ else
					//~ fl &= (~iSF);
				
				//~ r8[iF] = (fl & 0xFF);
				
				
				
				
				//~ var setf = 0;
				//~ var clrf = 0xFF;
				//~ if( (rhs != 0) && (cmp >= r8[iA]) )
					//~ setf |= iCF;
				//~ else
					//~ clrf ^= iCF;
				
				//~ if( (r8[iA] ^ rhs ^ cmp) & 0x10 )
					//~ setf |= iHF;
				//~ else
					//~ clrf ^= iHF;
				
				//~ if( cmp == 0 )
					//~ setf |= iZF;
				//~ else
					//~ clrf ^= iZF;
				
				//~ if( cmp & 0x80 )
					//~ setf |= iSF;
				//~ else
					//~ clrf ^= iSF;
				//~ r8[iF] |= setf;
				//~ r8[iF] &= clrf;
			//~ }
			
			
			
			prefix = 0xB8;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = CMP_HL_;
				else
					instructions[instruction] = make1ArgFcn(CMP_R, index_map[i]);
			}
			
			
			// CPI
			instructions[0xFE] = function() {
				doCMP( readImm8() );
			}
			
			// RLC
			instructions[0x07] =  function (  ) {
				var a = r8[iA];
				a = ((a<<1)|(a>>7));
				r8[iA] = a;

				if( a & 1 )
				{
					r8[iF] |= iCF;
					a |= 0x01;
				}
				else
				{
					r8[iF] &= (~iCF);
				}
			}		
			
			// RRC
			instructions[0x0F] =  function (  ) {
				var a = r8[iA];
				a = ((a>>1)|(a<<7));
				r8[iA] = a;
				
				if( a & 0x80 )
				{
					r8[iF] |= iCF;
					a |= 0x80;
				}
				else
				{
					r8[iF] &= (~iCF);
				}
			}
			
			
			// RAL
			instructions[0x17] =  function (  ) {
				var a = r8[iA];
				var carry = (r8[iF] & iCF);
				if( a & 0x80 )
				{
					r8[iF] |= iCF;
				}
				else
				{
					r8[iF] &= (~iCF);
				}
				a <<= 1;
				if( carry )
					a |= 0x01;
				r8[iA] = a;
			}		
			
			// RAR
			instructions[0x1F] =  function (  ) {
				var a = r8[iA];
				var carry = (r8[iF] & iCF);
				
				if( a & 0x01 )
				{
					r8[iF] |= iCF;
				}
				else
				{
					r8[iF] &= (~iCF);
				}
				a >>= 1;
				if( carry )
					a |= 0x80;
				r8[iA] = a;
			}
			
			
			// CMA
			instructions[0x2F] =  function (  ) {
				r8[iA] ^= 0xFF;
			}
			
			// CMC
			instructions[0x3F] =  function (  ) {
				r8[iF] ^= iCF;
			}
			
			// STC
			instructions[0x37] =  function (  ) {
				r8[iF] |= iCF;
			}
			
			// JMP lb hb
			instructions[0xC3] =  function (  ) {
				regs.setUint16( iPC, readImm16(), true );
			}
			
			function JMPTrue( bit ) {
				var addr = readImm16()
				if( r8[iF] & bit )
				{
					regs.setUint16( iPC, addr, true );
				}
			}
			
			function JMPFalse( bit ) {
				var addr = readImm16();
				if( !(r8[iF] & bit) )
				{
					regs.setUint16( iPC, addr, true );
				}
			}
			
			prefix = 0xC2;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( JMPFalse, condition_codes[ tF ]);
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( JMPTrue, condition_codes[ tT ] );
			}
			
			
			// CALL lb hb
			instructions[0xCD] = function() {
				var addr = readImm16();
				push16( regs.getUint16( iPC, true ) );
				regs.setUint16( iPC, addr, true );
				//var p = regs.getUint16( iPC, true );
				//var addr = ram.getUint16( p, true );
				//p += 2;
				//~ var sp = regs.getUint16( iSP, true );
				//~ ram.setUint16( sp, p, true);
				//~ sp -= 2;
				//~ regs.setUint16( iSP, sp, true );
				//~ p = addr;
				//~ regs.setUint16( iPC, p, true );
			}
			
			function CALLTrue( bit ) {
				if( r8[iF] & bit )
					instructions[0xCD]();
				else
					readImm16();
			}
			
			function CALLFalse( bit ) {
				if( !(r8[iF] & bit) )
					instructions[0xCD]();
				else
					readImm16();
			}
			
			prefix = 0xC4;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( CALLFalse, condition_codes[tF] );
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( CALLTrue, condition_codes[tT] );
			}
			
			
			// RET
			instructions[0xC9] = function() {
				var addr = pop16();
				regs.setUint16( iPC, addr, true );
				//~ var sp = regs.getUint16( iSP, true );
				//~ var addr = ram.getUint16( sp, true );
				//~ sp +=2 ;
				//~ regs.setUint16( iSP, sp, true);
				//~ regs.setUint16( iPC, addr, true );
			}
			
			
			function RETTrue( bit ) {
				if( r8[iF] & bit )
					instructions[0xC9]();
			}
			
			function RETFalse( bit ) {
				if( !(r8[iF] & bit) )
					instructions[0xC9]();
			}
			
			prefix = 0xC0;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( RETFalse, condition_codes[tF] );
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( RETTrue, condition_codes[tT] );
			}
			
			
			
			function RST( n ) {
				push16( regs.getUint16( iPC, true ) );
				var addr = n*8;
				regs.setUint16( iPC, addr, true);
				
				//~ var sp = regs.getUint16( iSP, true );
				//~ sp -= 2;
				//~ ram.setUint16( sp, regs.getUint16( iPC, true ), true );
				//~ regs.setUint16( iSP, sp, true );
				//~ var addr = n*8;
				//~ regs.setUint16( iPC, addr, true);
			}
			
			prefix = 0xC7;
			
			for( var i=0; i<8; ++i )
			{
				instructions[ prefix | (i<<3) ] = make1ArgFcn( RST, i );
			}
			
			
			// PCHL
			instructions[0xE9] = function() {
				regs.setUint16( iPC, regs.getUint16( iHL, true ), true );
			}
			
			function PUSH( r ) {
				push16( regs.getUint16( r, true ) );
				//~ var sp = regs.getUint16( iSP, true );
				//~ sp -= 2;
				//~ regs.setUint16( iSP, sp, true );
				//~ ram.setUint16( sp, regs.getUint16(  index16_map[r], true ), true );
			}
			
			prefix = 0xC5;
			
			for( var i=0; i<4; ++i )
			{
				if( i == eSP )
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, iPSW );
				else
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, index16_map[i] );
			}
			
			function POP( r ) {
				regs.setUint16( r, pop16(), true );
				/////var sp = regs.getUint16( iSP, true );
				/////sp += 2;
				/////regs.setUint16( iSP, sp, true );
				/////regs.setUint16( index16_map[r], ram.getUint16( sp, true ), true );
			}
			
			prefix = 0xC1;
			
			for( var i=0; i<4; ++i )
			{
				if( i == eSP )
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, iPSW );
				else
					instructions[prefix | (i<<4)] = make1ArgFcn( POP, index16_map[i] );
			}
			
			// XTHL
			instructions[0xE3] = function() {
				var sp = regs.getUint16( iSP, true );
				var tmp = ram.getUint16( sp, true );
				ram.setUint16( sp, regs.getUint16( iHL, true ), true );
				regs.setUint16( iHL, tmp, true );
			}
			
			// SPHL
			instructions[0xF9] = function() {
				regs.setUint16( iSP, regs.getUint16( iHL, true ), true );
			}
			
			
			// IN p
			instructions[0xDB] = function() {
				var port = readImm8();
				r8[iA] = 0;
			}
			
			
			// OUT p
			instructions[0xD3] = function() {
				var port = readImm8();
			}
			
			// EI
			instructions[0xFB] = function() {
				r8[iF] |= iIF;
			}
			
			// DI
			instructions[0xF3] = function() {
				r8[iF] |= iIF;
			}
			
			
			// HLT
			instructions[0x76] = function() {
				throw "HLT";
			}
			
			return cpu;
		}
		
		
	if(typeof(exports) !== 'undefined') {
	    exports.cpu8080 = cpu8080;
	}		
		
	  })(shim.exports);
})(this);

var cpu = cpu8080.create(65536);

// print( typeof( cpu.ram ) );
// print( typeof( cpu.ram.getUint8(0) ) );
//print( typeof( cpu.A ) );print(cpu.HL);
//print( typeof( cpu.BC ) );
//print( typeof( cpu.ram ) );


//cpu.B = 0x10;
//cpu.C = 0x20;

//print( cpu.B );
//print( cpu.C );
//print( cpu.BC );

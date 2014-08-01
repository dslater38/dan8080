function myUint16Array( buffer, byteOffset, length )
{
	var view = new DataView( buffer, byteOffset, length*2 );
	var c = this;
	
	Object.defineProperty( c, "length", {
		configurable: false,
		enumerable: true,
		value : length,
		writable: false
	});

	Object.defineProperty( c, "byteOffset", {
		configurable: false,
		enumerable: true,
		value : byteOffset,
		writable: false
	});

	Object.defineProperty( c, "buffer", {
		configurable: false,
		enumerable: true,
		value : buffer,
		writable: false
	});
	
	function makeArrayAccessor(idx) {
		Object.defineProperty( c, idx, {
		      'get': function() { return view.getUint16( idx*2, true) ; },
		      'set': function(v) { view.setUint16( idx*2, v, true); },
		      enumerable: true,
		      configurable: false			
		});
	}
	
	for( var i=0; i<length; i+=1 )
	{
		makeArrayAccessor(i);
	}
	
	this.subarray = function( begin, end )
	{
		if( end == undefined )
			end = this.length - 1;
		
		var length = end - begin;
		
		return new myUint16Array( buffer, 2*begin, length );
	}
}

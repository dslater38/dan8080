
function isLittleEndian() {
	var buf = new ArrayBuffer(2);
	new DataView(buf).setInt16(0, 256, true);
	return new Int16Array(buf)[0] === 256;
}


function makeR16( buffer, byteOffset, length ) {
	if( isLittleEndian() )
		return new Uint16Array( buffer, byteOffset, length );
	else
	{
		// manfacture a little endian Uint16Array out of a data view
		return new myUint16Array( buffer, byteOffset, length );
	}
}

function cpu( ) {
	
	var buffer = new ArrayBuffer(26);
	var r8 = new Uint8Array( buffer, 0, 8);
	var r16 = new DataView( buffer, 0, 4 );
	// var r16 = new Uint16Array( buffer, 0, 4 );
	
	var r8alt = new Uint8Array(  buffer, 8, 8 );
	var r16alt = new DataView( buffer, 8, 4 );
	// var r16alt = new Uint16Array( buffer, 8, 4);
	
	var r16sp = new DataView( buffer, 16, 5);
	
	var mem = new ArrayBuffer(65536);
	ram = new Uint8Array( buffer );
	
	var ports = [];
	
	function writePort( n, d )
	{
		if( typeof(ports[n]) == 'function' )
		{
			ports[n]( d );
		}
	}
	
	function attachPort( n, fcn ) {
		if( n < 0 || n > 255 )
			throw "Error: Illegal port"
		if( typeof(fcn) != 'function' )
			throw "Error: Bad port handler";
		
		ports[n] = fcn;
	}
	
	function MOV( dst, src ) {
		if(src == _HL_ )
		{
			r8[dst] = ram[src];
		}
		else
		{
			r8[dst] = r8[src];
		}
	}
	function OUT( p ) {
		writePort( p, r8[A] );
	}
}

var buf = new ArrayBuffer( 32 );
var arr = new Uint16Array( buf, 0, 16 );
// var arr = new myUint16Array( buf, 0, 16 );

arr[0] = 55;
arr[1] = 66;
arr[2] = 77;
arr[3] = 88;

var brr = arr.subarray(0, 2);

for( var i in brr )
	print( i.toString() + " === " + brr[i] );


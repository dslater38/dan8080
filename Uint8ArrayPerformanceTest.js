var size = 67108864;

var buffer = new ArrayBuffer( size*2 + 2);

var s2 = size*2;
var r16 = new Uint16Array(buffer);

var r8 = new Uint8Array(buffer);

var view = new DataView(buffer);

var val = 0xABCD;

var iX = 8;

var t0 = new Date().getTime();

for( var i=0; i<s2; ++i )
{
	val = r16[iX];
}

var t1 = new Date().getTime();

var t2 = new Date().getTime();

for( var i=0; i<s2; ++i )
{
	val = r16[0x08];
}

var t3 = new Date().getTime();




print( "iX took: " + (t1-t0).toString() );
print( "0x08 took: " + (t3-t2).toString() );



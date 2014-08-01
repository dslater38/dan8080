

var buffer = new ArrayBuffer(12);

var r8 = new Uint8Array( buffer );
var r16 = new Uint16Array( buffer );

for( var i=0; i<12; ++i )
{
	r8[i] = 0;
}

r16[0] = 0xABCD;

print( r8[0] );
print( r8[1] );

r8[0] = 255;
r8[1] = 0;

print( r8[0] );
print( r8[1] );

++(r8[0]);
++(r8[0]);

print( r8[0] );
print( r8[1] );
r8[1] = 1;
print( r16[0] );
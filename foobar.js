var arr = new Uint16Array( 20 );
// var r = new Uint8Array( 100 );

arr[5] = 32;

var foo = arr[5]++;

print( foo.toString());

print( arr[5].toString() );


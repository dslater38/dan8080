
function bitSet(val, bit) {
	var t = 1;
	for( var i=0; i<8; ++i ) {
		if( i>=bit) break;
		
		t = ((t*2)|0);
	}
	val = Math.floor(val / t);
	return ((val % 2) == 1);
}

function bitSet2(val, bit) {
	return ((val & (1<<bit)) != 0);
}

function rem(a,b) {
	var tmp = Math.floor(a/b);
	return a-(tmp*b);
}

for( var i=0; i<256; ++i ) {
	for( var j=0; j<8; ++j ) {
		if( bitSet(i,j) != bitSet2(i,j) ) {
			WScript.Echo("Error: i == " + i + " j == " + j);
		}
	}
}

WScript.Echo(rem(8,3));
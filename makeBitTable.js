
function makeBitTable() {
	var table = [];
	for(var i=0; i<256; ++i ) {
		var x = (i|0);
		bits = [];
		for( var bit =0; bit<8; ++bit ) {
			bits[bit] = (x&(1<<bit)) == 0 ? 0 : 1;
		}
		table[i] = bits;
	}
	return table;
}


var table = makeBitTable();

WScript.Echo(table.toString());
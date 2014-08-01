
function formatter() {
	this.buf = new ArrayBuffer(1);
	this.ar = new Uint8Array(this.buf);
	this.formatByte = function(v) {
		this.ar[0] = v;
		return this.ar[0].toString(16);
	}
}

function MOV( d, s ) {
	var f = new formatter();
	var code = 0x40 | (d<<3)|s
	var iD = index_map[d];
	var iS = index_map[s];
	var sD = "0x" + iD.toString(16);
	var sS = "0x" + iS.toString(16);
	var str = "instructions[0x" + code.toString(16) + "] = function() {\n";
	var re = "s/DST/sD/g|s/SRC/sD/g"
	var pattern;
	if( d == eHL )
	{
		pattern = "ram.setUint8( regs.getUint16(iHL,true), r[SRC] );"
	}
	else if( s == eHL )
	{
		pattern = "r[DST] = ram.getUint8( regs.getUint16(iHL, true) );
	}
	else
	{
		
		pattern = "r8[DST] = r8[SRC];"
		
		
	}
	str += pattern.replace(re);
	str += "\n}";
	return str;
}
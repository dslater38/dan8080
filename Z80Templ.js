
function formatter() {
	this.buf = new ArrayBuffer(2);
	this.ar = new Uint8Array(this.buf);
	this.ar16 = new Uint16Array(this.buf);
	
	function prefix( str, len ) {
		while(str.length < len )
			str = "0" + str;
		return "0x" + str;
	}
	
	this.formatByte = function(v) {
		return prefix((v & 0xFF).toString(16), 2);
	}
	
	this.formatUbyte = function(v) {
		this.ar[0] = v;
		return prefix(this.ar[0].toString(16), 2);
	}
	this.formatWord = function(v) {
		return prefix((v & 0xFFFF).toString(16), 4);
	}
	
	this.formatUword = function(v) {
		this.ar16[0] = v;
		return prefix(this.ar[0].toString(16), 4);
	}
}

var f = new formatter();
var endl = "\n";

function reg8(name, enc, index ) {
	this.name = name;
	this.enc = enc;
	this.index = index;
	this.ref = function() {
		var f = new formatter();
		return "this.r8[ " + f.formatUbyte( this.index ) + " ]";
	}
}

function reg16(name, enc, index ) {
	this.name = name;
	this.enc = enc;
	this.index = index;
	this.ref = function() {
		var f = new formatter();
		return "this.r16[ " + f.formatUbyte( this.index ) + " ]";
	}
}

var A = new reg8( "A", 0x07, 0x01 );
var B = new reg8( "B", 0x00, 0x03 );
var C = new reg8( "C", 0x01, 0x02 );
var D = new reg8( "D", 0x02, 0x05 );
var E = new reg8( "E", 0x03, 0x04 );
var H = new reg8( "H", 0x04, 0x07 );
var L = new reg8( "L", 0x05, 0x06 );

var _HL_ = new reg8( "(HL)", 0x06, 0x06 );
// special case for (HL) - treat it as a pseudo 8-bit register
_HL_.ref = function() {
	var f = new formatter();
	return "this.ram8[ this.r16[0x03] ]";
}

var imm8 = new reg8("imm8()", undefined, undefined ) ;
imm8.ref = function() {
	return "this.ram8[ (this.r16[0x05])++ ]";
}

var BC = new reg16("BC", 0x00, 0x01 );
var DE = new reg16("DE", 0x01, 0x02 );
var HL = new reg16("HL", 0x02, 0x03 );
var SP = new reg16("SP", 0x03, 0x04 );
var PC = new reg16("PC", undefined, 0x05);

var imm16 = {
	name : "imm16()"
};

imm16.ref = function() {
	return "this.ram.getUint16(this.r16[0x05], true)";
}
imm16.inc = function() {
	return "(this.r16[0x05]) += 2";
}



function Z80Templ() {
	var R81, R82
	this.MOV = function() { R81 = R82;	 /* MOV ARG1 ARG2 */ }

}

var replacements = function(r1, r2 ) {
	var repl = [
		{re : /R81/g, st : r1.ref() },
		{re : /R82/g, st : r2.ref() },
		{re : /ARG1/g, st : r1.name },
		{re : /ARG2/g, st : r2.name },
	];
	return repl;
}

var z = new Z80Templ();

var foo = replacements(A, E);


for( var i in b = [B, C, D, E, H, L, A] )
{
	var dst = b[i];
	for( var j in bb = [B, C, D, E, H, L, A] )
	{
		var src = bb[j];
		var foo = replacements(dst, src);
		var s = z.MOV.toString();
		for( var i in foo )
		{
			var o = foo[i];
			s = s.replace( o.re, o.st );
		}
		print("z80.prototype[" +f.formatUbyte(0x40|(dst.enc<<3)|src.enc) + "] = " + s);
	}
}



//print( z.MOV.toString().replace(/DST/g,"this.r8[0x01]").replace(/SRC/g,"this.r8[0x03]").replace(/ARG1/g,"A").replace(/ARG2/g,"E") );

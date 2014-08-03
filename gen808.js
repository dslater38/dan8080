
function formatter() {
	this.buf = new ArrayBuffer(1);
	this.ar = new Uint8Array(this.buf);
	this.formatByte = function(v) {
		this.ar[0] = v;
		var str = this.ar[0].toString(16);
		if( str.length == 1 )
			return "0x0" + str;
		else
			return "0x"+str;
	}
}


		
	// encoding of register in instructions
	var eB = 0, eC = 1, eD = 2, eE = 3, eH = 4, eL = 5, e_HL_ = 6, eA = 7;
	// index_map[encoding] == index of register in r8
	// for example, r8[ index_map[eA] ] refers to the A register in r8
	// i.e. A == r8[ index_map[eA] ] == r8[ index_map[7] ] == r8[ 0 ]
	var index_map = [3,     2,    5,    4,    7,   6,    6,      1 ];
	var reg_names = ["B", "C", "D", "E", "H", "L", "iHL", "A"];
	
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

// var index_map = [2,     3,    4,    5,    6,   7,    6,      0 ];

function enc2Str(enc) {
	var iR = index_map[enc];
	return  "0x" + iR.toString(16);
}

function iPrefix(code) {
	var sCode = code.toString(16);
	if( sCode.length == 1 )
		sCode = "0" + sCode;
	return "instructions[0x" + sCode + "] = function() { ";
}

function MOV( d, s ) {
	var f = new formatter();
	var code = 0x40 | (d<<3)|s
	//var iD = index_map[d];
	//var iS = index_map[s];
	var sD = enc2Str(d);
	var sS = enc2Str(s);
	var str = iPrefix(code);// "instructions[0x" + code.toString(16) + "] = function() { ";
	var reDST = /DST/;
	var reSRC = /SRC/;
	var pattern;
	if( d == e_HL_ )
	{
		pattern = "ram.setUint8( regs.getUint16(DST,true), r8[SRC] ); }\t // MOV m, iS"
	}
	else if( s == e_HL_ )
	{
		pattern = "r8[DST] = ram.getUint8( regs.getUint16(SRC, true) ); }\t // MOV iD, m";
	}
	else if( s == d )
	{
		// s== d is a NOP
		pattern = " }\t // MOV iD, iS == NOP"
	}
	else
	{
		
		pattern = "r8[DST] = r8[SRC]; }\t // MOV iD, iS"
		
	}
	str += pattern.replace("SRC",f.formatByte(sS)).replace("DST",f.formatByte(sD)).replace("iD",reg_names[d]).replace("iS",reg_names[s]);
//	str += " }";
	return str;
}




function MVI(d) {
	var f = new formatter();
	var code = 0x00 | (d<<3)|0x06;
	var sD = enc2Str(d);
	var str = iPrefix(code);// "instructions[0x" + code.toString(16) + "] = function() { ";
	var reDST = /DST/;
	var pattern;
	if( d == e_HL_ )
	{
		pattern = "ram.setUint8( regs.getUint16( 0x06, true ), readImm8() ); } \t// MVI m, imm8";
	}
	else
	{
		pattern = "r8[DST] = readImm8(); } \t// MVI sD, imm8";
	}
	str += pattern.replace("DST",f.formatByte(sD)).replace("sD",reg_names[d]);
	return str;
}

print("// MOV ddd,sss - (0x40 | (ddd<<3)|sss");
print("// register byte offsets: A==0, B==2, C==3, D==4, E==5, H==6, L==7" );
print("// 16-bit registers BC == 2, DE == 4, HL == 6, SP ==8, PC == 10\n\n");

for( var i=0; i<8; ++i )
	for( var j=0; j<8; ++j )
		{
			if( i == e_HL_ && j == e_HL_ )
				continue;
			print( MOV( i, j )  );
		}

print();
print("// MVI ddd - (0x00 | (ddd<<3)|0x06");
for( var i=0; i<8; ++i )
		print( MVI(i) );
		
		
		
function LXI( d ) {
	
}
		
		
		
		
		
		
		
		
		
		
		
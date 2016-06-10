"use strict";
"use asm";

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

// 8-bit register encodings in an instruction using 3 bits
// e_HL_ represents the indirect memory reference through (hl)
var eB = 0, eC = 1, eD = 2, eE = 3, eH = 4, eL = 5, e_HL_ = 6, eA = 7;

// index_map - this maps the register encodings above to
// the corresponding register index in the r8 Uint8Array
// index_map[encoding] == index of register in r8
// for example, r8[ index_map[eA] ] refers to the A register in r8
// i.e. A == r8[ index_map[eA] ] == r8[ index_map[7] ] == r8[ 0 ]
var index_map = [3,     2,    5,    4,    7,   6,    6,      1 ];

// the reg_names maps the register encodings to register names for use in generated comments
var reg_names = ["B", "C", "D", "E", "H", "L", "[HL]", "A"];


// 16-bit register pair encodings  in an instruction using 2 bits.
// Note: for PUSH & POP, encoding 3 represents PSW (AF) instead of SP
var eBC = 0, eDE = 1, eHL = 2, eSP = 3, ePSW=3,ePC=4;
// index16_map - this maps the 16-bit register pair encodings above to
// the corresponding register index in the regs DataView
// same as r8 above except for the 16-bit regs.
// for example, r16[ index16_map[eBC] ] refers to the BC register pair in regs
// i.e. BC == regs.getUint16( index16_map[eBC], true ) == regs.getUint16( index16_map[0], true ) == regs.getUint16( 2, true )
var index16_map = [  2,    4,     6,     8,     10 ];
// the reg16_names maps the register pair encodings to register pair names for use in generated comments
var reg16_names = ["BC","DE","HL","SP","PC"];


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

// convert an 8-bit register encoding into an index in the r8 array - integer is in hex format.
function enc2Str(enc) {
	var iR = index_map[enc];
	return  f.formatUbyte(iR);
}

// convert a 16-bit register pair encoding into an index in the regs DataView - integer is in hex format.
function enc2Str16(enc) {
	var iR = index16_map[enc];
	return  f.formatUword(iR);
}

// beginning of an instruction implementation.
function iPrefix(code) {
	return "instructions[" + f.formatUbyte(code) + "] = function() { ";
}

// MOV instruction generator
function MOV( d, s ) {
	var code = 0x40 | (d<<3)|s
	var iD = index_map[d];
	var iS = index_map[s];
	var sD = enc2Str(d);
	var sS = enc2Str(s);
	var str = iPrefix(code);// "instructions[0x" + code.toString(16) + "] = function() { ";
	var reDST = /DST/;
	var reSRC = /SRC/;
	var pattern;
	if( s == d )
	{
		// s== d is a NOP
		pattern = " }\t // MOV iD, iS == NOP"
	}
	else if( d == e_HL_ )
	{
		pattern = "ram.setUint8( regs.getUint16(DST,true), r8[SRC] ); }\t // MOV m, iS"
	}
	else if( s == e_HL_ )
	{
		pattern = "r8[DST] = ram.getUint8( regs.getUint16(SRC, true) ); }\t // MOV iD, m";
	}
	else
	{
		
		pattern = "r8[DST] = r8[SRC]; }\t // MOV iD, iS"
		
	}
	str += pattern.replace("SRC",f.formatUbyte(iS)).replace("DST",f.formatUbyte(iD)).replace("iD",reg_names[d]).replace("iS",reg_names[s]);

	return str;
}

function replaceReadImm8(str) {
	return str.replace( "readImm8()", "ram8[ (r16[iPC])++ ]" ).replace(/iPC/g, f.formatUbyte(index16_map[ePC]));
}

// MVI (move immediate ) instruction generator.
function MVI(d) {
	var code = (d<<3)|0x06;
	var iD = index_map[d];
	var sD = enc2Str(d);
	var str = iPrefix(code);
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
	str += replaceReadImm8(pattern.replace(/DST/g,f.formatUbyte(iD)).replace(/sD/g,reg_names[d]));
	return str;
}

// generate the MOV r8, r8 instructions
print("// MOV ddd,sss - (0x40 | (ddd<<3)|sss)");
print("// register byte offsets: A==0, B==2, C==3, D==4, E==5, H==6, L==7" );

for( var i=0; i<8; ++i )
{
	for( var j=0; j<8; ++j )
	{
		if( i == e_HL_ && j == e_HL_ )
			continue;
		print( MOV( i, j )  );
	}
}

// generate the MVI r8 db instructions
print();
print("// MVI ddd - ((ddd<<3)|0x06)");
for( var i=0; i<8; ++i )
{
	print( MVI(i) );
}
		
// the LXI instruction generator		
function LXI( d ) {
	var iD = index16_map[d];
	var code = (d<<4)|0x01;
	var str = iPrefix(code);
	var pattern = "regs.setUint16( DST, readImm16(), true ); } // LXI sD"
	return str + pattern.replace(/DST/g, f.formatUbyte(iD)).replace(/sD/g, reg16_names[d]);
}

// generate LDA instruction
print();
print("// LDA [imm16]");
function LDA() {
	var pattern = "instructions[0x3A] = function()  { r8[iA] = ram8[ readImm16() ]; }";
	return  pattern.replace(/iA/g, f.formatUbyte(index_map[eA]) );
}
print(LDA());

print("// STA [imm16]");
function STA() {
	var pattern = "instructions[0x32] = function()  { ram8[ readImm16() ] = r8[iA]; }"; 
	return pattern.replace(/iA/g, f.formatUbyte(index_map[eA]) );
}
// generate STA instruction

print("// LHLD addr HL <== ram[addr]");
function LHLD() {
	var pattern = "instructions[0x2A] = function()  { r16[iHL] = ram.getUint16( readImm16(), true ); }";
	return  pattern.replace(/iHL/g, f.formatUbyte(index16_map[eHL]));
}

print("// SHLD addr ram[addr] <== HL");
function SHLD() {
	var pattern = "instructions[0x22] = function()  { ram.setUint16( readImm16(), r16[ iHL], true ); }";
	return  pattern.replace(/iHL/g, f.formatUbyte(index16_map[eHL]));
}

function LDAX(rp) {
	var code = 0x0A|(rp<<4);
	var iD = index16_map[rp];
	var str = iPrefix(code);
	var pattern = "r8[iA] = ram.getUint8( regs.getUint16( SRC, true ) );  } // LDAX sD";
	return str + pattern.replace(/iA/g, f.formatUbyte( index_map[eA] ) ).replace(/SRC/g, f.formatUbyte(iD)).replace(/sD/g, reg16_names[rp]);
}

print();
print("// LDAX rp (rp<<4)|0x0A - Load A indirect through BC or DE");

print( LDAX(eBC) );
print( LDAX(eDE) );


function STAX(rp) {
	var code = 0x02|(rp<<4);
	var iD = index16_map[rp];
	var str = iPrefix(code);
	var pattern = "ram.setUint8( regs.getUint16( DST, true ), r8[iA]);  } // STAX sD";
	return str + pattern.replace(/iA/g, f.formatUbyte( index_map[eA] ) ).replace(/DST/g, f.formatUbyte(iD)).replace(/sD/g, reg16_names[rp]);
}

print();
print("// STAX rp (rp<<4)|0x0A - Load A indirect through BC or DE");

print( STAX(eBC) );
print( STAX(eDE) );

// XCHG
print("// XCHG");
function XCHG() {
	var pattern = "instructions[ 0xEB] = function() { r16[iDE] = r16[iHL] + ( r16[iHL] = r16[iDE], 0 );  }";
	return pattern.replace(/iDE/g,f.formatUbyte(index16_map[eDE])).replace(/iHL/g,f.formatUbyte(index16_map[eHL]));
}
print(XCHG());

//generate the LXI instructions. 
print();
print("// LXI rp - (rp<<4)|0x01)");
print("// 16-bit registers BC == 2, DE == 4, HL == 6, SP ==8, PC == 10\n\n");
for( var i=0; i<4; ++i )
	print( LXI(i) );


function ADD(s) {
	var code = 0x80|s;
	var iD = index_map[s];
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = SRC; " +
				"r8[iA] = lhs+rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// ADD iS";
	
	var repl = (s==e_HL_) ? "ram.getUint8( regs.getUint16(SRC, true) )".replace("SRC",f.formatUbyte(index_map[s])) : f.formatUbyte(index_map[s]);
	
	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA])).replace(/SRC/g, repl).replace("iS",reg_names[s]);
}

print("// ADD s - ((ddd<<3)|0x06)");
for( var i=0; i<8; ++i)
	print(ADD(i));

function ADI() {
	var code = 0xC6;
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = r8[readImm16()]; " +
				"r8[iA] = lhs+rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// ADI [imm16]";
	

	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA]));
}
print(ADI());

function ADC(s) {
	var code = 0x88|s;
	var iD = index_map[s];
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = SRC +  (getCF() ? 1 : 0); " +
				"r8[iA] = lhs+rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// ADC iS";
	
	var repl = (s==e_HL_) ? "ram.getUint8( regs.getUint16(SRC, true) )".replace("SRC",f.formatUbyte(index_map[s])) : f.formatUbyte(index_map[s]);
	
	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA])).replace(/SRC/g, repl).replace("iS",reg_names[s]);
}

print("// ADC s - ((ddd<<3)|0x06)");
for( var i=0; i<8; ++i)
	print(ADC(i));


function ACI() {
	var code = 0xCE;
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = r8[readImm16()] +  (getCF() ? 1 : 0); " +
				"r8[iA] = lhs+rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// ACI [imm16]";
	

	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA]));
}
print(ACI());







function SUB(s) {
	var code = 0x90|s;
	var iD = index_map[s];
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = SRC; " +
				"r8[iA] = lhs-rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// SUB iS";
	
	var repl = (s==e_HL_) ? "ram.getUint8( regs.getUint16(SRC, true) )".replace("SRC",f.formatUbyte(index_map[s])) : f.formatUbyte(index_map[s]);
	
	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA])).replace(/SRC/g, repl).replace("iS",reg_names[s]);
}

print("// SUB s - ((ddd<<3)|0x06)");
for( var i=0; i<8; ++i)
	print(SUB(i));

function SUI() {
	var code = 0xD6;
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = r8[readImm16()]; " +
				"r8[iA] = lhs-rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// SUI [imm16]";
	

	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA]));
}
print(SUI());

function SBB(s) {
	var code = 0x88|s;
	var iD = index_map[s];
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = SRC -  (getCF() ? 1 : 0); " +
				"r8[iA] = lhs-rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// SBB iS";
	
	var repl = (s==e_HL_) ? "ram.getUint8( regs.getUint16(SRC, true) )".replace("SRC",f.formatUbyte(index_map[s])) : f.formatUbyte(index_map[s]);
	
	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA])).replace(/SRC/g, repl).replace("iS",reg_names[s]);
}

print("// SBB s - ((ddd<<3)|0x06)");
for( var i=0; i<8; ++i)
	print(SBB(i));


function SBI() {
	var code = 0xDE;
	var str = iPrefix(code);
	var pattern =	str + " function() { " +
				"var lhs = r8[iA]; " +
				"var rhs = r8[readImm16()]  - (getCF() ? 1 : 0); " +
				"r8[iA] = lhs-rhs; " +
				"setFlagsZSPC( r8[iA] ); " +
				"HF( lhs, rhs, r8[iA]); } " +
				"// SBI [imm16]";
	

	return pattern.replace(/iA/g,f.formatUbyte(index_map[eA]));
}
print(SBI());


function INR(d) {
	var code = 0x04|(d<<3);
	var str = iPrefix(code);
	pattern = str + "function() { " +
				"++(DST) ;" +
				"setFlagsZSP(DST); " +
				"if( (DST & 0x0F) == 0 ) {r8[iF] |= iHF;} else {r8[iF] &= (~iHF);} ";
	
}









// generate the ADD s instructions
print();
for( var i=0; i<8; ++i )
{
	print( MVI(i) );
}

function bit(n) {
	ZF( r8[iA] & (1<<n) );
}

function set(n) {
	r8[iA] |= (1<<n);
}

function res(n) {
	r8[iA] &= ~(1<<n);
}

function RLC(d) {
	var a = r8[d];
	a = ((a<<1)|(a>>7));
	if( a & 1 )
	{
		r8[iF] |= iCF;
	}
	else
		r8[iF] &= ~iCF;
	r8[d] = a;
}

function RL(d)
{
	var a = r8[d];
	var c = (r8[iF] & iCF);
	
	if( a & 0x80 )
		r8[iF] |= iCF;
	else
		r8[iF] &= ~iCF;
	
	r8[d] = (((a<<1)&0xFF)|c);
}


function RRC(d) {
	var tmp = r8[d];
	var t = tmp & 0x01;
	tmp >>= 1;
	
	if( t )
	{
		r8[iF] |= iCF;
		tmp |= 0x80;
	}
	else
		r8[iF] &= ~iCF;
	r8[d] = tmp & 0xFF;
}

function RR(d)
{
	var tmp = r8[d];
	var t = tmp & 0x01;
	tmp >>= 1;
	if( r8[iF] & iCF )
		tmp |= 0x80;
	
	if( t )
	{
		r8[iF] |= iCF;
	}
	else
		r8[iF] &= ~iCF;
	r8[d] = tmp & 0xFF;
}

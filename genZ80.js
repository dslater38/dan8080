"use strict";

if( typeof(print) == 'undefined' && typeof(console)=='object' )
{
	global.print = function(str) { console.log('%s', str); }
}

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


var regs8 = [B, C, D, E, H, L, _HL_, A];
var regs16 = [BC, DE, HL, SP, PC];


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
var reg_names = ["B", "C", "D", "E", "H", "L", "(HL)", "A"];


// 16-bit register pair encodings  in an instruction using 2 bits.
// Note: for PUSH & POP, encoding 3 represents PSW (AF) instead of SP
var eBC = 0, eDE = 1, eHL = 2, eSP = 3, ePSW=3;
// index16_map - this maps the 16-bit register pair encodings above to
// the corresponding register index in the regs DataView
// same as r8 above except for the 16-bit regs.
// for example, r16[ index16_map[eBC] ] refers to the BC register pair in regs
// i.e. BC == regs.getUint16( index16_map[eBC], true ) == regs.getUint16( index16_map[0], true ) == regs.getUint16( 2, true )
var index16_map = [  1,    2,     3,     4,     5 ];
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

function enc2RegName(enc) {
	return reg_names[enc];
}

// beginning of an instruction implementation.
function iPrefix(code) {
	return "z80.prototype[" + f.formatUbyte(code) + "] = function() { ";
}

// MOV instruction generator
function MOV( d, s ) {
	var code = (0x40 | (d.enc<<3) | s.enc);
	
	var pattern = "[%code%] = function() { %dst% = %src%; } // MOV %d% %s%";
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/%dst%/g,d.ref()).replace(/%src%/g,s.ref()).replace(/%d%/g,d.name).replace(/%s%/g,s.name);
	return result;
}


// MVI (move immediate ) instruction generator.
function MVI(d) {
	var code = (0x06 | (d.enc<<3) );
	
	
	var pattern = "[%code%] = function() { %dst% = %src%; } // MVI %d%"
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/%dst%/g,d.ref()).replace(/%src%/g, imm8.ref()).replace(/%d%/g, d.name );
	
	return result;
}

// generate the MOV r8, r8 instructions
print("// MOV ddd,sss - (0x40 | (ddd<<3)|sss)");
print("// register byte offsets: A==0, B==2, C==3, D==4, E==5, H==6, L==7" );

for( var i in regs8 )
{
	var d = regs8[i];
	for( var j in regs8 )
	{
		var s = regs8[j];
		if( d.enc == e_HL_ && s.enc == e_HL_ )
			continue;
		print( "z80.prototype"+MOV(d, s) );
	}
}

// generate the MVI r8 db instructions
print();
print("// MVI ddd - ((ddd<<3)|0x06)");
// for( var i=0; i<8; ++i )
for( var i in regs8 )
{
	var d = regs8[i];
	print( "z80.prototype"+MVI(d) );
}
		
// the LXI instruction generator		
function LXI( d ) {
	
	var code = (0x01|(d.enc<<4));
	
	var pattern = "[%code%] = function() { %dst% = %src%; %inc_pc%; } // LXI %d%";
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/%dst%/g, d.ref()).replace(/%src%/g, imm16.ref()).replace(/%inc_pc%/g,imm16.inc()).replace(/%d%/g,d.name);
	
	return result;
}

//generate the LXI instructions. 
print();
print("// LXI rp - (rp<<4)|0x01)");
print("// 16-bit registers BC == 2, DE == 4, HL == 6, SP ==8, PC == 10\n\n");
for( var i=0; i<4; ++i )
{
	print("z80.prototype"+ LXI(regs16[i]) );
}

function LDAX(rp) {
	
	var code = (0x0A | (rp.enc<<4));
	
	var pattern = "[%code%] = function { %dst% = this.ram8[ %src% ]; // LDAX %s%";
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/%dst%/g, A.ref() ).replace( /%src%/g, rp.ref() ).replace(/%s%/g, rp.name);
	
	return result;
}

print();
print("// LDAX rp (rp<<4)|0x0A - Load A indirect through BC or DE");

print( "z80.prototype"+ LDAX(BC) );
print( "z80.prototype"+ LDAX(DE) );


function STAX(rp) {
	var code = (0x02 | (rp.enc<<4));
	
	var pattern = "[%code%] = function { this.ram8[ %dst% ] = %src%; // STAX %d%";
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/%src%/g, A.ref() ).replace( /%dst%/g, rp.ref() ).replace(/%d%/g, rp.name);
	
	return result;
}

print();
print("// STAX rp (rp<<4)|0x02 - Load A indirect through BC or DE");

print( "z80.prototype"+ STAX(BC) );
print( "z80.prototype"+ STAX(DE) );

function app(s,s1) {
	return s + "\n" + s1;
}

function zfTest(v) {
	var pattern = "if( %src%==0 ) { this.r8[0x00] |= %ZF% } else { this.r8[0x00] &= %nZF%; }";
	return pattern.replace(/%src%/g, v).replace(/%ZF%/g,f.formatUbyte(iZF)).replace( /%nZF%/g,f.formatUbyte( ((~iZF) & 0xFF) ));
}

function sfTest(v) {
	var pattern = "if( %src% & 0x80) { this.r8[0x00] |= %SF% } else { this.r8[0x00] &= %nSF%; }";
	return pattern.replace(/%src%/g, v).replace(/%SF%/g,f.formatUbyte(iSF)).replace( /%nSF%/g,f.formatUbyte( ((~iSF) & 0xFF) ));
}

function cfTest(v) {
	var pattern = "if( %src% >=0x0100 || %src% < 0 ) { this.r8[0x00] |= %CF% } else { this.r8[0x00] &= %nCF%; }";
	return pattern.replace(/%src%/g, v).replace(/%CF%/g,f.formatUbyte(iCF)).replace( /%nCF%/g,f.formatUbyte( ((~iCF) & 0xFF) ));
}

function pfTest(v) {
	var pattern = "if( parityTable[%src%] ) { this.r8[0x00] |= %PF% } else { this.r8[0x00] &= %nPF%; }";
	return pattern.replace(/%src%/g, v).replace(/%PF%/g,f.formatUbyte(iPF)).replace( /%nPF%/g,f.formatUbyte( ((~iPF) & 0xFF) ));
}

var ADD_T = function() {	// ADD A sSRC
	var lhs = regA;
	var rhs = SRC;
	var sum = lhs + rhs;
	regA = sum;
	
	if( sum == 0 )
	{
		FLAGS |= ZF;
		FLAGS &= nCF; 
		FLAGS &= nSF;
		FLAGS &= nHF;
	}
	else
	{
		FLAGS &= nZF;
		if( sum > 0x80 || sum < 0 )
			FLAGS |= CF;
		else
			FLAGS &= nCF;

		if( sum & 0x80 )
			FLAGS |= SF;
		else
			FLAGS &= nSF;
		
		if( parityTable[ lhs  ] )
			FLAGS |= PF;
		else
			FLAGS &= nPF;
		
		if( (( (((rhs) ^ sum) ^ (lhs)) & 0x10 ) != 0) )
			FLAGS |= HF;
		else
			FLAGS &= nHF;
	}
}

function replace_flags(str) {
	
	var flags = [
		{re1: /nCF/g, re2: /CF/g, idx: iCF },
		{re1: /nZF/g, re2: /ZF/g, idx: iZF },
		{re1: /nSF/g, re2: /SF/g, idx: iSF },
		{re1: /nPF/g, re2: /PF/g, idx: iPF },
		{re1: /nHF/g, re2: /HF/g, idx: iHF }
	];
		
	var result = str.replace(/FLAGS/g,"this.r8[0x00]");
	
	for( var i in flags )
	{
		var ff = flags[i];
		result = result.replace(ff.re1, f.formatUbyte(~(ff.idx) ) ).replace(ff.re2, f.formatUbyte(ff.idx) );
	}
	return result;
}

function ADD(s) {
	
	var code = (0x80|s.enc);
	
	var pattern = "[%code%] = " + ADD_T.toString();
	
	var result = pattern.replace(/%code%/g, f.formatUbyte(code)).replace(/regA/g, A.ref() ).replace( /sSRC/g, s.name).replace(/SRC/g,s.ref());
	result = replace_flags(result);
	
	return result;
}

for( var i in regs8 )
	print("z80.prototype" + ADD(regs8[i]) + endl);

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

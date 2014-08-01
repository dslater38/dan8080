"use strict";

if( print == undefined )
{
	var print = function(s)
	{
		WScript.Echo(s);
	}
}

function cpu(memio, interrupt)
{
	var buffer = new ArrayBuffer(12);
	this.regs8 = new Uint8Array( buffer );
	this.regs16 = new Uint16Array( buffer );
	
	var mem = new ArrayBuffer(65536);
	this.ram = new Uint8Array( buffer );
	
	this.regs16[ this.SP ] = 0xF000;
	this.regs16[ this.PC ] = 0;
	this.regs8[ this.F ] = 0;
}

cpu.prototype.A = 0;
cpu.prototype.F = 1;
cpu.prototype.B = 2;
cpu.prototype.C = 3;
cpu.prototype.D = 4;
cpu.prototype.E = 5;
cpu.prototype.H = 6;
cpu.prototype.L = 7;
cpu.prototype.AF = 0;
cpu.prototype.BC = 1;
cpu.prototype.DE = 2;
cpu.prototype.HL = 3;
cpu.prototype.SP = 4;
cpu.prototype.PC = 5;

cpu.prototype.setCarry = function() {this.regs8[this.F] |= 0x01; }
cpu.prototype.clrCarry = function() {this.regs8[this.F] &= 0xFE; }	// 0xFE = ~0x01
cpu.prototype.setSubtract = function() {this.regs8[this.F] |= 0x02; }
cpu.prototype.clrSubtract = function() {this.regs8[this.F] &= 0xFD; }	// 0xFD= ~0x02
cpu.prototype.setParity = function() { this.regs8[ this.F ] |= 0x04; }
cpu.prototype.clrParity = function() { this.regs8[ this.F ] &= 0xFB; } // 0xFB == ~0x04
cpu.prototype.setHCarry = function() { this.regs8[ this.F ] |= 0x10; }
cpu.prototype.clrHCarry = function() { this.regs8[ this.F ] &= 0xEF; } // 0xEF == ~0x10
cpu.prototype.setInterrupt = function() { this.regs8[ this.F ] |= 0x20; }
cpu.prototype.clrInterrupt = function() { this.regs8[ this.F ] &= 0xDF; } // 0xDF == ~0x20
cpu.prototype.setZero = function() { this.regs8[ this.F ] |= 0x40; }
cpu.prototype.clrZero = function() { this.regs8[ this.F ] &= 0xBF; } // 0xBF == ~0x40
cpu.prototype.setSign = function() { this.regs8[ this.F ] |= 0x80; }
cpu.prototype.clrSign = function() { this.regs8[ this.F ] &= 0x7F; } // 0x7F == ~0x80


cpu.prototype.doSignFlag = function( n )
{
	if( n & 0x80 )
		this.setSign();
	else
		this.clrSign();
}

cpu.prototype.doSignCarry = function( n )
{
	if( n & 0x100 )
		this.setCarry();
	else
		this.clrCarry();
}

cpu.prototype.parityTable = [
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
0,1,1,0,1,0,0,1,1,0,0,1,0,1,1,0,
1,0,0,1,0,1,1,0,0,1,1,0,1,0,0,1,
];

cpu.prototype.doParityFlag = function(n) {
	if( this.parityTable[ n& 0xFF ] )
		this.setParity();
	else
		this.clrParity();
}

cpu.prototype.doCarryFlag = function(n) {
	if( n & 0x100 )
		this.setCarry();
	else
		this.clrCarry();
}

cpu.prototype.doZeroFlag = function(n) {
	if( (n & 0xFF) == 0 )
		this.setZero();
	else
		this.clrZero();
}

cpu.prototype.doHalfCarry = function( lhs, rhs, v) {
	if( ((rhs ^ v) ^ lhs) & 0x10 )
		this.setHCarry();
	else
		this.clrHCarry();
}

cpu.prototype.LD8 = function( dst, src ) {
	this.regs8[ dst ] = this.regs8[ src ];
}

cpu.prototype.LD8M = function(reg, addr ) {
	this.regs8[ reg ] = this.ram[ addr ];
}

cpu.prototype.LDM8 = function(reg, addr ) {
	this.ram[ addr ] = this.regs8[ reg ];
}

cpu.prototype.LDI = function( reg ) {
	this.regs8[ reg ] = this.ram[ (this.regs16[this.PC])++ ];
}

cpu.prototype.LDIM = function( addr ) {
	this.ram[ addr ] = this.ram[ (this.regs16[this.PC])++ ];
}

cpu.prototype.incPC = function() {
	return (this.regs16[ this.PC ])++;
}

cpu.prototype.instructions = new Array();

cpu.prototype.instructions[0x7F] = function() { this.LD8( this.A, this.A ); }
cpu.prototype.instructions[0x78] = function() { this.LD8( this.A, this.B ); }
cpu.prototype.instructions[0x79] = function() { this.LD8( this.A, this.C ); }
cpu.prototype.instructions[0x7A] = function() { this.LD8( this.A, this.D ); }
cpu.prototype.instructions[0x7B] = function() { this.LD8( this.A, this.E ); }
cpu.prototype.instructions[0x7C] = function() { this.LD8( this.A, this.H ); }
cpu.prototype.instructions[0x7D] = function() { this.LD8( this.A, this.L ); }
cpu.prototype.instructions[0x7E] = function() { this.LD8M(this.A, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x0A] = function() { this.LD8M(this.A,  this.regs16[ this.BC ] ); }
cpu.prototype.instructions[0x1A] = function() { this.LD8M(this.A,  this.regs16[ this.DE ] ); }
cpu.prototype.instructions[0x3A] = function() { this.LD8M(this.A,  this.ram[ (this.regs16[this.PC])++ ] | ((this.ram[ (this.regs16[this.PC])++ ])<<8) ); }
cpu.prototype.instructions[0x47] = function() { this.LD8( this.B, this.A ); }


cpu.prototype.instructions[0x47] = function() { this.LD8( this.B, this.A ); }
cpu.prototype.instructions[0x40] = function() { this.LD8( this.B, this.B ); }
cpu.prototype.instructions[0x41] = function() { this.LD8( this.B, this.C ); }
cpu.prototype.instructions[0x42] = function() { this.LD8( this.B, this.D ); }
cpu.prototype.instructions[0x43] = function() { this.LD8( this.B, this.E ); }
cpu.prototype.instructions[0x44] = function() { this.LD8( this.B, this.H ); }
cpu.prototype.instructions[0x45] = function() { this.LD8( this.B, this.L ); }
cpu.prototype.instructions[0x46] = function() { this.LD8M(this.B, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x4F] = function() { this.LD8( this.C, this.A ); }
cpu.prototype.instructions[0x48] = function() { this.LD8( this.C, this.B ); }
cpu.prototype.instructions[0x49] = function() { this.LD8( this.C, this.C ); }
cpu.prototype.instructions[0x4A] = function() { this.LD8( this.C, this.D ); }
cpu.prototype.instructions[0x4B] = function() { this.LD8( this.C, this.E ); }
cpu.prototype.instructions[0x4C] = function() { this.LD8( this.C, this.H ); }
cpu.prototype.instructions[0x4D] = function() { this.LD8( this.C, this.L ); }
cpu.prototype.instructions[0x4E] = function() { this.LD8M(this.C, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x57] = function() { this.LD8( this.D, this.A ); }
cpu.prototype.instructions[0x50] = function() { this.LD8( this.D, this.B ); }
cpu.prototype.instructions[0x51] = function() { this.LD8( this.D, this.C ); }
cpu.prototype.instructions[0x52] = function() { this.LD8( this.D, this.D ); }
cpu.prototype.instructions[0x53] = function() { this.LD8( this.D, this.E ); }
cpu.prototype.instructions[0x54] = function() { this.LD8( this.D, this.H ); }
cpu.prototype.instructions[0x55] = function() { this.LD8( this.D, this.L ); }
cpu.prototype.instructions[0x56] = function() { this.LD8M(this.D, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x5F] = function() { this.LD8( this.E, this.A ); }
cpu.prototype.instructions[0x58] = function() { this.LD8( this.E, this.B ); }
cpu.prototype.instructions[0x59] = function() { this.LD8( this.E, this.C ); }
cpu.prototype.instructions[0x5A] = function() { this.LD8( this.E, this.D ); }
cpu.prototype.instructions[0x5B] = function() { this.LD8( this.E, this.E ); }
cpu.prototype.instructions[0x5C] = function() { this.LD8( this.E, this.H ); }
cpu.prototype.instructions[0x5D] = function() { this.LD8( this.E, this.L ); }
cpu.prototype.instructions[0x5E] = function() { this.LD8M(this.E, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x67] = function() { this.LD8( this.H, this.A ); }
cpu.prototype.instructions[0x60] = function() { this.LD8( this.H, this.B ); }
cpu.prototype.instructions[0x61] = function() { this.LD8( this.H, this.C ); }
cpu.prototype.instructions[0x62] = function() { this.LD8( this.H, this.D ); }
cpu.prototype.instructions[0x63] = function() { this.LD8( this.H, this.E ); }
cpu.prototype.instructions[0x64] = function() { this.LD8( this.H, this.H ); }
cpu.prototype.instructions[0x65] = function() { this.LD8( this.H, this.L ); }
cpu.prototype.instructions[0x66] = function() { this.LD8M(this.H, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x6F] = function() { this.LD8( this.L, this.A ); }
cpu.prototype.instructions[0x68] = function() { this.LD8( this.L, this.B ); }
cpu.prototype.instructions[0x69] = function() { this.LD8( this.L, this.C ); }
cpu.prototype.instructions[0x6A] = function() { this.LD8( this.L, this.D ); }
cpu.prototype.instructions[0x6B] = function() { this.LD8( this.L, this.E ); }
cpu.prototype.instructions[0x6C] = function() { this.LD8( this.L, this.H ); }
cpu.prototype.instructions[0x6D] = function() { this.LD8( this.L, this.L ); }
cpu.prototype.instructions[0x6E] = function() { this.LD8M(this.L, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x77] = function() { this.LDM8( this.A, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x70] = function() { this.LDM8( this.B, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x71] = function() { this.LDM8( this.C, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x72] = function() { this.LDM8( this.D, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x73] = function() { this.LDM8( this.E, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x74] = function() { this.LDM8( this.H, this.regs16[ this.HL ] ); }
cpu.prototype.instructions[0x75] = function() { this.LDM8( this.L, this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x3E] = function() { this.LDI( this.A ); }
cpu.prototype.instructions[0x06] = function() { this.LDI( this.B ); }
cpu.prototype.instructions[0x0E] = function() { this.LDI( this.C ); }
cpu.prototype.instructions[0x16] = function() { this.LDI( this.D ); }
cpu.prototype.instructions[0x1E] = function() { this.LDI( this.E ); }
cpu.prototype.instructions[0x26] = function() { this.LDI( this.H ); }
cpu.prototype.instructions[0x2E] = function() { this.LDI( this.L ); }
cpu.prototype.instructions[0x36] = function() { this.LDIM( this.regs16[ this.HL ] ); }

cpu.prototype.instructions[0x02] = function() { this.LDM8( this.A, this.regs16[ this.BC ] ); }
cpu.prototype.instructions[0x12] = function() { this.LDM8( this.A, this.regs16[ this.DE ] ); }
cpu.prototype.instructions[0x32] = function() { this.LDM8( this.A, this.ram[ (this.regs16[ this.PC ] )++ ] ); }
	
	
cpu.prototype.fetch = function() {
	return this.ram[ ++(this.regs16[ this.PC ]) ];
}
	
cpu.prototype.run = function() {
	while(1) {
		var f = this.instructions[ this.fetch() ];
		if( f == undefined )
			throw "Error: Illegal instruction";
		f();
	}
}
	
cpu.prototype.incPC = function()
{
	this.pc = (this.pc + 1) & 0xFFFF;
}
	
cpu.prototype.loadImmediateByte = function() {
	var b = this.mem[this.pc++];
	return b;
}

cpu.prototype.loadImmediateWord = function() {
	var l = this.mem[this.pc++];
	var h = this.mem[this.pc++];
	return ((h<<8)| l);
}
	
cpu.prototype.bc = function(n) {
	if( n == undefined )
	{
		return ((this.b << 8) | this.c)
	}
	else
	{
		this.b = (n>>8) & 0xFF;
		this.c = n & 0xFF;
	}
}

cpu.prototype.af = function(n) {
	if( n == undefined )
	{
		return ((this.a << 8) | this.f)
	}
	else
	{
		this.a = (n>>8) & 0xFF;
		this.f = n & 0xFF;
	}
}


cpu.prototype.ADD = function( r )
{
	var a = this.a + r;
	
}

var regs8 = ["B", "C", "D", "E", "H", "L", "","A"];
var regs16a = ["BC","DE","HL","SP"];
var regs16b = ["BC","DE","HL","PSW"];

cpu.prototype.decodeReg8 = function( zzz )
{
	return regs8[ zzz & 0x7 ];
}

cpu.prototype.decodeOp = function( op )
{
	var page = (op & 0xC0)>> 6
	var yyy = (op & 0x38 ) >> 3;
	var zzz = (op & 0x07);
	switch( page )
	{
		case 0x00:
			this.decodePage0Op( yyy, zzz );
			break;
		case 0x01:
			this.decodePage1Op( yyy, zzz );
			break;
		case 0x02:
			this.decodePage2Op( yyy, zzz );
			break;
		case 0x03:
			this.decodePage3Op( yyy, zzz );
			break;
	}
}

cpu.prototype.decodePage0Op = function( yyy, zzz )
{
	switch( zzz )
	{
		case 0:
			if( yyy == 0 ) print("NOP");
			else print("Error: Illegal Instruction");
			break;
		case 1:
			if( yyy & 1 )
				this.decodeDAD(yyy);
			else
				this.decodeLXI(yyy);
			break;
		case 2:
			if( yyy & 1 )
				this.decodeLDX( yyy );
			else
				this.decodeSDX( yyy );
			break;
		case 3:
			if( yyy & 1 )
				this.decodeDCX(yyy);
			else
				this.decodeINX(yyy);
			break;
		case 4:
			this.decodeINC( yyy );
			break;
		case 5:
			this.decodeDCR( yyy );
			break;
		case 6:
			this.decodeMVI( yyy );
		case 7:
			this.decodeR( yyy );
			break;
	}
}

cpu.prototype.decodeDAD = function( yyy )
{
	print("DAD " + regs16a[ (yyy >> 1) & 0x03 ] );
}

cpu.prototype.decodeLXI = function( yyy )
{
	print("LXI " + regs16a[ (yyy >> 1) & 0x03 ] );
}

cpu.prototype.decodeLDX = function( yyy )
{
	switch( (yyy >> 1) & 0x03)
	{
		case 0:
			print( "LDAX B");
			break;
		case 1:
			print( "LDAX D");
			break;
		case 2:
			print( "LHLD" );
			break;
		case 3:
			print( "LDA" );
			break;
	}
}

cpu.prototype.decodeSDX = function( yyy )
{
	switch( (yyy >> 1) & 0x03)
	{
		case 0:
			print( "STAX B");
			break;
		case 1:
			print( "STAX D");
			break;
		case 2:
			print( "SHLD" );
			break;
		case 3:
			print( "STA" );
			break;
	}
}

cpu.prototype.decodeDCX = function( yyy )
{
	print( "DCX " + regs16b[ (yyy >> 1) & 0x03 ] );
}

cpu.prototype.decodeINX = function( yyy )
{
	print( "INX " + regs16b[ (yyy >> 1) & 0x03 ] );
}

cpu.prototype.decodeINC = function( yyy )
{
	print( "INC " + regs8[ yyy & 0x7 ] );
}

cpu.prototype.decodeDCR = function( yyy )
{
	print( "DCR " + regs8[ yyy & 0x7 ] );
}

cpu.prototype.decodeMVI = function( yyy )
{
	print( "MVI " + regs8[ yyy & 0x7 ] );
}

var ROTATE_INS = ["RLC", "RRC", "RAL", "RAR", "DAD", "CMA", "STC", "CMC"];

cpu.prototype.decodeR = function( yyy )
{
	print( ROTATE_INS[ yyy & 0x07 ] );
}

cpu.prototype.decodePage1Op = function( yyy, zzz )
{
	if( yyy == 6 )
	{
		if( zzz == 6 )
			print("HLT");
		else
			print("ERROR: Illegal Instruction");
	}
	else if( zzz == 6 )
		print("ERROR: Illegal Instruction");
	else
	{
		this.decodeMOV8( yyy, zzz );
	}
}

cpu.prototype.decodeMOV8 = function( yyy, zzz )
{
	print( "MOV " + this.decodeReg8( yyy ) + ", " + this.decodeReg8( zzz ) );
}

var ARITHMATIC_LOGIC = ["ADD", "ADC", "SUB", "SBB", "ANA", "XRA", "ORA", "CMP" ];

cpu.prototype.decodePage2Op = function( yyy, zzz )
{
	print( ARITHMATIC_LOGIC[ yyy & 0x7 ] + " " + this.decodeReg8( zzz ) );
}

cpu.prototype.decodePage3Op = function( yyy, zzz )
{
	switch( zzz )
	{
		case 0:
			this.decodeRNX( yyy );
			break;
		case 1:
			this.decodePOP16( yyy );
			break;
		case 2:
			this.decodeJNX( yyy );
			break;
		case 3:
			this.decodeJMP( yyy );
			break;
		case 4:
			this.decodeCALLX( yyy );
			break;
		case 5:
			this.decodePUSH16( yyy );
			break;
		case 6:
			print("Error: Illegal Instruction");
			break;
		case 7:
			this.decodeRST( yyy );
			break;
	}
}

var CONDITIONS = ["NZ", "Z", "NC", "C", "PO", "PE", "P", "M"];

cpu.prototype.decodeRNX = function( yyy )
{
	print( "R" + CONDITIONS[ yyy & 0x7 ] );
}

cpu.prototype.decodePOP16 = function( yyy )
{
	print( "POP " + regs16b[ (yyy >> 1) & 0x03 ] );
}

cpu.prototype.decodeJNX = function( yyy )
{
	print( "J" + CONDITIONS[ yyy & 0x7 ] );
}

var PAGE3_3 = ["JMP", "", "OUT", "IN", "XTHL", "XCHG", "DI", "EI"];

cpu.prototype.decodeJMP = function( yyy )
{
	if( yyy == 1 )
		print("Error: Illegal Instruction");
	else
		print( PAGE3_3[ yyy & 0x7 ] );
}

cpu.prototype.decodeCALLX = function( yyy )
{
	print( "C" + CONDITIONS[ yyy & 0x7 ] );
}

cpu.prototype.decodePUSH16 = function( yyy )
{
	print( "PUSH " + regs16b[ (yyy >> 1) & 0x03 ] );
}

var RSTADDR = ["0", "8", "10H", "18H", "20H", "28H", "30H", "38H"];

cpu.prototype.decodeRST = function( yyy )
{
	print( "RST " + RSTADDR[ yyy & 0x7 ] );
}


var c = new cpu( 100, 200 );

var code = [
0x00, //     NOP
0x00, //     NOP
0x00, //     NOP
0xc3, 0xd4, 0x18, // JP 18d4
0x00, //     NOP
0x00, //     NOP
0xf5, //     PUSH AF
0xc5, //     PUSH BC
0xd5, //     PUSH DE
0xe5, //     PUSH HL
0xc3, 0x8c, 0x00,  // JP 8c
0x00, //     NOP
0xf5, //     PUSH AF
0xc5, //     PUSH BC
0xd5, //     PUSH DE
0xe5 //     PUSH HL
];

for(var i = 0; i<256; ++i )
{
	c.decodeOp(i);
}


// check endianess of the host system
var isLittleEndian = (function () {
	var buffer = new ArrayBuffer(2);
	new DataView(buffer).setUint16(0, 256, true );
	return new Uint16Array( buffer )[0] === 256;
} ());

// helper for createRegs16() below
function makeRegProp( obj, view, index, str) {
	Object.defineProperty( obj, str, {
		enumerable : true,
		get : function() {
			return view.getUint16( 2*index, true );
		},
		set : function(v) {
			view.setUint16( 2*index, v, true );
		}
	});
}
// create the 16-bit registers. Use a Uint16Array on little-endian hosts.
// on big-endian hosts, wrap up a DataView in an object that looks like a Uint16Array
// but forces little endian access.
function createRegs16(buffer, byteOffset, byteSize) {
	if( isLittleEndian )
		return new Uint16Array( buffer, byteOffset, byteSize );
	else
	{
		var regs16 = function (b,off,sz) {
			var view = new DataView(b, off, sz);
			for( var i=0; i<6; ++i)
			{
				makeRegProp( this, view, i, i.toString() );
			}
			Object.defineProperty( this, "byteLength", {
				enumerable : true,
				writable : false,
				value : sz
			});
			Object.defineProperty( this, "byteOffset", {
				enumerable : true,
				writable : false,
				value : off
			});
			Object.defineProperty( this, "buffer", {
				enumerable : true,
				writable : false,
				value : view.buffer
			});
		}
		return new regs16(buffer, byteOffset, byteSize);
	}
}


function z80( memsize ) {
	"use strict";
	var regs8080Size = 12;		// storage size of 8080 registers
	var regsZ80Size = 26;		// storage size of Z80 registers
	
	var regs_size = regs8080Size;
	
	var buffer = new ArrayBuffer( regs_size + memsize );
	// r8 represents the 8-bit registers
	this.r8 = new Uint8Array( buffer, 0, regs_size);
	// r16 represents the 16-bit register pairs.
	this.r16 = createRegs16(buffer, 0, regs_size/2);
	
	// use a DataView for 16-bit memory access. Uint16Array's are aligned on 2-byte boundaries
	this.ram = new DataView( buffer, regs_size, memsize );
	// Uint8Array is much faster than a DataView, so for 8-bit access, use a Uint8Array to access memory.
	this.ram8 = new Uint8Array(buffer,  regs_size, memsize);
}

// encoding of register in instructions
z80.prototype.eB = 0;
z80.prototype.eC = 1;
z80.prototype.eD = 2;
z80.prototype.eE = 3;
z80.prototype.eH = 4;
z80.prototype.eL = 5;
z80.prototype.e_HL_ = 6;
z80.prototype.eA = 7;

// index_map[encoding] == index of register in r8
// for example, r8[ index_map[eA] ] refers to the A register in r8
// i.e. A == r8[ index_map[eA] ] == r8[ index_map[7] ] == r8[iA]
z80.prototype.index_map = [3,     2,    5,    4,    7,   6,    6,      1 ];
z80.prototype.reg_names = ["B", "C", "D", "E", "H", "L", "iHL", "A"];

// index of A register
z80.prototype.iA = 1;
// index of flags register
z80.prototype.iF = 0;

// 16-bit register encodings
z80.prototype.eBC = 0;
z80.prototype.eDE = 1;
z80.prototype.eHL = 2;
z80.prototype.eSP = 3;
// same as r8 above except for the 16-bit regs.
z80.prototype.index16_map = [  1,    2,     3,     4,     5 ];
z80.prototype.reg16_names = ["BC","DE","HL","SP","PC"];

z80.prototype.iBC = z80.prototype.index16_map[this.eBC];
z80.prototype.iDE = z80.prototype.index16_map[this.eDE];
z80.prototype.iHL = z80.prototype.index16_map[this.eHL];
// index of the program counter in r16
z80.prototype.iPC = 5;
// index of the stack pointer in r16
z80.prototype.iSP = 4;
// index of A+F in r16
z80.prototype.iPSW = 0;

// bit indices of the flags in F
z80.prototype.iCF = 0x01;		// Carry flag
z80.prototype.iPF = 0x04;		// Parity flag
z80.prototype.iHF = 0x10;		//half-carry flag
z80.prototype.iIF = 0x20;		// Interrupt flag
z80.prototype.iZF = 0x40;		// Zero flag	
z80.prototype.iSF = 0x80;		// Sign flag

z80.prototype.flag_names = ["CF", "PF", "HF", "IF", "ZF", "SF"];
z80.prototype.flag_indexes = [z80.prototype.iCF, z80.prototype.iPF, z80.prototype.iHF, z80.prototype.iIF, z80.prototype.iZF, z80.prototype.iSF];
z80.prototype.condition_codes = [z80.prototype.iZF, z80.prototype.iZF, z80.prototype.iCF, z80.prototype.iCF, z80.prototype.iPF, z80.prototype.iPF, z80.prototype.iSF, z80.prototype.iSF]



z80.prototype.attachPort = function( port, read, write )
{
	if( port < 0 || port > 255 )
		throw "Error: 0 <= port_number <= 255";
	
	if( typeof(read) == 'function' )
		this.in_ports[port] = read;
	else
		this.in_ports[port] = undefined;
	
	if( typeof(write) == 'function' )
		this.out_ports[port] = write;
	else
		this.out_ports[port] = write;
}

z80.prototype.readImm8 = function( ) {
	return this.ram8[ (this.r16[this.iPC])++ ];
}

 z80.prototype.readImm16 = function( ) {
	var p = this.r16[iPC];
	this.r16[iPC] += 2;
	return this.ram.getUint16(p, true);
}

 z80.prototype.push16 = function( val ) {
	this.r16[iSP] -= 2;
	this.ram.setUint16( this.r16[iSP], val, true );
}

 z80.prototype.pop16 = function() {
	var val = this.ram.getUint16( r16[iSP], true );
	this.r16[iSP] += 2;
	return val;
}

 z80.prototype.reset = function() {
	for( var i=0; i<this.r8.byteLength; ++i )
		this.r8[i] = 0x00;
	for( var i=0; i<this.ram.byteLength; ++i )
		this.ram8[i] = 0;
}

z80.prototype.load = function( base_addr, prog ) {
	if( base_addr >=0 && base_addr < 65536 )
	{
		if( prog.length >0 && prog.length < (65536-base_addr) )
		{
			this.ram8.set(prog, base_addr );
			return true;
		}
	}
	return false;
}

z80.prototype.step = function() {
	var code = this.readImm8();			

	this[code]();
	this.processInterrupt();
	return true;
}

z80.prototype.run = function(max_steps) {
	for( var i=0; i<max_steps;++i) {
		this.step();
	}
}
		
z80.prototype.processInterrupt = function() {
	if( this.r8[iF] & this.iIF )
	{
		if( this.interrupted )
		{
			// disable interrupts
			this.r8[iF] &= (~(this.iIF));
			// reset interrupted 
			this.interrupted = false;
			var exec = this[interrupt_code];
			if( typeof( exec ) == 'function' )
			{
				exec();
			}
		}
	}
}

z80.prototype.interrupt = function( code ) {
	if( r8[iF] & iIF )
	{
		interrupted = true;
		interrupt_code = code;
		return true;
	}
	return false;
}

z80.prototype[0x41] = function() { this.r8[0x03] = this.r8[0x02]; }





var z = new z80(65536);

z.r8[0x02] = 45;

z[0x41]();

print( z.r8[0x03] );


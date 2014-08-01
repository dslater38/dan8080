(function(_global){
	"use strict"
	
	var shim = {};
	  if (typeof(exports) === 'undefined') {
	    if(typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
	      shim.exports = {};
	      define(function() {
		return shim.exports;
	      });
	    } else {
	      // gl-matrix lives in a browser, define its namespaces in global
	      shim.exports = typeof(window) !== 'undefined' ? window : _global;
	    }
	  }
	  else {
	    // gl-matrix lives in commonjs, define its namespaces in exports
	    shim.exports = exports;
	  }
	
	  (function(exports) {
		  
		var cpu8080 = {
			};
		
		cpu8080.create = function(memsize) {
			
			var ctx = this;
			//~ var cpu = {
				//~ cycles : 0,
				//~ instructions : []
				//~ };
			var cycles = 0;
			var instructions = [];
			var buffer = new ArrayBuffer( 12 );
			var regs = new DataView( buffer, 0, 12);
			var r8 = new Uint8Array( buffer, 0, 12);
			
			var mem = new ArrayBuffer( memsize );
			var ram = new DataView( mem, 0, memsize );
			
			var interrupt_code=0;
			var interrupted = false;
			
			//   index of register in array buffer
				
			// encoding of register in instructions
			var eB = 0, eC = 1, eD = 2, eE = 3, eH = 4, eL = 5, e_HL_ = 6, eA = 7;
			// index_map[encoding] == index of register in r8
			// for example, r8[ index_map[eA] ] refers to the A register in r8
			// i.e. A == r8[ index_map[eA] ] == r8[ index_map[7] ] == r8[ 0 ]
			var index_map = [2,     3,    4,    5,    6,   7,    6,      0 ];
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
			
			var i;
						
			function readImm8( ) {
				var p = regs.getUint16( iPC, true );
				regs.setUint16(iPC, p+1, true );
				return ram.getUint8(p);
			}
			
			function readImm16( ) {
				var p = regs.getUint16( iPC, true );
				regs.setUint16(iPC, p+2, true );
				return ram.getUint16(p, true);
			}
			
			function push16( val ) {
				var sp = regs.getUint16( iSP, true );
				sp -= 2;
				ram.setUint16( sp, val, true );
				regs.setUint16( iSP, sp, true );
			}
			
			function pop16() {
				var sp = regs.getUint16( iSP, true );
				var val = ram.getUint16( sp, true );
				sp += 2;
				regs.setUint16(iSP, sp, true );
				return val;
			}

			function reset() {
				for( var i=0; i<regs.byteLength; ++i )
					regs.setUint8(i, 0);
				for( var i=0; i<ram.byteLength; ++i )
					ram.setUint8(i, 0);
				cycles = 0;
			}

			function loadDDT( base_addr, hexstr ) {
				
			}
			
			function load( base_addr, prog ) {
				if( base_addr >=0 && base_addr < 65536 )
				{
					if( prog.length >0 && prog.length < (65536-base_addr) )
					{
						for( var i=0; i<prog.length; ++i )
						{
							ram.setUint8( base_addr+i, prog[ i ] );
						}
						return true;
					}
				}
				return false;
			}
		
			function step() {
				var p =  regs.getUint16( iPC, true );
				var code = ram.getUint8( p );
				++p;
				regs.setUint16( iPC, p, true );
				var exec = instructions[code];
				if( typeof( exec ) == 'function' )
				{
					exec();
					processInterrupt();
					return true;
				}
				return false;
			}

			function run() {
				for(;step();) {
				}
			}
		
			function processInterrupt() {
				if( r8[1] & iIF )
				{
					if( interrupted )
					{
						// disable interrupts
						r8[1] &= (~iIF);
						// reset interrupted 
						interrupted = false;
						var exec = instructions[interrupt_code];
						if( typeof( exec ) == 'function' )
						{
							exec();
						}
					}
				}
			}
		
			function interrupt( code ) {
				if( r8[1] & iIF )
				{
					interrupted = true;
					interrupt_code = code;
					return true;
				}
				return false;
			}
			
			var cpu = {
				cycles : 0
				};

			var config = {
				writable: true,
				enumerable: true,
				configurable: true
			};
			var defineProperty = function(obj, name, value) {
				config.value = value;
				Object.defineProperty(obj, name, config);
			}
			
			defineProperty( cpu, "interrupt", function(code) {
				return interrupt(code);
			});
			
			defineProperty( cpu, "step", function() {
				step();
			});
			
			defineProperty( cpu, "run", function() {
				run();
			});
			
			defineProperty( cpu, "reset", function() {
				reset();
			});
			
			defineProperty( cpu, "load", function( base_addr, prog) {
				load( base_addr, prog);
			});
		
			// add memory			
			Object.defineProperty( cpu, "ram", {
				enumerable : true,
				get : function() {
					return  ram;
				}
			});
			
			function makeRegProp(name,  r ) {
				if( i == index_map[e_HL_] )
				{
					Object.defineProperty( cpu, name, {
						enumerable : true,
						get : function() {
							return  ram.getUint8( r8[ r ] );
						},
						set : function(val) {
							ram.setUint8(  r8[ r ],  val );
						}
					});
				}
				else
				{
					Object.defineProperty( cpu, name, {
						enumerable : true,
						get : function() {
							return r8[ r ];
						},
						set : function(val) {
							r8[ r ] = val;
						}
					});
				}
			}
			
			// add the registers to cpu as properties.
			for( i=0; i<reg_names.length; ++i )
			{
				makeRegProp(reg_names[i],  index_map[i] );
			}
			
			function makeReg16Prop(name, rID ) {
				Object.defineProperty(cpu, name, {
					enumerable : true,
					get : function() {
						return regs.getUint16( rID, true );
					},
					set : function(val) {
						regs.setUint16( rID, val, true );
					}
				});
			}
			
			for( var i=0; i<reg16_names.length; ++i )
			{
				makeReg16Prop(reg16_names[i], index16_map[i]);
			}
			
			function makeFlagProp(name, flag ) {
				Object.defineProperty( cpu, name, {
					enumerable : true,
					get : function() {
						return  ((r8[1] & flag) == flag);
					},
					set : function(val) {
						if( val )
							r8[1] |= flag;
						else
							r8[1] &= ~(flag);
					}
				});
			}
			
			for( var i =0; i<flag_names.length; ++i  )
			{
				makeFlagProp(flag_names[i], flag_indexes[i]);
			}

			
			
			var parityTable = [
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			false,true,true,false,true,false,false,true,true,false,false,true,false,true,true,false,
			true,false,false,true,false,true,true,false,false,true,true,false,true,false,false,true,
			];
			
			function ZF(v) {			
				if( v==0 )
					r8[1] |= iZF;
				else
					r8[1] &= ~(iZF);
			}
			
			function SF(v) {			
				if(  v<0 )
					r8[1] |= iSF;
				else
					r8[1] &= ~(iSF);
			}
			
			function CF(v) {			
				if(  (v & 0x0100) != 0 )
					r8[1] |= iCF;
				else
					r8[1] &= ~(iCF);
			}
			
			function getCF() {
				return ((r8[1] & iCF) != 0);
			}
			
			function PF(v) {			
				if( parityTable[ (v & 0xFF) ] )
					r8[1] |= iPF;
				else
					r8[1] &= ~(iPF);
			}
			
			function HF(lhs, rhs, v ) {			
				if( (( ((rhs ^ v) ^ lhs) & 0x10 ) != 0) )
					r8[1] |= iHF;
				else
					r8[1] &= ~(iHF);
			}
				
				
			function setFlagsZSP(a) {
				var setf = 0x00;
				var clrf = 0xFF;
				
				if( a == 0 )
					setf |= iZF;
				else
					clrf ^= iZF;
				
				if( a & 0x80 )
					setf |= iSF;
				else
					clrf ^= iSF;
				
				if( parityTable[a] )
					setf |= iPF;
				else
					clrf ^= iPF;
							
				r8[1] |= setf;
				r8[1] &= clrf;
			}
			
			function setFlagsZSPC(a) {
				// var a = r8[0];
				var setf = 0x00;
				var clrf = 0xFF;
				
				if( a == 0 )
					setf |= iZF;
				else
					clrf ^= iZF;
				
				if( a & 0x80 )
					setf |= iSF;
				else
					clrf ^= iSF;
				
				if( parityTable[a] )
					setf |= iPF;
				else
					clrf ^= iPF;
				
				if( a > 255 )
					setf |= iCF;
				else
					clrf ^= iCF;
				
				r8[1] |= setf;
				r8[1] &= clrf;
			}
			
			function make1ArgFcn(fcn, s ) {
				return fcn.bind(ctx, s );
			}
			
			function make2ArgFcn(fcn, d, s ) {
				return fcn.bind(ctx, d, s );
			}
			
			
			// NOP
			instructions[0x00] = function() { cycles += 4; }
			
			function MOVR_HL_( s ) {
				r8[ s ] = ram.getUint8( regs.getUint16( iHL, true ) );
			}
			function MOV_HL_R( d ) {
				ram.setUint8( regs.getUint16( iHL, true ), r8[ d ] );
			}
			
			function MOV_R_R( d, s ) {
				r8[d] = r8[s];
			}
		
			
			var prefix = 0x40;

			for( var d = 0; d<8; ++d )
			{
				for( var s = 0; s<8; ++s )
				{
					if( d == e_HL_ && s == e_HL_ )	// MOV (HL),(HL) not allowed - would be a NOP enyway
						continue;
					
					var instruction = prefix | (d << 3) | s;
					
					if( d == e_HL_ )
					{
						instructions[instruction] = make1ArgFcn( MOV_HL_R, index_map[s] );
					}
					else if ( s == e_HL_ )
					{
						instructions[instruction] = make1ArgFcn( MOVR_HL_, index_map[d] );
					}
					else
					{
						instructions[instruction] = make2ArgFcn( MOV_R_R, index_map[d], index_map[s] );
					}
				}
			}

			
			
			//~ for( var d=0; d<8; ++d )
			//~ {
				//~ for( var s=0; s<8; ++s )
				//~ {	
					//~ if( s == eHL && d == eHL )	// mem => mem move not supported
						//~ continue;
					//~ var instruction = prefix | (d << 3) | s;
					//~ instructions[instruction] = makeMove(d, s);
				//~ }
			//~ }
			
			
			function MVI_HL_() {
				var imm = readImm8();
				ram.setUint8( regs.getUint16( iHL, true ), imm );
			}
			
			function MVI_R( d ) {
				r8[ d ] = readImm8();
			}
			
			prefix = 0x00;
			for( var d = 0; d < 8; ++d )
			{
				var instruction = prefix | (d<<3) | 0x06;
				
				if( d == e_HL_ )
				{
					instructions[instruction] = MVI_HL_;
				}
				else
					instructions[instruction] = make1ArgFcn(MVI_R, index_map[d] );
			}
			
			function LXI( d ) {
				regs.setUint16( d, readImm16(), true );
			}
			
			function makeLXI( d ) {
				return LXI.bind( ctx, d );
			}
			
			// prefix still == 0
			for( var d = 0; d <4; ++d )
			{
				var instruction = prefix | (d<<4) | 0x01;
				instructions[instruction] = makeLXI( index16_map[d] );
			}
			// LDA addr A <== ram[ addr ]
			instructions[0x3A] = function() {
				r8[0] = ram.getUint8( readImm16() );
			}
			// STA addr ram[addr] <== A
			instructions[0x32] = function() {
				ram.setUint8( readImm16(), r8[0] );
			}
			// LHLD addr HL <== ram[addr]
			instructions[0x3A] = function() {
				regs.setUint16( iHL, ram.getUint16( readImm16(), true ), true );
			}
			// SHLD addr ram[addr] <== HL
			instructions[0x32] = function() {
				ram.setUint16( readImm16(), regs.getUint16( iHL, true ), true );
			}
			
			function LDAX( s ) {
				r8[ 0 ] = ram.getUint8( regs.getUint16( s, true ) );
			}
			function STAX( d ) {
				ram.setUint8( regs.getUint16( d, true ), r8[ 0 ]);
			}
			
			// prefix still 0
			instructions[ prefix | (eBC<<4) | 0x0A ] = LDAX.bind( ctx, iBC );
			instructions[ prefix | (eDE<<4) | 0x0A ] = LDAX.bind( ctx, iDE );
			
			instructions[ prefix | (eBC<<4) | 0x02 ] = STAX.bind( ctx, iBC );
			instructions[ prefix | (eDE<<4) | 0x02 ] = STAX.bind( ctx, iDE );
			// XCHG
			instructions[ 0xEB] = function() {
				var tmp = regs.getUint16( iDE, true );
				regs.setUint16( iDE, regs.getUint16( iHL, true ) ,true );
				regs.setUint16( iHL, tmp, true );
			}

			function doADD( rhs ) {
				var lhs = r8[0];
				var s = lhs+rhs;
				r8[0] = s;
				setFlagsZSPC( s );
				HF( lhs, rhs, s);
			}
			
			
			// ADD A, r
			function ADD_HL_() {
				doADD( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ADD_R( s ) {
				doADD( r8[s] );
			}
			
			var prefix = 0x80;
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = ADD_HL_;
				else
					instructions[instruction] = make1ArgFcn(ADD_R, index_map[s]);
			}
			
			// ADI a, imm8
			prefix = 0xC0;
			instructions[ prefix | 0x06 ] = function() {
				doADD( readImm8() );
			}
			
			prefix = 0x88;
			
			// ADC A, (HL)
			function ADC_HL_() {	
				doADD( ram.getUint8( regs.getUint16( iHL, true) )+ (getCF() ? 1 : 0) );
			}		

			// ADC A, r
			function ADC_R( s ) {
				doADD( r8[ s ]+ (getCF() ? 1 : 0) );
			}		
			
			
			// ADC A, r	
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] =  ADC_HL_;
				else
					instructions[instruction] = make1ArgFcn(ADC_R, index_map[s] );
			}
			// ACI
			instructions[ prefix | 0x06 ] = function() {
				doADD( readImm8() + (getCF() ? 1 : 0) );
			}
			

			function doSUB( rhs ) {
				var lhs = r8[0];
				var s = lhs-rhs;
				r8[0] = s;
				setFlagsZSPC( s );
				HF( lhs, rhs, s);
			}
			
			
			// SUB A, r
			function SUB_HL_( ) {
				doSUB( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function SUB_R( s ) {
				doSUB( r8[s] );
			}
			
			prefix = 0x90;
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = SUB_HL_;
				else
					instructions[instruction] = make1ArgFcn(SUB_R,index_map[s]);
			}
			
			// SUI a, imm8
			prefix = 0xC0;
			instructions[ prefix | 0x06 ] = function() {
				doSUB( readImm8() );
			}
			
			prefix = 0x98;
			
			// SBB A, r
			
			
			// SUB A, r
			function SBB_HL_( ) {
				doSUB( ram.getUint8( regs.getUint16( iHL, true) ) + (getCF() ? 1 : 0) );
			}
			
			function SBB_R( s ) {
				doSUB( r8[s] + (getCF() ? 1 : 0) );
			}
			
			for(var s=0; s<8; ++s )
			{
				var instruction = (prefix | s);
				if( s == e_HL_ )
					instructions[instruction] = SBB_HL_;
				else
					instructions[instruction] = make1ArgFcn(SBB_R,index_map[s]);
			}
			// SBI
			instructions[ prefix | 0x06 ] = function() {
				doSUB( readImm8() + (getCF() ? 1 : 0) );
			}
			
			
			function doINR( v ) {
				++v;
				setFlagsZSP(v);
				if( (v & 0x0F) != 0 )
					r8[1] |= iHF;
				else
					r8[1] &= (~iHF);
				return v;
			}
			
			
			function INR_HL_() {
				var hl = regs.getUint16(iHL, true);		
				ram.setUint8( doINR( ram.getUint8( hl ) ) );
			}

			function INR_R( d ) {
				r8[d] = doINR( r8[d] );
			}
		
			prefix = 0x04;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | (i<<3));
				if( i == e_HL_ )
					instructions[instruction] = INR_HL_;
				else
					instructions[instruction] = make1ArgFcn(INR_R,  index_map[i]);
			}


			
			function doDCR( v ) {
				--v;
				setFlagsZSP(v);
				if( (v & 0x0F) == 0 )
					r8[1] |= iHF;
				else
					r8[1] &= (~iHF);
				return v;
			}
			
			function DCR_HL_() {
				var hl = regs.getUint16(iHL, true);		
				ram.setUint8( doDCR( ram.getUint8( hl ) ) );
			}

			function DCR_R( d ) {
				r8[d] = doDCR( r8[d] );
			}

			prefix = 0x05;

			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | (i<<3));
				if( i == e_HL_ )
					instructions[instruction] = DCR_HL_;
				else
					instructions[instruction] = make1ArgFcn(DCR_R, index_map[i]);
			}


			function INX(rp) {
				regs.setUint16( rp, (regs.getUint16(rp, true)+1), true );
			}

			prefix = 0x03;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( INX, index16_map[ i ] );
			}
			

			function DCX(rp) {
				regs.setUint16( rp , (regs.getUint16( rp, true )-1), true );
			}

			prefix = 0x0B;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( DCX,  index16_map[ i ] );
			}

			function DAD( rp ) {
				var sum = regs.getUint16( iHL, true ) + regs.getUint16( rp, true );
				if( sum > 65535 )
					r8[1] |= iCF;
				else
					r8[1] &= (~iCF);
					
			}
			
			prefix = 0x09;
			
			for( var i=0; i<4; ++i )
			{
				var instruction = (prefix | (i<<4));
				instructions[instruction] = make1ArgFcn( DAD, index16_map[ i ] );
			}

			
			// DAA
			instructions[0x27] = function() {
				
				if( ((r8[0] & 0x0F) > 0x09 ) || (r[1] & iHF) )
				{
					r8[0] += 6;
					r[1] |= iHF;
				}
				else
					r[1] &= ~iHF;
				
				if( (r8[0] > 0x9F) || (r8[1] & iCF) )
				{
					r8[0] += 0x60;
					r8[1] |= iCF;
				}
				else
					r8[1] &= ~iCF;
				
				ZF(r8[0]);
				SF(r8[0]);
			}
			
			function doANA( rhs ) {
				var lhs = r8[0];
				var s = lhs & rhs;
				setFlagsZSPC( s );		
				r8[0] = (s & 0xFF);
				r8[1] &= (~iHF);			
			}
		
			function ANA_HL_() {
				doANA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ANA_R( s ) {
				doANA( r8[ s ] );
			}
			
			prefix = 0xA0;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = ANA_HL_;
				else
					instructions[instruction] = make1ArgFcn(ANA_R, index_map[ i ]);
			}
					
			// ANI
			instructions[0xE6] = function() {
				doANA( readImm8() );
			}
			
			function doORA( rhs ) {
				var lhs = r8[0];
				var s = lhs | rhs;
				setFlagsZSPC( s );		
				r8[0] = (s & 0xFF);
				r8[1] &= (~iHF);			
			}
		
			function ORA_HL_() {
				doORA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function ORA_R( s ) {
				doORA( r8[ s ] );
			}
			
			
			prefix = 0xB0;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = ORA_HL_;
				else
					instructions[instruction] = make1ArgFcn(ORA_R, index_map[i]);
			}
			
			
			// ORI
			instructions[0xF6] = function() {
				doORA( readImm8() );
			}
			
			
			
			function XRA( r ) {
				var lhs = r8[0];
				var rhs = (s!=e_HL_) ? r8[ index_map[s] ] : ram.getUint8( regs.getUint16( iHL, true) );
				var s = lhs ^ rhs;
				setFlagsZSPC( s );		
				r8[0] = (s ^ 0xFF);
				r8[1] &= (~iHF);			
			}
			
			function doXRA( rhs ) {
				var lhs = r8[0];
				var s = lhs ^ rhs;
				setFlagsZSPC( s );		
				r8[0] = (s & 0xFF);
				r8[1] &= (~iHF);			
			}
		
			function XRA_HL_() {
				doXRA( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			function XRA_R( s ) {
				doXRA( r8[ s ] );
			}
			
			
			prefix = 0xA8;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = XRA_HL_;
				else
					instructions[instruction] = make1ArgFcn(XRA_R, index_map[i]);
			}
			
			
			// XRI
			instructions[0xEE] = function() {
				doXRA( readImm8() );
			}
			
			function doCMP( rhs ) {
				var cmp = ((r8[0] - rhs) & 0xFF);
				var setf = 0;
				var clrf = 0xFF;
				if( (rhs != 0) && (cmp >= r8[0]) )
					setf |= iCF;
				else
					clrf ^= iCF;
				
				if( (r8[0] ^ rhs ^ cmp) & 0x10 )
					setf |= iHF;
				else
					clrf ^= iHF;
				
				if( cmp == 0 )
					setf |= iZF;
				else
					clrf ^= iZF;
				
				if( cmp & 0x80 )
					setf |= iSF;
				else
					clrf ^= iSF;
				r8[1] |= setf;
				r8[1] &= clrf;
				
			}
			
			function CMP_HL_() {
				doCMP( ram.getUint8( regs.getUint16( iHL, true) ) );
			}
			
			
			function CMP_R( s ) {
				doCMP( r8[s] );
			}
			
			// CMP S		
			function CMP( s ) {
				var rhs = (s!=e_HL_) ? r8[ index_map[s] ] : ram.getUint8( regs.getUint16( iHL, true) );
				var cmp = ((r8[0] - rhs) & 0xFF);
				var setf = 0;
				var clrf = 0xFF;
				if( (rhs != 0) && (cmp >= r8[0]) )
					setf |= iCF;
				else
					clrf ^= iCF;
				
				if( (r8[0] ^ rhs ^ cmp) & 0x10 )
					setf |= iHF;
				else
					clrf ^= iHF;
				
				if( cmp == 0 )
					setf |= iZF;
				else
					clrf ^= iZF;
				
				if( cmp & 0x80 )
					setf |= iSF;
				else
					clrf ^= iSF;
				r8[1] |= setf;
				r8[1] &= clrf;
			}
			
			
			
			prefix = 0xB8;
			
			for( var i=0; i<8; ++i )
			{
				var instruction = (prefix | i);
				if( i == e_HL_ )
					instructions[instruction] = CMP_HL_;
				else
					instructions[instruction] = make1ArgFcn(CMP_R, index_map[i]);
			}
			
			
			// CPI
			instructions[0xFE] = function() {
				doCMP( readImm8() );
			}
			
			// RLC
			instructions[0x07] =  function (  ) {
				var a = r8[0];
				a = ((a<<1)|(a>>7));
				r8[0] = a;

				if( a & 1 )
				{
					r8[1] |= iCF;
					a |= 0x01;
				}
				else
				{
					r8[1] &= (~iCF);
				}
			}		
			
			// RRC
			instructions[0x0F] =  function (  ) {
				var a = r8[0];
				a = ((a>>1)|(a<<7));
				r8[0] = a;
				
				if( a & 0x80 )
				{
					r8[1] |= iCF;
					a |= 0x80;
				}
				else
				{
					r8[1] &= (~iCF);
				}
			}
			
			
			// RAL
			instructions[0x17] =  function (  ) {
				var a = r8[0];
				var carry = (r8[1] & iCF);
				if( a & 0x80 )
				{
					r8[1] |= iCF;
				}
				else
				{
					r8[1] &= (~iCF);
				}
				a <<= 1;
				if( carry )
					a |= 0x01;
				r8[0] = a;
			}		
			
			// RAR
			instructions[0x1F] =  function (  ) {
				var a = r8[0];
				var carry = (r8[1] & iCF);
				
				if( a & 0x01 )
				{
					r8[1] |= iCF;
				}
				else
				{
					r8[1] &= (~iCF);
				}
				a >>= 1;
				if( carry )
					a |= 0x80;
				r8[0] = a;
			}
			
			
			// CMA
			instructions[0x2F] =  function (  ) {
				r8[0] ^= 0xFF;
			}
			
			// CMC
			instructions[0x3F] =  function (  ) {
				r8[1] ^= iCF;
			}
			
			// CMC
			instructions[0x37] =  function (  ) {
				r8[1] |= iCF;
			}
			
			// JMP lb hb
			instructions[0xC3] =  function (  ) {
				regs.setUint16( iPC, readImm16(), true );
			}
			
			function JMPTrue( bit ) {
				var addr = readImm16()
				if( r8[1] & bit )
				{
					regs.setUint16( iPC, addr, true );
				}
			}
			
			function JMPFalse( bit ) {
				var addr = readImm16();
				if( !(r8[1] & bit) )
				{
					regs.setUint16( iPC, addr, true );
				}
			}
			
			prefix = 0xC2;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( JMPFalse, condition_codes[ tF ]);
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( JMPTrue, condition_codes[ tT ] );
			}
			
			
			// CALL lb hb
			instructions[0xCD] = function() {
				var addr = readImm16();
				push16( regs.getUint16( iPC, true ) );
				regs.setUint16( iPC, addr, true );
				//var p = regs.getUint16( iPC, true );
				//var addr = ram.getUint16( p, true );
				//p += 2;
				//~ var sp = regs.getUint16( iSP, true );
				//~ ram.setUint16( sp, p, true);
				//~ sp -= 2;
				//~ regs.setUint16( iSP, sp, true );
				//~ p = addr;
				//~ regs.setUint16( iPC, p, true );
			}
			
			function CALLTrue( bit ) {
				if( r8[1] & bit )
					instructions[0xCD]();
				else
					readImm16();
			}
			
			function CALLFalse( bit ) {
				if( !(r8[1] & bit) )
					instructions[0xCD]();
				else
					readImm16();
			}
			
			prefix = 0xC4;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( CALLFalse, condition_codes[tF] );
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( CALLTrue, condition_codes[tT] );
			}
			
			
			// RET
			instructions[0xC9] = function() {
				var addr = pop16();
				regs.setUint16( iPC, addr, true );
				//~ var sp = regs.getUint16( iSP, true );
				//~ var addr = ram.getUint16( sp, true );
				//~ sp +=2 ;
				//~ regs.setUint16( iSP, sp, true);
				//~ regs.setUint16( iPC, addr, true );
			}
			
			
			function RETTrue( bit ) {
				if( r8[1] & bit )
					instructions[0xC9]();
			}
			
			function RETFalse( bit ) {
				if( !(r8[1] & bit) )
					instructions[0xC9]();
			}
			
			prefix = 0xC0;
			
			for( var i=0; i<4; ++i )
			{
				var tF = 2*i;
				var tT = tF + 1;
				
				instructions[ prefix | (tF<<3) ] = make1ArgFcn( RETFalse, condition_codes[tF] );
				instructions[ prefix | (tT<<3) ] = make1ArgFcn( RETTrue, condition_codes[tT] );
			}
			
			
			
			function RST( n ) {
				push16( regs.getUint16( iPC, true ) );
				var addr = n*8;
				regs.setUint16( iPC, addr, true);
				
				//~ var sp = regs.getUint16( iSP, true );
				//~ sp -= 2;
				//~ ram.setUint16( sp, regs.getUint16( iPC, true ), true );
				//~ regs.setUint16( iSP, sp, true );
				//~ var addr = n*8;
				//~ regs.setUint16( iPC, addr, true);
			}
			
			prefix = 0xC7;
			
			for( var i=0; i<8; ++i )
			{
				instructions[ prefix | (i<<3) ] = make1ArgFcn( RST, i );
			}
			
			
			// PCHL
			instructions[0xE9] = function() {
				regs.setUint16( iPC, regs.getUint16( iHL, true ), true );
			}
			
			function PUSH( r ) {
				push16( regs.getUint16( r, true ) );
				//~ var sp = regs.getUint16( iSP, true );
				//~ sp -= 2;
				//~ regs.setUint16( iSP, sp, true );
				//~ ram.setUint16( sp, regs.getUint16(  index16_map[r], true ), true );
			}
			
			prefix = 0xC5;
			
			for( var i=0; i<4; ++i )
			{
				if( i == eSP )
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, iPSW );
				else
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, index16_map[i] );
			}
			
			function POP( r ) {
				regs.setUint16( r, pop16(), true );
				var sp = regs.getUint16( iSP, true );
				sp += 2;
				regs.setUint16( iSP, sp, true );
				regs.setUint16( index16_map[r], ram.getUint16( sp, true ), true );
			}
			
			prefix = 0xC1;
			
			for( var i=0; i<4; ++i )
			{
				if( i == eSP )
					instructions[prefix | (i<<4)] = make1ArgFcn( PUSH, iPSW );
				else
					instructions[prefix | (i<<4)] = make1ArgFcn( POP, i );
			}
			
			// XTHL
			instructions[0xE3] = function() {
				var sp = regs.getUint16( iSP, true );
				var tmp = ram.getUint16( sp, true );
				ram.setUint16( sp, regs.getUint16( iHL, true ), true );
				regs.setUin16( iHL, tmp, true );
			}
			
			// SPHL
			instructions[0xF9] = function() {
				regs.setUint16( iSP, regs.getUint16( iHL, true ), true );
			}
			
			
			// IN p
			instructions[0xDB] = function() {
				var p = regs.getUint16( iPC, true );
				var port = ram.getUint8( p );
				++p;
			}
			
			
			// OUT p
			instructions[0xD3] = function() {
				var p = regs.getUint16( iPC, true );
				var port = ram.getUint8( p );
				++p;
			}
			
			// EI
			instructions[0xFB] = function() {
				r8[1] |= iIF;
			}
			
			// DI
			instructions[0xF3] = function() {
				r8[1] |= iIF;
			}
			
			
			// HLT
			instructions[0x76] = function() {
				throw "HLT";
			}
			
			return cpu;
		}
		
		
	if(typeof(exports) !== 'undefined') {
	    exports.cpu8080 = cpu8080;
	}		
		
	  })(shim.exports);
})(this);

var cpu = cpu8080.create(65536);

// print( typeof( cpu.ram ) );
// print( typeof( cpu.ram.getUint8(0) ) );
//print( typeof( cpu.A ) );print(cpu.HL);
//print( typeof( cpu.BC ) );
//print( typeof( cpu.ram ) );


//cpu.B = 0x10;
//cpu.C = 0x20;

//print( cpu.B );
//print( cpu.C );
//print( cpu.BC );

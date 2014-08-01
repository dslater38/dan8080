
if( typeof(print) == 'undefined' )
{
	print = new Function("a", "WScript.Echo(a);");
}


function decoder()
{
}

decoder.prototype.B = 0x00;
decoder.prototype.C = 0x01;
decoder.prototype.D = 0x02;
decoder.prototype.E = 0x03;
decoder.prototype.H = 0x04;
decoder.prototype.L = 0x05;
decoder.prototype._HL_ = 0x06;
decoder.prototype.A = 0x07;

decoder.prototype.BC = 0x00;
decoder.prototype.DE = 0x01;
decoder.prototype.HL = 0x02;
decoder.prototype.AF = 0x03;
decoder.prototype.SP = 0x03;



decoder.prototype.regs8s = [ "B", "C", "D", "E", "H", "L", "(HL)", "A" ];
decoder.prototype.regs8 = [ "0x02", "0x03", "0x04", "0x05", "0x06", "0x07", "0x01", "0x00"];
decoder.prototype.regs16s = ["BC", "DE", "HL", "SP"];
decoder.prototype.regs16s2 = ["BC", "DE", "HL", "AF"];
decoder.prototype.regs16 = ["0x01", "0x02", "0x03", "0x04"];
decoder.prototype.regs162 = ["0x01", "0x02", "0x03", "0x00"];
decoder.prototype.flags_s = ["C", 	"1", 	"P", 	"0", 	"A", 	"0", 	"Z", 	"S"];
decoder.prototype.set_flags = [ '0x01', , '0x04', , '0x10', , '0x40', '0x80'];
decoder.prototype.clr_flags =  [ '0xFE', , '0xFB', , '0xEF', , '0xBF', '0x7F'];

decoder.prototype.decodeReg8 = function( zzz )
{
	return regs8[ zzz & 0x7 ];
}

decoder.prototype.decodeOp = function( op )
{
	var page = (op & 0xC0)>> 6
	var yyy = (op & 0x38 ) >> 3;
	var zzz = (op & 0x07);
	switch( page )
	{
		case 0x00:
			return this.decodePage0Op( yyy, zzz );
			break;
		case 0x01:
			return this.decodePage1Op( yyy, zzz );
			break;
		case 0x02:
			return this.decodePage2Op( yyy, zzz );
			break;
		case 0x03:
			return this.decodePage3Op( yyy, zzz );
			break;
	}
	throw "Unexpected";
}

decoder.prototype.decodePage0Op = function( yyy, zzz )
{
	switch( zzz )
	{
		case 0:
			if( yyy == 0 ){
				return 'function() {}'
			}
			else 
			{
				// print("Error: Illegal Instruction");
				return 'function() {throw "Error: Illegal Instruction"; }'
			}
			break;
		case 1:
			if( yyy & 1 )
				return this.decodeDAD(yyy);
			else
				return this.decodeLXI(yyy);
			break;
		case 2:
			if( yyy & 1 )
				return this.decodeLDX( yyy );
			else
				return this.decodeSDX( yyy );
			break;
		case 3:
			if( yyy & 1 )
				return this.decodeDCX(yyy);
			else
				return this.decodeINX(yyy);
			break;
		case 4:
			return this.decodeINC( yyy );
			break;
		case 5:
			return this.decodeDCR( yyy );
			break;
		case 6:
			return this.decodeMVI( yyy );
		case 7:
			return this.decodeR( yyy );
			break;
	}
}

decoder.prototype.decodePage1Op = function( yyy, zzz )
{
	if( yyy == 6 )
	{
		if( zzz == 6 )
		{
			// print("HLT");
			return 'function() { throw "HALT" }'
		}
		else
		{
			// print("ERROR: Illegal Instruction");
			return 'function() { throw "Error: Illegal Instruction"; }'
		}
	}
	else if( zzz == 6 )
	{
		return 'function() { throw "Error: Illegal Instruction"; }'
		// print("ERROR: Illegal Instruction");
	}
	else
	{
		return this.decodeMOV8( yyy, zzz );
	}
}

decoder.prototype.decodePage2Op = function( yyy, zzz )
{
	print( ARITHMATIC_LOGIC[ yyy & 0x7 ] + " " + this.decodeReg8( zzz ) );
}

function checkSign(a) {
	return a<0 ? 1 : 0;
}

function checkSign(a) {
	return a<0 ? 1 : 0;
}

function() { 
	var a = this.r8[ this.regs8[ this.A ] ] + this.r8[ this.regs8[ zzz & 0x07] ];
	checkSign(a);
	checkZero(a);
	checkHalfCarry(a);
	checkParity(a);
	checkCarry(a);
	this.r8[ this.regs8[ this.A ] ] = (a & 0xFF);
}

decoder.prototype.decodeDAD = function( yyy )
{
	// print("DAD " + regs16a[ (yyy >> 1) & 0x03 ] );
	return 'function() { this.r16[ '+ regs16[this.HL] + ' ] = this.r16[ ' + this.regs16[(yyy >> 1) & 0x03]+' ]; }'
}

decoder.prototype.decodeMOV8 = function( yyy, zzz )
{
	// print( "MOV " + this.decodeReg8( yyy ) + ", " + this.decodeReg8( zzz ) );
	return 'function() { this.r8[ '+ this.regs8[yyy & 0x07] +' ] = this.r8[ '+ this.regs8[ zzz & 0x07 ]+ ' ]; }';
}


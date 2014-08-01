

function cpu() {
	var regs = new ArrayBuffer( 12 );
	var r8 = new Uint8Array( regs );
	var r16 = new Uint16Array( regs );
	
	// var A = 0, F = 1, B = 2, C = 3, D = 4, E = 5, H = 6, L = 7;
	var B=0, C=1, D=2, E=3, H=4, L=5, iHL=6, A=7;
	
	var r8Index = ["0x02", "0x03", "0x04", "0x05", "0x06", "0x07", "0x01", "0x00"];
	
	var AF = 0, BC = 1, DE = 2, HL = 3, SP = 4, PC = 5;
	
	var parityTable =  [
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

	
	
	
	var mem = new ArrayBuffer( 65536 );
	this.ram = new Uint8Array ( mem );
	
	var instructions = new Array( 256 );
	
	function LD8( dReg, sReg ) {
		r8[ dReg ] = r8[ sReg ];
	}
	
	function toHex( n ) {
		return "0x"+n.toString(16);
	}
	
	instructions[0] = function() {}
	
	var movP = "instructions[INS] = function() { r8[ DST ] = r8 [ SRC ]; }";
		
	var foo = [A, B, C, D, E, H, L, iHL ];
	
	for( var i in foo )
	{
		var dst = foo[i];
		for( var j in foo )
		{
			var src = foo[j];
			var c = 0x40 | (dst<<3) | src;
			
			eval( movP.replace( "DST", r8Index[dst] ).replace( "SRC", r8Index[src] ).replace("INS",toHex(c)));
		}
	}
		
	instructions[0x7F] = new Function("", "r8[0]=r8[0];");
	//eval( movP.replace( "DST", A.toString() ).replace( "SRC", B.toString() ).replace("INS","0x78"));
	//eval( movP.replace( "DST", A.toString() ).replace( "SRC", C.toString() ).replace("INS","0x79"));
	//instructions[0x78] = eval( movP.replace( "DST", A.toString() ).replace( "SRC", B.toString() ) );
	//instructions[0x79] = eval( movP.replace( "DST", A.toString() ).replace( "SRC", C.toString() ) );
	
	for( var i in instructions )
	{
		print( (instructions[i]).toString() );
	}
/* 	
 * 	print( (instructions[0x78]).toString() );
 * 	print( (instructions[0x79]).toString() );
 * 	print( LD8.toString() );
 */
	
}

var f = new cpu();

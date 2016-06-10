
var cpu = cpu8080.create( 65536 );

function testMOV(d,s) {
	var code = (0x40 | d.enc<<3 | s.enc);
	
	cpu[s.name] = 0xF7;
	assert( cpu[s.name] == 0xF7 );
	cpu[d.name] = 0x00;
	cpu[code]();
	assert( cpu[d.name] == 0xF7 );
}
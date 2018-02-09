function create8080(memsize) {
	
	var cpu = {
	};
	
	// check endianess of the host system
	var isLittleEndian = (function () {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setUint16(0, 256, true );
		return new Uint16Array( buffer )[0] === 256;
	} ());

	// but forces little endian access.
	function createRegs16(buffer, byteOffset, byteSize) {
		if( isLittleEndian )
			return new Uint16Array( buffer, byteOffset, byteSize );
		else
		{
			/**
			* @constructor
			*/
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
	
	
	var regs8080Size = 12;		// storage size of 8080 registers
	var regsZ80Size = 26;		// storage size of Z80 registers
	var regs_size = regs8080Size;
	
	var extra_space = 8;	// room for 8 1 byte temp locations or 4 2 byte locations
	
	// buffer to hold the registers + memory
	cpu.buffer =  new ArrayBuffer( regs_size + memsize + extra_space);
	// r8 represents the 8-bit registers
	cpu.r8 = new Uint8Array( cpu.buffer, 0, regs_size);
	// r16 represents the 16-bit register pairs.
	cpu.r16 = createRegs16(cpu.buffer, 0, regs_size/2);
	cpu.tmp = new Uint8Array(cpu.buffer, regs_size, extra_space);
	cpu.tmp16 = new Uint16Array(cpu.buffer, regs_size, (extra_space>>1) );
	
	// use a DataView for 16-bit memory access. Uint16Array's are aligned on 2-byte boundaries
	cpu.ram = new DataView( cpu.buffer, regs_size+extra_space, memsize );
	// Uint8Array is much faster than a DataView, so for 8-bit access, use a Uint8Array to access memory.
	cpu.ram8 = new Uint8Array(cpu.buffer,  regs_size+extra_space, memsize);
	cpu.ram16 = new Uint16Array(cpu.buffer, regs_size+extra_space, (memsize>>1) );

	cpu.getUINT16(index) {
		return (index & 0x01) ?  ((cpu.ram8[index++])|(cpu.ram8[index]) << 8) : cpu.ram16[index>>1];
	}

	cpu.setUINT16(index, val) {
		if( index & 0x01 ) {
			cpu.ram8[index++] = val & 0x00FF;
			cpu.ram8[index] = ((val & 0xFF00)>>8);
		} else {
			cpu.ram16[index>>1] = val;
		}
	}

}
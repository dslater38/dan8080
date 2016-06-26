function gameConsole(canvas, global) {
	
	this.bitshifter = {
		bitShift : 0,
		loByte : 0,
		hiByte : 0,
		setShift : function(s) { this.bitShift = s; },
		setValue : function(val){
			this.lowByte = this.hiByte;
			this.hiByte = val;
		},
		readValue : function() { return ((((this.hiByte << 8) | this.lowByte) << this.bitShift) >> 8); }
	};
	
	this.dipSwitch = {
		switches : [],
		wireSwitch : function( wire, s ) { this.switches[s] = wire; },
		on : function(s) { this.switches[s].raise(); },
		off : function(s) { this.switches[s].lower(); }
	};
	
	this.hInPort = function () {
		this.value = 0;
		
		this.setBit = function(bit, val) {
			if( val ) { value |= (1<<bit); }
			else { value &= ~(1<<bit); }
		}
		this.read = function() { return this.value; }
		this.getWire = function(bit) {
			return {
				"raise" : setBit.bind(this,bit,true),
				"lower": setBit.bind(this,bit,false)
			};
		}
	};
	
	this.hOutPort = function() {
		this.wires = []
		this.setWire = function(bit, wire ) { this.wires[bit] = wire; }
		this.write = function( value ) {
			var l = this.wires.length;
			for( var i=0; i<l; ++i ) {
				if( (value & (1<<i)) != 0 )
					this.wires[i].raise();
				else
					this.wires[i].lower();				
			}
		}
	}
	
	this.Btn = function(wire) {
		this.wire = wire;
		this.down = function() {
			wire.raise();
		}
		this.up = function() {
			wire.lower();
		}
	}
	
	this.audioPlayer = function(audio) {
		this.audio = audio;
		this.wires = [];

		this.wire = function (f) {
			this.raised = false;
			this.play = f;
		};
		this.wire.prototype.raise = function() {
			if(!this.raised)
			{
				this.raised = true;
				this.play();
			}
		}

		this.wire.prototype.lower = function() {
			if(this.raised)
			{
				this.raised = false;
			}
		}

		this.wires[0] = new wire(this.audio.playWalk1.bind(this.audio));
		this.wires[1] = new wire(this.audio.playWalk2.bind(this.audio));
		this.wires[2] = new wire(this.audio.playWalk3.bind(this.audio));
		this.wires[3] = new wire(this.audio.playWalk4.bind(this.audio));
		this.wires[4] = new wire(this.audio.playShot.bind(this.audio));
		this.wires[5] = new wire(this.audio.playBaseHit.bind(this.audio));
		this.wires[6] = new wire(this.audio.playInvHit.bind(this.audio));
		this.wires[8] = new wire(this.audio.playUfoHit.bind(this.audio));
		this.wires[7] = {
			"play" : this.audio.playUfo.bind(this.audio),
			"pause" : this.audio.ufo.pause.bind(this.audio.ufo),
			"raise" : function() { this.play(); },
			"lower" : function() { this.pause(); }
		};
	}
	
	this.FlipFlop = function( flipped, flopped ) {
		this.flipped = flipped;
		this.flopped = flopped;
		this.value = this.flipped;
		this.flipflop = function() {
			var v = this.value;
			this.value = ( this.value == this.flipped ) ? this.flopped : this.flipped;
			return v;
		}
	}
	
	this.rst = function(n) { return (0xc7|(n<<3)); }
	
	this.inP0 = new this.hInPort();
	this.inP1 = new this.hInPort();
	this.inP2 = new this.hInPort();
	this.inP3 = new this.hInPort();

	this.outP3 = new this.hOutPort();
	this.outP5 = new this.hOutPort();
	this.dip = new this.dipSwitch();
	this.player = new this.audioPlayer(enableAudio());
	// input port 0

	this.dip.wireSwitch( this.inP0.getWire(0), 4);
	this.inP0.getWire(1).raise();
	this.inP0.getWire(2).raise();
	this.inP0.getWire(3).raise();
	this.fireBtn 	= new this.Btn(  this.inP0.getWire( 4 ) );
	this.leftBtn 	= new this.Btn( this.inP0.getWire( 5 ) );
	this.rightBtn 	= new this.Btn( this.inP0.getWire( 6 ) );
	this.inP0.getWire(7).raise();	// ? tied to demux port 7 ?
	
	// input port 1

	this.coinBtn 	= new this.Btn( this.inP1.getWire( 0 ) );
	this.mPlayBtn 	= new this.Btn( this.inP1.getWire( 1 ) );
	this.sPlayBtn 	= new this.Btn( this.inP1.getWire( 2 ) );
	// this.inP1.getWire( 3 ).raise();	// always set.
	this.fireP1Btn = new this.Btn(  this.inP1.getWire( 4 ) );
	this.leftP1Btn = new this.Btn( this.inP1.getWire( 5 ) );
	this.rightP1Btn = new this.Btn( this.inP1.getWire( 6 ) );
	this.inP1.getWire( 7 ).lower();	// not connected.


	// input port 2
	this.dip.wireSwitch( this.inP2.getWire(0), 3 );
	this.dip.wireSwitch( this.inP2.getWire(1), 5 );
	this.tiltBtn = new this.Btn( this.inP2.getWire(2) );
	this.dip.wireSwitch( this.inP2.getWire(3), 6 );
	this.fireP2Btn = new this.Btn(  this.inP2.getWire( 4 ) );
	this.leftP2Btn = new this.Btn( this.inP2.getWire( 5 ) );
	this.rightP2Btn = new this.Btn( this.inP2.getWire( 6 ) );
	this.dip.wireSwitch( this.inP2.getWire(7), 7 );

	// input port 3, output port 2, output port 4

	this.shifter = new bitShifter();

	// output port 3
	this.outP3.setWire( 0, this.player.wires[7] );
	this.outP3.setWire( 1, this.player.wires[4] );
	this.outP3.setWire( 2, this.player.wires[5] );
	this.outP3.setWire( 3, this.player.wires[6] );

	// output port 5

	this.outP5.setWire( 0, this.player.wires[0] );
	this.outP5.setWire( 1, this.player.wires[1] );
	this.outP5.setWire( 2, this.player.wires[2] );
	this.outP5.setWire( 3, this.player.wires[3] );
	this.outP5.setWire( 4, this.player.wires[8] );

	this.flipflop = new this.FlipFlop( rst(1), rst(2) );

	this.addCpu = function(cpu) {
		cpu.attachPort( 0, this.inP0.read.bind(this.inP0) );
		cpu.attachPort( 1, this.inP1.read.bind(this.inP1) );
		cpu.attachPort( 2, this.inP2.read.bind(this.inP2), this.shifter.setShift.bind(this.shifter) );
		cpu.attachPort( 3, this.shifter.readValue.bind(this.shifter), this.outP3.write.bind(this.outP3) );
		cpu.attachPort( 4, undefined, this.shifter.setValue.bind(this.shifter) );
		cpu.attachPort( 5, undefined, this.outP5.write.bind(this.outP5) );
	}

	this.dip.on(7);
	this.dip.on(3);
	this.dip.on(5);
	this.dip.off(4);

	this.cpu = cpu8080.create( 65536 );

	this.addCpu(this.cpu);

	this.loadRom = function(base_addr, code) {
		this.cpu.load(base_addr, code);
	}

	this.interruptTimer = 0;

	 this.doInterrupt function() {
		if( this.cpu.IF )
			this.cpu.interrupt( this.flipflop.flipflop() );
	}
	
	this.startInterrupts = function(interval) {
		if( this.interruptTimer == 0 )
			this.interruptTimer = window.setInterval( this.doInterrupt.bind(this), interval );
	}
	
	this.stopInterrupts = function() {
		if( this.interruptTimer != 0 )
			this.interruptTimer = window.clearInterval( this.screenTimer );
		this.interruptTimer = 0;
	}
	
	this.screen = new video.Screen(this.cpu, canvas,  canvas.width, canvas.height);
	this.screen.setColors("blue", "Violet", "lime","red","yellow","cyan");
	
	this.screenTimer = 0;

	function render() {
		this.screen.render();
	}
	
	this.startVideo = function(interval) {
		if( this.screenTimer == 0 )
			this.screenTimer = window.setInterval(render.bind(this), interval );
	}
	function runCpu(numSteps, interval) {
		this.cpu.run(numSteps);
	}

	this.cpuTimer = 0;
	this.runCpu = function(interval, numSteps) {
		if( this.cpuTimer == 0 )
			this.cpuTimer = window.setInterval( runCpu.bind(this,numSteps, interval) , interval );
	}

	this.stopCpu = function(interval, numSteps) {
		if( this.cpuTimer != 0 )
			this.cpuTimer = window.clearInterval( this.cpuTimer );
		this.cpuTimer = 0;
	}
	
	this.start = function() {
		this.runCpu(0, 5000);
		this.startVideo(16);
		this.startInterrupts(8);
	}

	this.stop = function() {
		this.stopInterrupts();
		this.stopVideo();
		this.stopCpu();
	}

	this.onLoad = function(){
		var req = new XMLHttpRequest();
		req.open("GET","invaders.rom",true);
		req.responseType = 'arraybuffer';
		req.onreadystatechange = function() {
			if(req.readyState == 4){
				doLoad(req.response);
			}
		}
		req.send();
	}
}
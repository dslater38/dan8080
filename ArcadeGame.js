"use strict";
// SPace Invaders port usage
//~ Port 0
	//~ bit 0 DIP4 (Seems to be self-test-request read at power up)
	//~ bit 1 Always 1
	//~ bit 2 Always 1
	//~ bit 3 Always 1
	//~ bit 4 Fire
	//~ bit 5 Left
	//~ bit 6 Right
	//~ bit 7 ? tied to demux port 7 ?
//~ Port 1
	//~ bit 0 = CREDIT (1 if deposit)
	//~ bit 1 = 2P start (1 if pressed)
	//~ bit 2 = 1P start (1 if pressed)
	//~ bit 3 = Always 1
	//~ bit 4 = 1P shot (1 if pressed)
	//~ bit 5 = 1P left (1 if pressed)
	//~ bit 6 = 1P right (1 if pressed)
	//~ bit 7 = Not connected
//~ Port 2
	//~ bit 0 = DIP3 00 = 3 ships 10 = 5 ships
	//~ bit 1 = DIP5 01 = 4 ships 11 = 6 ships
	//~ bit 2 = Tilt
	//~ bit 3 = DIP6 0 = extra ship at 1500, 1 = extra ship at 1000
	//~ bit 4 = P2 shot (1 if pressed)
	//~ bit 5 = P2 left (1 if pressed)
	//~ bit 6 = P2 right (1 if pressed)
	//~ bit 7 = DIP7 Coin info displayed in demo screen 0=ON
//~ Port 3
	//~ bit 0-7 Shift register data


function bitShifter() {

	this.bitShift = 0;
	this.loByte = 0
	this.hiByte = 0;
	
	this.setShift = function(s) {
		this.bitShift = s;
	}
	
	this.setValue = function(val) {
		this.lowByte = this.hiByte;
		this.hiByte = val;
	}
	
	this.readValue = function() {
		return ((((this.hiByte << 8) | this.lowByte) << this.bitShift) >> 8);
	}
}

function dipSwitch() {
	this.switches = [];
	
	this.wireSwitch = function( wire, s ) {
		this.switches[s] = wire;
	}
	
	this.on = function(s) {
		this.switches[s].raise();
	}

	this.off = function(s) {
		this.switches[s].lower();
	}
}

function hInPort() {
	var value = 0;
	var ctx = this;

	function setBit( bit, val ) {
		if( val ) {
			value |= (1<<bit);
		}
		else {
			value &= ~(1<<bit);
		}
	}
	
	this.read = function() {
		return value;
	}
	
	this.set = function(val) {
		this.value = val;
	}
	
	this.getWire = function( bit ) {
		var wire = {
			"raise" : setBit.bind(this,bit,true),
			"lower": setBit.bind(this,bit,false)
		};
		return wire;
	}
}

function hOutPort() {
	var ctx = this;
	this.wires = []
	
	this.setWire = function(bit, wire ) {
		this.wires[bit] = wire;
	}
	
	this.write = function( value ) {
		for( var i in this.wires)
		{
			if( (value & (1<<i)) != 0 )
				this.wires[i].raise();
			else
				this.wires[i].lower();
		}
	}
}

function Btn(wire) {
	this.wire = wire;
	this.down = function() {
		wire.raise();
	}
	this.up = function() {
		wire.lower();
	}
}

function audioPlayer(audio) {
	this.audio = audio;
	this.wires = [];

	function wire(f) {
		this.raised = false;
		this.play = f;
	};
	
	wire.prototype.raise = function() {
		if(!this.raised)
		{
			this.raised = true;
			this.play();
		}
	}
	
	wire.prototype.lower = function() {
		if(!this.raised)
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
	
	var w = {
		"play" : this.audio.playUfo.bind(this.audio),
		"pause" : this.audio.ufo.pause.bind(this.audio.ufo),
		"raise" : function() { this.play(); },
		"lower" : function() { this.pause(); }
	};
	
	this.wires[7] = w;
	

	
}

function FlipFlop( flipped, flopped ) {
	this.flipped = flipped;
	this.flopped = flopped;
	this.value = this.flipped;
	
	this.flipflop = function() {
		var v = this.value;
		if( this.value == this.flipped )
		{
			this.value = this.flopped;
		}
		else
		{
			this.value = this.flipped;
		}
		return v;
	}
}

// RST n instruction
function rst( n ) {
	return (0xc7|(n<<3));
}		


	//
	//	0x01	(1)
	//	0x02 (2)
	//	0x04 (3)
	//	0x08 (4)
	//	0x10 (5)
	//	0x20 (6)
	//	0x40 (7)
	//	0x80 (8)


function gameConsole(canvas) {
	this.inP0 = new hInPort();
	this.inP1 = new hInPort();
	this.inP2 = new hInPort();
	this.inP3 = new hInPort();
	
	this.outP3 = new hOutPort();
	this.outP5 = new hOutPort();
	this.dip = new dipSwitch();
	this.player = new audioPlayer(enableAudio());	
	// input port 0
	
	this.dip.wireSwitch( this.inP0.getWire(0), 4);
	this.inP0.getWire(1).raise();
	this.inP0.getWire(2).raise();
	this.inP0.getWire(3).raise();
	this.fireBtn 	= new Btn(  this.inP0.getWire( 4 ) );
	this.leftBtn 	= new Btn( this.inP0.getWire( 5 ) );
	this.rightBtn 	= new Btn( this.inP0.getWire( 6 ) );
	this.inP0.getWire(7).raise();	// ? tied to demux port 7 ?
	
	// input port 1
	
	this.coinBtn 	= new Btn( this.inP1.getWire( 0 ) );
	this.mPlayBtn 	= new Btn( this.inP1.getWire( 1 ) );
	this.sPlayBtn 	= new Btn( this.inP1.getWire( 2 ) );
	// this.inP1.getWire( 3 ).raise();	// always set.
	this.fireP1Btn = new Btn(  this.inP1.getWire( 4 ) );
	this.leftP1Btn = new Btn( this.inP1.getWire( 5 ) );
	this.rightP1Btn = new Btn( this.inP1.getWire( 6 ) );
	this.inP1.getWire( 7 ).lower();	// not connected.
	
	
	// input port 2
	this.dip.wireSwitch( this.inP2.getWire(0), 3 );
	this.dip.wireSwitch( this.inP2.getWire(1), 5 );
	this.tiltBtn = new Btn( this.inP2.getWire(2) );
	this.dip.wireSwitch( this.inP2.getWire(3), 6 );
	this.fireP2Btn = new Btn(  this.inP2.getWire( 4 ) );
	this.leftP2Btn = new Btn( this.inP2.getWire( 5 ) );
	this.rightP2Btn = new Btn( this.inP2.getWire( 6 ) );
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
	
	this.flipflop = new FlipFlop( rst(1), rst(2) );
	
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
		this.cpu.reset();
		this.cpu.load(base_addr, code);
	}
	
	this.interruptTimer = 0;
	
	function doInterrupt(cpu,flipflop) {
		if( cpu.IF )
			cpu.interrupt( flipflop.flipflop() );
	}
	
	this.startInterrupts = function(interval) {
		if( this.interruptTimer == 0 )
			this.interruptTimer = window.setInterval( doInterrupt.bind(this,this.cpu,this.flipflop), interval );		
	}
	
	this.stopInterrupts = function() {
		if( this.interruptTimer != 0 )
			this.interruptTimer = window.clearInterval( this.screenTimer );
		this.interruptTimer = 0;
	}
	
	var ctx = canvas.getContext("2d");
	this.screen = new video.Screen(this.cpu, ctx,  canvas.width, canvas.height, false, 0);
	this.screen.setBackground( document.getElementById("BGCOLOR").value);
	this.screen.setForeground( document.getElementById("FGCOLOR").value);
	this.screen.clear();
	this.screenTimer = 0;
	
	function render(screen) {
		screen.render();
	}
	
	this.startVideo = function(interval) {
		if( this.screenTimer == 0 )
			this.screenTimer = window.setInterval(render.bind(this,this.screen), interval );
	}
	
	this.stopVideo = function() {
		if( this.screenTimer != 0 )
			this.screenTimer = window.clearInterval( this.screenTimer );
		this.screenTimer = 0;
	}
	
	function runCpu(numSteps, interval) {
		this.cpu.run(numSteps);
		this.cpuTimer = window.setTimeout( runCpu.bind(this,numSteps,interval) , interval );
	}
	
	this.cpuTimer = 0;	
	this.runCpu = function(interval, numSteps) {
		if( this.cpuTimer == 0 )
			this.cpuTimer = window.setTimeout( runCpu.bind(this,numSteps, interval) , interval );
	}
	
	this.stopCpu = function(interval, numSteps) {
		if( this.cpuTimer != 0 )
			this.cpuTimer = window.clearInterval( this.cpuTimer );
		this.cpuTimer = 0;
	}
	
	this.start = function() {
		this.runCpu(4, 2000);
		this.startVideo(16);
		this.startInterrupts(4);
	}
	
	this.stop = function() {
		this.stopInterrupts();
		this.stopVideo();
		this.stopCpu();
	}
}

// var go = false;
// var console;


function onLoad() {
	var code = invadersRom ;

	var canvas = document.getElementById("SCREEN");
	var console = new gameConsole(canvas);

	console.loadRom(0, code);
	function btn(code) {
		var btn;
		switch(code)
		{
			case 67:
				btn = console.coinBtn;break;
			case 50:
				btn = console.mPlayBtn;break;
			case 49:
				btn = console.sPlayBtn;break;
			case 37:
			case 65:
				btn = console.leftP1Btn;break;
			case 39:
			case 68:
				btn = console.rightP1Btn;break;
			case 32:
				btn = console.fireP1Btn;break;
		}
		return btn;
	}
	var onKeyDown = function(e) {
		var b = btn(e.keyCode);
		if( b != undefined )
			b.down();
	}

	var onKeyUp = function(e) {
		var b = btn(e.keyCode);
		if( b != undefined )
			b.up();
	}
	
	window.document.addEventListener("keydown", onKeyDown, false);
	window.document.addEventListener("keyup", onKeyUp, false);
	canvas.addEventListener("keydown", onKeyDown, false);
	canvas.addEventListener("keyup", onKeyUp, false);
	
	console.start();
}

//~ function toggle() {
	//~ go = go ? false : true;
	//~ if( go )
	//~ {
		//~ console.start();
	//~ }
	//~ else
	//~ {
		//~ console.stop();
	//~ }
//~ }

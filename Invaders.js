var cpu = cpu8080.create( 65536 );
var screen;
var go = false;
var alt_interrupt = 0;

function rst( n ) {
	return (0xc7|(n<<3));
}		

function onLoad() {
	var code = invadersRom ;		
	cpu.load(0, code);
	var canvas = document.getElementById("SCREEN");
	ctx = canvas.getContext("2d");
	screen = new video.Screen(cpu, ctx,  canvas.width, canvas.height, false, 0);
}

function processInterrupts() {
	if( cpu.IF )
	{
		if( alt_interrupt == 0)
		{
			cpu.interrupt(rst(1));
		}
		else
		{
			cpu.interrupt(rst(2));
		}
		alt_interrupt = 1-alt_interrupt;
	}
	
}

function run() {
	cpu.run(1000);
	processInterrupts();
	screen.render();
}

function reset() {
	if( go )
		toggle();

	cpu.reset();
	screen.clear();
	cpu.load(invadersRom);
}

function toggle() {
	go = go ? false : true;
	var b = document.getElementById("RUN");
	if( go )
	{
		step = 0;
		b.value = "stop...";
		timer = setInterval(run, 16);
	}
	else
	{
		b.value = "run...";
		clearInterval(timer);
	}
}

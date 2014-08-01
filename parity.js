
if( typeof(print) == "undefined" && typeof(WScript) == "object")
{
	print = new Function("a", "WScript.Echo(a);");
}

function parity( n )
{
	var x = n & 0xFF;
	var nSet = 0;
	while(n != 0)
	{
		if( n & 1 )
			++nSet;
		n = n >> 1;
	}
	return nSet;
}

function even( n )
{
	return ( (n&1)==0);
}

for( var i=0; i<256; ++i )
{
	var p = parity(i);
	var str = "" + i + ": num bits set: " + p + (even(p) ? " even" : " odd");
	print(str);
}

print("cpu.prototype.parityTable = [");

for( var i=0; i<16; ++i )
{
	var row = "";
	for( var j=0; j<16; ++j )
	{
		var n = i*16+j;
		var p = parity(n);
		row +=  (even(p) ? "1," : "0,")
	}
	print( row );
}

print( "];");
print( "cpu.prototype.Parity = function(n) {\n\treturn this.parityTable[ n& 0xFF ];\n}");
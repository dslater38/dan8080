
var arr = new Uint8Array(3);


for( var i=0; i<256; ++i )
{
	for( var j=0; j<256; ++j )
	{
		var s1 = i+j;
		arr[0] = i;
		arr[1] = j;
		arr[2] = arr[0] + arr[1];
		
		var ov1 = (s1 > 255 || s1 < 0 );
		var ov2 = (arr[2] < arr[1]);
		
		if( ov1 != ov2 )
		{
			print("Carry Test Failure for " + i.toString() + " + " + j.toString() );
			print("ov1 == " + ov1.toString() + " ov2 == " + ov2.toString() );
		}
		else
		{
			print( arr[0].toString() + " + " + arr[1].toString() + " = " + arr[2].toString() + " CF == " + (ov1 ? "1" : "0" ));
		}
	}
}
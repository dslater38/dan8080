precision mediump float;
uniform int operation;
uniform vec4 foreground;
uniform vec4 background;
uniform sampler2D bitmap;
varying highp vec2 tex2;

//const int opClear = 0;
//const int opCopyScreen = 1;


vec3 rowColor( int row ){
	if(row < 2)
		return vec3(1.0, 0.0, 0.0);
	else if(row < 3)
		return vec3(0.0, 1.0, 0.0);
	else if(row < 6)
		return vec3(0.0, 0.0, 1.0);
	else if( row < 8 )
		return vec3(0.0, 1.0, 1.0);
	else if( row < 16 )
		return vec3(1.0, 0.0, 1.0);
	else if( row < 18 )
		return vec3(1.0, 1.0, 0.0);
	else if( row  < 224 )
		return vec3(1.0, 0.2666666667, 0.2666666667);
	else 
		return vec3(0.0, 1.0, 0.0);
}

void clear() {
     gl_FragColor = background;
}

int mod(int a, int b) {
	return a-b*(a/b);
}

bool bitSet(int val, int bit) {
	int t = 1;

	for(int i=0;i<8 ;i++) {
		if( i>=bit )
			break;
		t *= 2;
	}
	val /= t;
	return (mod(val,2) == 1);
}

float component(vec4 v, int i){
	if( i == 0 ) return v.r;
	if( i == 1 ) return v.g;
	if( i == 2 ) return v.b;
	if( i == 3) return v.a;
	return 0.0;
}

void copyPixel6(highp vec2 c)
{
	int px = int(223.0*(c.x));
	int py = int(255.0*(c.y));
	int bitNum = px*256+py;
	int byteNum = bitNum / 8;
	int pixelNum = bitNum / 32;
	
	highp float mulFac = 5.5803571428571428571428571428571e-4; //5.5834729201563372417643774427694e-4;
	
	highp float addFac = 2.7901785714285714285714285714286e-4;
	
	float offset = float(pixelNum)*mulFac +  addFac; // (float(pixelNum)+0.5)*mulFac; // 0.00055803571428571;
	vec4 texel = texture2D(bitmap, vec2(offset, 0.0) );
	
	int whichByte = mod(byteNum,4);
	float value = component( texel, whichByte );
	
	int bit = mod(bitNum,8);
	bool isSet = bitSet(int(255.0*value+0.5), bit );
	
	vec3 clr = rowColor(py);
	
	gl_FragColor = isSet ? vec4(clr.rgb,1.0) : vec4(0.0,0.0,0.0,1.0);
}

const highp float mulFac = 5.5803571428571428571428571428571e-4; //5.5834729201563372417643774427694e-4;
const highp float addFac = 2.7901785714285714285714285714286e-4;

void copyPixel(highp vec2 c)
{
	int px = int(223.0*(c.x));
	int py = int(255.0*(c.y));
	int bitNum = px*256+py;
	int byteNum = bitNum / 8;
	int pixelNum = bitNum / 32;
	
	float offset = float(pixelNum)*mulFac +  addFac; // (float(pixelNum)+0.5)*mulFac; // 0.00055803571428571;
	vec4 texel = texture2D(bitmap, vec2(offset, 0.0) );
	
	int bit = mod(bitNum,32);
	float value;
	if( bit < 8 )
		value = texel.r;
	else if( bit < 16 )
		value = texel.g;
	else if( bit < 24 )
		value = texel.b;
	else
		value = texel.a;
	
	bit = mod(bit,8);
	
	bool isSet = bitSet(int(255.0*value+0.5), bit );
	
	vec3 clr = rowColor(py);
	
	gl_FragColor = isSet ? vec4(clr.rgb,1.0) : background;
}

void main()
{
	if( operation == 0 )
	{
		clear();
	}
	else
	{
		copyPixel(tex2);
	}
}
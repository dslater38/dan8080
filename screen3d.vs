attribute vec2 pos;
varying mediump vec2 tex2;


const vec2 off = vec2(-1.0, -1.0);

void main()
{
	vec2 loc = (2.0*pos) + off;
	gl_Position = vec4(loc, 0.0, 1.0);
	tex2 = pos;
}

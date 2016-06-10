attribute vec2 pos;
attribute vec2 tex;
varying highp vec2 tex2;




void main()
{
	gl_Position = vec4(pos, 0.0, 1.0);
	tex2 = pos;
}

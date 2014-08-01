
function bar(size) {
	function toUint32(v) { return v >>> 0 ; }
	arr = new Array(size);

	this._getter = function(ii) { return arr[toUint32(ii)]; }
	this._setter = function(ii, value ) { arr[toUint32(ii)] = value; }
	var c = this;
	
	function makeArrayAccessor(idx) {
		Object.defineProperty( c, idx, {
		      'get': function() { return c._getter(idx); },
		      'set': function(v) { c._setter(idx, v); },
		      enumerable: true,
		      configurable: false			
		});
	}
	
	for( var i=0; i<size; i+=1 )
	{
		makeArrayAccessor(i);
	}
	
	//~ Object.defineProperty( c, 0, {
			//~ 'get' : function()
			//~ {
				//~ //print(" ---- " + i + " ---- " + arr[0]);
				//~ return arr[0];
			//~ },
			//~ 'set' : function(v) 
			//~ { 
				//~ //print(" +++ " + 0 );
				//~ arr[0] = v;
			//~ },
			//~ enumerable: true,
			//~ configurable: false		
	//~ });
	//~ Object.defineProperty( c, 1, {
			//~ 'get' : function()
			//~ {
				//~ //print(" ---- " + i + " ---- " + arr[1]);
				//~ return arr[1];
			//~ },
			//~ 'set' : function(v) 
			//~ { 
				//~ //print(" +++ " + 1 );
				//~ arr[1] = v;
			//~ },
			//~ enumerable: true,
			//~ configurable: false		
	//~ });
	//~ for( var i=0; i<size; i+=1 )
	//~ {
		//~ print("===> " + toUint32(i) );
		//~ Object.defineProperty( c, i, { 
			//~ 'get' : function()
			//~ {
				//~ print(" ---- " + i + " ---- " + arr[i]);
				//~ return arr[i];
			//~ },
			//~ 'set' : function(v) 
			//~ { 
				//~ print(" +++ " + i );
				//~ arr[i] = v;
			//~ },
			//~ enumerable: true,
			//~ configurable: false
		//~ });
	//~ }
}

var b = new bar(10);


for( var i=0; i<10; ++i )
	b[i] = -(i+1);
for( var i=0; i<10; ++i )
	print(b[i]);

//b[1] = "foo";

//~ print(b[0] );
//~ print(b[1] );
//~ //print(b[1] );
//~ // print(b.arr.toString());
//~ for( var i in b )
//~ {
	//~ print(i.toString() + "  |  " + b[i] );
//~ }
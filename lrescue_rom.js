var fs = require('fs');

fnames = [
	'lrescue1.js',
	'lrescue2.js',
	'lrescue3.js',
	'lrescue4.js',
	'lrescue5.js',
	'lrescue6.js',
];

for( var f = 0; f<fnames.length; ++f )
{
	var path = './' + fnames[f];
	var code = fs.readFileSync(path, { encoding : 'utf8'} );
	eval(code);
}


console.log(typeof(lrescue1));
console.log((lrescue1.length));


var length = 	lrescue1.length +
			lrescue2.length +
			lrescue3.length +
			lrescue4.length +
			lrescue5.length +
			lrescue6.length;
			
console.log((length));
var arr = new Buffer(length);


var a = [
	lrescue1,
	lrescue2,
	lrescue3,
	lrescue4,
	lrescue5,
	lrescue6
];

var index = 0;

for( var i=0; i<a.length; ++i )
{
	var b = a[i];
	for( var j=0; j<b.length; ++j )
	{
		arr[index] = b[j];
		++index;
	}
}
console.log((index));

var wstream = fs.createWriteStream('./lrescue.rom');

wstream.write(arr);


wstream.end();




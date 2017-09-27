const express = require('express');
const bp = require('body-parser');
const app = express();

app.use(bp.urlencoded({ extended: false }))
app.use(bp.json())

app.get('/', function(req, res) {

	res.sendFile('./index.html', {root: __dirname });

});


// -- string conv section
// soon to be replaced by inline map filter es6 goodness
function getInt(c) {
	// https://stackoverflow.com/questions/3145030/convert-integer-into-its-character-equivalent-in-javascript#3145054
	return 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(c);
}

function getNums(str) {

	let op = "";

	for(let i=0; i<str.length; i++) {
		op += getInt(str[i]) + " ";
	}

	return op.slice(0, -1); // last char will be a <space>, remove it 
}
// -- end of conv section

app.post('/do-stuff', function(req, res) {

	let res_msg = {
		error: 1,
		msg: "invalid parameters"
	}

	if( ! req.body.hasOwnProperty('rev') || 
		! req.body.hasOwnProperty('upc') || 
		! req.body.hasOwnProperty('num') ||
		! req.body.hasOwnProperty('str') ) {

		res_msg.msg = "missing parameters";

		res.json(res_msg);
		return;

	}

	let op_str = req.body.str;

	if(op_str.length < 1) {
		res_msg.msg = "no string passed";;

		res.json(res_msg);
		return;
	}


	if(req.body.rev == true) {
		// the other two cases need a string to do stuff
		// here we rebuild it and assign it to op_str
		op_str = "";
		for(let i=req.body.str.length - 1; i >= 0; i--) {
			op_str += req.body.str[i];
		}

	}

	if(req.body.upc == true) {
		op_str = op_str.toUpperCase();
	}

	if(req.body.num == true) {
		op_str = getNums(op_str);
	}

	res_msg.error = 0;
	res_msg.msg = op_str;

	res.json(res_msg);

});

app.listen(1337, function() {
	console.log("=> port: 1337")
})

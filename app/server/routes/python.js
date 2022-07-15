const express = require('express')
const { spawn } = require('child_process');
const Router = express.Router();

Router.get('/script1', (req, res) => {
	let data1;
	// spawn new child process to call the python script
	const python = spawn('python', ['python/script1.py']);
	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		data1 = data.toString();
	});
	// in case of error, handle it
	python.stderr.on('data', (data) => {
		console.log(data.toString());
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(data1)
	});
})

Router.get('/script2/:fname/:lname', (req, res) => {
	let data2;
	// spawn new child process to call the python script
	const python = spawn('python3', ['python/script2.py', req.params.fname, req.params.lname]);
	// collect data from script
	python.stdout.on('data', function (data) {
		console.log('Pipe data from python script ...');
		data2 = data;
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code}`);
		// send data to browser
		res.send(data2)
	});
})

module.exports = Router;
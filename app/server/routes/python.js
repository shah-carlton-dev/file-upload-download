const express = require('express')
const { spawn } = require('child_process');
const Router = express.Router();

Router.post('/sendFile', (req, res) => {
	let data1;
	// spawn new child process to call the python script
	const python = spawn('python', ['python/script1.py', req.query.filepath], { stdio: 'inherit' });
	// collect data from script
	python.on('data', (data) => {
		console.log('Pipe data from python script ...');
		data1 = data.toString();
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`child process close all stdio with code ${code} -----------------------------------------------`);
		// send data to browser
		res.send(data1)
	});
})

module.exports = Router;
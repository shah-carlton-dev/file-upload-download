const express = require('express')
const { spawn } = require('child_process');
const Router = express.Router();

const dashes = "----------------------------"

Router.post('/sendFile', (req, res) => {
	let data;
	// spawn new child process to call the python script
	const python = spawn('python3', ['python/sound.py', req.query.filepath], { stdio: 'inherit' });
	// collect data from script
	python.on('data', (output) => {
		console.log('Pipe data from python script ...');
		data = output.toString();
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`${dashes} python process shutting down all stdio - code: ${code} ${dashes}`);
		// send data to browser
		console.log(data1)
	});
})

module.exports = Router;
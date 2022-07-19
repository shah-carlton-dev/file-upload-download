const express = require('express')
const { spawn } = require('child_process');
const Router = express.Router();

const dashes = "----------------------------"

Router.post('/sendFile', (req, res) => {
	let data1;
	// spawn new child process to call the python script
	const python = spawn('python3', ['python/script1.py', req.query.filepath], { stdio: 'inherit' });
	// collect data from script
	python.on('data', (data) => {
		console.log('Pipe data from python script ...');
		data1 = data.toString();
	});
	// in close event we are sure that stream from child process is closed
	python.on('close', (code) => {
		console.log(`${dashes} python process shutting down all stdio - code: ${code} ${dashes}`);
		// send data to browser
		res.send(data1)
	});
})

module.exports = Router;
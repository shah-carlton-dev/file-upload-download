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
	});
	res.send("done");
})

// This route creates an MP3 version of the video file it references
Router.post('/createMP3', (req, res) => {
	try {
		let data;
		const python = spawn('python3', ['python/convert.py', req.query.filepath], { stdio: 'inherit' });
		// python.on('data', (output) => {
		// 	console.log('Pipe data from python script...');
		// 	data = output.toString();
		// })
		python.on('close', (code) => {
			console.log(`${dashes} python process [CONVERT] shutting down all stdio - code: ${code} ${dashes}`);
		})
		res.send(`file ${req.query.filepath} uploaded successfully.`);
	} catch (error) {
		res.status(400).send('Error while converting video to mp3. Try again later.');
		console.log("error converting file");
		console.log(error);
	}
})
module.exports = Router;
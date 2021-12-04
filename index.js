const express = require('express');
const ws = require('ws');
const http = require('http');

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000
server.use((req, res) => res.sendFile('/index.html', { root: __dirname }))
server.listen(port, () => {
	console.log(`server started on part ${port}`)
})

const wss = new ws.Server({ server })

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(`received: ${message}`);
		ws.send(`Hello, you sent -> ${message}`)
	})
	ws.send('Hi there, I am a WebSocket Server');
})
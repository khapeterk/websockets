const express = require('express');
const { Server } = require('ws');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server });

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(`received: ${message}`);
		ws.send(`Hello, you sent -> ${message}`)
	})
	ws.send('Hi there, I am a WebSocket Server');
})
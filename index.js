const express = require('express');
const ws = require('ws');
const http = require('http');

const app = express();
app.use((req, res) => res.sendFile('/index.html', { root: __dirname }))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on part ${port}`)
})

const server = http.createServer(app);
const wss = new ws.Server({ server })

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(`received: ${message}`);
		ws.send(`Hello, you sent -> ${message}`)
	})
	ws.send('Hi there, I am a WebSocket Server');
})
const express = require('express');
const { Server } = require('ws');

const app = express();
app.use((req, res) => res.sendFile('/index.html', { root: __dirname }))

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started on part ${port}`)
})

const wss = new Server({ app })

wss.on('connection', (ws) => {
	ws.on('message', (message) => {
		console.log(`received: ${message}`);
		ws.send(`Hello, you sent -> ${message}`)
	})
	ws.send('Hi there, I am a WebSocket Server');
})
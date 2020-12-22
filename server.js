const express = require('express');
const { Server } = require('ws');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use((_req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server: app });
const sendToAllClients = (options) => wss.clients.forEach((client) => client.send(options));

let dataUrl = '';

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', (message) => {
    console.log('received: %s', message);
    dataUrl = message;
  });
});

setInterval(() => sendToAllClients(dataUrl), 100);

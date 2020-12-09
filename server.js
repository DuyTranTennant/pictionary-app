'use strict';

const express = require('express');
const { Server } = require('ws');
var path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));



const wss = new Server({ server: app });

var dataUrl;
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.on('close', () => console.log('Client disconnected'));
  ws.on('message', function incoming(message) {
    dataUrl = message;
  });

});

setInterval(() => {
  wss.clients.forEach((client) => {
    // client.send(new Date().toTimeString());
    client.send(dataUrl);
  });
}, 100);
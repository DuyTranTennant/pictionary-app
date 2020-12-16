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
  let start = false
  ws.on('message', function incoming(message) {
    if (message === 'Start' && start == false){
      start = true
      console.log(message)
      wss.clients.forEach((client) => {
        client.send('Disable start');
      });
      return
    }
    if (message === 'Start' && start == true){
      console.log('Already started')
      return
    }

    if (message === 'Stop' && start == true){
      start = false
      console.log(message)
      return
    }
    if (message === 'Stop' && start == false){
      console.log('Hasnt started')
      return
    }
    dataUrl = message;
  });

});

setInterval(() => {
  wss.clients.forEach((client) => {
    client.send(dataUrl);
  });
}, 100);
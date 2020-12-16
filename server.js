'use strict';

const express = require('express');
const { Server } = require('ws');
var path = require('path');
const { START, STOP, DRAWING_STARTED, DRAWING_STOPPED, DRAWING } = require('./public/constants');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));



const wss = new Server({ server: app });

let dataUrl, start;

const init = () => {
  dataUrl = '';
  wss.clients.forEach((client) => client.send(JSON.stringify({command: DRAWING, payload: dataUrl })));

  start = false;
  wss.clients.forEach((client) => client.send(JSON.stringify({ command: DRAWING_STOPPED })));

  console.log('Server initialized')
}

init();

wss.on('connection', (ws) => {
  console.log('Client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected')
    init();
  });

  ws.on('message', (message) => {
    switch(message) {
      case START:
        if (start) {
          console.log('Already started')
          break;
        }
        
        start = true
        console.log('Start Drawing')
        wss.clients.forEach((client) => client.send(JSON.stringify({command: DRAWING_STARTED})));
        break;

      case STOP:
        if (!start) {
          console.log("Drawing hasn't started yet")
          break;
        }

        start = false
        console.log('Stop drawing')
        wss.clients.forEach((client) => client.send(JSON.stringify({command: DRAWING_STOPPED})));
        break;
      default:
        wss.clients.forEach((client) => client.send(JSON.stringify({command: DRAWING, payload: message})));
    }
  });
});

const express = require('express');
const { Server } = require('ws');
const path = require('path');
const {
  START, STOP, SHOW_PREVIEW, DRAWING_STOPPED, DRAWING, SHOW_CANVAS, INITIALISE, CHAT
} = require('./public/constants');

const PORT = process.env.PORT || 3000;
const INDEX = '/index.html';

const app = express()
  .use(express.static(path.join(__dirname, 'public')))
  .use((_req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const wss = new Server({ server: app });
const sendToAllClients = (options) => wss.clients.forEach((client) => client.send(options));

let dataUrl;
let start;

const init = () => {
  dataUrl = '';
  wss.clients.forEach((client) => client.send(JSON.stringify({ command: DRAWING, payload: dataUrl })));

  start = false;
  wss.clients.forEach((client) => client.send(JSON.stringify({ command: INITIALISE })));

  console.log('Server initialized');
};

init();

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
    init();
  });

  ws.on('message', (message) => {
    const { command } = JSON.parse(message);
    switch (command) {
      case START:
        if (start) {
          console.log('Already started');
          break;
        }

        start = true;
        console.log('Start Drawing');
        wss.clients.forEach((client) => {
          if (client !== ws){
            client.send(JSON.stringify({ command: SHOW_PREVIEW }));
          }
        })
        ws.send(JSON.stringify({ command: SHOW_CANVAS }))

        break;

      case STOP:
        if (!start) {
          console.log("Drawing hasn't started yet");
          break;
        }

        start = false;
        console.log('Stop drawing');
        wss.clients.forEach((client) => client.send(JSON.stringify({ command: DRAWING_STOPPED })));
        wss.clients.forEach((client) => client.send(JSON.stringify({ command: INITIALISE })));
        break;
      case CHAT:
        wss.clients.forEach((client) => {
          if (client !== ws){
            client.send(JSON.stringify({ command: CHAT, message: JSON.parse(message).message }));
          }
        })
        break;
      default:
        wss.clients.forEach((client) => client.send(JSON.stringify({ command: DRAWING, payload: JSON.parse(message).message })));
    }
  });
});

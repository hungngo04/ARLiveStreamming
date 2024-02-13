const express = require('express');
const http = require('http');
const fs = require('fs');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let users = {};

io.on('connection', (socket) => {
  if (Object.keys(users).length < 2) {
    console.log('An user connected:', socket.id);
    users[socket.id] = socket;

    // Notify the first connected user to make the call if there are two users
    if (Object.keys(users).length === 2) {
        const initiatorId = Object.keys(users)[0];
        users[initiatorId].emit('initiateCall', true);
    }
      
    socket.on('Disconnect', () => {
      delete users[socket.id];
      console.log('An user disconnected:', socket.id);
    });

    socket.on('offer', (data) => {
      for (let id in users) {
        if (id !== socket.id) {
          users[id].emit('offer', data);
          break;
        }
      }
    });

    socket.on('answer', (data) => {
      for (let id in users) {
        if (id !== socket.id) {
          users[id].emit('answer', data);
          break;
        }
      }
    });

    socket.on('candidate', (data) => {
      for (let id in users) {
        if (id !== socket.id) {
          users[id].emit('candidate', data);
          break;
        }
      }
    });
  } else {
    socket.emit('room_full', true);
    socket.disconnect();
    console.log('Connection denied. Room is full.');
  }
});

const PORT = process.env.PORT || 3006;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

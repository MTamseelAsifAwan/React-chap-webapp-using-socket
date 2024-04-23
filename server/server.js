const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: '*',
  },
});

const users = [];

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', ({ username }, callback) => {
    const existingUser = users.find(user => user === username);

    if (existingUser) {
      return callback('Username is taken. Please choose another.');
    }

    socket.join('chat');

    users.push(username);
    io.to('chat').emit('userList', users);

    socket.emit('message', { user: 'Admin', text: `Welcome, ${username}!` });
    socket.broadcast.to('chat').emit('message', { user: 'Admin', text: `${username} has joined the chat.` });

    callback();
  });

  socket.on('sendMessage', ({ user, text }, callback) => {
    io.to('chat').emit('message', { user, text });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');

    const index = users.indexOf(socket.username);

    if (index !== -1) {
      users.splice(index, 1);
    }

    io.to('chat').emit('userList', users);
    io.to('chat').emit('message', { user: 'Admin', text: `${socket.username} has left the chat.` });
  });
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

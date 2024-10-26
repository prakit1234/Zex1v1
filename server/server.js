const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('client'));

const players = {}; // Store players' positions

io.on('connection', (socket) => {
  console.log(`Player connected: ${socket.id}`);
  
  // Initialize new player's position
  players[socket.id] = { x: 0, z: 0 };

  // Listen for player's movement
  socket.on('move', (position) => {
    players[socket.id] = position;
    io.emit('updatePlayers', players); // Sync all players
  });

  // Remove player on disconnect
  socket.on('disconnect', () => {
    delete players[socket.id];
    io.emit('updatePlayers', players);
    console.log(`Player disconnected: ${socket.id}`);
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});

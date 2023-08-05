// Dependencies
const http = require('http');
const socketIO = require('socket.io');

// Create a HTTP server
const server = http.createServer();
const io = socketIO(server);

// Event listener for a new client connection
io.on('connection', (socket) => {
  console.log('New client connected!');

  // Simulate sending notifications to the client every 5 seconds
  const notificationInterval = setInterval(() => {
    const notification = `Notification at ${new Date().toLocaleTimeString()}`;
    socket.emit('notification', notification);
  }, 5000);

  // Event listener for a client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected!');
    clearInterval(notificationInterval);
  });
});

// Start the server
const port = 3000;
server.listen(port, () => {
  console.log(`WebSocket notification server is listening on port ${port}`);
});

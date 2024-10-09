const app = require('./app');
const http = require('http');
const socketIo = require('socket.io');

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  socket.on("username", username => {
    socket.username = username;
    console.log(`Usuario ${socket.username} logeado`)
  })

  socket.on('message', data => {
    console.log(data);
    io.emit("message", `${socket.username}: ${data}`)
  });
});

server.listen(3500, () => {
  console.log(`Servidor corriendo en el puerto 3500`);
});
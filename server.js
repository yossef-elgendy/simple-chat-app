const io = require('socket.io')(8080, {
    cors: {
        origin: "http://localhost:8000",
        methods: ["GET", "POST"]
    }
});

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

let users = {};

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(cors());

io.on('connection', socket => {
    
   socket.on('new-user', name => {
        users[socket.id] = name 
        socket.broadcast.emit('user-connection-message', name)
   });

    socket.on('send-chat-message', message => {
        socket.broadcast.emit('chat-message', {message: message, name:users[socket.id]})
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete users[socket.id] 
    });
});

app.get('/', (req, res) => {
    res.sendFile('index.html');
})

app.listen(8000, () => {
    console.log(`we are running on port 8000`);
});
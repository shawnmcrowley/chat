const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const messages = [
    {name: "Shawn", message: "Hello"},
    {name: "Nala", message: "Woof"}
]

app.get('/messages', (req, res) => {
    res.send(messages);
})

app.post('/messages', (req, res) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
})

io.on('connection', (socket) => {
    console.log("User Connected...");
})

const server = http.listen(PORT, () => {
console.log("Server is Running....", server.address().port);
});


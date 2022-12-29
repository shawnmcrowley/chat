const express  = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const db = 'mongodb+srv://scrowley:Vj13GxHi8907OsDg@cluster0.hyutkja.mongodb.net/chat-app?retryWrites=true&w=majority'

const Message = mongoose.model('Message', {
    name: String,
    message: String
})


app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
    
})

app.post('/messages', (req, res) => {
    const message = new Message(req.body);
    message.save((err) => {
        if (err) {
        res.sendStatus(500);
        } else {
        io.emit('message', req.body);
        res.sendStatus(200);
        }
    })
})

io.on('connection', (socket) => {
    console.log("User Connected...");
})

mongoose.set('strictQuery', true);
mongoose.connect(db, (err) => {
    console.log("Database Connected...");
})
const server = http.listen(PORT, () => {
console.log("Server is Running....", server.address().port);
});


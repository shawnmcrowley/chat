const express  = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

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
    res.sendStatus(200);
})

const server = app.listen(PORT, () => {
console.log("Server is Running....", server.address().port);
});


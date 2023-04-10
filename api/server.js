const express = require('express');
const randomId = require('random-id');
const app = express(),
    bodyParser = require("body-parser");
port = 3070;

// place holder for the data
const users = [
    {
        id: "1",
        firstName: "first1",
        lastName: "last1",
        email: "abc@gmail.com"
    },
    {
        id: "2",
        firstName: "first2",
        lastName: "last2",
        email: "abc@gmail.com"
    },
    {
        id: "3",
        firstName: "first3",
        lastName: "last3",
        email: "abc@gmail.com"
    },
    {
        id: "4",
        firstName: "first4",
        lastName: "last4",
        email: "abc@gmail.com"
    }
];

const players = [
    {
        id: "1",
        name: "Max Mustermann",
        club: "TKD Club",
        height: null,
        lastUpdate: null,
    },
    {
        id: "2",
        name: "Marianna Mustermann",
        club: "TKD Club",
        height: null,
        lastUpdate: null
    }
]
app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

// --- USERS ---
app.get('/api/users', (req, res) => {
    console.log('api/users called!!!!!!!')
    res.json(users);
});

app.post('/api/user', (req, res) => {
    const user = req.body.user;
    user.id = randomId(10);
    console.log('Adding user:::::', user);
    users.push(user);
    res.json("user addedd");
});

// --- PLAYERS ---
app.get('/api/player/:id', (req, res) => {
    let id = req.params.id;
    console.log("Queried player with id " + id)
    res.json(players.find(e => e.id == id))
})

app.get('/api/player', (req, res) => {
    res.json(players)
})

app.post('/api/player', (req, res) => {
    const id = req.body.id;
    const newHeight = req.body.height;
    console.log("Update player with id " + id + " with new height " + newHeight)

    let indexOfPlayer = players.findIndex(e => e.id == id);
    players[indexOfPlayer].height = newHeight;
    players[indexOfPlayer].lastUpdate = Date.now()

    console.log("Updated player " + JSON.stringify(players[indexOfPlayer]))
    res.json(players[indexOfPlayer])
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});
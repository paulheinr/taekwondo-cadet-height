const express = require('express');
const app = express(),
    bodyParser = require("body-parser");

const sqlite3 = require('sqlite3');

const fs = require('fs');
const https = require('https');

port = 3070;

let db = new sqlite3.Database('./cadets.db', sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the cadet database.');
    }
});

app.use(bodyParser.json());
app.use(express.static(process.cwd() + '/my-app/dist'));

// --- PLAYERS ---
app.get('/api/player/:id', (req, res) => {
    const sql = "select * from Fighter where number = ?";
    const params = ["ZZZ-" + req.params.id];
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        if (row === undefined) {
            res.status(400).json({"error": "no such player"});
            return;
        }
        res.json(databaseRowToPlayerJson(row))
    })
})

app.get('/api/player', (req, res) => {
    const sql = "select * from Fighter";
    const params = [];
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }
        var result = [];
        rows.forEach(r => result.push(databaseRowToPlayerJson(r)))
        res.json(result)
    })
})

app.patch('/api/player', (req, res) => {
    const sql = "update Fighter set height = ?, lastUpdate = datetime(datetime(),'+2 hours') where number = ?";
    const params = [req.body.height, "ZZZ-" + req.body.id];
    db.run(sql, params, (err, _) => {
        if (err) {
            res.status(400).json({"error": err.message});
            return;
        }

        // query player to return
        const sql_search = "select * from Fighter where number = ?";
        const params = ["ZZZ-" + req.body.id];
        db.get(sql_search, params, (err, row) => {
            if (err) {
                res.status(400).json({"error": err.message});
                return;
            }
            if (row === undefined) {
                res.status(400).json({"error": "no such player"});
                return;
            }
            res.json(databaseRowToPlayerJson(row))
        })
    })
})

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/my-app/dist/index.html');
});

const privateKey = fs.readFileSync('../bin/localhost+1-key.pem', 'utf8');
const certificate = fs.readFileSync('../bin/localhost+1.pem', 'utf8');

const credentials = {
    key: privateKey,
    cert: certificate,
};

https.createServer(credentials, app).listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});

function databaseRowToPlayerJson(row) {
    return {
        id: row.number.slice(4),
        name: row.lastname,
        club: row.club,
        height: row.height,
        lastUpdate: row.lastUpdate,
    }
}
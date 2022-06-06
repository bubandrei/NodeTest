import express from "express";
import __dirname from './__dirname.js';
import bodyParser from 'body-parser';
import connection from "./usersDB.js";

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/get/', (req, res) => {
    connection.query("SELECT * FROM users", (err, data) => {
        console.log(data);
        if (err) return console.log(err);
        res.send(data);
    });
});
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/index.html');
})
app.post('/target/', async (req, res) => {
    try {
        if (!req.body) {
            res.sendStatus(400);
        }
        const { email, firstName, lastName, image, pdf } = req.body;
        connection.query("INSERT INTO users (email, firstName, lastName, image, pdf) VALUES (?,?,?,?,?)",
            [email, firstName, lastName, image, pdf], (err, data) => {
                if (err)
                    return console.log(err);
            })
        res.send("Server is working");
    } catch (e) {
        res.status(500);
    }
});
app.post('/find/', (req, res) => {
    console.log(req.body.email);
    const email = req.body.email;
    connection.query("SELECT * FROM users WHERE email=?", [email], (err, data) => {
        if (err) return console.log(err);
        console.log(data)
        res.send(data);
    });
});

app.post('/delete/', (req, res) => {
    console.log(req.body.email);
    const email = req.body.email;
    connection.query("DELETE FROM users WHERE email=?", [email], (err, data) => {
        if (err) return console.log(err);
        console.log(data)
        res.send('User' + ' ' + email + ' ' + 'delete');
    });
});

async function start() {
    try {
        connection.connect((err) => {
            if (err) {
                console.log('ERROR');
            } else {
                console.log('DataBase sacceded');
            }
        });
        app.listen(PORT, () => {
            console.log(`Running port ${PORT}`);
        })
    } catch (e) {
        // console.log(e);
    }
};
start();
// connection.query("SELECT * FROM users", (err, results) => {
//     console.log(err);
//     console.log(results);
// });
// connection.end();
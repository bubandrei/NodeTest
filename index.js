import express from "express";
import mysql from 'mysql2';
import __dirname from './__dirname.js';
import bodyParser from 'body-parser';

const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ba28051984!',
    database: 'usersdb'

});

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
        // res.render("index.html", {
        //     users: data
        // });
    });
});

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile(__dirname + '/index.html');
})
app.post('/target/', (req, res) => {
    if (!req.body) {
        res.sendStatus(400);
    }
    const email = req.body.email;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    connection.query("INSERT INTO users (name, age) VALUES (?,?)", [name, age], (err, data) => {
        if (err) return console.log(err);
        res.redirect("/");
    })
    console.log(req.body);
    res.status(200).json("Server is working");
})

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
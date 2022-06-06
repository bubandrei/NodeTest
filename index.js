import express from "express";
import mysql from 'mysql2';

const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ba28051984!',
    database: 'usersdb'

});
// connection.connect((err) => {
//     if (err) {
//         console.log('ERROR');
//     } else {
//         console.log('DataBase sacceded');
//     }
// });

const app = express();
app.use(express.json());

// app.get('/', (req, res) => {
//     console.log(req.query);
//     res.status(200).json("Server is working");
// })

app.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json("Server is working");
})

async function start() {
    try {
        connection.connect();
        app.listen(PORT, () => {
            console.log(`Running port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
};
start();
connection.query("SELECT * FROM users", (err, results) => {
    // console.log(err);
    // console.log(results);
});
connection.end();


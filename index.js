import express from "express";
import mysql from 'mysql2';

const PORT = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ba28051984!',
    database: 'usersdb'

});
connection.connect((err) => {
    if (err) {
        console.log('ERROR');
    } else {
        console.log('DataBase sacceded');
    }
});
connection.query("SELECT * FROM users", (err, results, fields) => {
    console.log(err);
    console.log(results);
    // console.log(fields);
})

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

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Running port ${PORT}`);
        })
    } catch (e) {
        console.log(e);
    }
}
start();
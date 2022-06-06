import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Ba28051984!',
    database: 'usersdb'

});

export default connection;
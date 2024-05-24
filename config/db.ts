const mysql= require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root", // Replace 'your_password' with the actual password
    database: "orm_users_data"
});

db.connect((err: Error) => {
    if (err) {
        throw err;
    }
    console.log("Database Connected Successfully");
});

module.exports= db;

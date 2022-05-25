import mysql from "mysql";

export const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

con.connect( error => {
    if (error) {
        console.log("ERROR connection: " + error);
    } else {
        console.log("connected to db");
    };
});

const mysql = require("mysql2");

const conn = mysql.createConnection({

    user:"root",
    host:"localhost",
    password:"Extromile@03",
    database:"crudmysql"

});

// connection

conn.connect((err) => {
    if(err)
        throw err;
    console.log("DB Connected");
})

module.exports = conn;
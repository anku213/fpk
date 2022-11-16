var mysql = require('mysql');

const connection = mysql.createConnection({
    host : "localhost",
    password : "",
    user : "root",
    port : 3306,
    database : "role"
})

connection.connect((err)=>{
    if(err){
        console.log(err.sqlMessage)
    }else{
        console.log('Database connected successfully')
    }
})

module.exports = connection ;

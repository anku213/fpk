var express = require("express");
var connection = require('./conncection')

var app = express();
var port = 4888;

// const data = {
//     userid : "45",
//     fullname: "anku",
//     password: "abc12345",
//     Role: "admin"
// }

app.get('/api/users', (req, res) => {
    userid = req.query.id,
        fullname = req.query.fullname,
        password = req.query.password,
        Role = req.query.Role

    let sql = `select * from tbl_user where id=${userid} and password=${password}`;
    connection.query(sql, (err, result) => {
        if (err) {
            res.send(err.sqlMessage);
        }
        else {
            // res.send(result);
            if (result[0]) {
                // res.send("valid user")
                let uid = result[0].id;
                if (result[0].Role === 'admin') {
                    let sqlQuery = "select * from tbl_user"
                    connection.query(sqlQuery, (err, output) => {
                        res.send(output)
                    })
                }
                else
                //  (result[0].Role === 'student') 
                 {
                    let sqlQuery = `select * from tbl_user where id=${uid}`
                    connection.query(sqlQuery, (err, output) => {
                        res.send(output)
                    })
                }
            }
            else {
                res.send("incorrect user id and password")
            }
        }
        // res.send({
        //     userid : userid,
        //     fullname: fullname,
        //     password: password,
        //     Role: Role
        // });
    });




    // if (Role === 'admin') {
    //     res.send('admin user logged in');
    // } else if (Role === 'staff') {
    //     res.send('staff user logged in');
    // } else if (Role === 'student') {
    //     res.send('student user logged in');
    // } else if (Role === 'teacher') {
    //     res.send('teacher user logged in');
    // } else {
    //     res.send('you are not a authorized user');
    // }

});

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`server is running on ${port} port`);
    }
})
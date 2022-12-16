const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());
app.use(cors({
    credentials : true,
    origin : "*"
}));
// const connection = mysql.createConnection({
//     host : 'localhost',
//     user : "root",
//     password : "root",
//     database : "lisha_vshesh",
//     port : 3306
// })
var connection = mysql.createConnection({
  host : "remotemysql.com",
  user : "wym4khPjwJ",
  password: "IpVePeo1GV",
  database: "wym4khPjwJ",
  port: 3306
});

connection.connect((err)=>{
    if(err){
        throw err;
    }
    else{
        console.log("MySQL Database is Connected Successfully..");
    }
})
//http://localhost:4000/list
app.get("/list",(req,res)=>{
    let sqlQuery =`select * from employees;`
    connection.query(sqlQuery, (error, result)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            res.status(200).send(result)
        }
    })
})

app.post('/create',(req,res)=>{
    const {name,age,location,email,phone_no,blood_group}=req.body;
    console.log(req.body)
    // console.log(name,age,location,email,phone_no,blood_group)

    let sqlQuery =  `insert into employees (name,age,location,email,phone_no,blood_group) values ('${name}',${age},'${location}','${email}',${phone_no},'${blood_group}');`;
    connection.query(sqlQuery, (error, result)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            if(result.affectedRows>0){
                res.status(200).send({
                    message : "User profile has been created successfully"
                })
            }
            else{
                res.status(401).send({
                    message : "User profile is not created"
                })
            }
        }
    })
});

app.put('/edit/:id',(req,res)=>{
    const id = req.params.id;
    const {name,age,location,email,phone_no,blood_group}=req.body;
    const sqlQuery = `update employees set name ='${name}', age=${age}, location = '${location}',email='${email}', phone_no=${phone_no},blood_group = '${blood_group}' where id =${id}`;
    connection.query(sqlQuery, (error, result)=>{
        if(error){
            res.status(500).send(error);
        }
        else{
            if(result.affectedRows>0){
                res.status(200).send({
                    message : "User profile has been updated successfully"
                })
            }
            else{
                res.status(401).send({
                    message : "Something wrong"
                })
            }
        }
    })

})
//http://localhost:4000/delete/1
app.delete("/delete/:id", (req, res) => {
  var id = req.params.id;

  var sqlQuery = `DELETE FROM employees WHERE id=${id}`;

  connection.query(sqlQuery, (error, result) => {
    if(error){
      res.status(500).send(error);
    }
    else{
      res.status(200).send({
        message : "User profile has been deleted successfully"
      });
    }
  })
})


const port = process.env.PORT || 4000;
http.listen(port,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`Server is running at http://localhost:${port}`);
})

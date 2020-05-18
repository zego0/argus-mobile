
var express = require('express');
var cors = require('cors')
var app  = express();

var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));


app.use(cors())


var con = mysql.createConnection({

    host: "database-2.c8tcwvscugrx.eu-west-2.rds.amazonaws.com",
    port:'3306',
    user:'admin',
    password:'12345678', //empty for window


});

var server = app.listen(4006, function(){
  var host = server.address().address
  var port = server.address().port
  console.log("start");

});

con.connect(function(err) {
    if (err) throw err;

    con.query('CREATE DATABASE IF NOT EXISTS main;');
    con.query('USE main;');
    con.query('CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));', function(error, result, fields) {
        console.log(result);
    });

});

app.get('/users', function (req, res, next){
  con.query('select * from users', function(error, rows, fields){
        if(error) console.log(error);

        else{
            console.log(rows);
            res.send(rows);

        }

  });
});

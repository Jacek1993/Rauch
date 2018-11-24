var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');
const winston=require('winston');
var morgan=require('morgan');
require('./config/config');

var {mongoose}=require('./db/mongoose');
var {Client}=require('./models/Client');
var {logger}=require('./logs/logger');
var room=require('./routes/room');
var client=require('./routes/client');


var app=express();
const port=process.env.PORT ||3000;
app.use(bodyParser.json());
app.use(morgan('combined', {stream: logger.stream}));
app.use('/room', room);
app.use('/client', client);

console.log(process.env.JWT_SECRET);

app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

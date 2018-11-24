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






/*

czyli to co Rauch powiedział to na pewno trzeba używać schematów z nosql a nie sql ( rezerwacja zawiera się w dokumencie pokój), zmiana nazwy query przy poscie wiemy że jak mamy post to tworzymy więc createReservation jest co najmniej bez sensu
jak już to może być reservation. Nie ma renderwania widoków więc czysta zabawa z postmanem
Algorytm robienia projektu vol. 1.0:
-ogarnąć jak wygląda zagdnieżdżanie obiektów w mongodb oraz jakie zapytania się do tego stosuje
-stowrzyć dokumencje PORZĄDNIE przy czym mowa tutaj o każdej metodzie jakie ma parametry co robi co się z niej dostaje jakie wyjątki może rzucić
-stworzenie na podstawie powyższego opisu API bazy danych prawdopodobnie będzie kolekcja   Room oraz User możliwe że coś jeszcze
-a na końcu napisać powyższe metody REST w Node.js z uwzględnieniem wyjątków i wszystkich innych cudów jakie uzytkjownikowi moga przyjść do głowy


*/






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

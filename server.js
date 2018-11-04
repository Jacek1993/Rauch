var express=require('express');
var bodyParser=require('body-parser');
const {ObjectID}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Client}=require('./models/Client');
var {Room}=require('./models/Room');
var {Reservation}=require('./models/Reservation');


var error={
    text:''
};


var app=express();
const port=process.env.PORT ||3000;
app.use(bodyParser.json());


app.post('/createReservation',(req, res)=>{
    var reservation=new Reservation({
        identifier: req.body.identifier,
        placesNumber: req.body.placesNumber,
        roomNumber: req.body.roomNumber
    });
    // console.log(req.body);
    // res.status(200).send(req.body);
    reservation.save().then((doc)=>{
        res.send(doc);
    },
        (e)=>{
            res.status(400).send(e);
        })

});


app.get('/reservation/:id',(req,res)=>{

    var id=req.params.id;
    console.log(id);
    // if(!ObjectID.isValid(id)){
    //     error.text='Nie poprawne id';
    //     return res.status(404).send(error);
    // }
    if (!ObjectID.isValid(id)) {
        error.text='Nie poprawne id';
        return res.status(404).send(error);
    }
    Reservation.findById(id).then((reserv)=>{
        console.log(reserv);
     if(!reserv){
         error.text='Nie ma takiego rekordu';
         return res.status(404).send(error)
     }
     res.send({reserv});
    }).catch((e)=>{
        error.text='Blad servera';
        res.status(400).send(error);
    })
});



app.listen(port, ()=>{
    console.log(`Started on port ${port}`);
});

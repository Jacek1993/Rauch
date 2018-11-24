var express=require('express');
const {ObjectID}=require('mongodb');


var router=express.Router();
var {authenticate}=require('../auth');
var {Room}=require('../models/Room');


router.post('/', async(req,res)=>{
    try{
        console.log(req.body);
        var room=new Room(req.body);
        await room.save();
        res.status(200).send()
    }catch (e) {
        res.status(400).send();
    }
});

router.post('/reservation/:id', async(req, res)=>{
    var id=req.params.id.toString();
    var reservation=req.body;

    try{
        var key= await Room.findAndMakeReservation(id,reservation);
        console.log(key);
        res.status(200).send(key);

    }catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.delete('/reservation/:id/room/:roomNumber',  (req, res)=>{
    var id = req.params.id.toString();
    var roomNumber=req.params.roomNumber.toString();
    console.log(id+'   '+roomNumber);


       //await Room.findOneAndDelete(id, roomNumber);
        // await Room.find({$and:[
        // {'roomNumber': roomNumber},
        // {'reservation.identifier': id }
        //     ]}).remove().exec();


        // and({'roomNumber': roomNumber},
        //     {'reservation.identifier': id })
        //     .remove()
        //     .exec();

       Room.findOne({roomNumber: roomNumber}).then((room)=>{
           if(room){
               room.reservation=room.reservation.filter(function (res) {
                   console.log(res);
                   console.log(res.identifier+'    '+id);
                   return res.identifier!==id;
               });
               room.save();
               res.status(200).send('removed');
           }
       }).catch((e)=>{
           res.status(400).send(e);
       })



});

module.exports=router;
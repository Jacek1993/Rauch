var mongoose = require('mongoose');


var RoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String,

    },
    placesNumber: {
        type: String,

    },
    price:
        [Number],

    reservation: [{
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },
        startDate: {
            type: Date
        },
        finishDate: {
            type: Date
        },
        personAmount: {
            type: Number
        },
        duration: {
            type: Number
        },
        identifier: {
            type: String
        }
    }],
    facilities: [String],
});

RoomSchema.statics.findAndMakeReservation = function (roomNumber, reserv) {
    var Room = this;
    return Room.findOne({'roomNumber': roomNumber}).then((room) => {
        // console.log(room);
        if (!room) {
            return Promise.reject('Nie ma takiego rekordu');
        }


        var d1 = new Date(reserv.finishDate);
        var d2 = new Date(reserv.startDate);


        try {
            room.reservation.forEach((res) => {
                var t1 = new Date(res.startDate);
                var t2 = new Date(res.finishDate);
                if ((t1.getTime() >= d2.getTime() && t1.getTime() <= d1.getTime()) || (t2.getTime() >= d2.getTime() && t2.getTime() <= d1.getTime())) {
                    console.log('Ten termin jest zajety');
                    throw 'Ten terin jest zajety';
                }
            });
        } catch (e) {
            return Promise.reject(e);
        }

        function makeid() {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (var i = 0; i < 5; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            return text;
        };

        reserv.identifier = makeid();
        console.log(reserv.identifier);
        room.reservation.push(reserv);

        return room.save().then(() => {
            return Promise.resolve(reserv.identifier);
        }, (e) => {
            return Promise.reject('database error');
        });
    })
};

//
// RoomSchema.statics.findOneAndDelete=function(id, roomNumber){
//
//     var Room=this;
//     // return Room.find({$and:[{'roomNumber': roomNumber}, {'reservation.identifier':id}]}).then((room)=>{
//     //     if(!room){
//     //         return Promise.reject('Nie ma takiej rezerwacji');
//     //     }
//     //     console.log(room);
//     //     return room.reservation.remove(id);
//     // })
//
//     //return Room.find({$and:[{'roomNumber':roomNumber}, {'reservation.identifier': id}]}).remove(id).exec();
//
//     var query={'identifier': id};
//      return Room.findOneAndUpdate(query, {$pull:{"reservation": {roomNumber:{$exists:true}}}});
// };


var Room = mongoose.model('Room', RoomSchema);
module.exports = {Room};
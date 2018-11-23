var mongoose=require('mongoose');

var Reservation=mongoose.model('Reservation', {
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        String
    },
    startDate:{
        type: Date,
        default: Date.now()},
    finishDate:{
        type: Date
    },
    personAmount:{
        Number
    },
    duration:{
        Number
    },
    _creattor: {
       type:  mongoose.Schema.Types.ObjectId
    }
});

module.exports={Reservation};
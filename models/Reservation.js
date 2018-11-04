var mongoose=require('mongoose');

var Reservation=mongoose.model('Reservation',{
    identifier:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    placesNumber:{
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    roomNumber:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    }

});

module.exports={Reservation};
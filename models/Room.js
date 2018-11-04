var mongoose=require('mongoose');


var Room=mongoose.model('Room',{
    roomNumber:{
        type:String,
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
    price:{
        type: Number,
        required: true
    },
    available:{
        type:Boolean,
        required: true
    }
});

module.exports={Room};
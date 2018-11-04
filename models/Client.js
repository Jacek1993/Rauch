var mongoose=require('mongoose');

var Client=mongoose.model('Client',{
    fistName:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    lastName:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email:{
        type: String,
        required: true,
        minlength: 5,
        trim: true
    },
    telephoneNumber:{
        type: String,
        required: true,
        minlength: 9,
        trim: true
    },
    login:{
        type:String,
        required: true,
        minlength: 3,
        trim: true
    },
    password:{
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    reservationNumber:{
        type: String,
        required: true,
        minlength: 6,
        trim: true
    }
});

module.exports={Client};
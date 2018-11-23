var mongoose=require('mongoose');

var Client=mongoose.model('Client',{
    fistName:{
        type: String,

    },
    lastName:{
        type: String,

    },
    email:{
        type: String,

    },
    telephoneNumber:{
        type: String,

    },
    login:{
        type:String,

    },
    reservation:[{
        type: mongoose.Schema.Types.ObjectId
    }],
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    tokens:[{
        acess:{
            type: String,
            required: true
        },
        token:{
            type: String,
            required: true
        }
    }]

});

module.exports={Client};
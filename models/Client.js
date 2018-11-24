var mongoose = require('mongoose');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');


var ClientSchema = new mongoose.Schema({
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    email: {
        type: String,

    },
    telephoneNumber: {
        type: String,

    },
    reservation: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});

ClientSchema.statics.toJson = function () {
    var user = this;
    var userObject = user.toObject();         //konwersja usr (document) do user object
    return _.pick(userObject, ['firstName', 'lastName', 'email', '_id']);
};

ClientSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id: user._id.toHexString(), access}, process.env.JWT_SECRET).toString();
    user.tokens = user.tokens.concat({access, token});
    return user.save().then(() => {
        return token;
    })
};

ClientSchema.statics.findByToken = function (token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);

    } catch (e) {
        return Promise.reject(e);
    }

    return User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
};

ClientSchema.pre('save', function (next) {            //zanim zapiszemy wartosc do bazy danych chcemy by haslo podane przez uzytkownika bylo zahaszowane
    var user = this;
    var password = 'abc';
    console.log(password);

    if (user.isModified('password')) {

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                console.log('hash   ' + hash);
                user.password = hash;
                next();
            });

        });
    } else {
        next();
    }


});

ClientSchema.statics.findByCredentials = function (email, password) {         //wyszukujemy w bazie user'a o podanych danych jesli taki istnieje to wtedy tworzymy Promise
    var User = this;

    return User.findOne({email}).then((user) => {
        if (!user) {
            return Promise.reject('Nie ma takiego usera w bazie danych');
        }


        return new Promise((response, reject) => {
            bcrypt.compare(password, user.password, (err, res) => {           //porownujemy podane haslo password z haslem odczytanym z bazy danych user.password
                if (res) {
                    response(user);
                }
                else
                    reject();
            })
        })
    })
};

ClientSchema.methods.removeToken = function (token) {
    var user = this;
    console.log(token);
    return user.update({
        $pull: {
            tokens: {
                token: token
            }
        }
    })
};

var Client = mongoose.model('Client', ClientSchema);

module.exports = {Client};
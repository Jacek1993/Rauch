var {Client} = require('./models/Client');


var authenticate = (req, res, next) => {
    var token = req.header('x-auth');
    console.log(token);
    Client.findByToken(token).then((user) => {
        if (!user) {
            return Promise.reject('Podany user nie ma takiego tokenu');
        }

        req.client = user;
        console.log(req.client);
        req.token = token;
        next();
    }).catch((e) => {
        res.status(401).send(e);
    })
};

module.exports = {authenticate};
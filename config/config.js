var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    var config = require('./config.json');            //automatically convert to Object

    var envConfig = config[env];          //if env  jest rowne development to przechodzimy do development process, jesli test to do test config.json
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });

}
var winston=require('winston');
var appRoot=require('app-root-path');

var options={
    file:{
        level: 'info',
        filename: `${appRoot}/logs/app.log`,
        handleException: true,
        json: true,
        maxSize: 524880,
        maxFiles: 5,
        colorize: false
    },
    console:{
        level: 'debug',
        handleException: true,
        json: false,
        colorize: true
    },
};





var logger=winston.createLogger({
    transports:[
        new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false          //do not exit on handle exceptions
});


logger.stream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message);
    },
};


module.exports={logger};
var core = require('./core');

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err.stack);
});

core.init();
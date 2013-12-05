exports.init = function init(){
    var router = require('./router');
    router.run();

    process.on('uncaughtException', function (err) {
        console.log('Caught exception: ' + err.stack);
    });
};
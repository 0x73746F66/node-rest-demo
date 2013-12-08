exports.init = function init(){
    var router  = require('./router')
        , middleware  = require('./middleware')
        , express = require('express')
        , app     = express()
        , conf    = require('./conf').get(process.env.NODE_ENV)
        , crypto  = require('crypto')
        , auth = express.basicAuth(function(username, password) {
            var cipher = crypto.createCipher('aes-256-cbc', conf.application.salt);
            cipher.update(password, 'utf8', 'base64');
            return ((cipher.final('base64') === conf.application.password) && username === conf.application.username );
        }, conf.application.realm);

    middleware.setup(app, conf);
    router.run(auth, app, conf.application.routes);

    app.listen(conf.server.port);
    console.log('node-rest-demo pid %s listening on %d in %s',process.pid,conf.server.port,process.env.NODE_ENV);
};
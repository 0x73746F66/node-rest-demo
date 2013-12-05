var   conf        = require('./conf').get(process.env.NODE_ENV)
    , express     = require('express')
    , app         = express()
    , mysql       = require('mysql')
    , pool = mysql.createPool({
        host     : conf.db.mysql.host,
        user     : conf.db.mysql.user,
        password : conf.db.mysql.password,
        database : conf.db.mysql.database
    });

exports.run = function route(){
    var   crypto = require('crypto')
        , routes = {},
        auth = express.basicAuth(function(username, password) {
            var cipher = crypto.createCipher('aes-256-cbc', conf.application.salt);
            cipher.update(password, 'utf8', 'base64');
            return ((cipher.final('base64') === conf.application.password) && username === conf.application.username );
        }, conf.application.realm);

    app.configure(function(){
        conf.application.middleware.forEach(function(val,key){
            app.use(express[val]());
        });
        app.use(express.errorHandler(conf.application.errorHandler));
        app.use(function(req, res, next) {
            req.mysql   = pool;
            req.cache   = require('memoizee');
            req.store   = app.locals;
            next();
        });
    });

    conf.application.routes.forEach(function(val,key){
        routes[val] = require('../routes/'+val);

        app.get('/'+val, auth, routes[val].get);
        app.get('/'+val+'/:id', auth, routes[val].find);
        app.post('/'+val, auth, routes[val].ins);
        app.put('/'+val+'/:id', auth, routes[val].upd);
        app.delete('/'+val+'/:id', auth, routes[val].del);
    });

    app.listen(process.env.PORT);
    console.log('node-rest-demo pid %s listening on %d in %s',process.pid,process.env.PORT,process.env.NODE_ENV);
};

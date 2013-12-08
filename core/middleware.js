exports.setup = function setup(app, conf){
    var mysql   = require('mysql')
      , express = require('express')
      , pool    = mysql.createPool({
            host     : conf.db.mysql.host,
            user     : conf.db.mysql.user,
            password : conf.db.mysql.password,
            database : conf.db.mysql.database
        });

    app.configure(function(){
        conf.application.middleware.forEach(function(val){
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
};
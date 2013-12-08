exports.run = function route(auth, app, routes){
    var handlers = {};

    routes.forEach(function(val){
        handlers[val] = require('../routes/'+val);

        app.get('/'+val, auth, handlers[val].get);
        app.get('/'+val+'/:id', auth, handlers[val].find);
        app.post('/'+val, auth, handlers[val].ins);
        app.put('/'+val+'/:id', auth, handlers[val].upd);
        app.delete('/'+val+'/:id', auth, handlers[val].del);
    });
};

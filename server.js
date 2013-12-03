var express = require('express'),
    app     = express(),
    mysql   = require('mysql'),
    bcrypt = require('bcrypt'),
    tbl_list = require('./routes/list'),
    tbl_user = require('./routes/user'),
    pool = mysql.createPool({
        host     : 'localhost',
        user     : 'test',
        password : '',
        database : 'test'
    });

app.use(function(req, res, next) {
    req.mysql   = pool;
    req.bcrypt  = bcrypt;
    next();
});
app.configure(function(){
    app.use(express.bodyParser());
});

app.get('/list', tbl_list.get);
app.get('/list/:id', tbl_list.find);
app.post('/list', tbl_list.ins);
app.put('/list/:id', tbl_list.upd);
app.delete('/list/:id', tbl_list.del);

app.get('/user/:id', tbl_user.find);
app.post('/user/', tbl_user.ins);
app.put('/user/:id', tbl_user.upd);

app.listen(3000);
console.log('Rest Demo Listening on port 3000');
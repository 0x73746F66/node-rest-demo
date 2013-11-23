var express = require('express'),
    app     = express(),
    mysql   = require('mysql'),
    tbl_list = require('./routes/list'),
    pool = mysql.createPool({
        host     : 'localhost',
        user     : 'test',
        password : '',
        database : 'test'
    });

app.use(function(req, res, next) {
    req.mysql = pool;
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

app.listen(3000);
console.log('Rest Demo Listening on port 3000');
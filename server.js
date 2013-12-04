var express     = require('express')
  , app         = express()
  , mysql       = require('mysql')
  //, bcrypt      = require('bcrypt')
  , cache       = require('memoizee')
  , tbl_list    = require('./routes/list')
  , tbl_user    = require('./routes/user')
  , pool = mysql.createPool({
        host     : 'localhost',
        user     : 'test',
        password : '',
        database : 'test'
    })
  , auth = express.basicAuth(function(username, password) {
        pool.getConnection(function(err, con){
            if (err){ console.error(err); return false; }
            con.query('SELECT password FROM users_detail WHERE username = ? LIMIT 1', username, function handleSql(err, rows) {
                if (err){ console.log(err); return false; }
                if (rows.length === 0){ return false; }
                return password === rows[0]['password'];
                connection.release();
            });
        });
    },'AdminArea');

app.configure(function(){
    app.use(express.compress());
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(function(req, res, next) {
        req.mysql   = pool;
        req.cache   = cache;
        req.store   = app.locals;
        next();
    });
});

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.logger());
    app.use(express.errorHandler());
});

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err.stack);
});

app.get('/list', auth, tbl_list.get);
app.get('/list/:id', auth, tbl_list.find);
app.post('/list', auth, tbl_list.ins);
app.put('/list/:id', auth, tbl_list.upd);
app.delete('/list/:id', auth, tbl_list.del);

app.get('/user/:id', tbl_user.find);
app.post('/user/', tbl_user.ins);
app.put('/user/:id', tbl_user.upd);

app.listen(process.env.PORT);
console.log('node-rest-demo pid %s listening on %d in %s',process.pid,process.env.PORT,process.env.NODE_ENV);
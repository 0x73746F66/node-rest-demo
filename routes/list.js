var logAndRespond = function logAndRespond(err,res,status){
    console.error(err);
    res.statusCode = ('undefined' === typeof status ? 500 : status);
    res.send({
        result: 'error',
        err:    err.code
    });
};
var handleConnection = function handleConnection(callback,req,res){
    req.mysql.getConnection(function(err,connection){
        if (err){ logAndRespond(err,res); return; }
        callback(connection,req,res);
    });
};
function handleGet(connection,req,res) {
    var limit = ('undefined' === typeof req.params.limit) ? 20: req.params.limit;
    connection.query('SELECT * FROM list ORDER BY id DESC LIMIT ' + limit, function handleSql(err, rows) {
        if (err){ logAndRespond(err,res); return; }
        if (rows.length === 0){ res.send(204); return; }
        res.send({
            result: 'success',
            err:    '',
            json:   rows,
            length: rows.length
        });
        connection.release();
    });
}
function handleFind(connection,req,res) {
    var find = function find(id){
        connection.query('SELECT * FROM list WHERE id = ?', id, function handleSql(err, rows) {
            if (err){ logAndRespond(err,res); return; }
            if (rows.length === 0){ res.send(204); return; }
            res.send({
                result: 'success',
                err:    '',
                id:     id,
                json:   rows[0],
                length: 1
            });
            connection.release();
        });
    };
    var cacheFind = req.cache(find, { async: true, maxAge: 1000*60, preFetch: true });
    cacheFind(req.params.id);
}
function handleIns(connection,req,res) {
    connection.query('INSERT INTO list SET ?', req.body, function handleSql(err, result) {
        if (err){ logAndRespond(err,res); return; }
        res.statusCode = 201;
        res.send({
            result: 'success',
            err:    '',
            id:     result.insertId
        });
        connection.release();
    });
}
function handleUpd(connection,req,res) {
    connection.query('UPDATE list SET ? WHERE id='+req.params.id, req.query, function handleSql(err) {
        if (err){ logAndRespond(err,res); return; }
        handleFind(connection,req,res)
    });
}
function handleDel(connection,req,res) {
    connection.query('DELETE FROM list WHERE id = ?', req.params.id, function handleSql(err) {
        if (err){ logAndRespond(err,res); return; }
        res.send({
            result: 'success',
            err:    '',
            id:     req.params.id
        });
        connection.release();
    });
}
exports.get = function(req,res){
    handleConnection(handleGet,req,res);
};
exports.find = function(req,res){
    handleConnection(handleFind,req,res);
};
exports.ins = function(req,res){
    handleConnection(handleIns,req,res);
};
exports.upd = function(req,res){
    handleConnection(handleUpd,req,res);
};
exports.del = function(req,res){
    handleConnection(handleDel,req,res);
};
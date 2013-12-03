var logAndRespond = function logAndRespond(err,status){
    console.error(err);
    res.statusCode = ('undefined' === typeof status ? 500 : status);
    res.send({
        result: 'error',
        err:    err.code
    });
}
exports.get = function(req,res){
    var handle = function handleGet(err, connection) {
        if (err){ logAndRespond(err,503); return; }
        connection.query('SELECT * FROM list ORDER BY id DESC LIMIT 20', req.params.id, handleSql);
    };
    var handleSql = function handleSql(err, rows) {
        if (err){ logAndRespond(err); return; }
        if (rows.length === 0){ res.statusCode = 204; return; }
        res.send({
            result: 'success',
            err:    '',
            json:   rows,
            length: rows.length
        });
        connection.release();
    };
    req.mysql.getConnection(handle);
};
exports.find = function(req,res){
    var handle = function handleGet(err, connection) {
        if (err){ logAndRespond(err,503); return; }
        connection.query('SELECT * FROM list WHERE id = ?', req.params.id, handleSql);
    };
    var handleSql = function handleSql(err, rows) {
        if (err){ logAndRespond(err); return; }
        if (rows.length === 0){ res.statusCode = 204; return; }
        res.send({
            result: 'success',
            err:    '',
            id:     req.params.id,
            json:   rows[0],
            length: 1
        });
        connection.release();
    };
    req.mysql.getConnection(handle);
};
exports.ins = function(req,res){
    req.mysql.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('INSERT INTO list SET ?', req.body, function(err, result) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                } else {
                    res.send({
                        result: 'success',
                        err:    '',
                        id:     result.insertId
                    });
                }
                connection.release();
            });
        }
    });
};
exports.upd = function(req,res){
    req.mysql.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('UPDATE list SET ? WHERE id='+connection.escape(req.params.id), req.body, function(err) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                } else {
                    connection.query('SELECT * FROM list WHERE id = ?', req.params.id, function(err, rows) {
                        if (err) {
                            console.error(err);
                            res.statusCode = 500;
                            res.send({
                                result: 'error',
                                err:    err.code
                            });
                        } else {
                            res.send({
                                result: 'success',
                                err:    '',
                                id:     req.params.id,
                                json:   rows[0],
                                length: 1
                            });
                        }
                        connection.release();
                    });
                }
            });
        }
    });
};
exports.del = function(req,res){
    req.mysql.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('DELETE FROM list WHERE id = ?', req.params.id, function(err) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                } else {
                    res.send({
                        result: 'success',
                        err:    '',
                        id:     req.params.id
                    });
                }
                connection.release();
            });
        }
    });
};
exports.get = function(req,res){
    req.mysql.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM '+req.params.table+' ORDER BY id DESC LIMIT 20', req.params.id, function(err, rows) {
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
                        json:   rows,
                        length: rows.length
                    });
                }
                connection.release();
            });
        }
    });
};
exports.find = function(req,res){
    req.mysql.getConnection(function(err, connection) {
        if (err) {
            console.error('CONNECTION error: ',err);
            res.statusCode = 503;
            res.send({
                result: 'error',
                err:    err.code
            });
        } else {
            connection.query('SELECT * FROM '+req.params.table+' WHERE id = ?', req.params.id, function(err, rows) {
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
                    connection.release();
                }
            });
        }
    });
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
            connection.query('INSERT INTO '+req.params.table+' SET ?', req.body, function(err, result) {
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
            connection.query('UPDATE '+req.params.table+' SET ? WHERE id='+connection.escape(req.params.id), req.body, function(err) {
                if (err) {
                    console.error(err);
                    res.statusCode = 500;
                    res.send({
                        result: 'error',
                        err:    err.code
                    });
                } else {
                    connection.query('SELECT * FROM '+req.params.table+' WHERE id = ?', req.params.id, function(err, rows) {
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
            connection.query('DELETE FROM '+req.params.table+' WHERE id = ?', req.params.id, function(err) {
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
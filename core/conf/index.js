var tool = require('cloneextend'),
    conf = {};
    conf.production = {
        application:    {
            errorHandler: {},
            username    : 'demo',
            password    : 'Que62msjiDU0b2yYvi2zbavw' // bEdESpuGU3rewasaphEfaKedR7r=M#fU
        },
        server:         {
            port        : '80'
        }
    };
    conf.development = {
        db:             {
            mysql:          {
                host        : 'localhost',
                user        : 'test',
                password    : '',
                database    : 'test'
            }
        },
        application:    {
            errorHandler: { dumpExceptions: true, showStack: true }
        }
    };
    conf.defaults = {
        application:    {
            salt        : '1234567890QWERTY',
            username    : 'clangton',
            password    : 'GR+adJAdWOxFQMLFHAWPig==',
            realm       : 'Authenticated',
            routes      : ['list'],
            middleware  : ['compress','json','urlencoded','logger']
        },
        server:         {
            host        : 'localhost',
            port        : 3000
        }
    };

exports.get = function get(env, obj){
    var settings = tool.cloneextend(conf.defaults, conf[env]);
    return ('object' === typeof obj) ? tool.cloneextend(settings, obj) : settings;
}
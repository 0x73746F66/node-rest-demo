var conf = {
    production:     {
        db:             {
            mysql:          {
                host        : '',
                user        : '',
                password    : '',
                database    : ''
            }
        },
        application:    {
            errorHandler: {},
            salt        : '',
            username    : 'demo',
            password    : 'Que62msjiDU0b2yYvi2zbavw', // bEdESpuGU3rewasaphEfaKedR7r=M#fU
            realm       : 'Authenticated',
            routes      : ['list'],
            middleware  : ['compress','json','urlencoded','logger']
        },
        server:         {
            host        : '',
            port        : '8080'
        }
    },
    development:    {
    db:                 {
            mysql:          {
                host        : 'localhost',
                user        : 'test',
                password    : '',
                database    : 'test'
            }
        },
        application:    {
            errorHandler: { dumpExceptions: true, showStack: true },
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
    },
    default:        {
        db:             {
            mysql:          {
                host        : 'localhost',
                user        : 'root',
                password    : '',
                database    : ''
            }
        },
        application:    {
            errorHandler: { dumpExceptions: true, showStack: true },
            salt        : 'default',
            username    : 'default',
            password    : 'password',
            realm       : 'Authenticated',
            routes      : ['list'],
            middleware  : ['compress','json','urlencoded','logger']
        },
        server:         {
            host        : 'localhost',
            port        : '0.0.0.0'
        }
    }
};
exports.get = function get(env){
    return conf[env] || conf.default;
}
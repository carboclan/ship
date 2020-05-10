// WIP
import express from 'express';
import http from 'http';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import session from 'express-session';
import methodOverride from 'method-override';
import errorHandler from 'errorhandler';
import cron from 'node-cron';

import waitlistJob from './models/waitlist';
import transactionQueue from './models/transaction_queue';

/**
 * Database connection.
 */
//TODO: Connect to MongoDB

/**
 * Module dependencies.
 */
var blockchains = require('./routes/blockchains')
    , routes = require('./routes')
    , users = require('./routes/users');

const app = express();

let whitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:8080',
    'http://localhost:8080'
];

let corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(null, false);
    }
  },
  credentials: true
}

app.use(cors(corsOptions));

// all environments
app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true
}));

// development only
// if ('development' == app.get('env')) {
//     console.log('Dev enviroment');
//     app.use(errorHandler());
// }


app.get('/', routes.index);
app.post('/users', users.create);
// app.get('/users', users.list);
app.get('/users/:userId', users.get);
app.post('/users/:userId/update', users.update);

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

app.use(function (err, req, res, next) {
    if (err != null && (typeof err == "object" || err instanceof Object) && err.status && err.status == 401) {
        res.status(401).send("");
        return;
    } else if (err != null) {
        res.jsonp({
            status : 'error',
            error : err
        });
        return;
    }

    res.jsonp({
        status : 'error',
        error : "unknown"
    });

    // next();
})

export default app;


var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db_option = require('../lib/db_option.js');
var session_option = require('../lib/session_option.js');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(db_option);

router.use(cookieParser());
router.use(session({
    secret: session_option.secert,
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie:{maxAge:1000*60*60*24}
}));

router.get('/', function(request, response) {
    request.session.destroy(function(err) {
        response.clearCookie(session_option.secert);
        response.redirect('/');
    });
    
});

module.exports = router;

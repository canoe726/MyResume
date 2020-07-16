var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var index_template = require('../lib/index-template.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db_option = require('../lib/db_option');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(db_option);
var session_option = require('../lib/session_option');
const db = require('../lib/db.js');

router.use(cookieParser());
router.use(session({
    secret: session_option.secert,
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie:{maxAge:1000*60*60*24}
}));

router.get('/', function(request, response) {
    var html;
    if(request.session.is_logined == true) {
        var user_email = request.session.user_email;
        var sql = `SELECT id, nickname FROM user WHERE email = ?`;
        var sql_param = user_email;
        db.query(sql, sql_param, function (error, results, fields) { 
            if(error) {
                console.log(error);
            }

            var res = results[0];
            request.session.user_id = res.id;
            request.session.nickname = res.nickname;

            request.session.save(function() {
                html = template.HTML(index_template.CSS(), index_template.JS(), index_template.TITLE(), index_template.LOGOUT_HEADER(), index_template.CONTENT(request.session.nickname), index_template.FOOTER());
                response.send(html);
            });
        });
    } else {
        html = template.HTML(index_template.CSS(), index_template.JS(), index_template.TITLE(), index_template.LOGIN_HEADER(), index_template.CONTENT(undefined), index_template.FOOTER());
        response.send(html);
    }
});

module.exports = router;

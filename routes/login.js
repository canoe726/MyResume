var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var login_template = require('../lib/login-template.js');
var db = require('../lib/db');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var url = require('url');
var db = require('../lib/db');
var db_option = require('../lib/db_option');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(db_option);
var session_option = require('../lib/session_option');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({
    secret: session_option,
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie:{maxAge:1000*60*60*24}
}));

router.get('/', function(request, response) {
    var html = template.HTML(login_template.CSS(), login_template.JS(), login_template.TITLE(), login_template.HEADER(), login_template.CONTENT(), login_template.FOOTER());
    response.send(html);
});

router.post('/login_check', function(request, response) {
    var input_email = request.body.user_email;
    var input_pw = request.body.user_pw;
    console.log("input_email : ",input_email);

    var check_user = `SELECT * FROM user WHERE email = ?;`;
    var sql_param = [input_email];
    db.query(check_user, sql_param, function(error, results, fiedls) {
        if(error) {
            console.log(error);
        }
        var user = results[0];
        if(user != undefined) {
            var user_pw = user.pw;
            var user_salt = user.salt;

            hasher({password:input_pw, salt:user_salt}, function(err, pass, salt, hash){
                if(hash === user_pw) {
                    request.session.is_logined = true;
                    request.session.user_email = input_email;

                    request.session.save(function() {
                        response.redirect('/');
                    });
                } else {
                    response.redirect(url.format({
                        pathname:'/login',
                        query:{
                            "status": 'fail'
                        }
                    }));
                }
            });
        } else {
            response.redirect(url.format({
                pathname:'/login',
                query:{
                    "status": 'fail'
                }
            }));
        }
    });
});

module.exports = router;

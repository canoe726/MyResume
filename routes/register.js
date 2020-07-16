var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var regitser_template = require('../lib/register-template.js');
var db = require('../lib/db');
var bodyParser = require('body-parser');
var crypto = require('crypto');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();

router.use(bodyParser.urlencoded({extended: false}));
router.use(bodyParser.json());

router.get('/', function(request, response) {
    var html = template.HTML(regitser_template.CSS(), regitser_template.JS(), regitser_template.TITLE(), regitser_template.HEADER(), regitser_template.CONTENT(), regitser_template.FOOTER());
    response.send(html);
});

router.post('/user_register', function(request, response) {
    var body = '';
    request.on('data', function(data) {
        body += data;
        if(body.length > 1e6) {
            request.connection.destroy();
        }
    });

    var user_email = request.body.user_email;
    var user_pw = request.body.user_pw;
    var user_nickname = request.body.user_nickname;
    var user_salt = crypto.randomBytes(64).toString('base64');
    
    hasher({password:user_pw, salt:user_salt}, function(err, pass, salt, hash){
        console.log("pass : ",pass);
        console.log("salt : ",salt);
        console.log("hash : ",hash);

        var insert_sql = `INSERT INTO user (email, pw, nickname, salt) VALUES (?,?,?,?)`;
        var insert_params = [user_email, hash, user_nickname, salt];
        db.query(insert_sql, insert_params, function(error, results, fields) {
            if(error) {
                console.log(error);
            }
        });

        var get_id = `SELECT id FROM user WHERE email = ?`;
        var sql_param = user_email;
        db.query(get_id, sql_param, function (error, results, fields) {
            if(error) {
                console.log(error);
            }

            var user_id = results[0];

            var sql_input = `INSERT INTO user_input (id, contact, high_school, university, exp_job, exp_global, exp_others, cert_major, cert_lang, cert_others, prize_in, prize_out, port_work, port_rights) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            var sql_params = [user_id.id, null, null, null, null, null, null, null, null, null, null, null, null, null];
            db.query(sql_input, sql_params, function (error, results, fields) {
                if(error) {
                    console.log(error);
                }
            });
        });

        response.redirect('/');
    });
});

router.post('/check_nickname', function(request, response) {
    var get_nickname = request.body.nickname;
    var check_nickname = 'SELECT COUNT(*) AS cnt FROM user WHERE nickname = ?';
    var sql_param = get_nickname;
    db.query(check_nickname, sql_param, function(error, results, fiedls) {
        if(error) {
            console.log(error);
        }
        var cnt = results[0];
        console.log(cnt);
        if(cnt.cnt > 0) { response.status(200).send("이미 존재하는 닉네임입니다"); }
        else { response.status(200).send("사용가능한 닉네임입니다"); }
    });
});

router.post('/check_email', function(request, response) {
    var get_email = request.body.email;
    var check_email = 'SELECT COUNT(*) AS cnt FROM user WHERE email = ?';
    var sql_param = get_email;
    db.query(check_email, sql_param, function(error, results, fiedls) {
        if(error) {
            console.log(error);
        }
        var cnt = results[0];
        if(cnt.cnt > 0) { response.status(200).send("이미 존재하는 아이디입니다"); }
        else { response.status(200).send("사용가능한 아이디입니다"); }
    });
});

module.exports = router;

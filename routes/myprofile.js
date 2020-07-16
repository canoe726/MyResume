var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var myprofile_template = require('../lib/myprofile-template.js');
var db = require('../lib/db');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var db_option = require('../lib/db_option');
var MySQLStore = require('express-mysql-session')(session);
var sessionStore = new MySQLStore(db_option);
var session_option = require('../lib/session_option');

router.use(cookieParser());
router.use(session({
    secret: session_option.secert,
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie:{maxAge:1000*60*60*24}
}));

router.get('/', function(request, response) {
    var html = ``;
    if(request.session.is_logined == true) {
        var user_id = request.session.user_id;
        var sql1 = `SELECT * FROM user_info WHERE id = ?;`;
        var sql2 = `SELECT * FROM user_high_school WHERE id = ?;`;
        var sql3 = `SELECT * FROM user_university WHERE id = ?;`;
        var sql4 = `SELECT * FROM user_job_exp WHERE id = ?;`;
        var sql5 = `SELECT * FROM user_global_exp WHERE id = ?;`;
        var sql6 = `SELECT * FROM user_other_exp WHERE id = ?;`;
        var sql7 = `SELECT * FROM user_certificate WHERE id = ?;`;
        var sql8 = `SELECT * FROM user_prize WHERE id = ?;`;
        var sql9 = `SELECT * FROM user_work_portfolio WHERE id = ?;`;
        var sql10 = `SELECT * FROM user_rights_portfolio WHERE id = ?;`;
        var sql_activate = `SELECT * FROM user_input WHERE id = ?;`;
        
        var sql_params = [user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id, user_id];

        db.query(sql1 + sql2 + sql3 + sql4 + sql5 + sql6 + sql7 + sql8 + sql9 + sql10 + sql_activate, sql_params, function (error, results, fields) {
            if (error) {
                console.log(error);
            };

            var data = {};

            /** USER_INFO */
            var sql1_result;
            if(results[0].length > 0) {
                sql1_result = results[0];
                sql1_result = sql1_result[0];
                
                var links = sql1_result.link;
                if(links != undefined) {
                    links = links.split("|");
                    sql1_result.link = links;
                } else {
                    sql1_result.link = "";
                }

                var keywords = sql1_result.keywords;
                if(keywords != undefined) {
                    keywords = keywords.split(",");
                    sql1_result.keywords = keywords;
                } else {
                    sql1_result.keywords = [];
                }

                Object.assign(data, {'user_info':sql1_result});
            }

            /** USER_HIGH_SCHOOL */
            var sql2_result;
            if(results[1].length > 0) {
                sql2_result = results[1];
                sql2_result = sql2_result[0];

                var date = new Date(sql2_result.start_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if(month < 10) { month = "0" + month; }
                var start_date = year + "년 " + month + "월";
                sql2_result.start_date = start_date;

                date = new Date(sql2_result.end_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if(month < 10) { month = "0" + month; }
                var end_date = year + "년 " + month + "월";
                sql2_result.end_date = end_date;

                var keywords = sql2_result.keywords;
                if(keywords != "") {
                    keywords = keywords.split(",");
                    sql2_result.keywords = keywords;
                } else {
                    sql2_result.keywords = [];
                }

                Object.assign(data, {'high_school':sql2_result});
            }

            /** USER_UNIVERSITY */
            var sql3_result;
            if(results[2].length > 0) {
                sql3_result = results[2];
                sql3_result = sql3_result[0];

                var date = new Date(sql3_result.start_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if(month < 10) { month = "0" + month; }
                var start_date = year + "년 " + month + "월";
                sql3_result.start_date = start_date;

                date = new Date(sql3_result.end_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                if(month < 10) { month = "0" + month; }
                var end_date = year + "년 " + month + "월";
                sql3_result.end_date = end_date;

                var keywords = sql3_result.keywords;
                if(keywords != "") {
                    keywords = keywords.split(",");
                    sql3_result.keywords = keywords;
                } else {
                    sql3_result.keywords = [];
                }

                Object.assign(data, {'university':sql3_result});
            }

            /** USER_JOB_EXP */
            var sql4_result;
            if(results[3].length > 0) {
                sql4_result = results[3];

                for(var i=0; i<sql4_result.length; i++) {
                    var date = new Date(sql4_result[i].start_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var start_date = year + "년 " + month + "월";
                    sql4_result[i].start_date = start_date;
        
                    date = new Date(sql4_result[i].end_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var end_date = year + "년 " + month + "월";
                    sql4_result[i].end_date = end_date;

                    var keywords = sql4_result[i].keywords;
                    if(keywords != "") {
                        keywords = keywords.split(",");
                        sql4_result[i].keywords = keywords;
                    } else {
                        sql4_result[i].keywords = [];
                    }
                }

                Object.assign(data, {'job_exp':sql4_result});
            }

            /** USER_GLOBAL_EXP */
            var sql5_result;
            if(results[4].length > 0) {
                sql5_result = results[4];

                for(var i=0; i<sql5_result.length; i++) {
                    var date = new Date(sql5_result[i].start_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var start_date = year + "년 " + month + "월";
                    sql5_result[i].start_date = start_date;
        
                    date = new Date(sql5_result[i].end_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var end_date = year + "년 " + month + "월";
                    sql5_result[i].end_date = end_date;

                    var keywords = sql5_result[i].keywords;
                    if(keywords != "") {
                        keywords = keywords.split(",");
                        sql5_result[i].keywords = keywords;
                    } else {
                        sql5_result[i].keywords = [];
                    }
                }

                Object.assign(data, {'global_exp':sql5_result});
            }

            /** USER_OTHER_EXP */
            var sql6_result;
            if(results[5].length > 0) {
                sql6_result = results[5];

                for(var i=0; i<sql6_result.length; i++) {
                    var date = new Date(sql6_result[i].start_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var start_date = year + "년 " + month + "월";
                    sql6_result[i].start_date = start_date;
        
                    date = new Date(sql6_result[i].end_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var end_date = year + "년 " + month + "월";
                    sql6_result[i].end_date = end_date;

                    var keywords = sql6_result[i].keywords;
                    if(keywords != "") {
                        keywords = keywords.split(",");
                        sql6_result[i].keywords = keywords;
                    } else {
                        sql6_result[i].keywords = [];
                    }
                }

                Object.assign(data, {'other_exp':sql6_result});
            }

            /** USER_CERTIFICATE */
            var sql7_result;
            if(results[6].length > 0) {
                sql7_result = results[6];

                for(var i=0; i<sql7_result.length; i++) {
                    var date = new Date(sql7_result[i].get_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var day = date.getDate();
                    if(day < 10) { day = "0" + day; }
                    var get_date = year + "년 " + month + "월 " + day + "일";
                    sql7_result[i].get_date = get_date;
                }

                Object.assign(data, {'certificate':sql7_result});
            }

            /** USER_PRIZE */
            var sql8_result;
            if(results[7].length > 0) {
                sql8_result = results[7];

                for(var i=0; i<sql8_result.length; i++) {
                    var date = new Date(sql8_result[i].get_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var day = date.getDate();
                    if(day < 10) { day = "0" + day; }
                    var get_date = year + "년 " + month + "월 " + day + "일";
                    sql8_result[i].get_date = get_date;
                }

                Object.assign(data, {'prize':sql8_result});
            }

            /** USER_WORK_PORTFOLIO */
            var sql9_result;
            if(results[8].length > 0) {
                sql9_result = results[8];

                for(var i=0; i<sql9_result.length; i++) {
                    var date = new Date(sql9_result[i].start_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var start_date = year + "년 " + month + "월";
                    sql9_result[i].start_date = start_date;
        
                    date = new Date(sql9_result[i].end_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var end_date = year + "년 " + month + "월";
                    sql9_result[i].end_date = end_date;
                }

                Object.assign(data, {'port_work':sql9_result});
            }
            
            /** USER_RIGHTS_PORTFOLIO */
            var sql10_result;
            if(results[9].length > 0) {
                sql10_result = results[9];

                for(var i=0; i<sql10_result.length; i++) {
                    var date = new Date(sql10_result[i].release_date);
                    var year = date.getFullYear();
                    var month = date.getMonth() + 1;
                    if(month < 10) { month = "0" + month; }
                    var day = date.getDate();
                    if(day < 10) { day = "0" + day; }
                    var release_date = year + "년 " + month + "월 " + day + "일";
                    sql10_result[i].release_date = release_date;
                }

                Object.assign(data, {'port_rights':sql10_result});
            }

            /** USER_INPUT */
            var sql_activate;
            if(results[10].length > 0) {
                sql_activate = results[10];
                sql_activate = sql_activate[0];
                Object.assign(data, {'activate':sql_activate});
            } else {
                var activated = {
                    contact : null,
                    high_school : null,
                    university : null,
                    exp_job : null,
                    exb_global : null,
                    exp_others : null,
                    cert_major : null,
                    cert_lang : null,
                    cert_others : null,
                    prize_in : null,
                    prize_out : null,
                    port_work : null,
                    port_rights : null,
                }
                
                Object.assign(data, {'activate':activated});
            }

            html = template.HTML(myprofile_template.CSS(), myprofile_template.JS(), myprofile_template.TITLE(data), myprofile_template.LOGOUT_HEADER(), myprofile_template.CONTENT(data), myprofile_template.FOOTER());
            response.send(html);
        });    
    } else {
        html = template.HTML(myprofile_template.CSS(), myprofile_template.JS(), myprofile_template.TITLE(undefined), myprofile_template.LOGIN_HEADER(), myprofile_template.NO_DATA_CONTENT(), myprofile_template.FOOTER());
        response.send(html);
    }
});

module.exports = router;

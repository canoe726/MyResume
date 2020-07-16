var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var sample_template = require('../lib/sample-template.js');
var db = require('../lib/db');

router.get('/', function(request, response) {
    var html = ``;
    var sql1 = 'SELECT * FROM user_info where id=1;';
    var sql2 = 'SELECT * FROM user_high_school where id=1;';
    var sql3 = 'SELECT * FROM user_university where id=1;';
    var sql4 = 'SELECT * FROM user_job_exp where id=1;';
    var sql5 = 'SELECT * FROM user_global_exp where id=1;';
    var sql6 = 'SELECT * FROM user_other_exp where id=1;';
    var sql7 = 'SELECT * FROM user_certificate where id=1;';
    var sql8 = 'SELECT * FROM user_prize where id=1;';
    var sql9 = 'SELECT * FROM user_work_portfolio where id=1;';
    var sql10 = 'SELECT * FROM user_rights_portfolio where id=1;';
    
    db.query(sql1 + sql2 + sql3 + sql4 + sql5 + sql6 + sql7, function (error, results, fields) {
        if (error) {
            console.log(error);
        };

        var data = {};

        /** USER_INFO */
        var sql1_result = results[0];
        sql1_result = sql1_result[0];

        var links = sql1_result.link;
        links = links.split("|");

        var keywords = sql1_result.keywords;
        keywords = keywords.split(",");

        sql1_result.link = links;
        sql1_result.keywords = keywords;

        Object.assign(data, {'user_info':sql1_result});

        /** USER_HIGH_SCHOOL */
        var sql2_result;
        if(results[1].length > 0) {
            sql2_result = results[1];
            sql2_result = sql2_result[0];

            var date = new Date(sql2_result.start_date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var start_date = year + "년 " + month + "월";
            sql2_result.start_date = start_date;

            date = new Date(sql2_result.end_date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var end_date = year + "년 " + month + "월";
            sql2_result.end_date = end_date;

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
            var start_date = year + "년 " + month + "월";
            sql3_result.start_date = start_date;

            date = new Date(sql3_result.end_date);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var end_date = year + "년 " + month + "월";
            sql3_result.end_date = end_date;

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
                var start_date = year + "년 " + month + "월";
                sql4_result[i].start_date = start_date;
    
                date = new Date(sql4_result[i].end_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var end_date = year + "년 " + month + "월";
                sql4_result[i].end_date = end_date;
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
                var start_date = year + "년 " + month + "월";
                sql5_result[i].start_date = start_date;
    
                date = new Date(sql5_result[i].end_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var end_date = year + "년 " + month + "월";
                sql5_result[i].end_date = end_date;
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
                var start_date = year + "년 " + month + "월";
                sql6_result[i].start_date = start_date;
    
                date = new Date(sql6_result[i].end_date);
                var year = date.getFullYear();
                var month = date.getMonth() + 1;
                var end_date = year + "년 " + month + "월";
                sql6_result[i].end_date = end_date;
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
                var day = date.getDate();
                var get_date = year + "년 " + month + "월 " + day + "일";
                sql7_result[i].get_date = get_date;
            }

            Object.assign(data, {'certificate':sql7_result});
        }

        /** USER_PRIZE */

        /** USER_WORK_PORTFOLIO */

        /** USER_RIGHTS_PORTFOLIO */


        if(request.session.is_logined == true) {
            html = template.HTML(sample_template.CSS(), sample_template.JS(), sample_template.TITLE(), sample_template.LOGOUT_HEADER(), sample_template.CONTENT(data), sample_template.FOOTER());
            response.send(html);
        
        } else {
            html = template.HTML(sample_template.CSS(), sample_template.JS(), sample_template.TITLE(), sample_template.LOGIN_HEADER(), sample_template.CONTENT(data), sample_template.FOOTER());
            response.send(html);
        }
    });
});

module.exports = router;

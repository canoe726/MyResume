var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var todolist_template = require('../lib/todolist-template.js');
var db = require('../lib/db.js');
var db_option = require('../lib/db_option.js');
var session_option = require('../lib/session_option.js');
var cookieParser = require('cookie-parser');
var session = require('express-session');
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
    var html = ``;
    if(request.session.is_logined == true) {
        var user_id = request.session.user_id;
        var select_sql = `SELECT * FROM user_todolist WHERE id = ?;`;
        var sql_param = user_id;
        db.query(select_sql, sql_param, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
            
            var data;
            var todolist = results[0];

            if(todolist !== undefined) {
                if(todolist.content != '') {
                    var content = todolist.content;
                    content = content.split(',');
                    content.splice(-1,1);
                    todolist.content = content;

                    var date = todolist.date;
                    date = date.split(',');
                    date.splice(-1,1);
                    todolist.date = date;

                    var emphasis = todolist.emphasis;
                    emphasis = emphasis.split(',');
                    emphasis.splice(-1,1);
                    todolist.emphasis = emphasis;

                    data = todolist;
                }
            } else {
                data = {
                    content: '',
                    date: '',
                    emphasis: ''
                };
            }

            html = template.HTML(todolist_template.CSS(), todolist_template.JS(), todolist_template.TITLE("To Do 리스트"), todolist_template.LOGOUT_HEADER(), todolist_template.CONTENT(data), todolist_template.FOOTER());
            response.send(html);
        });
    } else {
        html = template.HTML(todolist_template.CSS(), todolist_template.JS(), todolist_template.TITLE(undefined), todolist_template.LOGIN_HEADER(), todolist_template.NO_DATA_CONTENT(), todolist_template.FOOTER());
        response.send(html);
    }
});

module.exports = router;

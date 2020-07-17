var express = require('express');
var router = express.Router();
var db = require('../lib/db.js');
var db_option = require('../lib/db_option.js');
var session_option = require('../lib/session_option.js');
var qs = require('querystring');
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

router.post('/', function(request, response) {
    var body = '';
    request.on('data', function(data) {
        body += data;
        if(body.length > 1e6) {
            request.connection.destroy();
        }
    });

    request.on('end', function() {
        var user_id = request.session.user_id;
        var post = qs.parse(body);

        var user_id = request.session.user_id;
        var todolist_content = "";
        var todolist_date = "";
        var todolist_emphasis = "";
        var todolist_card = [];
        var idx = 0;
        while(true) {
            var tag = 'todolist_card_' + idx;
            if(post[tag] == "" || post[tag] == undefined) { break; }
            todolist_card[idx] = post[tag];

            if(todolist_card[idx] != undefined) {
                var item = todolist_card[idx];
                item = item.split(',');

                todolist_content += (item[0] + ",");
                todolist_date += (item[1] + ",");
                todolist_emphasis += (item[2] + ",");
            }

            idx += 1;
        }

        var insert_list = `INSERT INTO user_todolist (id, content, date, emphasis) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE id=?, content=?, date=?, emphasis=?;`;
        var sql_params = [
            user_id, todolist_content, todolist_date, todolist_emphasis,
            user_id, todolist_content, todolist_date, todolist_emphasis
        ];
        db.query(insert_list, sql_params, function(error, results, fields) {
            if (error) {
                console.log(error);
            }
        });
        
        response.redirect('/todolist');
    });

});

module.exports = router;

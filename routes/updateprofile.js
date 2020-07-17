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

        var sql_activate = `SELECT * FROM USER_INPUT where id = ?;`;
        var sql_user_id_param = user_id;
        db.query(sql_activate, sql_user_id_param, function (error, results, fields) {
            var keywords = "";

            var high_school_keywords = post.high_school_keywords;
            if(high_school_keywords != undefined) { keywords += high_school_keywords; }

            var university_keywords = post.university_keywords;
            if(university_keywords != undefined) { keywords += "," + university_keywords; }

            var job_exp_keywords = [];
            var idx = 0;
            while(true) {
                var tag = 'job_exp_keywords_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                job_exp_keywords[idx] = post[tag];

                if(job_exp_keywords[idx] != undefined) { keywords += "," + job_exp_keywords[idx]; }

                idx += 1;
            }

            var global_exp_keywords = [];
            var idx = 0;
            while(true) {
                var tag = 'global_exp_keywords_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                global_exp_keywords[idx] = post[tag];

                if(global_exp_keywords[idx] != undefined) { keywords += "," + global_exp_keywords[idx]; }

                idx += 1;
            }
            
            var other_exp_keywords = [];
            var idx = 0;
            while(true) {
                var tag = 'other_exp_keywords_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                other_exp_keywords[idx] = post[tag];

                if(other_exp_keywords[idx] != undefined) { keywords += "," + other_exp_keywords[idx]; }

                idx += 1;
            }

            /** USER_INFO */
            var data = {};
            Object.assign(data, {'user_info':{}});

            data.user_info.title = post.user_info_title;
            data.user_info.introduction = post.user_info_introduction;
            data.user_info.phone = post.user_info_phone;
            data.user_info.email = post.user_info_email;

            var links = "";
            if(post.user_info_link != undefined) { links += (post.user_info_link + "|"); }
            if(post.user_info_link2 != undefined) { links += (post.user_info_link2 + "|"); }
            if(post.user_info_link3 != undefined) { links += (post.user_info_link3 + "|"); }
            if(post.user_info_link4 != undefined) { links += (post.user_info_link4 + "|"); }
            if(post.user_info_link5 != undefined) { links += (post.user_info_link5); }

            if(post.user_info_link == undefined || post.user_info_link == "") {
                var update = `UPDATE user_input SET contact = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                data.user_info.links = links;
                var update = `UPDATE user_input SET contact = ? WHERE id = ?;`;
                var sql_params = [user_id, user_id];
                db.query(update, sql_params, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            data.user_info.keywords = keywords;

            var insert = 'INSERT INTO user_info (id, title, introduction, phone, email, link, keywords) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, title=?, introduction=?, phone=?, email=?, link=?, keywords=?;';
            var sql_params = [
                user_id, data.user_info.title, data.user_info.introduction, data.user_info.phone, data.user_info.email, data.user_info.links, data.user_info.keywords,
                user_id, data.user_info.title, data.user_info.introduction, data.user_info.phone, data.user_info.email, data.user_info.links, data.user_info.keywords
            ];
            db.query(insert, sql_params, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            /** USER_HIGH_SCHOOL */
            data = {};
            Object.assign(data, {'high_school':{}});

            data.high_school.name = post.high_school_name;
            data.high_school.start_date = post.high_school_start_date;
            data.high_school.end_date = post.high_school_end_date;
            data.high_school.graduate = post.high_school_graduate;
            data.high_school.description = post.high_school_description;

            if(data.high_school.name != null && data.high_school.start_date != null && data.high_school.end_date != null && data.high_school.graduate != null) {
                var insert = 'INSERT INTO user_high_school (id, name, start_date, end_date, graduate, description, keywords) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, name=?, start_date=?, end_date=?, graduate=?, description=?, keywords=?;';
                var sql_params = [
                    user_id, data.high_school.name, data.high_school.start_date, data.high_school.end_date, data.high_school.graduate, data.high_school.description, high_school_keywords,
                    user_id, data.high_school.name, data.high_school.start_date, data.high_school.end_date, data.high_school.graduate, data.high_school.description, high_school_keywords
                ];
                db.query(insert, sql_params, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
                var update = `UPDATE user_input SET high_school = ? WHERE id = ?;`;
                var sql_params = [user_id, user_id];
                db.query(update, sql_params, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                var del = `DELETE FROM user_high_school WHERE id = ?;`;
                db.query(del, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
                var update = `UPDATE user_input SET high_school = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            /** USER_UNIVERSTIY */
            data = {};
            Object.assign(data, {'university':{}});

            data.university.name = post.university_name;
            data.university.start_date = post.university_start_date;
            data.university.end_date = post.university_end_date;
            data.university.major = post.university_major;
            data.university.my_grade = post.university_my_grade;
            data.university.total_grade = post.university_total_grade;
            data.university.graduate = post.university_graduate;
            data.university.description = post.university_description;

            if(data.university.name != null && data.university.start_date != null && data.university.end_date != null && data.university.major != null) {
                var insert = 'INSERT INTO user_university (id, name, start_date, end_date, major, my_grade, total_grade, graduate, description, keywords) VALUES (?,?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, name=?, start_date=?, end_date=?, major=?, my_grade=?, total_grade=?, graduate=?, description=?, keywords=?;';
                var sql_params = [
                    user_id, data.university.name, data.university.start_date, data.university.end_date, data.university.major, data.university.my_grade, data.university.total_grade, data.university.graduate, data.university.description, university_keywords,
                    user_id, data.university.name, data.university.start_date, data.university.end_date, data.university.major, data.university.my_grade, data.university.total_grade, data.university.graduate, data.university.description, university_keywords
                ];
                db.query(insert, sql_params, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
                var update = `UPDATE user_input SET university = ? WHERE id = ?;`;
                var sql_params = [user_id, user_id];
                db.query(update, sql_params, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            } else {
                var del = `DELETE FROM user_university WHERE id = ?;`;
                db.query(del, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
                var update = `UPDATE user_input SET university = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            
            /** USER_JOB_EXP */
            data = {};
            Object.assign(data, {'job_exp':{}});

            var idx = 0;
            data.job_exp.category = [];
            data.job_exp.name = [];
            data.job_exp.start_date = [];
            data.job_exp.end_date = [];
            data.job_exp.position = [];
            data.job_exp.link = [];
            data.job_exp.description = [];

            while(true) {
                var tag = 'job_exp_category_' + idx;

                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.job_exp.category[idx] = post[tag];

                tag = 'job_exp_name_' + idx;
                data.job_exp.name[idx] = post[tag];

                tag = 'job_exp_start_date_' + idx;
                data.job_exp.start_date[idx] = post[tag];

                tag = 'job_exp_end_date_' + idx;
                data.job_exp.end_date[idx] = post[tag];

                tag = 'job_exp_position_' + idx;
                data.job_exp.position[idx] = post[tag];

                tag = 'job_exp_link_' + idx;
                data.job_exp.link[idx] = post[tag];

                tag = 'job_exp_description_' + idx;
                data.job_exp.description[idx] = post[tag];

                idx += 1;
            }

            var job_exp_len = data.job_exp.category.length;
            var del = `DELETE FROM user_job_exp WHERE id = ?;`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(job_exp_len == 0) {
                var update = `UPDATE user_input SET exp_job = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<job_exp_len; i++) {
                if(data.job_exp.name[i] != null && data.job_exp.start_date[i] != null && data.job_exp.end_date[i] != null && data.job_exp.position[i] != null) {                        
                    var insert = 'INSERT INTO user_job_exp (id, category, name, start_date, end_date, position, link, description, keywords) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, start_date=?, end_date=?, position=?, link=?, description=?, keywords=?;';
                    var sql_params = [
                        user_id, data.job_exp.category[i], data.job_exp.name[i], data.job_exp.start_date[i], data.job_exp.end_date[i], data.job_exp.position[i], data.job_exp.link[i], data.job_exp.description[i], job_exp_keywords[i],
                        user_id, data.job_exp.category[i], data.job_exp.name[i], data.job_exp.start_date[i], data.job_exp.end_date[i], data.job_exp.position[i], data.job_exp.link[i], data.job_exp.description[i], job_exp_keywords[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET exp_job = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
            
            /** USER_GLOBAL_EXP */
            data = {};
            Object.assign(data, {'global_exp':{}});

            var idx = 0;
            data.global_exp.category = [];
            data.global_exp.start_date = [];
            data.global_exp.end_date = [];
            data.global_exp.position = [];
            data.global_exp.link = [];
            data.global_exp.description = [];

            while(true) {
                var tag = 'global_exp_category_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.global_exp.category[idx] = post[tag];

                tag = 'global_exp_start_date_' + idx;
                data.global_exp.start_date[idx] = post[tag];

                tag = 'global_exp_end_date_' + idx;
                data.global_exp.end_date[idx] = post[tag];

                tag = 'global_exp_link_' + idx;
                data.global_exp.link[idx] = post[tag];

                tag = 'global_exp_description_' + idx;
                data.global_exp.description[idx] = post[tag];

                idx += 1;
            }

            var global_exp_len = data.global_exp.category.length;
            var del = `DELETE FROM user_global_exp WHERE id = ?;`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(global_exp_len == 0) {
                var update = `UPDATE user_input SET exp_global = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
            
            for(var i=0; i<global_exp_len; i++) {
                if(data.global_exp.start_date[i] != null && data.global_exp.end_date[i] != null) {                        
                    var insert = 'INSERT INTO user_global_exp (id, category, start_date, end_date, link, description, keywords) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, start_date=?, end_date=?, link=?, description=?, keywords=?;';
                    var sql_params = [
                        user_id, data.global_exp.category[i], data.global_exp.start_date[i], data.global_exp.end_date[i], data.global_exp.link[i], data.global_exp.description[i], global_exp_keywords[i],
                        user_id, data.global_exp.category[i], data.global_exp.start_date[i], data.global_exp.end_date[i], data.global_exp.link[i], data.global_exp.description[i], global_exp_keywords[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET exp_global = ? where id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }

            /** USER_OTHER_EXP */
            data = {};
            Object.assign(data, {'other_exp':{}});

            var idx = 0;
            data.other_exp.name = [];
            data.other_exp.start_date = [];
            data.other_exp.end_date = [];
            data.other_exp.link = [];
            data.other_exp.description = [];

            while(true) {
                var tag = 'other_exp_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.other_exp.name[idx] = post[tag];

                tag = 'other_exp_start_date_' + idx;
                data.other_exp.start_date[idx] = post[tag];

                tag = 'other_exp_end_date_' + idx;
                data.other_exp.end_date[idx] = post[tag];

                tag = 'other_exp_link_' + idx;
                data.other_exp.link[idx] = post[tag];

                tag = 'other_exp_description_' + idx;
                data.other_exp.description[idx] = post[tag];

                idx += 1;
            }
            var other_exp_len = data.other_exp.name.length;

            var del = `DELETE FROM user_other_exp WHERE id = ?;`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(other_exp_len == 0) {
                var update = `UPDATE user_input SET exp_others = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<other_exp_len; i++) {
                if(data.other_exp.name[i] != null && data.other_exp.start_date[i] != null && data.other_exp.end_date[i] != null) {                        
                    var insert = 'INSERT INTO user_other_exp (id, name, start_date, end_date, link, description, keywords) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, name=?, start_date=?, end_date=?, link=?, description=?, keywords=?;';
                    var sql_params = [
                        user_id, data.other_exp.name[i], data.other_exp.start_date[i], data.other_exp.end_date[i], data.other_exp.link[i], data.other_exp.description[i], other_exp_keywords[i],
                        user_id, data.other_exp.name[i], data.other_exp.start_date[i], data.other_exp.end_date[i], data.other_exp.link[i], data.other_exp.description[i], other_exp_keywords[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET exp_others = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }

            /** USER_CERT_MAJOR */
            data = {};
            Object.assign(data, {'cert_major':{}});

            idx = 0;
            data.cert_major.category = [];
            data.cert_major.name = [];
            data.cert_major.cerial = [];
            data.cert_major.get_date = [];
            data.cert_major.agency = [];
            data.cert_major.grade = [];
            
            while(true) {
                var tag = 'cert_major_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.cert_major.name[idx] = post[tag];

                data.cert_major.category[idx] = "전공";

                tag = 'cert_major_cerial_' + idx;
                data.cert_major.cerial[idx] = post[tag];

                tag = 'cert_major_get_date_' + idx;
                data.cert_major.get_date[idx] = post[tag];

                tag = 'cert_major_agency_' + idx;
                data.cert_major.agency[idx] = post[tag];

                tag = 'cert_major_grade_' + idx;
                data.cert_major.grade[idx] = post[tag];

                idx += 1;
            }

            var cert_major_len = data.cert_major.name.length;
            var del = `DELETE FROM user_certificate WHERE id = ? AND category = "전공";`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(cert_major_len == 0) {
                var update = `UPDATE user_input SET cert_major = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<cert_major_len; i++) {
                if(data.cert_major.name[i] != null && data.cert_major.cerial[i] != null && data.cert_major.get_date[i] != null && data.cert_major.agency[i] != null) {                        
                    var insert = 'INSERT INTO user_certificate (id, category, name, cerial, get_date, agency, grade) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, cerial=?, get_date=?, agency=?, grade=?;';
                    var sql_params = [
                        user_id, data.cert_major.category[i], data.cert_major.name[i], data.cert_major.cerial[i], data.cert_major.get_date[i], data.cert_major.agency[i], data.cert_major.grade[i],
                        user_id, data.cert_major.category[i], data.cert_major.name[i], data.cert_major.cerial[i], data.cert_major.get_date[i], data.cert_major.agency[i], data.cert_major.grade[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET cert_major = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
            
            /** USER_CERT_LANG */
            data = {};
            Object.assign(data, {'cert_lang':{}});

            idx = 0;
            data.cert_lang.category = [];
            data.cert_lang.name = [];
            data.cert_lang.cerial = [];
            data.cert_lang.get_date = [];
            data.cert_lang.agency = [];
            data.cert_lang.grade = [];
            
            while(true) {
                var tag = 'cert_lang_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.cert_lang.name[idx] = post[tag];

                data.cert_lang.category[idx] = "어학";

                tag = 'cert_lang_cerial_' + idx;
                data.cert_lang.cerial[idx] = post[tag];

                tag = 'cert_lang_get_date_' + idx;
                data.cert_lang.get_date[idx] = post[tag];

                tag = 'cert_lang_agency_' + idx;
                data.cert_lang.agency[idx] = post[tag];

                tag = 'cert_lang_grade_' + idx;
                data.cert_lang.grade[idx] = post[tag];

                idx += 1;
            }

            var cert_lang_len = data.cert_lang.name.length;
            var del = `DELETE FROM user_certificate WHERE id = ? AND category = "어학";`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(cert_lang_len == 0) {
                var update = `UPDATE user_input SET cert_lang = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<cert_lang_len; i++) {
                if(data.cert_lang.name[i] != null && data.cert_lang.cerial[i] != null && data.cert_lang.get_date[i] != null && data.cert_lang.agency[i] != null) {                        
                    var insert = 'INSERT INTO user_certificate (id, category, name, cerial, get_date, agency, grade) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, cerial=?, get_date=?, agency=?, grade=?;';
                    var sql_params = [
                        user_id, data.cert_lang.category[i], data.cert_lang.name[i], data.cert_lang.cerial[i], data.cert_lang.get_date[i], data.cert_lang.agency[i], data.cert_lang.grade[i],
                        user_id, data.cert_lang.category[i], data.cert_lang.name[i], data.cert_lang.cerial[i], data.cert_lang.get_date[i], data.cert_lang.agency[i], data.cert_lang.grade[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET cert_lang = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
            
            /** USER_CERT_OTHER */
            data = {};
            Object.assign(data, {'cert_other':{}});

            idx = 0;
            data.cert_other.category = [];
            data.cert_other.name = [];
            data.cert_other.cerial = [];
            data.cert_other.get_date = [];
            data.cert_other.agency = [];
            data.cert_other.grade = [];
            
            while(true) {
                var tag = 'cert_other_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.cert_other.name[idx] = post[tag];

                data.cert_other.category[idx] = "그외";

                tag = 'cert_other_cerial_' + idx;
                data.cert_other.cerial[idx] = post[tag];

                tag = 'cert_other_get_date_' + idx;
                data.cert_other.get_date[idx] = post[tag];

                tag = 'cert_other_agency_' + idx;
                data.cert_other.agency[idx] = post[tag];

                tag = 'cert_other_grade_' + idx;
                data.cert_other.grade[idx] = post[tag];

                idx += 1;
            }

            var cert_other_len = data.cert_other.name.length;
            var del = `DELETE FROM user_certificate WHERE id = ? AND category = "그외";`;
            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(cert_other_len == 0) {
                var update = `UPDATE user_input SET cert_others = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<cert_other_len; i++) {
                if(data.cert_other.name[i] != null && data.cert_other.cerial[i] != null && data.cert_other.get_date[i] != null && data.cert_other.agency[i] != null) {                        
                    var insert = 'INSERT INTO user_certificate (id, category, name, cerial, get_date, agency, grade) VALUES (?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, cerial=?, get_date=?, agency=?, grade=?;';
                    var sql_params = [
                        user_id, data.cert_other.category[i], data.cert_other.name[i], data.cert_other.cerial[i], data.cert_other.get_date[i], data.cert_other.agency[i], data.cert_other.grade[i],
                        user_id, data.cert_other.category[i], data.cert_other.name[i], data.cert_other.cerial[i], data.cert_other.get_date[i], data.cert_other.agency[i], data.cert_other.grade[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET cert_others = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }

            /** USER_PRIZE_IN */
            data = {};
            Object.assign(data, {'prize_in':{}});

            idx = 0;
            data.prize_in.category = [];
            data.prize_in.name = [];
            data.prize_in.get_date = [];
            data.prize_in.agency = [];
            data.prize_in.rank = [];
            data.prize_in.party = [];
            data.prize_in.link = [];
            data.prize_in.description = [];
            
            while(true) {
                var tag = 'prize_in_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.prize_in.name[idx] = post[tag];

                data.prize_in.category[idx] = "교내";

                tag = 'prize_in_get_date_' + idx;
                data.prize_in.get_date[idx] = post[tag];

                tag = 'prize_in_agency_' + idx;
                data.prize_in.agency[idx] = post[tag];

                tag = 'prize_in_rank_' + idx;
                data.prize_in.rank[idx] = post[tag];

                tag = 'prize_in_party_' + idx;
                data.prize_in.party[idx] = post[tag];

                tag = 'prize_in_link_' + idx;
                data.prize_in.link[idx] = post[tag];

                tag = 'prize_in_description_' + idx;
                data.prize_in.description[idx] = post[tag];

                idx += 1;
            }

            var prize_in_len = data.prize_in.name.length;
            var del = `DELETE FROM user_prize WHERE id = ? AND category = "교내";`;

            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(prize_in_len == 0) {
                var update = `UPDATE user_input SET prize_in = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<prize_in_len; i++) {
                if(data.prize_in.name[i] != null && data.prize_in.get_date[i] != null && data.prize_in.agency[i] != null) {                        
                    var insert = 'INSERT INTO user_prize (id, category, name, get_date, agency, rank, party, link, description) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, get_date=?, agency=?, rank=?, party=?, link=?, description=?;';
                    var sql_params = [
                        user_id, data.prize_in.category[i], data.prize_in.name[i], data.prize_in.get_date[i], data.prize_in.agency[i], data.prize_in.rank[i], data.prize_in.party[i], data.prize_in.link[i], data.prize_in.description[i],
                        user_id, data.prize_in.category[i], data.prize_in.name[i], data.prize_in.get_date[i], data.prize_in.agency[i], data.prize_in.rank[i], data.prize_in.party[i], data.prize_in.link[i], data.prize_in.description[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET prize_in = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
            
            /** USER_PRIZE_OUT */
            data = {};
            Object.assign(data, {'prize_out':{}});

            idx = 0;
            data.prize_out.category = [];
            data.prize_out.name = [];
            data.prize_out.get_date = [];
            data.prize_out.agency = [];
            data.prize_out.rank = [];
            data.prize_out.party = [];
            data.prize_out.link = [];
            data.prize_out.description = [];
            
            while(true) {
                var tag = 'prize_out_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.prize_out.name[idx] = post[tag];

                data.prize_out.category[idx] = "교외";

                tag = 'prize_out_get_date_' + idx;
                data.prize_out.get_date[idx] = post[tag];

                tag = 'prize_out_agency_' + idx;
                data.prize_out.agency[idx] = post[tag];

                tag = 'prize_out_rank_' + idx;
                data.prize_out.rank[idx] = post[tag];

                tag = 'prize_out_party_' + idx;
                data.prize_out.party[idx] = post[tag];

                tag = 'prize_out_link_' + idx;
                data.prize_out.link[idx] = post[tag];

                tag = 'prize_out_description_' + idx;
                data.prize_out.description[idx] = post[tag];

                idx += 1;
            }

            var prize_out_len = data.prize_out.name.length;
            var del = `DELETE FROM user_prize WHERE id = ? AND category = "교외";`;

            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(prize_out_len == 0) {
                var update = `UPDATE user_input SET prize_out = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<prize_out_len; i++) {
                if(data.prize_out.name[i] != null && data.prize_out.get_date[i] != null && data.prize_out.agency[i] != null) {                        
                    var insert = 'INSERT INTO user_prize (id, category, name, get_date, agency, rank, party, link, description) VALUES (?,?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, category=?, name=?, get_date=?, agency=?, rank=?, party=?, link=?, description=?;';
                    var sql_params = [
                        user_id, data.prize_out.category[i], data.prize_out.name[i], data.prize_out.get_date[i], data.prize_out.agency[i], data.prize_out.rank[i], data.prize_out.party[i], data.prize_out.link[i], data.prize_out.description[i],
                        user_id, data.prize_out.category[i], data.prize_out.name[i], data.prize_out.get_date[i], data.prize_out.agency[i], data.prize_out.rank[i], data.prize_out.party[i], data.prize_out.link[i], data.prize_out.description[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET prize_out = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }

            /** USER_PORTFOLIO_WORK */
            data = {};
            Object.assign(data, {'port_work':{}});

            idx = 0;
            data.port_work.name = [];
            data.port_work.start_date = [];
            data.port_work.end_date = [];
            data.port_work.role = [];
            data.port_work.party = [];
            data.port_work.link = [];
            data.port_work.description = [];
            
            while(true) {
                var tag = 'port_work_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.port_work.name[idx] = post[tag];

                tag = 'port_work_start_date_' + idx;
                data.port_work.start_date[idx] = post[tag];

                tag = 'port_work_end_date_' + idx;
                data.port_work.end_date[idx] = post[tag];

                tag = 'port_work_role_' + idx;
                data.port_work.role[idx] = post[tag];

                tag = 'port_work_party_' + idx;
                data.port_work.party[idx] = post[tag];

                tag = 'port_work_link_' + idx;
                data.port_work.link[idx] = post[tag];

                tag = 'port_work_description_' + idx;
                data.port_work.description[idx] = post[tag];

                idx += 1;
            }

            var port_work_len = data.port_work.name.length;
            var del = `DELETE FROM user_work_portfolio WHERE id = ?;`;

            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(port_work_len == 0) {
                var update = `UPDATE user_input SET port_work = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<port_work_len; i++) {
                if(data.port_work.name[i] != null && data.port_work.start_date[i] != null && data.port_work.end_date[i] != null) {                        
                    var insert = 'INSERT INTO user_work_portfolio (id, name, start_date, end_date, role, party, link, description) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, name=?, start_date=?, end_date=?, role=?, party=?, link=?, description=?;';
                    var sql_params = [
                        user_id, data.port_work.name[i], data.port_work.start_date[i], data.port_work.end_date[i], data.port_work.role[i], data.port_work.party[i], data.port_work.link[i], data.port_work.description[i],
                        user_id, data.port_work.name[i], data.port_work.start_date[i], data.port_work.end_date[i], data.port_work.role[i], data.port_work.party[i], data.port_work.link[i], data.port_work.description[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET port_work = ? where id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }

            /** USER_PORTFOLIO_RIGHTS */
            data = {};
            Object.assign(data, {'port_rights':{}});

            idx = 0;
            data.port_rights.name = [];
            data.port_rights.release_date = [];
            data.port_rights.author = [];
            data.port_rights.link = [];
            data.port_rights.number = [];
            data.port_rights.country = [];
            data.port_rights.description = [];
            
            while(true) {
                var tag = 'port_rights_name_' + idx;
                if(post[tag] == "" || post[tag] == undefined) { break; }
                data.port_rights.name[idx] = post[tag];

                tag = 'port_rights_release_date_' + idx;
                data.port_rights.release_date[idx] = post[tag];

                tag = 'port_rights_author_' + idx;
                data.port_rights.author[idx] = post[tag];

                tag = 'port_rights_link_' + idx;
                data.port_rights.link[idx] = post[tag];

                tag = 'port_rights_number_' + idx;
                data.port_rights.number[idx] = post[tag];

                tag = 'port_rights_country_' + idx;
                data.port_rights.country[idx] = post[tag];

                tag = 'port_rights_description_' + idx;
                data.port_rights.description[idx] = post[tag];

                idx += 1;
            }

            var port_rights_len = data.port_rights.name.length;
            var del = `DELETE FROM user_rights_portfolio WHERE id = ?;`;

            db.query(del, sql_user_id_param, function (error, results, fields) {
                if (error) {
                    console.log(error);
                }
            });

            if(port_rights_len == 0) {
                var update = `UPDATE user_input SET port_rights = null WHERE id = ?;`;
                db.query(update, sql_user_id_param, function (error, results, fields) {
                    if (error) {
                        console.log(error);
                    }
                });
            }

            for(var i=0; i<port_rights_len; i++) {
                if(data.port_rights.name[i] != null && data.port_rights.author[i] != null) {                        
                    var insert = 'INSERT INTO user_rights_portfolio (id, name, release_date, author, link, number, country, description) VALUES (?,?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE id=?, name=?, release_date=?, author=?, link=?, number=?, country=?, description=?;';
                    var sql_params = [
                        user_id, data.port_rights.name[i], data.port_rights.release_date[i], data.port_rights.author[i], data.port_rights.link[i], data.port_rights.number[i], data.port_rights.country[i], data.port_rights.description[i],
                        user_id, data.port_rights.name[i], data.port_rights.release_date[i], data.port_rights.author[i], data.port_rights.link[i], data.port_rights.number[i], data.port_rights.country[i], data.port_rights.description[i]
                    ];
                    db.query(insert, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                    
                    var update = `UPDATE user_input SET port_rights = ? WHERE id = ?;`;
                    var sql_params = [user_id, user_id];
                    db.query(update, sql_params, function (error, results, fields) {
                        if (error) {
                            console.log(error);
                        }
                    });
                }
            }
        });
    });
    response.redirect('/myprofile');
});

module.exports = router;

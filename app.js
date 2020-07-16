var express = require('express');
var app = express();

var indexRouter = require('./routes/index');
var myprofileRouter = require('./routes/myprofile');
var editprofileRouter = require('./routes/editprofile');
var updateprofileRouter = require('./routes/updateprofile');
var todolistRouter = require('./routes/todolist');
var updatetodolistRouter = require('./routes/updatetodolist');
var sampleRouter = require('./routes/sample');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var registerRouter = require('./routes/register');

app.use(express.static('public'));

app.use('/', indexRouter);

app.use('/myprofile', myprofileRouter);
app.use('/editprofile', editprofileRouter);
app.use('/updateprofile', updateprofileRouter);

app.use('/todolist', todolistRouter);
app.use('/updatetodolist', updatetodolistRouter);

app.use('/sample', sampleRouter);

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);

app.use(function(request, response, next) {
    response.status(404).send("Sorry can't find that!");
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000!');
});
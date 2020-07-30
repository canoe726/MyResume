var express = require('express');
var router = express.Router();

var template = require('../lib/youngbaekim-template.js');

router.get('/', function(request, response) {
    var html;
    html = template.HTML();
    response.send(html);
});

module.exports = router;

module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');
    var fs = require('fs');

    router.post('/',con.readStudent)
    
    return router;
})();
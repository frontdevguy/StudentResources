module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');

    router.post('/',con.listStudents)

    return router;
})();
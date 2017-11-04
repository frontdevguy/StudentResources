module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');

    router.post('/', con.createStudent);

    return router;
})();
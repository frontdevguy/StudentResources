module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');

    router.get('/:id',con.deleteStudent)

    return router;
})();
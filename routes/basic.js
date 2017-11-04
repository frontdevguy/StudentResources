module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');

    router.get('/', con.index);
    router.get('/index', function(req,res){
        res.redirect(302,'/');
    });
    router.get('/home', con.home);

    return router;
})();
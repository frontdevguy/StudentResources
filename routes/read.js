module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');
    var fs = require('fs');

    router.get('/:id',con.readStudent);

    router.post('/:id',function(req,res){
        id = req.params.id;
        res.redirect(`/read/${id}`).status(302)
    })

    return router;
})();
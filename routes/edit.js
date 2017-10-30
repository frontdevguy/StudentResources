module.exports = (function() {
    var router = require('express').Router();
    var con = require('../controller/controller');

    router.get('/:id',function(req,res){
        var studentId = req.params.id;
        res.send(`You request to edit ${studentId}`)
    })

    return router;
})();
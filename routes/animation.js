var express = require('express');
var router = express.Router();

router.post('/:name', function (req, res, next) {
    if (typeof req.params.name !== 'undefined') {
        var name = req.params.name;
        var description = req.body.description || "";
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
})

router.get('/:name', function (req, res, next) {
    if (typeof req.params.name !== 'undefined') {
        var name = req.params.name;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
})

router.delete('/:name', function (req, res, next) {
    if (typeof req.params.name !== 'undefined') {
        var name = req.params.name;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
})

router.put('/:name', function (req, res, next) {
    if (typeof req.params.name !== 'undefined' && typeof req.body.description !== 'undefined') {
        var name = req.params.name;
        var description = req.body.description;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
})

module.exports = router;

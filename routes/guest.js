var express = require('express');
var router = express.Router();

router.post('/:lastname/:firstname', function (req, res, next) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        var present = req.body.present || false;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
});

router.get('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
});

router.delete('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
});

router.put('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined' && typeof req.body.present !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        var present = req.body.present;
        res.sendStatus(200);
    }
    else
        res.sendStatus(400);
});

module.exports = router;

var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

router.get('/', function (req, res) {

    var db = new sqlite3.Database('./database.db')

    db.serialize(function () {
        var query = 'SELECT * FROM guest';
        db.all(query, function (err, rows) {
            if (err) {
                console.log(err)
                res.sendStatus(500)
            } else {
                console.log("Query rows = " + rows.length)

                var rowsJson = []

                for (var i = 0; i < rows.length; i = i + 1) {
                    var response = { lastname: '', firstname: '', presentWR: false, presentEvening: false }
                    response.lastname = rows[i].lastname;
                    response.firstname = rows[i].firstname;
                    response.presentWR = (rows[i].presentWR != 0);
                    response.presentEvening = (rows[i].presentEvening != 0);

                    rowsJson[rowsJson.length] = response;
                }

                res.status(200)
                res.send(rowsJson)
            }

            db.close()
        });
    })
});

router.post('/:lastname/:firstname', function (req, res, next) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        var presentWR = 0;
        var presentEvening = 0;

        console.log(typeof req.body.presentWR);
        console.log(typeof req.body.presentEvening);

        if (typeof req.body.presentWR !== 'undefined' && req.body.presentWR == 'true') {
            presentWR = 1;
        }

        if (typeof req.body.presentEvening !== 'undefined' && req.body.presentEvening == 'true') {
            presentEvening = 1;
        }

        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            db.run('INSERT OR REPLACE INTO guest(firstname,lastname,presentWR,presentEvening) VALUES (\'' + firstname + '\',\'' + lastname + '\',' + presentWR + ',' + presentEvening + ')', function (err) {

                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                } else {
                    res.sendStatus(200);
                }

                db.close()
            })
        })
    }
    else
        res.sendStatus(400);
});

router.get('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;

        var response = {lastname:'', firstname:'', presentWR : false, presentEvening : false}

        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            var query = 'SELECT * FROM guest WHERE firstname = \'' + firstname + '\' AND lastname = \'' + lastname + '\'';
            db.all(query, function (err, rows) {
                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                } else {
                    console.log("Query rows = " + rows.length)

                    if (rows.length > 0) {
                        response.lastname = rows[0].lastname;
                        response.firstname = rows[0].firstname;
                        response.presentWR = (rows[0].presentWR != 0);
                        response.presentEvening = (rows[0].presentEvening != 0);

                        res.status(200)
                        res.send(response)
                    } else {
                        res.sendStatus(404)
                    }
                }

                db.close()
            });
        })
    }
    else
        res.sendStatus(400);
});

router.delete('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;

        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            var query = 'DELETE FROM guest WHERE firstname = \'' + firstname + '\' AND lastname = \'' + lastname + '\'';
            db.run(query, function (err) {
                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                } else {
                    console.log("Changes = " + this.changes)

                    if (this.changes > 0) {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(404)
                    }
                }

                db.close()
            });
        })

    }
    else
        res.sendStatus(400);
});

router.put('/:lastname/:firstname', function (req, res) {
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined' && (typeof req.body.presentWR !== 'undefined' || typeof req.body.presentEvening !== 'undefined')) {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        var presentWR = (req.body.presentWR == "true") ? 1 : 0;
        var presentEvening = (req.body.presentEvening == "true") ? 1 : 0;
        
        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            var query = 'UPDATE guest SET presentWR=' +  presentWR  + ',presentEvening=' + presentEvening + ' WHERE firstname = \'' + firstname + '\' AND lastname = \'' + lastname + '\'';
            db.run(query, function (err) {
                if (err) {
                    console.log(err)
                    res.sendStatus(500)
                } else {
                    console.log("Changes = " + this.changes)

                    if (this.changes > 0) {
                        res.sendStatus(200)
                    } else {
                        res.sendStatus(404)
                    }
                }

                db.close()
            });
        })


    }
    else
        res.sendStatus(400);
});

module.exports = router;

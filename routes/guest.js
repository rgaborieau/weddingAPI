var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose()

router.get('/', function (req, res) {

    var db = new sqlite3.Database('./database.db')
    var response = { lastname: '', firstname: '', present: false }

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
                    response.lastname = rows[0].lastname;
                    response.firstname = rows[0].firstname;
                    response.present = (rows[0].present != 0);

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
        var present = 0;

        if(typeof req.body.present !== 'undefined' && req.body.present == 'true'){
            present = 1;
        }

        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            db.run('INSERT OR REPLACE INTO guest(firstname,lastname,present) VALUES (\'' + firstname + '\',\'' + lastname + '\',' + present + ')', function (err) {

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

        var response = {lastname:'', firstname:'', present : false}

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
                        response.present = (rows[0].present != 0);

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
    if (typeof req.params.firstname !== 'undefined' && typeof req.params.lastname !== 'undefined' && typeof req.body.present !== 'undefined') {
        var firstname = req.params.firstname;
        var lastname = req.params.lastname;
        var present = (req.body.present=="true") ? 1 : 0;
        
        var db = new sqlite3.Database('./database.db')

        db.serialize(function () {
            var query = 'UPDATE guest SET present=' +  present  + ' WHERE firstname = \'' + firstname + '\' AND lastname = \'' + lastname + '\'';
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

var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //return all confessions
    db.confession.findAll({include: [{model: db.user}]}).then(function(confessions) {
        if (!confessions) throw Error();
        res.status(200).json(confessions);
    })
      .catch(function(error) {
          res.json(error.toString());
      });
});

router.post('/', function (req, res, next) {
    //create new confession

    db.user.findOrCreate({
        where: {name: req.body.name}
    }).spread((user, create) => {
        db.confession.create({
            message: req.body.message,
            userId: user.id
        }).then(result => {
            if (!result) throw Error();
            res.status(200).json(result);
        }).catch(function (error) {
            res.json(error.toString())
        })
    })

})

module.exports = router;

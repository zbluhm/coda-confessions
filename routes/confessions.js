var express = require('express');
var router = express.Router();
var db = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //return all confessions
    db.confession.findAll().then(function(confessions) {
        if (!confessions) throw Error();
        res.status(200).json(confessions);
    })
      .catch(function(error) {
          res.json(error);
      });
});

router.post('/', function (req, res, next) {
    //create new confession

})

module.exports = router;

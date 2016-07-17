var express = require('express');
var router = express.Router();
var database = require('../../database.js');

/* Create a new group */
router.get('/creategroup', function(req, res, next) {
  console.log(database.getval());
  res.end(database.getval());
});

router.get('/deletegroup', function(req, res, next) {
  res.end("this is deletegroup");
});

router.get('/createentry', function(req, res, next) {
  res.end("this is createentry");
});

router.get('/deleteentry', function(req, res, next) {
  res.end("this is deleteentry");
});

router.get('/updateentry', function(req, res, next) {
  res.end("this is updateentry");
});

router.get('/getentry', function(req, res, next) {
  database.selectQuery(req, res, "SELECT * FROM coredb.configs WHERE keyname='" + req.query.key + "' AND groupname='" + req.query.group + "';");
});

module.exports = router;

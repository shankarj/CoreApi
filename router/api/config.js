var express = require('express');
var router = express.Router();

/* Create a new group */
router.get('/creategroup', function(req, res, next) {
  res.end("this is creategroup");
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
  res.end("this is getentry");
});

module.exports = router;

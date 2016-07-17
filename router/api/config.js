var express = require('express');
var router = express.Router();
var database = require('../../database.js');

router.get('/deletegroup', function(req, res, next) {
  if (req.query.group === undefined){
    response = { status : "error", message : "One or more required params not provided for deleteentry."}
    res.json(response);
  }else{
    database.deleteQuery(req, res, "DELETE FROM coredb.configs WHERE groupname='" + req.query.group + "';");
  }
});

router.get('/createentry', function(req, res, next) {
  if ((req.query.key === undefined) || (req.query.group === undefined) || (req.query.value === undefined)){
    response = { status : "error", message : "One or more required params not provided for createentry."}
    res.json(response);
  }else{
    var row = {groupname: req.query.group, keyname: req.query.key, value: req.query.value};
    database.insertQuery(req, res, "INSERT INTO coredb.configs VALUES ?", row);
  }
});

router.get('/deleteentry', function(req, res, next) {
  if ((req.query.key === undefined) || (req.query.group === undefined)){
    response = { status : "error", message : "One or more required params not provided for deleteentry."}
    res.json(response);
  }else{
    database.deleteQuery(req, res, "DELETE FROM coredb.configs WHERE keyname='" + req.query.key + "' AND groupname='" + req.query.group + "';");
  }
});

router.get('/updateentry', function(req, res, next) {
  if ((req.query.key === undefined) || (req.query.group === undefined) || (req.query.value === undefined)){
    response = { status : "error", message : "One or more required params not provided for updateentry."}
    res.json(response);
  }else{
    database.updateQuery(req, res, "UPDATE coredb.configs SET value='" + req.query.value + "' WHERE keyname='" + req.query.key + "' AND groupname='" + req.query.group + "';");
  }
});

router.get('/getentry', function(req, res, next) {
  if ((req.query.key === undefined) || (req.query.group === undefined)){
    response = { status : "error", message : "One or more required params not provided for getentry."}
    res.json(response);
  }else{
    database.selectQuery(req, res, "SELECT * FROM coredb.configs WHERE keyname='" + req.query.key + "' AND groupname='" + req.query.group + "';");
  }
});

router.get('/getallentries', function(req, res, next) {
  if (req.query.group === undefined){
    response = { status : "error", message : "One or more required params not provided for getentry."}
    res.json(response);
  }else{
    database.selectQuery(req, res, "SELECT * FROM coredb.configs WHERE groupname='" + req.query.group + "';");
  }
});

module.exports = router;

var express = require('express');
var router = express.Router();
var database = require('../../database.js');
var genUtils = require('../../utils/general.js');

router.get('/lookupmap/:mode/:sessionid', function(req, res, next) {
  if ((req.params.mode === undefined) || (req.params.sessionid === undefined)){
    response = { status : "error", message : "One or more required params not provided to get lookupmap."}
    res.json(response);
  }else{
    database.selectQuery(req, res, "SELECT * FROM coredb.lookup_map WHERE mode='" + req.params.mode + "' AND session_id='" + req.params.sessionid + "';");
  }
});

router.get('/lookupmap/:mode', function(req, res, next) {
  if (req.params.mode === undefined){
    response = { status : "error", message : "One or more required params not provided to get lookupmap."}
    res.json(response);
  }else{
    database.selectQuery(req, res, "SELECT * FROM coredb.lookup_map WHERE mode='" + req.params.mode + "';");
  }
});

router.post('/lookupmap/create', function(req, res, next) {
  if ((genUtils.isEmpty(req.body)) || (genUtils.isEmpty(req.body.sessionid)) || (genUtils.isEmpty(req.body.minionid) || (genUtils.isEmpty(req.body.mode)))){
    response = { status : "error", message : "One or more required params not provided to create new lookup entry."}
    res.json(response);
  }else{
    var row = {session_id: req.body.sessionid, minion_id: req.body.minionid, mode: req.body.mode};
    database.insertQuery(req, res, "INSERT INTO coredb.lookup_map SET ?", row);
  }
});

router.post('/lookupmap/delete/', function(req, res, next) {
  if ((genUtils.isEmpty(req.body)) || (genUtils.isEmpty(req.body.sessionid)) || (genUtils.isEmpty(req.body.minionid) || (genUtils.isEmpty(req.body.mode)))){
    response = { status : "error", message : "One or more required params not provided to create new lookup entry."}
    res.json(response);
  }else{
    var row = {session_id: req.body.sessionid, minion_id: req.body.minionid, mode: req.body.mode};
    database.deleteQuery(req, res, "DELETE FROM coredb.lookup_map WHERE session_id='" + req.body.sessionid + "' AND minion_id='" + req.body.minionid + "' AND mode='" + req.body.mode + ";");
  }
});


module.exports = router;

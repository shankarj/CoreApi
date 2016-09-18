var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');

router.get('/start', function (req, res, next) {

});

router.post('/sessionid/create', function (req, res, next) {
    if (validator.validate_session_create(req)) {
        var sessionString = req.body.owner_id + "!" + req.body.project_id + "!" + req.body.snapshot_id; 
        var sessionId = new Buffer(sessionString).toString('base64')
        res.json({ status: "success", sessionid: sessionId });
    } else {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.json({ status: "error", message: "One or more input parameter(s) empty to create session id." });
    }
});

router.post('/profile/create', function (req, res, next) {
    // Validate the Input
    if (validator.validate_profile_data(req)) {
        // Auto Generate Snapshot id:
        var profileId = uuid.v1();

        // Insert into the database 
        var row = {
            profile_id: profileId,
            profile_json: JSON.stringify(req.body.profile_json),
            owner_id: req.body.owner_id
        };

        database.insertQuery(req, res, "INSERT INTO coredb.training_profile SET ?", row);
    } else {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.json({ status: "error", message: "One or more input parameter(s) empty to create a new training profile." });
    }
});

router.get('/profile/:profid', function (req, res, next) {
    if (genUtils.isEmpty(req.params.profid)) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.json({ 'status': 'error', 'message': 'Invalid PARAMS to get training profile.' });
    } else {
        database.selectQuery(req, res, "SELECT profile_json FROM coredb.training_profile WHERE profile_id='" + req.params.profid + ";");
    }
});

router.get('/profile/delete/:profid', function (req, res, next) {
    if (genUtils.isEmpty(req.params.profid)) {
        res.writeHead(400, { 'content-type': 'application/json' });
        res.json({ 'status': 'error', 'message': 'Invalid PARAMS to delete training profile.' });
    } else {
        database.selectQuery(req, res, "DELETE FROM coredb.training_profile WHERE profile_id='" + req.params.profid + ";");
    }
});


module.exports = router;
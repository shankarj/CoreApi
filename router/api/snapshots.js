var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');
module.exports = router;


router.post('/create_snapshot', function(req, res, next) {


    // Get the input which will come as JSON String
    project_id=req.body.project_id;
    network_structure= req.body.network_structure;
    network_conns = req.body.network_conns;
    trainingprofile_id = req.body.trainingprofile_id;
    user_id = req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_snapshot(user_id,auth_token,project_id,network_structure,network_conns,training_profile)){

        // Auto Generate Snapshot id:
        snapshot_id = uuid.v1(); 

        // Created DateTime
        var created_datetime = new Date();
        dateFormat(created_datetime, "yyyy-mm-dd hh:MM:ss");
        date_str=created_datetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = {
            project_id: project_id,
            network_structure: network_structure,
            user_id: user_id,
            createdtime:date_str,
            updatedtime:date_str,
            network_conns:network_conns,
            training_profile:trainingprofile_id
        };

        database.insertQuery(req, res, "INSERT INTO test.snapshots SET ?", row);
    }


});


router.post('/edit_snapshot_network_conns', function(req, res, next) {

});


router.post('/edit_snapshot_network_structure', function(req, res, next) {

});


router.get('/snapshots', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.snapshots WHERE user_id='" + user_id + "';");
    }

});


router.get('/snapshots/:id', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;
    snapshot_id = req.params.id;
    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.snapshots WHERE user_id='" + user_id + "' AND snapshot_id='"+snapshot_id+"';");
    }

});



router.get('/snapshots/project/:id', function(req, res, next) {


    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;
    project_id = req.params.id;
    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.snapshots WHERE user_id='" + user_id + "' AND project_id='"+project_id+"';");
    }

});

router.delete('/delete_snapshot/:id', function(req, res, next) {


    //Inputs
    snapshot_id = req.params.id;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;
    project_id =req.body.project_id;

    // Validate the Input
    if(validator.validate_snapshot_id(user_id,auth_token,project_id,snapshot_id)){
        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.snapshots WHERE project_id='" + project_id + "' AND user_id='" + user_id+ " and snapshot_id='"+ snapshot_id +"';");
    }


});
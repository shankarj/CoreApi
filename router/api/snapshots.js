var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');
module.exports = router;


router.post('/create', function(req, res, next) {


    // Get the input which will come as JSON String
    project_id=req.body.project_id;
    network_structure= req.body.network_structure;
    network_conns = req.body.network_conns;
    trainingprofile_id = req.body.trainingprofile_id;
    user_id = req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_snapshot(user_id,auth_token,project_id,network_structure,network_conns,trainingprofile_id)){

        // Auto Generate Snapshot id:
        snapshot_id = uuid.v1(); 

        // Created DateTime
        var created_datetime = new Date();
        dateFormat(created_datetime, "yyyy-mm-dd hh:MM:ss");
        date_str=created_datetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = {
            snapshot_id:snapshot_id,
            project_id: project_id,
            network_structure: network_structure,
            user_id: user_id,
            created_time:date_str,
            updated_time:date_str,
            network_conns:network_conns,
            training_profile:trainingprofile_id
        };

        database.insertQuery(req, res, "INSERT INTO test.snapshots SET ?", row);
    }


});


router.post('/edit/:id', function(req, res, next) {

    // Get the input which will come as JSON String
    var user_id= req.body.user_id;
    var auth_token = req.body.auth_token;
    var project_id = req.body.project_id;
    var snapshot_id = req.param.id;
    var set_string="";
    var where_string="user_id='"+user_id+"'AND snapshot_id = '"+ snapshot_id +"'+ AND project_id='"+ project_id+"';";
    if(validator.validate_snapshot_id(user_id,auth_token,project_id)){
        if(req.body.network_structure){
            // row.user_id=req.body.training_type;
            set_string+="network_structure='"+req.body.network_structure+"'";
        }else if(req.body.network_conns){
            // row.batch_size= req.body.batch_size;
            set_string+="network_conns='"+req.body.network_conns+"'";
        }

        database.updateQuery(req, res, "UPDATE test.snapshots SET "+ set_string +" WHERE "+where_string);

    }


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

router.delete('/delete/:id', function(req, res, next) {


    //Inputs
    snapshot_id = req.params.id;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;
    project_id =req.body.project_id;

    // Validate the Input
    if(validator.validate_snapshot_id(user_id,auth_token,project_id,snapshot_id)){
        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.snapshots WHERE project_id='" + project_id + "' AND user_id='" + user_id+ "'    and snapshot_id='"+ snapshot_id +"';");
    }


});
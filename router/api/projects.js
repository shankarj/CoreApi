var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');

router.post('/create', function(req, res, next) {

    // Inputs
    p_name=req.body.p_name;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_project_name(user_id,auth_token,p_name)){

        // Auto Generate Project id:
        project_id = uuid.v1(); 

        // Created DateTime
        var created_datetime = new Date();
        dateFormat(created_datetime, "yyyy-mm-dd hh:MM:ss");
        date_str=created_datetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = {
            project_id: project_id, 
            project_name: p_name, 
            user_id: user_id,
            createdtime:date_str,
            updatedtime:date_str
        };

        database.insertQuery(req, res, "INSERT INTO test.projects SET ?", row);
    }

});


router.post('/edit/:id', function(req, res, next) {

    // Inputs
    p_id=req.params.id;
    p_name=req.body.p_name;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;

    if(validator.validate_project_id(user_id,auth_token,p_id)){

        database.updateQuery(req, res, "UPDATE test.projects SET project_name='" + p_name + "' WHERE project_id='" + p_id + "' AND user_id='" + user_id+ "';");

    }
});


router.get('/projects', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.projects WHERE user_id='" + user_id + "';");
    }

});

router.get('/projects/:id', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;
    project_id= req.params.id;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.projects WHERE user_id='" + user_id + "' and project_id = '"+ project_id +"';");
    }

});


router.delete('/delete/:id', function(req, res, next) {

    //Inputs
    project_id = req.params.id;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_project_id(user_id,auth_token,project_id)){

        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.projects WHERE project_id='" + project_id + "' AND user_id='" + user_id+ "';");
        
    }
});

module.exports = router;
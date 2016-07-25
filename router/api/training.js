var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');

router.post('/createprofile', function(req, res, next) {
    console.log(req.body);

    // Get the input which will come as JSON String
    var user_id= req.body.user_id;
    var auth_token = req.body.auth_token;
    var training_type = req.body.training_type;
    var batch_size = req.body.batch_size;
    var epochs = req.body.epochs;

    // Validate the Input
    if(validator.validate_trainingprofile(user_id,auth_token,training_type,batch_size,epochs)){

        // Auto Generate Profile id:
        var profile_id = uuid.v1(); 

        // Insert in to the database 
        var row = { 
            profile_id: profile_id, 
            training_type: training_type, 
            user_id: user_id,
            batch_size:batch_size,
            epochs:epochs
        };

        database.insertQuery(req, res, 'INSERT INTO trainingprofiles SET ?', row);
    }
});


router.post('/editprofile/:id', function(req, res, next) {

    // Get the input which will come as JSON String

    var user_id= req.body.user_id;
    var auth_token = req.body.auth_token;
    var profile_id = req.param.id;
    var row ={};
    if(validator.validate_project_id(user_id,auth_token,profile_id)){
        if(req.body.training_type){
            row.user_id=req.body.training_type;
        }else if(req.body.batch_size){
            row.batch_size= req.body.batch_size;
        }else if(req.body.epochs){
            row.epochs = req.body.epochs;
        }   

        database.updateQuery(req, res, "UPDATE test.trainingprofiles SET p_name='" + p_name + "' WHERE project_id='" + p_id + "' AND user_id='" + user_id+ "';");        
    }

});



router.get('/profiles', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.trainingprofiles WHERE user_id='" + user_id + "';");
    }


});


router.get('/profiles/:id', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;
    profile_id=req.params.id;

    // Select Query
    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.trainingprofiles WHERE user_id='" + user_id + "' AND profile_id='"+profile_id+ "';");
    }

});

router.delete('/deleteprofiles/:id', function(req, res, next) {

    //Inputs
    profile_id = req.params.id;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_trainingprofile_id(user_id,auth_token,profile_id)){

        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.trainingprofiles WHERE profile_id='" + profile_id + "' AND user_id='" + user_id+ "';");
        
    }



});


module.exports = router;
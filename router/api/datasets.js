var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');
module.exports = router;


router.post('/create_dataset', function(req, res, next) {

    // Get the input which will come as JSON String
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;
    d_name = req.body.d_name;
    d_type = req.body.d_type;
    d_size = req.body.d_size;
    d_location = req.body.d_location;
    physicalname= req.body.physicalname;

    // Validate the Input
    if(validator.validate_datasets(user_id,auth_token,d_name,d_type,d_size,d_location,physicalname)){

        // Auto Generate Profile id:
        d_id = uuid.v1(); 


        // Created DateTime
        var created_datetime = new Date();
        dateFormat(created_datetime, "yyyy-mm-dd hh:MM:ss");
        date_str=created_datetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = {d_id: d_id, d_name: d_name, d_type: d_type, d_size: d_size, d_location: d_location, user_id: user_id, physical_name:physicalname,created_time:date_str,updated_time:date_str};
        console.log(row);
        database.insertQuery(req, res, "INSERT INTO test.datasets VALUES ?", row);
        // res.json({"Dataset_id":d_id+" succesfully created"});

    }

});


router.post('/edit_dataset', function(req, res, next) {

});


router.get('/datasets', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.datasets WHERE user_id='" + user_id + "';");
    }


});


router.get('/datasets/:id', function(req, res, next) {

    // Inputs
    user_id= req.query.user_id;
    auth_token = req.query.auth_token;
    d_id = req.params.id;

    if(validator.validate_user_auth(user_id,auth_token)){
        database.selectQuery(req, res, "SELECT * FROM test.datasets WHERE user_id='" + user_id + "' AND d_id='"+d_id+"';");
    }


});

router.delete('/delete_dataset/:id', function(req, res, next) {


    //Inputs
    d_id = req.params.id;
    user_id= req.body.user_id;
    auth_token = req.body.auth_token;

    // Validate the Input
    if(validator.validate_dataset_id(user_id,auth_token,d_id)){
        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.datasets WHERE d_id='" + d_id + "' AND user_id='" + user_id+ " and user_id='"+ user_id +"';");
    }

});
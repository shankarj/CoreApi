var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');
module.exports = router;


router.post('/create', function(req, res, next) {

    // Get the input which will come as JSON String
    userid= req.body.userid;
    authtoken = req.body.authtoken;
    dname = req.body.dname;
    dtype = req.body.dtype;
    dsize = req.body.dsize;
    dlocation = req.body.dlocation;
    physicalname= req.body.physicalname;

    // Validate the Input
    if(validator.validate_datasets(userid,authtoken,dname,dtype,dsize,dlocation,physicalname)){

        // Auto Generate Profile id:
        did = uuid.v1(); 

        // Created DateTime
        var createddatetime = new Date();
        dateFormat(createddatetime, "yyyy-mm-dd hh:MM:ss");
        date_str=createddatetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = {
            did: did, 
            dname: dname, 
            dtype: dtype, 
            dsize: dsize, 
            dlocation: dlocation, 
            userid: userid, 
            physical_name:physicalname,
            createdtime:date_str,
            updatedtime:date_str
        };

        database.insertQuery(req, res, "INSERT INTO test.datasets SET ?", row);
    }

});


router.post('/edit/:id', function(req, res, next) {

    // Get the input which will come as JSON String
    var userid= req.body.userid;
    var authtoken = req.body.authtoken;
    var dataset_id = req.params.id;
    var set_string="";
    var where_string="userid='"+userid+"'AND dataset_id = '"+ dataset_id +"";
    if(validator.validate_dataset_id(userid,authtoken,dataset_id)){
        if(req.body.dataset_name){
            set_string+="dataset_name='"+req.body.dataset_name+"'";
        }else if(req.body.size){
            set_string+="size='"+req.body.size+"'";
        }else if(req.body.location){
            set_string+="location='"+req.body.location+"'";
        }else if(req.body.physical_name){
            set_string+="physical_name='"+req.body.physical_name+"'";
        }

        database.updateQuery(req, res, "UPDATE test.datasets SET "+ set_string +" WHERE "+where_string);
        
    }



});



router.get('/datasets', function(req, res, next) {

    // Inputs
    userid= req.query.userid;
    authtoken = req.query.authtoken;

    if(validator.validate_user_auth(userid,authtoken)){
        database.selectQuery(req, res, "SELECT * FROM test.datasets WHERE userid='" + userid + "';");
    }


});


router.get('/datasets/:id', function(req, res, next) {

    // Inputs
    userid= req.query.userid;
    authtoken = req.query.authtoken;
    did = req.params.id;

    if(validator.validate_user_auth(userid,authtoken)){
        database.selectQuery(req, res, "SELECT * FROM test.datasets WHERE userid='" + userid + "' AND did='"+did+"';");
    }


});

router.delete('/delete/:id', function(req, res, next) {

    //Inputs
    did = req.params.id;
    userid= req.body.userid;
    authtoken = req.body.authtoken;

    // Validate the Input
    if(validator.validate_dataset_id(userid,authtoken,did)){
        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.datasets WHERE did='" + did + "' AND userid='" + userid+ " and userid='"+ userid +"';");
    }

});
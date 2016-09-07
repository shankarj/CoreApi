var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');

router.get('/context', function(req, res, next) {

});

router.post('/create', function(req, res, next) {
    console.log(req.body);

    // Get the input which will come as JSON String
    var userid= req.body.userid;
    var authtoken = req.body.authtoken;
    var trainingtype = req.body.trainingtype;
    var batchsize = req.body.batchsize;
    var epochs = req.body.epochs;

    // Validate the Input
    if(validator.validate_trainingprofile(userid,authtoken,trainingtype,batchsize,epochs)){

        // Auto Generate Profile id:
        var profileid = uuid.v1(); 

        // Created DateTime
        var created_datetime = new Date();
        dateFormat(created_datetime, "yyyy-mm-dd hh:MM:ss");
        datestr=created_datetime.toISOString().slice(0, 19).replace('T', ' ');

        // Insert in to the database 
        var row = { 
            profileid: profileid, 
            trainingtype: trainingtype, 
            userid: userid,
            batchsize:batchsize,
            epochs:epochs,
            createdtime:datestr,
            updatedtime:datestr            
        };

        database.insertQuery(req, res, 'INSERT INTO trainingprofiles SET ?', row);
    }
});


router.post('/edit/:id', function(req, res, next) {

    // Get the input which will come as JSON String

    var userid= req.body.userid;
    var authtoken = req.body.authtoken;
    var profileid = req.params.id;
    // var row ={};
    var set_string="";
    var where_string="userid='"+userid+"' AND profileid='"+ profileid+"';";
    if(validator.validate_trainingprofileid(userid,authtoken,profileid)){
        if(req.body.trainingtype){
            // row.userid=req.body.trainingtype;
            set_string+="trainingtype='"+req.body.trainingtype+"'";
        }else if(req.body.batchsize){
            // row.batchsize= req.body.batchsize;
            set_string+="batchsize='"+req.body.batchsize+"'";
        }else if(req.body.epochs){
            set_string+="epochs='"+req.body.epochs+"'";
        }   

        database.updateQuery(req, res, "UPDATE test.trainingprofiles SET "+ set_string +" WHERE "+where_string);

    }

});



router.get('/profiles', function(req, res, next) {

    // Inputs
    userid= req.query.userid;
    authtoken = req.query.authtoken;

    if(validator.validate_user_auth(userid,authtoken)){
        database.selectQuery(req, res, "SELECT * FROM test.trainingprofiles WHERE userid='" + userid + "';");
    }

});


router.get('/profiles/:id', function(req, res, next) {

    // Inputs
    userid= req.query.userid;
    authtoken = req.query.authtoken;
    profileid=req.params.id;

    // Select Query
    if(validator.validate_user_auth(userid,authtoken)){
        database.selectQuery(req, res, "SELECT * FROM test.trainingprofiles WHERE userid='" + userid + "' AND profileid='"+profileid+ "';");
    }

});

router.delete('/delete/:id', function(req, res, next) {

    //Inputs
    profileid = req.params.id;
    userid= req.body.userid;
    authtoken = req.body.authtoken;

    // Validate the Input
    if(validator.validate_trainingprofileid(userid,authtoken,profileid)){

        // Delete from Database
        database.deleteQuery(req, res, "DELETE FROM test.trainingprofiles WHERE profileid='" + profileid + "' AND userid='" + userid+ "';");
        
    }

});


module.exports = router;
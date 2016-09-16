var express = require('express');
var router = express.Router();
var database = require('../../database.js');
var genUtils = require('../../utils/general.js');
var uuid = require('node-uuid');
var validator = require('../../utils/validate.js');

router.post('/create', function(req, res, next) {

    // Validate the Input
    if(validator.validate_elements_data(req)){
        // Auto Generate Snapshot id:
        var elementId = uuid.v1(); 

        // Insert into the database 
        var row = {
            element_id: elementId,
            element_name: req.body.element_name,
            category_name: req.body.category_name,
            props_json: JSON.stringify(req.body.props_json),
            props_interface_json: genUtils.isEmpty(req.body.props_interface_json) ? "none" : JSON.stringify(req.body.props_interface_json),
            description_json: genUtils.isEmpty(req.body.description_json) ? "none" : JSON.stringify(req.body.description_json),
            visibility: genUtils.isEmpty(req.body.visibility) ? "public" : req.body.visibility,
            owner_id: req.body.owner_id
        };

        database.insertQuery(req, res, "INSERT INTO coredb.elements SET ?", row);
    }else{
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({ status : "error", message : "One or more input parameter(s) empty to create a new element."});
    }

});

router.get('/all/:uid', function(req, res, next) {
    if (!genUtils.isEmpty(req.params.uid)){
        database.selectQuery(req, res, "SELECT element_id, element_name, category_name FROM coredb.elements WHERE owner_id in ('admin','" + req.params.uid + "');");
    }else{
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({ status : "error", message : "One or more request parameter(s) empty to get all elements data."});
    }
});

router.get('/details/:eid', function(req, res, next) {
    if (!genUtils.isEmpty(req.params.eid)){
        database.selectQuery(req, res, "SELECT props_json, props_interface_json, description_json from coredb.elements where element_id='" + req.params.eid + "';");
    }else{
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({ status : "error", message : "One or more request parameter(s) empty to get element details."});
    }
});


module.exports = router;
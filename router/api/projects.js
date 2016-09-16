var express = require('express');
var router = express.Router();
var validator = require('../../utils/validate.js');
var uuid = require('node-uuid');
var dateFormat = require('dateformat');
var database = require('../../database.js');
var genUtils = require('../../utils/general.js');

router.post('/create', function(req, res, next) {

    // Validate the Input
    if(validator.validate_project_data(req)){
        // Auto Generate Snapshot id:
        project_id = uuid.v1(); 

        // Insert into the database 
        var row = {
            project_id: req.body.project_id,
            project_name: req.body.project_name,
            snapshot_id: "none",
            parent_id: genUtils.isEmpty(req.body.parent_id) ? "none" : req.body.parent_id,
            structure_json: genUtils.isEmpty(req.body.structure_json) ? "none" : JSON.stringify(req.body.structure_json),
            conns_json: genUtils.isEmpty(req.body.conns_json) ? "none" : JSON.stringify(req.body.conns_json),
            owner_id: req.body.owner_id
        };

        database.insertQuery(req, res, "INSERT INTO coredb.projects SET ?", row);
    }else{
        res.json({ status : "error", message : "One or more input parameter(s) empty to create a new snapshot."});
    }

});


router.post('/update/:id', function(req, res, next) {
    if (genUtils.isEmpty(req.params.id)){
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({'status': 'error', 'message': 'Invalid PARAMS for update projects data. Please refer to the documentation.'});
    }else{
        var update_data = {};

        if (!genUtils.isEmpty(req.body.project_name)){
            update_data["project_name"] = req.body.project_name;
        }

        if (!genUtils.isEmpty(req.body.structure_json)){
            update_data["structure_json"] = JSON.stringify(req.body.structure_json);
        }

        if (!genUtils.isEmpty(req.body.conns_json)){
            update_data["conns_json"] = JSON.stringify(req.body.conns_json);
        }

        if (!genUtils.isEmpty(req.body.status)){
            update_data["status"] = req.body.status;
        }

        if (!genUtils.isEmpty(req.body.settings_json)){
            update_data["settings_json"] = JSON.stringify(req.body.settings_json);
        }
        
        if (Object.keys(update_data).length >= 1){
            update_data["snapshot_id"] = "none";
            database.updateQuery(req, res, "UPDATE coredb.projects SET ? WHERE ?", [update_data, {project_id: req.params.id}]);
        }else{
            res.writeHead(400, {'content-type': 'application/json'});
            res.json({'status': 'error', 'message': 'Empty POST body for update projects data.'});
        }
    }
});


router.get('/structure/:pid', function(req, res, next) {
    if (!genUtils.isEmpty(req.params.pid)){
        database.selectQuery(req, res, "SELECT structure_json, conns_json from coredb.projects where project_id='" + req.params.pid + "';");
    }else{
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({ status : "error", message : "One or more request parameter(s) empty to get project structure details."});
    }
});

router.get('/settings/:pid', function(req, res, next) {
    if (!genUtils.isEmpty(req.params.eid)){
        database.selectQuery(req, res, "SELECT settings_json from coredb.projects where project_id='" + req.params.pid + "';");
    }else{
        res.writeHead(400, {'content-type': 'application/json'});
        res.json({ status : "error", message : "One or more request parameter(s) empty to get project settings."});
    }
});


module.exports = router;
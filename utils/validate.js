var genUtils = require('./general.js');

var validator_functions= {   
    validate_snapshot_data: function validate_snapshot(requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.parent_id))||
            (genUtils.isEmpty(requestContent.body.project_name))||
            (genUtils.isEmpty(requestContent.body.project_id))||
            (genUtils.isEmpty(requestContent.body.owner_id))){
                return false;
        }else{
            return  true;
        }
    },
    validate_project_data: function validate_snapshot(requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.project_name))||
            (genUtils.isEmpty(requestContent.body.owner_id))){
                return false;
        }else{
            return  true;
        }
    }
     
}

module.exports= validator_functions;
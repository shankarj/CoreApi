var genUtils = require('./general.js');

var validator_functions= {   
    validate_snapshot_data: function (requestContent) {
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
    validate_project_data: function (requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.project_name))||
            (genUtils.isEmpty(requestContent.body.owner_id))){
                return false;
        }else{
            return  true;
        }
    },
    validate_elements_data: function (requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.element_id))||
            (genUtils.isEmpty(requestContent.body.element_name))||
            (genUtils.isEmpty(requestContent.body.category_name))||
            (genUtils.isEmpty(requestContent.body.props_json))||
            (genUtils.isEmpty(requestContent.body.owner_id))){
                return false;
        }else{
            return  true;
        }
    },
    validate_profile_data: function (requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.profile_json))||
            (genUtils.isEmpty(requestContent.body.owner_id))){
                return false;
        }else{
            return  true;
        }
    },
    validate_session_create: function (requestContent) {
        if ((genUtils.isEmpty(requestContent.body))||
            (genUtils.isEmpty(requestContent.body.owner_id))||
            (genUtils.isEmpty(requestContent.body.project_id))||
            (genUtils.isEmpty(requestContent.body.snapshot_id))){
                return false;
        }else{
            return  true;
        }
    }
}

module.exports= validator_functions;
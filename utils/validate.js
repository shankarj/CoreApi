var genUtils = require('./general.js');

var validator_functions= {
    validate_user_auth: function validate_user_auth(user_id,auth_token) {
        return true;
    },
    validate_project_name: function validate_project_name(user_id,auth_token,p_name) {
        return true;
    },
    validate_project_id: function validate_project_id(user_id,auth_token,p_id) {
        return true;
    },    
    validate_snapshot: function validate_snapshot(requestContent) {
        if ((genUtils.isEmpty(requestContent.sessionid)) || 
            (genUtils.isEmpty(requestContent.network_structure)) ||
            (genUtils.isEmpty(requestContent.network_conns)) ||
            (genUtils.isEmpty(requestContent.parent_id))||
            (genUtils.isEmpty(requestContent.project_name))){
                return false;
        }else{
            return  true;
        }
    },
    validate_snapshot_id: function validate_snapshot_id(user_id,auth_token,project_id,snapshot_id) {
        return true;
    },
    validate_trainingprofile: function validate_trainingprofile(user_id,auth_token,training_type,batch_size,epochs){
        return true;
    },
    validate_trainingprofile_id: function validate_trainingprofile_id(user_id,auth_token,profile_id) {
        return true;
    },
    validate_datasets:function validate_datasets(user_id,auth_token,d_name,d_type,d_size,d_location,physicalname) {
        return true;
    },
    validate_dataset_id: function validate_dataset_id(user_id,auth_token,d_id) {
        return true;
    },  
}

module.exports= validator_functions;
var viewsPath = './views/';
var apiPath = './api/';

/*
We have not started the work on views yet. But the boilerplate is setup for us to work. 
Start adding /views endpoints and the corresponding controller + views as well.
*/
module.exports = function(app){
    app.use('/api/config', require(apiPath  + "config"));
    app.use('/api/elements', require(apiPath  + "elements"));
    app.use('/api/training', require(apiPath  + "training"));
    
    app.use('/api/users', require(apiPath  + "users"));
    app.use('/api/billing', require(apiPath  + "billing"));
    app.use('/api/deployments', require(apiPath  + "deployments"));
    app.use('/api/datasets', require(apiPath  + "datasets"));
    app.use('/api/projects', require(apiPath  + "projects"));
}
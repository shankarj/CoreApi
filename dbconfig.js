var dbConfigs = {
    production:{
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'sa',
        database : 'coredb',
        debug    :  false
    }, development:{
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'sa',
        database : 'coredb',
        debug    :  false,
        port: 3306
    },
};


module.exports = dbConfigs;
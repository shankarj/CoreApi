var dbConfigs = {
    production:{
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : 'rats',
        database : 'coredb',
        debug    :  false
    }, development:{
        connectionLimit : 100,
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'test',
        debug    :  false,
        port: 3306
    },
};


module.exports = dbConfigs;
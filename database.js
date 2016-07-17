var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'root',
    password : 'rats',
    database : 'coredb',
    debug    :  false
});

var databaseMethods = {
    selectQuery : function (req, res, query) {
        pool.getConnection(function(err,connection){
            if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
            }   

            console.log('connected as id ' + connection.threadId);
            console.log(query);
            connection.query(query ,function(err, rows){
                connection.release();
                if(!err) {                    
                    res.json(rows[0]);
                }           
            });

            connection.on('error', function(err) {      
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;     
            });
        });
    },

    insertOrUpdateQuery : function (req, res) {
        pool.getConnection(function(err,connection){
            if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
            }   

            console.log('connected as id ' + connection.threadId);
            
            connection.query("select * from user",function(err,rows){
                connection.release();
                if(!err) {
                    res.json(rows);
                }           
            });

            connection.on('error', function(err) {      
                res.json({"code" : 100, "status" : "Error in connection database"});
                return;     
            });
        });
    }
}

module.exports = databaseMethods; 
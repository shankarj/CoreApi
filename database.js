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
                res.json({"status" : "error", "message" : "Error in connection database"});
                return;
            }   

            if (process.env.environment === "development"){
                console.log('Connected with ID : ' + connection.threadId);
            }
            
            connection.query(query ,function(err, rows){
                connection.release();
                if (err){
                    res.json({"status" : "error", "message" : "Error while executing select query : " + query + ". Message : " + err.message});
                    return;
                }
                else {                    
                    res.json(rows[0]);
                }           
            });

            connection.on('error', function(err) {      
                res.json({"status" : "error", "message" : "Error in connecting to database."});
                return;     
            });
        });
    },

    insertQuery : function (req, res, query, row) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.json({"status" : "error", "message" : "Error in connection database"});
                return;
            }   

            if (process.env.environment === "development"){
                console.log('Connected with ID : ' + connection.threadId);
            }
            
            connection.query(query, row, function(err, rows){
                connection.release();
                if (err){
                    res.json({"status" : "error", "message" : "Error while executing insert query : " + query + ". Message : " + err.message});
                    return;
                }
                else {                    
                    res.json(rows[0]);
                }           
            });

            connection.on('error', function(err) {      
                res.json({"status" : "ok", "message" : ""});
                return;     
            });
        });
    },

    deleteQuery : function (req, res, query) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.json({"status" : "error", "message" : "Error in connection database"});
                return;
            }   

            if (process.env.environment === "development"){
                console.log('Connected with ID : ' + connection.threadId);
            }
            
            connection.query(query, function(err, rows){
                connection.release();
                if (err){
                    res.json({"status" : "error", "message" : "Error while executing delete query : " + query + ". Message : " + err.message});
                    return;
                }
                else {                    
                    res.json({"status" : "ok", "message" : ""});
                }           
            });

            connection.on('error', function(err) {      
                res.json({"status" : "error", "message" : "Error in connecting to database."});
                return;     
            });
        });
    },

    updateQuery : function (req, res, query) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.json({"status" : "error", "message" : "Error in connection database"});
                return;
            }   

            if (process.env.environment === "development"){
                console.log('Connected with ID : ' + connection.threadId);
            }
            
            connection.query(query, function(err, rows){
                connection.release();
                if (err){
                    res.json({"status" : "error", "message" : "Error while executing update query : " + query + ". Message : " + err.message});
                    return;
                }
                else {                    
                    res.json({"status" : "ok", "message" : ""});
                }           
            });

            connection.on('error', function(err) {      
                res.json({"status" : "error", "message" : "Error in connecting to database."});
                return;     
            });
        });
    }
}

module.exports = databaseMethods; 
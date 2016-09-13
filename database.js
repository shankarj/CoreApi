var mysql = require('mysql');
var dbConfig = require("./dbconfig.js");

var pool = mysql.createPool(dbConfig[process.env.environment]);

var databaseMethods = {
    selectQuery : function (req, res, query) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.writeHead(503, {'content-type': 'application/json'});
                var jsonString = JSON.stringify({"status" : "error", "message" : "Get connection error."});
                res.end(jsonString);     
            }
            else{
                if (process.env.environment === "development"){
                    console.log('Connected with ID : ' + connection.threadId);
                }
                
                connection.query(query ,function(err, rows){
                    connection.release(); 
                    if (err){
                        res.writeHead(400, {'content-type': 'application/json'});
                        var jsonString = JSON.stringify({"status" : "error", "message" : "Error while executing select query : " + query + ". Message : " + err.message});
                        res.end(jsonString);
                    }
                    else {
                        if (rows.length == 1){
                            res.json(rows[0]);
                        }else{                    
                            res.json(rows);
                        }
                    }           
                });

                connection.on('error', function(err) {      
                    res.writeHead(503, {'content-type': 'application/json'});
                    var jsonString = JSON.stringify({"status" : "error", "message" : "Error in connecting to database."});
                    res.end(jsonString);     
                });
            }
        });
    },

    insertQuery : function (req, res, query, row) {        
        pool.getConnection(function(err,connection){
            if (err) {
                res.writeHead(503, {'content-type': 'application/json'});
                var jsonString = JSON.stringify({"status" : "error", "message" : "Get connection error."});
                res.end(jsonString);     
            }   
            else{
                if (process.env.environment === "development"){
                    console.log('Connected with ID : ' + connection.threadId);
                }
                
                connection.query(query, row, function(err, rows){
                    connection.release();
                    if (err){
                        res.writeHead(400, {'content-type': 'application/json'});
                        var jsonString = JSON.stringify({"status" : "error", "message" : "Error while executing insert query : " + query + ". Message : " + err.message});
                        res.end(jsonString);
                    }
                    else {                    
                        res.json(rows[0]);
                    }           
                });

                connection.on('error', function(err) {      
                    res.writeHead(503, {'content-type': 'application/json'});
                    var jsonString = JSON.stringify({"status" : "error", "message" : "Error in connecting to database."});
                    res.end(jsonString);
                });
            }
        });
    },

    deleteQuery : function (req, res, query) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.writeHead(503, {'content-type': 'application/json'});
                var jsonString = JSON.stringify({"status" : "error", "message" : "Get connection error."});
                res.end(jsonString);     
            }
            else{   
                if (process.env.environment === "development"){
                    console.log('Connected with ID : ' + connection.threadId);
                }
                
                connection.query(query, function(err, rows){
                    connection.release();
                    if (err){
                        res.writeHead(400, {'content-type': 'application/json'});
                        var jsonString = JSON.stringify({"status" : "error", "message" : "Error while executing delete query : " + query + ". Message : " + err.message});
                        res.end(jsonString);
                        return;
                    }
                    else {                    
                        res.json({"status" : "ok", "message" : ""});
                    }           
                });

                connection.on('error', function(err) {      
                    res.writeHead(503, {'content-type': 'application/json'});
                    var jsonString = JSON.stringify({"status" : "error", "message" : "Error in connecting to database."});
                    res.end(jsonString);
                    return;     
                });
            }
        });
    },

    updateQuery : function (req, res, query, row) {
        pool.getConnection(function(err,connection){
            if (err) {
                res.writeHead(503, {'content-type': 'application/json'});
                var jsonString = JSON.stringify({"status" : "error", "message" : "Get connection error."});
                res.end(jsonString);     
            }
            else{   
                if (process.env.environment === "development"){
                    console.log('Connected with ID : ' + connection.threadId);
                }
                
                connection.query(query, row, function(err, result){
                    connection.release();
                    if (err){
                        res.writeHead(400, {'content-type': 'application/json'});
                        var jsonString = JSON.stringify({"status" : "error", "message" : "Error while executing update query : " + query + ". Message : " + err.message});
                        res.end(jsonString);
                    }
                    else {
                        if (result.affectedRows > 0){                    
                            res.json({"status" : "success", "message" : "Field values updated."});
                        }else{
                            res.writeHead(400, {"content-type": "application/json"});
                            var jsonString = JSON.stringify({"status" : "error", "message" : "Given key not found. No update(s) occured."});
                            res.end(jsonString);
                        }
                    }           
                });

                connection.on('error', function(err) {      
                    res.writeHead(503, {'content-type': 'application/json'});
                    var jsonString = JSON.stringify({"status" : "error", "message" : "Error in connecting to database."});
                    res.end(jsonString);
                    return;     
                });
            }
        });
    }
}

module.exports = databaseMethods; 
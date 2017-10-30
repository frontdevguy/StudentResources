var fs = require('fs');
var db_path = './model/database.json';


var createRecord = function(req,res,_record){

    var record = JSON.stringify(_record).substring(1);


    try {

        var db_read =   fs.readFileSync('./model/database.json');

    } catch (err) {
     
        return res.send(JSON.parse('{"message":"Unable to read database"}'));
    }


    
    if(Object.keys(JSON.parse(db_read)).length > 0){
        
        var data = String(fs.readFileSync('./model/database.json'));

        var closing_bracket = data.lastIndexOf('}');
            
        var newData = data.substring(0,closing_bracket-1);

        try {
            
            fs.writeFileSync('./model/database.json',newData,'utf8');
        
            fs.appendFileSync('./model/database.json',`},${record} `,'utf8');
            
        } catch (err) {
            
            return res.send(JSON.parse('{"message":"Error occured"}'));
        }
    
        res.send(JSON.parse('{"message":"Record has been successfully created"}'));

    }else{

        try {
            
            var data = String(fs.readFileSync(db_path));
            
        } catch (err) {
            
            return res.send(JSON.parse('{"message":"Unable to read database"}'));
        }
    
        var closing_bracket = data.lastIndexOf('}');
            
        var newData = data.substring(0,closing_bracket-1);

        try {
             fs.writeFileSync('./model/database.json',newData);
             fs.appendFileSync('./model/database.json',`{ ${record} `);
        } catch (err) {
            
            return res.send(JSON.parse('{"message":"Unable to read database"}'));
            
        }
            
    
        res.send(JSON.parse('{"message":"Record has been successfully created"}'));

    }

}

var readRecord = function(req,res,_record){
    var $id = _record;

    try {
        var allRecords = fs.readFileSync(db_path);
    } catch (err) {
        return res.send(JSON.parse('{"message":"Unable to read database"}')).status(404);
    }

       allRecords = JSON.parse(allRecords);

       if(typeof allRecords[$id] != 'undefined'){
          res.send(allRecords[$id]).status(200);
       }
            
    res.send(JSON.parse('{"message":"No match record found"}')).status(404);

}

var listRecords = function(req,res){

    try {

        var allRecords = fs.readFileSync(db_path);  

        if(Object.keys(JSON.parse(allRecords)).length < 1){
            res.send(JSON.parse('{"message":"No record available to list"}')).status(200);
        }else{
            res.send(JSON.parse(allRecords)).status(200);
        }

    } catch (err) {
        return res.send(JSON.parse('{"message":"Unable to read database"}')).status(404);
    }
     

}

var deleteRecord = function(req,res,_record){ 
    var $id = _record;

    try{
        var allRecords = fs.readFileSync(db_path);
    }catch(err){
        return res.send(JSON.parse('{"message":"Error occured"}')).status(200);
    }

    allRecords = JSON.parse(allRecords);

    if(Object.keys(allRecords).length < 1){
        return res.send(JSON.parse('{"message":"No match record forund"}')).status(200);
    }

    var keys = Object.keys(allRecords);

    keys.forEach(function(item){
        if(item == $id){
            delete allRecords[$id];
            try{
                fs.writeFileSync(db_path,JSON.stringify(allRecords));
            }catch(err){
                return res.send(JSON.parse('{"message":"Unable to complete request"}'))
            }  
            res.send(JSON.parse('{"message":"Record was successfully deleted"}'))
        }
        
        res.send(JSON.parse('{"message":"No macth record found"}'));
    
    })
            

}



module.exports = {
    createRecord:createRecord,
    listRecords:listRecords,
    deleteRecord:deleteRecord,
    readRecord:readRecord
}
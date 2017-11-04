var fs = require('fs');
var db_path = './model/database.json';


var createRecord = function(req, res, _record, studentId, studentName, studentDepartment) {

    var record = JSON.stringify(_record).substring(1);


    try {

        var db_read = fs.readFileSync('./model/database.json');

    } catch (err) {

        return res.send(JSON.parse('{"message":"Unable to read database",,"status":404}'));
    }

    if (Object.keys(JSON.parse(db_read)).length > 0) {

        var data = String(fs.readFileSync('./model/database.json'));

        var closing_bracket = data.lastIndexOf('}');

        var newData = data.substring(0, closing_bracket - 1);

        try {

            fs.writeFileSync('./model/database.json', newData);

            fs.appendFileSync('./model/database.json', `},${record} `);

        } catch (err) {

            return res.send(JSON.parse('{"message":"Error occured","status":404}'));
        }

        res.send(JSON.parse(`{"message":"Record has been successfully created","status":200,"name":"${studentName}","dept":"${studentDepartment}","id":"${studentId}"}`));

    } else {

        try {

            var data = String(fs.readFileSync(db_path));

        } catch (err) {

            return res.send(JSON.parse('{"message":"Unable to read database","status":404}'));
        }

        var closing_bracket = data.lastIndexOf('}');

        var newData = data.substring(0, closing_bracket - 1);

        try {
            fs.writeFileSync('./model/database.json', newData);
            fs.appendFileSync('./model/database.json', `{ ${record} `);
        } catch (err) {

            return res.send(JSON.parse('{"message":"Unable to read database","status":404}'));

        }


        res.send(JSON.parse(`{"message":"Record has been successfully created","status":200,"name":"${studentName}","dept":"${studentDepartment}","id":"${studentId}"}`));

    }

}

var readRecord = function(req, res, _record) {
    var $id = _record;

    try {
        var allRecords = fs.readFileSync(db_path);
    } catch (err) {
        return res.send(JSON.parse('{"message":"Unable to read database","status":404}'))
    }

    allRecords = JSON.parse(allRecords);

    if (typeof allRecords[$id] != 'undefined') {
        return res.send(allRecords[$id]).status(200);
    }

    res.send(JSON.parse('{"message":"No match record found","status":404}'))

}

var listRecords = function(req, res) {

    try {

        var allRecords = fs.readFileSync(db_path);

        if (Object.keys(JSON.parse(allRecords)).length < 1) {
            res.send(JSON.parse('{"message":"No record available to list","status":404}'))
        } else {
            res.send(JSON.parse(allRecords)).status(200);
        }

    } catch (err) {
        return res.send(JSON.parse('{"message":"Unable to read database","status":404}'))
    }


}

var editRecord = function(req, res, record, id) {


    try {
        var allRecords = fs.readFileSync(db_path);
    } catch (err) {
        return res.send(JSON.parse('{"message":"Error occured","status":404}'))
    }

    allRecords = JSON.parse(allRecords);

    if (typeof allRecords[id] == 'undefined') {
        return res.send(JSON.parse('{"message":"Record does not exist","status":404}'))
    }

    allRecords[id].name = record[id].name;
    allRecords[id].age = record[id].age;
    allRecords[id].soo = record[id].soo;
    allRecords[id].department = record[id].department;
    allRecords[id].faculty = record[id].faculty;

    try {
        fs.writeFileSync(db_path, JSON.stringify(allRecords));
    } catch (err) {
        return res.send(JSON.parse('{"message":"Unable to complete request","status":404}'))
    }

    res.send(JSON.parse('{"message":"Record has been successfully updated","status":200}'));
}

var deleteRecord = function(req, res, _record) {
    var $id = _record;
    var deleteRecordStatus = false;

    try {
        var allRecords = fs.readFileSync(db_path);
    } catch (err) {
        return res.send(JSON.parse('{"message":"Error occured","status":404}'))
    }

    allRecords = JSON.parse(allRecords);

    if (Object.keys(allRecords).length < 1) {
        return res.send(JSON.parse('{"message":"No match record found","status":404}'))
    }

    var keys = Object.keys(allRecords);

    keys.forEach(function(item) {
        if (item == $id) {
            delete allRecords[$id];
            deleteRecordStatus = true;
            try {
                fs.writeFileSync(db_path, JSON.stringify(allRecords));
            } catch (err) {
                return res.send(JSON.parse('{"message":"Unable to complete request","status":404}'))
            }
        }
    })

    if (deleteRecordStatus == true) {
        res.send(JSON.parse('{"message":"Record was successfully deleted","status":200}'))
    } else {
        res.send(JSON.parse('{"message":"No macth record found","status":404}'));
    }

}




module.exports = {
    createRecord: createRecord,
    listRecords: listRecords,
    deleteRecord: deleteRecord,
    readRecord: readRecord,
    editRecord: editRecord
}
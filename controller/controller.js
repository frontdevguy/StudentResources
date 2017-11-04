var fs = require('fs');
var model = require('./../model/model');
var database_path = './../model/database.json';

var createStudent = function(req, res) {

    var details = req.body
    var studentName = details.name;
    var studentAge = details.age;
    var studentStateOfBirtOrigin = details.soo;
    var studentDepartment = details.dept;
    var studentFaculty = details.factly;
    var studentId = `${parseInt(Math.floor(Math.random()*3000))}_${studentName}`;

    var record = {}

    record[studentId] = {
        name: studentName,
        age: studentAge,
        soo: studentStateOfBirtOrigin,
        department: studentDepartment,
        id: studentId,
        faculty: studentFaculty
    }

    model.createRecord(req, res, record, studentId, studentName, studentDepartment);

};


var editStudent = function(req, res) {
    details = req.body;

    var studentName = details.name;
    var studentAge = details.dob;
    var studentDepartment = details.dept;
    var studentFaculty = details.factly;
    var studentId = details.id;
    var soo = details.soo;
    var id = studentId;

    var record = {}

    record[studentId] = {
        name: studentName,
        age: studentAge,
        soo: soo,
        department: studentDepartment,
        faculty: studentFaculty,
        id: id
    }

    model.editRecord(req, res, record, id);

}

var readStudent = function(req, res) {
    var studentId = req.body.id;

    model.readRecord(req, res, studentId);

};

var listStudents = function(req, res) {
    model.listRecords(req, res);
};

var deleteStudent = function(req, res) {
    var studentId = req.body.id;

    model.deleteRecord(req, res, studentId);

};

var index = function(req, res) {
    res.render('index');
};


var home = function(req, res) {
    res.render('home');
};



module.exports = {
    createStudent: createStudent,
    listStudents: listStudents,
    deleteStudent: deleteStudent,
    readStudent: readStudent,
    editStudent: editStudent,
    index: index,
    home: home
}
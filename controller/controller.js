var fs = require('fs');
var model = require('./../model/model');
var database_path = './../model/database.json';

var details = {name:"Joshua Ogunbo",age:20,dob:'20/17/1996',soo:'Ogun State',dept:'Mathematics',faculty:'Mathematics',course:'Mathematics',nin:100963443,height:1.87};

var createStudent = function(req, res) {
  var studentName = details.name;
  var studentAge = details.age;
  var studentDateOfBirth = details.dob;
  var studentStateOfBirtOrigin = details.soo;
  var studentDepartment = details.dept;
  var studentFaculty = details.faculty;
  var studentCourse = details.course;
  var studentNin = details.nin;
  var studentHeight = details.height;
  var studentId =  `${parseInt(Math.floor(Math.random()*3000))}_${studentName}`;
    
  var record = {}

  record[studentId] = {
    name : studentName,
    age : studentAge,
    dob : studentDateOfBirth,
    soo : studentStateOfBirtOrigin,
    department : studentDepartment,
    course: studentCourse,
    faculty: studentFaculty,
    nin: studentNin,
    height: studentHeight
  }

  model.createRecord(req,res,record);

};

var readStudent = function(req, res) {
    var studentId = req.params.id;

    model.readRecord(req,res,studentId);

};

var listStudents = function(req, res) {
    model.listRecords(req,res);
};
 
var deleteStudent = function(req, res) {
    var studentId = req.params.id;

    model.deleteRecord(req,res,studentId);
    
};


module.exports = {
    createStudent:createStudent,
    listStudents:listStudents,
    deleteStudent:deleteStudent,
    readStudent:readStudent
}
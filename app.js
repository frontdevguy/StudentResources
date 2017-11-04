var express = require('express');
var bodyParser = require('body-parser');
var createStudent = require('./routes/create');
var readStudent = require('./routes/read');
var deleteStudent = require('./routes/delete');
var listStudents = require('./routes/list');
var editStudent = require('./routes/edit');
var basic = require('./routes/basic');
var path = require('path');
var app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


app.use(express.static(path.join(__dirname, 'public')));
app.set("views", (__dirname + "/views"));
app.set("view engine", "ejs");

app.use('/', basic);

app.use('/create', createStudent);
app.use('/read', readStudent);
app.use('/edit', editStudent);
app.use('/delete', deleteStudent);
app.use('/list', listStudents);

app.get('*', function(req, res) {
    res.status(404).send('Opps, the page you requested for does not exist');
});

app.post('*', function(req, res) {
    res.status(301).redirect('/');
});

app.listen(process.env.PORT || 8080, function(err) {
    if (err) throw err;
})
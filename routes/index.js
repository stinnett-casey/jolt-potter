var express = require('express');
var router = express.Router();
var Student = require('../models/Student');
var Course = require('../models/Course');
var Enrollment = require('../models/Enrollment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Students

router.get('/students', function(req, res, next) {
  Student.getAllStudents(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/students/:id', function(req, res, next){
  Student.getStudent(req.params.id, function(err, student){
    if (err) {
      res.json(err);
    } else {
      res.json(student);
    }
  });
});

router.post('/students', function(req, res, next){
  Student.addStudent(req.body, function(err, student){
    if (err) {
      res.json(err);
    } else {
      req.body.id = student.insertId; // gets the id in the body so that we can show that
      res.json(req.body);
    }
  });
});

router.patch('/students/:id', function(req, res, next){
  Student.updateStudent(req.params.id, req.body, function(err, update_res){
    if (err) {
      res.json(err);
    } else {
      res.json(update_res);
    }
  });
});

router.delete('/students/:id', function(req, res, next){
  Student.deleteStudent(req.params.id, function(err, delete_res){
    if (err) {
      res.json(err);
    } else {
      res.json(delete_res);
    }
  });
});

// Courses

router.get('/courses', function(req, res, next) {
  Course.getAllCourses(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/courses/:id', function(req, res, next){
  Course.getCourse(req.params.id, function(err, student){
    if (err) {
      res.json(err);
    } else {
      res.json(student);
    }
  });
});

router.post('/courses', function(req, res, next){
  Course.addCourse(req.body, function(err, course){
    if (err) {
      res.json(err);
    } else {
      req.body.id = course.insertId; // gets the id in the body so that we can show that
      res.json(req.body);
    }
  });
});

router.patch('/courses/:id', function(req, res, next){
  Course.updateCourse(req.params.id, req.body, function(err, update_res){
    if (err) {
      res.json(err);
    } else {
      res.json(update_res);
    }
  });
});

router.delete('/courses/:id', function(req, res, next){
  Course.deleteCourse(req.params.id, function(err, delete_res){
    if (err) {
      res.json(err);
    } else {
      res.json(delete_res);
    }
  });
});

// Enrollments

router.get('/enrollments', function(req, res, next) {
  Enrollment.getAllEnrollments(function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/enrollments/class/:id', function(req, res, next) {
  Enrollment.getAllEnrollmentsForClass(req.params.id, function(err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
    }
  });
});

router.get('/enrollments/:id', function(req, res, next){
  Enrollment.getEnrollment(req.params.id, function(err, enrollment){
    if (err) {
      res.json(err);
    } else {
      res.json(enrollment);
    }
  });
});

router.post('/enrollments', function(req, res, next){
  console.log(req.body);
  Enrollment.addEnrollment(req.body, function(err, enrollment){
    if (err) {
      res.json(err);
    } else {
      res.json(req.body);
    }
  });
});

router.patch('/enrollments/:id', function(req, res, next){
  Enrollment.updateEnrollment(req.params.id, req.body, function(err, update_res){
    if (err) {
      res.json(err);
    } else {
      res.json(update_res);
    }
  });
});

router.delete('/enrollments/:id', function(req, res, next){
  Enrollment.deleteEnrollment(req.params.id, function(err, delete_res){
    if (err) {
      res.json(err);
    } else {
      res.json(delete_res);
    }
  });
});

module.exports = router;

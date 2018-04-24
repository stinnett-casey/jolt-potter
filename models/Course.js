var db = require('../database'); //reference of database.js
class Course {
  static getAllCourses(callback){
    return db.query("SELECT * FROM courses", callback);
  }

  static getCourse(id, callback){
    return db.query("SELECT * FROM courses WHERE id=?", [id], callback);
  }

  static addCourse(course, callback){
    return db.query("INSERT INTO courses (name) VALUES (?)", [course.name], callback);
  }

  static updateCourse(id, course, callback){
    return db.query("UPDATE courses SET name=? WHERE id=?",[course.name, id], callback);
  }

  static deleteCourse(id, callback){
    return db.query("DELETE FROM courses WHERE id=?", [id], callback);
  }
}

module.exports = Course;
var db = require('../database'); //reference of database.js
class Student {
  static getAllStudents(callback){
    return db.query("SELECT * FROM students", callback);
  }

  static getStudent(id, callback){
    return db.query("SELECT * FROM students WHERE id=?", [id], callback);
  }

  static addStudent(student, callback){
    return db.query("INSERT INTO students (name) VALUES (?)", [student.name], callback);
  }

  static updateStudent(id, student, callback){
    return db.query("UPDATE students SET name=? WHERE id=?",[student.name, id], callback);
  }

  static deleteStudent(id, callback){
    return db.query("DELETE FROM students WHERE id=?", [id], callback);
  }
}

module.exports = Student;
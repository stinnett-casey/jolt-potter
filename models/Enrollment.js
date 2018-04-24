var db = require('../database'); //reference of database.js
class Enrollment {
  static getAllEnrollments(callback){
    return db.query("SELECT * FROM enrollments", callback);
  }

  static getAllEnrollmentsForClass(class_id, callback){
    return db.query("SELECT students.id, students.name, enrollments.grade FROM students INNER JOIN enrollments ON enrollments.student_id = students.id WHERE enrollments.course_id=?;", [class_id], callback);
  }

  static getEnrollment(id, callback){
    return db.query("SELECT * FROM enrollments WHERE id=?", [id], callback);
  }

  static addEnrollment(enrollment, callback){
    if (enrollment.grade) {
      return db.query("INSERT INTO enrollments (student_id, course_id, grade) VALUES (?, ?, ?)", [enrollment.student_id, enrollment.course_id, enrollment.grade], callback); 
    } else {
      return db.query("INSERT INTO enrollments (student_id, course_id) VALUES (?, ?)", [enrollment.student_id, enrollment.course_id], callback);
    }
  }

  static updateEnrollment(id, enrollment, callback){
    return db.query("UPDATE enrollments SET grade=? WHERE id=?",[enrollment.grade, id], callback);
  }

  static deleteEnrollment(id, callback){
    return db.query("DELETE FROM enrollments WHERE id=?", [id], callback);
  }
}

module.exports = Enrollment;
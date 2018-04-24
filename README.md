# Full Stack Test

## DB Schema
Tables
------
* students
    * id
    * name
* courses
    * id
    * name
* enrollments
    * student_id
    * course_id
    * grade

Students m-to-m Courses
Students 1-to-m enrollments
Courses 1-to-m enrollments

## Technologies

I chose to use Express as the back end because setting up apis with it is simple and straight forward.
I also included Bootstrap so that I could do simple and quick styling.

The biggest challenges I had all had to do with configuring my very old computer to work!
Things to add (if it mattered)
    * Global search bar for students
    * All students in each class
    * All classes each student is enrolled in
    * Show the grades of each student for each class
    * Ability to edit grades

## URLs
    * All students and all courses
        * GET /students or /courses
    * One student or course
        * GET /students/:id or /courses/id
    * Add Student or course
        * POST /students or /courses
    * Update student or course
        * PATCH /students/:id or /courses/:id
    * Delete student or course
        * DELETE /students/:id or /courses/:id
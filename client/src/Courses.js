import React, { Component } from 'react';
import axios from 'axios';

export default class Courses extends Component {
  constructor(props){
    super(props);
    this.state = {courses: [], new_course_name: '', edit_course: {}};
  }

  componentWillMount(){
    axios.get('http://localhost:3001/courses').then(({ data }) => this.setState({ courses: data }));
  }

  storeCourseName({ target }){
    let new_course_name = target.value;
    this.setState({ new_course_name });
  }

  addCourse(){
    axios.post('http://localhost:3001/courses', { name: this.state.new_course_name }).then(({ data }) => {
      let { courses } = this.state;
      courses.push(data);
      this.setState({ courses, new_course_name: '' });
    });
  }

  updateEditingCourse(id){
    let edit_course = this.state.courses.filter(course => course.id === id)[0];
    this.setState({ edit_course });
  }

  updateCourse(id){
    axios.patch(`http://localhost:3001/courses/${id}`, { name: this.state.edit_course.name }).then(res => this.setState({ edit_course: {} }));
  }

  updateEditCourseName({ target }){
    let { value } = target;
    let { edit_course } = this.state;
    edit_course.name = value;
    this.setState({ edit_course });
  }

  clearEditCourse(){
    this.setState({ edit_course: {} });
  }

  deleteCourse(id){
    axios.delete(`http://localhost:3001/courses/${id}`).then(({ data }) => {
      let { courses } = this.state;
      courses = courses.filter(course => course.id !== id);
      this.setState({ courses });
    });
  }

  render() {
    if (!this.state.courses) return <p>Loading...</p>
    return (
      <div>
        <div className="user-actions courses">
          <div className="new-course">
            <input type="text" name="new-course" placeholder="New Course Name" value={this.state.new_course_name} onChange={this.storeCourseName.bind(this)} />
            <button type="button" className="btn btn-primary btn-sm" onClick={this.addCourse.bind(this)}>+</button>
          </div>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name (Click Name to Edit)</th>
            </tr>
          </thead>
          <tbody>
            {this.state.courses.map(course => (
              <tr key={course.id}>
                <td>{course.id}</td>
                <td className="position-relative">
                  <span className="name" onClick={() => this.updateEditingCourse(course.id)}>{course.name}</span>
                  <span className="delete" onClick={() => this.deleteCourse(course.id)}>X</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal" id="edit-course-modal" style={{ display: this.state.edit_course.name !== undefined ? 'block' : 'none'}} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Course</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" placeholder="Edit Course Name" value={this.state.edit_course.name} onChange={this.updateEditCourseName.bind(this)} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => this.updateCourse(this.state.edit_course.id)}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearEditCourse.bind(this)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

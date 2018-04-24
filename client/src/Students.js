import React, { Component } from 'react';
import axios from 'axios';

export default class Students extends Component {
  constructor(props){
    super(props);
    this.state = {students: [], student_query: '', matching_students: [], new_student_name: '', edit_student: {}};
  }

  componentWillMount(){
    axios.get('http://localhost:3001/students').then(({ data }) => this.setState({ students: data }));
  }

  findStudentsByName({ target }){
    let { value } = target;
    /* set matching_students to empty array when nothing in text box*/
    if (value === '') {
      this.setState({ matching_students: [] });
    } else {
      let matching_students = this.state.students.filter(student => (
        student.name.toLowerCase().includes(value.toLowerCase())
      ));
      this.setState({ matching_students });
    }
  }

  storeStudentName({ target }){
    let new_student_name = target.value;
    this.setState({ new_student_name });
  }

  addStudent(){
    axios.post('http://localhost:3001/students', { name: this.state.new_student_name }).then(({ data }) => {
      let { students } = this.state;
      students.push(data);
      this.setState({ students, new_student_name: '' });
    });
  }

  updateEditingStudent(id){
    let edit_student = this.state.students.filter(student => student.id === id)[0];
    this.setState({ edit_student });
  }

  updateStudent(id){
    axios.patch(`http://localhost:3001/students/${id}`, { name: this.state.edit_student.name }).then(res => this.setState({ edit_student: {} }));
  }

  updateEditStudentName({ target }){
    let { value } = target;
    let { edit_student } = this.state;
    edit_student.name = value;
    this.setState({ edit_student });
  }

  clearEditStudent(){
    this.setState({ edit_student: {} });
  }

  deleteStudent(id){
    axios.delete(`http://localhost:3001/students/${id}`).then(({ data }) => {
      let { students } = this.state;
      students = students.filter(student => student.id !== id);
      this.setState({ students });
    });
  }

  render() {
    if (!this.state.students) return <p>Loading...</p>
    return (
      <div>
        <div className="user-actions students">
          <input type="text" name="student-query" placeholder="Search By Student Name" onChange={this.findStudentsByName.bind(this)} />
          <div className="new-student">
            <input type="text" name="new-course" placeholder="New Student Name" value={this.state.new_student_name} onChange={this.storeStudentName.bind(this)}/>
            <button type="button" className="btn btn-primary btn-sm" onClick={this.addStudent.bind(this)}>+</button>
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
            {this.state.matching_students.length > 0 && 
              this.state.matching_students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td className="position-relative">
                    <span className="name" onClick={() => this.updateEditingStudent(student.id)}>{student.name}</span>
                    <span className="delete" onClick={() => this.deleteStudent(student.id)}>X</span>
                  </td>
                </tr>
              ))
            }
            {this.state.matching_students.length === 0 && 
              this.state.students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td className="position-relative name">
                  <span className="name" onClick={() => this.updateEditingStudent(student.id)}>{student.name}</span>
                  <span className="delete" onClick={() => this.deleteStudent(student.id)}>X</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal" id="edit-student-modal" style={{ display: this.state.edit_student.name !== undefined ? 'block' : 'none'}} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Student</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input type="text" placeholder="Edit Student Name" value={this.state.edit_student.name} onChange={this.updateEditStudentName.bind(this)} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" onClick={() => this.updateStudent(this.state.edit_student.id)}>Save changes</button>
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.clearEditStudent.bind(this)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

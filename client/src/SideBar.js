import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class SideBar extends Component {
  render() {
    return (
      <div className="sidebar-sticky">
        <ul className="nav flex-column list-group">
          <li className="nav-item list-group-item">
            <Link to="/students">Students</Link>
          </li>
          <li className="nav-item list-group-item">
            <Link to="/courses">Courses</Link>
          </li>
        </ul>
      </div>
    );
  }
}

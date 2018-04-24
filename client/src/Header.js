import React, { Component } from 'react';

export default class Header extends Component {
  render() {
    return (
      <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
        <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Albus' Management</a>
        <input className="form-control form-control-dark w-100" type="text" placeholder="Search"/>
      </nav>
    );
  }
}

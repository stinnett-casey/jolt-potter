import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Students from './Students';
import Student from './Student';
import Courses from './Courses';
import SideBar from './SideBar';
import Header from './Header';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header />
          <div className="container-fluid">
            <div className="row">
              <nav className="col-md-2 d-none d-md-block bg-light sidebar">
                <SideBar />
              </nav>
              <div className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
                <Switch>
                  <Route path="/" exact component={Students}/>
                  <Route path="/students" component={Students}/>
                  <Route path="/courses" component={Courses}/>
                  <Route path="/students/:id" component={Student}/>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

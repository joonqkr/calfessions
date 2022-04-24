import React, { Component } from 'react';
import "./topbar.css";


export default class UserLogout extends Component {
 
 logout = () => {
    localStorage.clear();
// you can also like localStorage.removeItem('Token');
    window.location.href = "/register";
  }
 
  render() {
    return (
      <button onClick={this.logout}>Log out</button>
    )
  }
}
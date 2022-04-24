import React, { Component } from 'react';


export default class UserLogout extends Component {
 
 logout = () => {
    localStorage.clear();
// you can also like localStorage.removeItem('Token');
    window.location.href = "/register";
  }
 
  render() {
    return (
      <button onClick={this.logout}>Logout</button>
    )
  }
}
import React, { Component } from 'react';
import {Redirect} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import { loginUser } from './actions/user'

class App extends Component {
  state = {
    redirect: null
  }

  componentDidMount() {
    const token = localStorage.getItem("token")
    if (!token) {
      this.setState({
        redirect: '/login'
    })} else {
      const reqObj = {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
        fetch('http://localhost:3001/api/v1/profile', reqObj)
        .then(resp => resp.json())
        .then(data => {
          this.props.loginUser(data.user.data.attributes)
    })
  }
}


  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
  }
  return (
    <div className="App">
      A user is logged in.
    </div>
  );
  }
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

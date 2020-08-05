import React, { Component } from 'react';
import {BrowserRouter as Router,
Route} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import { loginUser } from './actions/user'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import Profile from './components/user/Profile'
import UserContainer from './containers/UserContainer'

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
          console.log(this.props)
          console.log(data.user.data.attributes)
          this.props.loginUser(data.user.data.attributes)
    })
  }
}


  render() {
  return (
  <Router>
    <div className="App">
      <div>
      {this.props.user ?
      <div>
        <UserContainer />
        <Route exact path="/" component={Profile} />
        {/* // <Route exact path="/notes" render={() => <NotesContainer notes={this.props.user.notes} />} />
        // <Route exact path="/profile/edit" render={() => <EditUserForm user={this.props.user} />} />
        // <Route exact path="/notes/new" component={NewNoteForm} />
        // {this.renderNoteRoutes()}
        // {this.renderNoteEditRoutes()} */}
      </div>
      :
      <div>
      <Login />
      <Route exact path="/sign_up" component={SignUp} />
      </div>}
      </div>
    </div>
    </Router>)
}
}

const mapStateToProps = state => {
  return {user: state.user}
}

const mapDispatchToProps = {
  loginUser
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

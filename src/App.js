import React, { Component } from 'react';
import {BrowserRouter as Router,
Route} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import { loginUser } from './actions/user'
import { loadEnsembles } from './actions/ensembles'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import Profile from './components/user/Profile'
import EditUserForm from './components/user/EditUserForm'
import UserContainer from './containers/UserContainer'
import MyAdmin from './components/user/MyAdmin'
import Ensembles from './components/ensembles/Ensembles'
import Ensemble from './components/ensembles/Ensemble'

class App extends Component {
  state = {
    redirect: null
  }

  renderEnsembleRoutes = () => {
    return this.props.user.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}`} render={() => <Ensemble ensemble={ensemble} />} />
    })
  }

  // renderEnsembleEditRoutes = () => {
  //   return this.props.user.ensembles.map(ensemble => {
  //     return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}/edit`} render={() => <EditEnsemble ensemble={ensemble} />} />
  //   })
  // }

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
          console.log(data.user.data.attributes)
          this.props.loginUser(data.user.data.attributes)
          this.props.loadEnsembles(data.user.data.attributes.admin_for)
    })
  }
}


  render() {
    console.log(this.props.user, this.props.ensembles)
  return (
  <Router>
    <div className="App">
      <div>
      {this.props.user ?
      <div>
        <UserContainer />
        <Route exact path="/" component={Profile} />
        {/* // <Route exact path="/notes" render={() => <NotesContainer notes={this.props.user.notes} />} /> */}
        <Route exact path="/profile/edit" component={EditUserForm} />
        <Route exact path="/admin" component={MyAdmin} />
        <Route exact path='/ensembles' component={Ensembles} />
        {this.renderEnsembleRoutes()}
        {/* // {this.renderNoteEditRoutes()} */}
      </div>
      :
      <div>
        <div>
      {localStorage.getItem("token") ? 
      null:
      <div>
      <Login />
      <Route exact path="/sign_up" component={SignUp} />
      </div>}
        </div>
      </div>}
      </div>
    </div>
    </Router>)
}
}

const mapStateToProps = state => {
  return {user: state.user,
  ensembles: state.ensembles}
}

const mapDispatchToProps = {
  loginUser,
  loadEnsembles
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

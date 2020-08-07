import React, { Component } from 'react';
import {BrowserRouter as Router,
Route} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import { loginUser } from './actions/user'
import { loadEnsembles } from './actions/ensembles'
import { loadMembers } from './actions/members'
import Login from './components/login/Login'
import SignUp from './components/login/SignUp'
import Profile from './components/user/Profile'
import EditUserForm from './components/user/EditUserForm'
import UserContainer from './containers/UserContainer'
import MyAdmin from './components/user/MyAdmin'
import Ensembles from './components/ensembles/Ensembles'
import Ensemble from './components/ensembles/Ensemble'
import NewEnsembleForm from './components/ensembles/NewEnsembleForm'
import EditEnsembleForm from './components/ensembles/EditEnsembleForm'
import Members from './components/members/Members'

class App extends Component {
  state = {
    redirect: null
  }

  renderEnsembleRoutes = () => {
    return this.props.user.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}`} render={() => <Ensemble ensemble={ensemble} />} />
    })
  }

  renderEnsembleEditRoutes = () => {
    return this.props.user.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}/edit`} render={() => <EditEnsembleForm ensemble={ensemble} />} />
    })
  }

  renderEnsembleMemberPages = () => {
    return this.props.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}/members`} render={() => <Members ensemble={ensemble} members={this.thisEnsemblesMembers(ensemble.id)} />} />
    })
  }

  thisEnsemblesMembers = id => {
    return this.props.members.filter(member => member.ensemble_id === id)
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
          console.log(data.user.data.attributes)
          this.props.loginUser(data.user.data.attributes)
          this.props.loadEnsembles(data.user.data.attributes.admin_for)
          this.props.loadMembers(data.user.data.attributes.admined_members)
    })
  }
}


  render() {
    console.log("Going to app again")
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
        <Route exact path='/ensembles/new' component={NewEnsembleForm}/>
        {this.renderEnsembleRoutes()}
        {this.renderEnsembleEditRoutes()}
        {this.renderEnsembleMemberPages()}
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
  ensembles: state.ensembles,
  members: state.members}
}

const mapDispatchToProps = {
  loginUser,
  loadEnsembles,
  loadMembers
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from 'react';
import {BrowserRouter as Router,
Route} from 'react-router-dom'
import './App.css';
import {connect} from 'react-redux'
import { loginUser } from './actions/user'
import { loadEnsembles } from './actions/ensembles'
import { loadMembers } from './actions/members'
import { loadEvents } from './actions/events'
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
import NewMemberForm from './components/members/NewMemberForm'
import EditMemberForm from './components/members/EditMemberForm'
import Events from './components/events/Events'
import Event from './components/events/Event'
import EnsembleEvents from './components/events/EnsembleEvents'
import NewEventForm from './components/events/NewEventForm'
import EditEventForm from './components/events/EditEventForm';

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

  renderNewMemberForms = () => {
    return this.props.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}/members/new`} render={() => <NewMemberForm ensemble={ensemble} />} />
    })
  }

  renderEditMemberForms = () => {
    return this.props.members.map(member => {
      return <Route key={member.id} exact path={`/ensembles/${member.ensemble_id}/members/${member.id}/edit`} render={() => <EditMemberForm member={member} />} />
    })
  }

  renderEventPages = () => {
    return this.props.user.events.map(event => {
      const ensemble = this.props.user.ensembles.find(ensemble => ensemble.id === event.ensemble_id)
      return <Route key={event.id} exact path={`/ensembles/${event.ensemble_id}/events/${event.id}`} render={() => <Event ensemble={ensemble} event={event} />} />
    })
  }

  renderEnsembleEventPages = () => {
    return this.props.user.ensembles.map(ensemble => {
      const thisEnsemblesEvents = this.thisEnsemblesEvents(ensemble.id)
      return <Route key={ensemble.id} exact path ={`/ensembles/${ensemble.id}/events`} render={() => <EnsembleEvents ensemble={ensemble} events={thisEnsemblesEvents} />} />
    })
  }

  renderNewEventForms = () => {
    return this.props.ensembles.map(ensemble => {
      return <Route key={ensemble.id} exact path={`/ensembles/${ensemble.id}/events/new`} render={() => <NewEventForm ensemble={ensemble} />} />
    })
  }

  renderEditEventForms = () => {
    return this.props.events.map(event => {
      return <Route key={event.id} exact path={`/ensembles/${event.ensemble_id}/events/${event.id}/edit`} render={() => <EditEventForm event={event} />} />
    })
  }
    

  thisEnsemblesMembers = id => {
    return this.props.members.filter(member => member.ensemble_id === id)
  }

  thisEnsemblesEvents = id => {
    return this.props.user.events.filter(event => event.ensemble_id === id)
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
          this.props.loadEvents(data.user.data.attributes.admined_events)
    })
  }
}


  render() {
    console.log("Going to app again")
    console.log(this.props.user, this.props.ensembles)
    if (this.props.user) {
      console.log(this.renderEnsembleEventPages())
      console.log(this.renderEnsembleMemberPages())
    }
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
        <Route exact path='/my_events' component={Events} />
        <Route exact path='/ensembles/new' component={NewEnsembleForm}/>
        {this.renderEnsembleRoutes()}
        {this.renderEnsembleEditRoutes()}
        {this.renderEnsembleMemberPages()}
        {this.renderNewMemberForms()}
        {this.renderEditMemberForms()}
        {this.renderEventPages()}
        {this.renderEnsembleEventPages()}
        {this.renderNewEventForms()}
        {this.renderEditEventForms()}
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
  members: state.members,
  events: state.events}
}

const mapDispatchToProps = {
  loginUser,
  loadEnsembles,
  loadMembers,
  loadEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

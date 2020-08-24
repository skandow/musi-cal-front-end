import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header, Button } from 'semantic-ui-react'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'

class MyAdmin extends Component {
    state = {
        redirect: null
    }

    deleteEnsemble = id => {
        if (window.confirm("Are you sure you want to delete this ensemble?")) {
        const URL = "https://musi-cal-back-end.herokuapp.com/ensembles/" + id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: "/admin"
        })
        const reqObj = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
            this.props.loadEvents(data.user.data.attributes.admined_events)
        })
    }}

    renderAdminedEnsembles = () => {
        return this.props.ensembles.map(ensemble => {
            const profileLink = `/ensembles/${ensemble.id}`
            const editLink = `/ensembles/${ensemble.id}/edit`
            const membersLink = `/ensembles/${ensemble.id}/members`
            const newMemberLink = `/ensembles/${ensemble.id}/members/new`
            const emailMembersLink = `/ensembles/${ensemble.id}/members/email`
            const eventsLink = `/ensembles/${ensemble.id}/events`
            const newEventLink = `/ensembles/${ensemble.id}/events/new`
            return (
                <div key={ensemble.id}>
                    <Image src={ensemble.image_url} style={{border: "10px ridge blue", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge blue", display: "inline-block", width: "55%", height: "300px", padding: "5px", textAlign: "left"}}>
                    <Header as="h2"><NavLink className="App-link" to={profileLink} exact>{ensemble.name} Profile</NavLink>
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(ensemble.id)}>Delete</span>
                        </span>
                    </Header>
                    <Header as="h2"><NavLink className="App-link" to={membersLink} exact>{ensemble.name} Members</NavLink>
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={newMemberLink} exact>Add Member</NavLink> |
                            <NavLink className="App-link" to={emailMembersLink} exact>Email</NavLink>
                        </span>
                    </Header>
                    <Header as="h2"><NavLink className="App-link" to={eventsLink} exact>{ensemble.name} Events</NavLink>
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={newEventLink} exact>Add Event</NavLink> 
                        </span>
                    </Header>
                    <Header as='h2'>{ensemble.website}</Header>
                    <Header as='h2'>{ensemble.phone_number}</Header>
                    </div>
                </div>
            )
        })
    }
     
    render() {
        return (
            <div className="admin-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Header style={{marginTop: "10px"}} id="admin-header" as='h1'>My Admin Page</Header>
                    <Button color="green" style={{display: "inline-block"}}><NavLink style={{color: "white"}} to='ensembles/new' exact>Create a New Music Ensemble</NavLink></Button>
                </div>
                <div>
                    {this.renderAdminedEnsembles()}
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user,
    ensembles: state.ensembles }
}

const mapDispatchToProps = {
    loginUser,
    loadEnsembles,
    loadMembers,
    loadEvents
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAdmin)
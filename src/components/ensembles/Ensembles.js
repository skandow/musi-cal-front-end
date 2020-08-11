import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'

class Ensembles extends Component {
    state = {
        redirect: null
    }

    deleteEnsemble = id => {
        if (window.confirm("Are you sure you want to delete this ensemble?")) {
        const URL = "http://localhost:3001/ensembles/" + id 
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

    renderEnsembles = () => {
        return this.props.user.ensembles.map(ensemble => {
            const profileLink = `ensembles/${ensemble.id}`
            const eventsLink = `${profileLink}/events`
            const editLink = `${profileLink}/edit`
            const adminedEnsemble = this.props.ensembles.find(adminedEnsemble => adminedEnsemble.id === ensemble.id)
            return (
                <div key={ensemble.id}>
                    <Image src={ensemble.image_url} style={{border: "10px ridge blue", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge blue", width: "55%", display: "inline-block", height: "300px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1"><NavLink className="App-link" to={profileLink} exact>{ensemble.name} Profile</NavLink>
                        {adminedEnsemble ?
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(ensemble.id)}>Delete</span>
                        </span>
                        :
                        null}
                        </Header>
                        <Header as='h2'>{ensemble.website}</Header>
                        <Header as='h2'>Email Contact: {ensemble.email_contact} </Header>
                        <Header as='h2'>Phone Number: {ensemble.phone_number}</Header>
                        <Header as='h2'><NavLink className="App-link" to ={eventsLink} exact>See Upcoming Ensemble Events</NavLink></Header>
                    </div>
                </div>
            )
        })
    }
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="ensembles-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Header id="ensembles-header" as='h1'>My Ensembles</Header>
                </div>
                <div>
                    {this.renderEnsembles()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Ensembles)
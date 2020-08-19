import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { Image, Header } from 'semantic-ui-react'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'

class Ensemble extends Component {
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
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const {name, email_contact, website, phone_number, description, image_url } = this.props.ensemble
        const adminedEnsemble = this.props.ensembles.find(ensemble => ensemble.id === this.props.ensemble.id)
        const editLink = `/ensembles/${this.props.ensemble.id}/edit`
        const eventsLink = `/ensembles/${this.props.ensemble.id}/events`
        return (
            <div className="ensemble-profile">
                <Header style={{marginTop: "10px"}} as="h1">{name} Profile</Header>
                <Image src={image_url} style={{border: "10px ridge blue", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                <div style={{border: "10px ridge blue", display: "inline-block", height: "300px", width: "55%", textAlign: "left", padding: "2px"}}>
                    <Header as='h1'>{name}
                    {adminedEnsemble ?
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(this.props.ensemble.id)}>Delete</span>
                        </span>
                    :
                    null}
                    </Header>
                    <Header as='h2'>Website: {website}</Header>
                    <Header as='h2'>Email Contact: {email_contact} </Header>
                    <Header as='h2'>Phone Number: {phone_number}</Header>
                    <Header as='h2'><NavLink className="App-link" to={eventsLink} exact>See Upcoming Ensemble Events</NavLink></Header>
                </div>
                <div>
                    <Header as="h1" textAlign="left" style={{marginLeft: "150px"}}>Description:</Header>
                    <div style={{border: "10px ridge blue", display: "inline-block", whiteSpace: "pre-line", minHeight: "100px", width: "80%", textAlign: "left", padding: "2px"}}>
                        <Header as='h4'>{description}</Header>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Ensemble)
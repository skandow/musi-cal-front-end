import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Header, Button } from 'semantic-ui-react'
import { loginUser } from '../../actions/user'
import { loadEvents } from '../../actions/events'

class EnsembleEvents extends Component {

    renderEvents = (sortedEvents, adminedEnsemble) => {
        return sortedEvents.map(event => {
            const eventLink = `/ensembles/${event.ensemble_id}/events/${event.id}`
            const editEventLink = `${eventLink}/edit`
            return (
                <div key={event.id}>
                    <div style={{border: "10px ridge red", display: "inline-block", width: "75%", height: "200px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1"><NavLink to={eventLink} exact>{event.title}</NavLink>
                        {adminedEnsemble ? 
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editEventLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEvent(event.id)}>Delete</span>
                        </span>
                        :
                        null}
                        </Header>
                        <Header as='h3'>Starts: {event.start_time}</Header>
                        <Header as='h3'>Ends: {event.end_time}</Header>
                    </div>
                </div>
            )
        })
    }

    deleteEvent = id => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        const URL = "http://localhost:3001/events/" + id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: `/ensembles/${this.props.ensemble.id}/events`
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
            this.props.loadEvents(data.user.data.attributes.admined_events)
        })
    }}

    sortedEvents = () => {
        const events = this.props.events 
        const date = new Date()
        const futureEvents = events.filter(event => new Date(event.end_time) > date) 
        const sortedEvents = futureEvents.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateA - dateB
        })
        return sortedEvents
    } 
     
    render() {
        const sortedEvents = this.sortedEvents()
        const adminedEnsemble = this.props.ensembles.find(ensemble => ensemble.id === this.props.ensemble.id)
        const newEventLink = `/ensembles/${this.props.ensemble.id}/events/new`
        return (
            <div className="events-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    {adminedEnsemble ?
                    <Button floated="left" color="green" style={{display: "inline-block"}}><NavLink style={{color: "white"}} to={newEventLink} exact>Add an Event to This Ensemble</NavLink></Button>
                    :
                    null}
                    <Header id="ensembles-header" as='h1'>{this.props.ensemble.name} Events</Header>
                </div>
                <div>
                    {this.renderEvents(sortedEvents, adminedEnsemble)}
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
    loadEvents
} 

export default connect(mapStateToProps, mapDispatchToProps)(EnsembleEvents)
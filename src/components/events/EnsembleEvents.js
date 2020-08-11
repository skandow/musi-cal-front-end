import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import { Header, Button } from 'semantic-ui-react'
import { loginUser } from '../../actions/user'
import { loadEvents } from '../../actions/events'

class EnsembleEvents extends Component {
    state = {
        redirect: null
    }

    renderEvents = (sortedEvents, adminedEnsemble) => {
        return sortedEvents.map(event => {
            const eventLink = `/ensembles/${event.ensemble_id}/events/${event.id}`
            const editEventLink = `${eventLink}/edit`
            return (
                <div key={event.id}>
                    <div style={{border: "10px ridge red", display: "inline-block", width: "100%", height: "200px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1"><NavLink to={eventLink} exact>{event.title}</NavLink>
                        </Header>
                        <Header as='h3'>Starts: {event.start_time}</Header>
                        <Header as='h3'>Ends: {event.end_time}</Header>
                        {adminedEnsemble ?
                        <Header as='h3'> 
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editEventLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEvent(event.id)}>Delete</span>
                        </span>
                        </Header>
                        :
                        null}
                        
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

    setDates = () => {
        return this.props.events.map(event => {
            return {
                start: new Date(event.start_time),
                end: new Date(event.end_time),
                title: event.title,
                allDay: false,
                resource: event }
        })
    }

    navToEvent = event => {
        const eventLink = `ensembles/${event.resource.ensemble_id}/events/${event.resource.id}`
        this.setState({
            redirect: eventLink
        })
    }
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const sortedEvents = this.sortedEvents()
        const localizer = momentLocalizer(moment)
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
                <div style={{width: "80%", margin: "auto", border: "10px ridge red"}}>
                <Calendar style={{width: "50%", verticalAlign: "top", height: "460px", display: "inline-flex"}} localizer={localizer} onDoubleClickEvent={this.navToEvent} events={this.setDates()} startAccessor="start" endAccessor="end" scrollToTime={new Date(1970, 1, 1, 8)}></Calendar>
                    <div style={{width: "50%", display: "inline-block", height: "500px", overflow: "auto"}}>
                        {this.renderEvents(sortedEvents, adminedEnsemble)}
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
    loadEvents
} 

export default connect(mapStateToProps, mapDispatchToProps)(EnsembleEvents)
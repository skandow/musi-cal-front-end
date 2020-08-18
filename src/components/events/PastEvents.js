import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class PastEvents extends Component {
    renderEvents = (sortedEvents) => {
        return sortedEvents.map(event => {
            const attendanceLink = `/ensembles/${event.ensemble_id}/events/${event.id}/attendance`
            return (
                <div key={event.id}>
                    <div style={{border: "10px ridge red", display: "inline-block", width: "80%", maxHeight: "250px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1">{event.title}
                        </Header>
                        <Header as='h3'>Started: {event.start_time}</Header>
                        <Header as='h3'>Ended: {event.end_time}</Header>
                        <Header as="h3"><NavLink className="App-link" to={attendanceLink} exact>Take Attendance</NavLink></Header>
                    </div>
                </div>
            )
        })
    }

    sortedEvents = () => {
        const events = this.props.events 
        const date = new Date()
        const futureEvents = events.filter(event => new Date(event.end_time) < date) 
        const sortedEvents = futureEvents.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateB - dateA
        })
        return sortedEvents
    } 
     
    render() {
        const sortedEvents = this.sortedEvents()
        return (
            <div className="past-events-page">
                <Header as="h1">Past Events for {this.props.ensemble.name}</Header>
                <div style={{margin: "5px", marginBottom: "20px"}}>
                        {this.renderEvents(sortedEvents)}
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user,
    ensembles: state.ensembles }
}


export default connect(mapStateToProps)(PastEvents)
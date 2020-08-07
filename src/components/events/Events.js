import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

class Events extends Component {

    renderEvents = sortedEvents => {
        return sortedEvents.map(event => {
            const eventLink = `ensembles/${event.ensemble_id}/events/${event.id}`
            return (
                <div key={event.id}>
                    <div style={{border: "10px ridge red", display: "inline-block", width: "75%", height: "200px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1"><NavLink to={eventLink} exact>{event.title}</NavLink></Header>
                        <Header as='h3'>Starts: {event.start_time}</Header>
                        <Header as='h3'>Ends: {event.end_time}</Header>
                    </div>
                </div>
            )
        })
    }

    sortedEvents = () => {
        const events = this.props.user.events 
        const sortedEvents = events.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateA - dateB
        })
        return sortedEvents
    } 
     
    render() {
        const sortedEvents = this.sortedEvents()
        return (
            <div className="events-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Header id="ensembles-header" as='h1'>My Events</Header>
                </div>
                <div>
                    {this.renderEvents(sortedEvents)}
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Events)
import React, { Component } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import {Calendar, momentLocalizer} from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

class Profile extends Component {

    state = {
        redirect: null
    }

    threeClosestEvents = () => {
        const events = this.props.user.events 
        const sortedEvents = events.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateA - dateB
        })
        return sortedEvents.slice(0, 3)
    } 

    renderThreeClosestEvents = threeClosestEvents => {
        return threeClosestEvents.map(event => {
            const eventLink = `/ensembles/${event.ensemble_id}/events/${event.id}`
            return (
                <div key={event.id} style={{border: "10px outset red", margin: "auto", padding: "5px", width: "100%", textAlign: "left"}}>
                    <Header as='h2'><NavLink className="App-link" to={eventLink} exact>{event.title}</NavLink></Header>
                    <Header as='h3'>Starts: {event.start_time}</Header>
                    <Header as='h3'>Ends: {event.end_time}</Header>
                </div>
            )
        })
    }

    setDates = () => {
        return this.props.user.events.map(event => {
            return {
                start: new Date(event.start_time),
                end: new Date(event.end_time),
                title: event.title,
                allDay: false,
                resource: event }
        })
    }

    navToEvent = event => {
        console.log("This event was clicked.", event.resource)
        const eventLink = `ensembles/${event.resource.ensemble_id}/events/${event.resource.id}`
        this.setState({
            redirect: eventLink
        })
    }
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const localizer = momentLocalizer(moment)
        const threeClosestEvents = this.threeClosestEvents()
        console.log(threeClosestEvents)
        const {name, email, phone_number, primary_instrument_or_voice_part, secondary_instrument, image_url } = this.props.user
        const unconfirmedEvents = this.props.user.user_events.filter(event => event.attending === "undeclared").length 
        console.log(unconfirmedEvents)
        return (
            <div className="user-profile">
                <div style={{width: "80%", margin: "auto"}}>
                <Image src={image_url} style={{border: "10px ridge green", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                <div style={{border: "10px ridge green", display: "inline-block", height: "300px", width: "55%", textAlign: "left", padding: "2px"}}>
                    <Header as='h1'>{name}</Header>
                    <Header as='h2'>Email: {email}</Header>
                    <Header as='h2'>Phone Number: {phone_number}</Header>
                    <Header as='h2'>Primary Instrument or Voice Part: {primary_instrument_or_voice_part}</Header>
                    <Header as='h2'>Secondary Instrument: {secondary_instrument}</Header>
                </div>
                <div style={{border: "10px ridge green", display: "inline-block", margin: "0", height: "300px", width: "20%", verticalAlign: "top"}}>
                    <Header as="h2">You have {unconfirmedEvents === 0 ? "no" : unconfirmedEvents} events that require attendance confirmation. 
                    <br></br><br></br>Go to <NavLink className="App-link" to="/my_events" exact>My Events</NavLink> to confirm attendance.</Header>
                </div>
                </div>
                <div>
                    <Header as="h1" textAlign="left" style={{marginLeft: "150px", padding: "0"}}>Calendar:</Header>
                    <div style={{border: "10px ridge red", width: "80%", margin: "auto", height: "500px"}}>
                        <Calendar style={{width: "50%", verticalAlign: "top", height: "100%", display: "inline-flex"}} localizer={localizer} onDoubleClickEvent={this.navToEvent} events={this.setDates()} startAccessor="start" endAccessor="end" scrollToTime={new Date(1970, 1, 1, 8)}></Calendar>
                        <div style={{width: "50%", display: "inline-block"}}>
                            <span style={{float: "left"}}><strong>Upcoming Events:</strong></span><br></br>
                        {this.renderThreeClosestEvents(threeClosestEvents)}</div>
                    </div>
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Profile)
import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { Image, Header } from 'semantic-ui-react';

class Profile extends Component {

    state = {
        redirect: null
    };

    threeClosestEvents = () => {
        const events = this.props.user.events 
        const date = new Date()
        const futureEvents = events.filter(event => new Date(event.end_time) > date) 
        const sortedEvents = futureEvents.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateA - dateB
        })
        return sortedEvents.slice(0, 3)
    }; 

    renderThreeClosestEvents = threeClosestEvents => {
        return threeClosestEvents.map(event => {
            const ensembleName = (this.props.user.ensembles.find(ensemble => ensemble.id === event.ensemble_id)).name;
            const eventLink = `/ensembles/${event.ensemble_id}/events/${event.id}`;
            return (
                <div key={event.id} style={{border: "10px outset red", overflow: "auto", margin: "auto", padding: "5px", width: "100%", height: "32%", textAlign: "left"}}>
                    <Header as='h2'><NavLink className="App-link" to={eventLink} exact>{event.title} - {ensembleName}</NavLink></Header>
                    <Header as='h3'>Starts: {event.start_time}</Header>
                    <Header as='h3'>Ends: {event.end_time}</Header>
                </div>
            )
        })
    };

    setDates = () => {
        const events = this.props.user.events;
        const date = new Date();
        const futureEvents = events.filter(event => new Date(event.end_time) > date);
        return futureEvents.map(event => {
            return {
                start: new Date(event.start_time),
                end: new Date(event.end_time),
                title: event.title,
                allDay: false,
                resource: event }
        })
    };

    navToEvent = event => {
        const eventLink = `/ensembles/${event.resource.ensemble_id}/events/${event.resource.id}`
        this.setState({
            redirect: eventLink
        })
    };
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        };
        const localizer = momentLocalizer(moment);
        const threeClosestEvents = this.threeClosestEvents();
        const {name, email, phone_number, primary_instrument_or_voice_part, secondary_instrument, image_url } = this.props.user;
        const unconfirmedUserEvents = this.props.user.user_events.filter(event => event.attending === "undeclared");
        const mappedEvents = unconfirmedUserEvents.map(user_event => {
            return this.props.user.events.find(event => event.id === user_event.event_id)
        });
        const date = new Date();
        const unconfirmedEvents = mappedEvents.filter(event => new Date(event.end_time) > date).length;
        return (
            <div className="user-profile">
                <Header style={{marginTop: "10px"}} as="h1">Welcome!</Header>
                <div style={{width: "80%", margin: "auto"}}>
                <Image src={image_url} style={{border: "10px ridge green", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                <div style={{border: "10px ridge green", display: "inline-block", height: "300px", width: "55%", textAlign: "left", padding: "5px"}}>
                    <Header as='h1'>{name}</Header>
                    <Header as='h2'>Email: {email}</Header>
                    <Header as='h2'>Phone Number: {phone_number}</Header>
                    <Header as='h2'>Primary Instrument or Voice Part: {primary_instrument_or_voice_part}</Header>
                    <Header as='h2'>Secondary Instrument: {secondary_instrument}</Header>
                </div>
                <div style={{border: "10px ridge green", display: "inline-block", margin: "0", height: "300px", width: "20%", verticalAlign: "top", padding: "5px", overflow: "scroll"}}>
                    <Header as="h3">You have {unconfirmedEvents === 0 ? "no" : unconfirmedEvents} {unconfirmedEvents === 1 ? "event" : "events"} that require attendance confirmation. 
                    <hr style={{backgroundColor: "green", height: "2px"}}/>Go to <NavLink className="App-link" to="/my_events" exact>My Events</NavLink> to confirm attendance.</Header>
                </div>
                </div>
                <div>
                    <Header as="h1" textAlign="left" style={{marginLeft: "150px", marginTop: "20px", padding: "0"}}>Calendar:</Header>
                    <div style={{border: "10px ridge red", width: "80%", margin: "auto", height: "500px"}}>
                        <Calendar style={{width: "50%", verticalAlign: "top", height: "100%", display: "inline-flex"}} localizer={localizer} onDoubleClickEvent={this.navToEvent} events={this.setDates()} startAccessor="start" endAccessor="end" scrollToTime={new Date(1970, 1, 1, 8)}></Calendar>
                        <div style={{width: "50%", height: "100%", display: "inline-block"}}>
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
};

export default connect(mapStateToProps)(Profile)
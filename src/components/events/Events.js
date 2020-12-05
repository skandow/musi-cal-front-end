import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import {Calendar, momentLocalizer} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { connect } from 'react-redux';
import { Header, Button } from 'semantic-ui-react';
import { loginUser } from '../../actions/user';
import { loadEvents } from '../../actions/events';

class Events extends Component {
    state = {
        redirect: null
    };

    deleteEvent = id => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            const URL = "https://musi-cal-back-end.herokuapp.com/events/" + id;
            const token = localStorage.getItem("token");
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
        }
    };

    confirmAttendance = event => {
        const URL = "https://musi-cal-back-end.herokuapp.com/user_events/" + event.target.name;
        const token = localStorage.getItem("token");
        const payload = { 
            user_event: {
                attending: event.target.value
            }
        } 
        const reqObj = {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
            }, 
            body: JSON.stringify(payload)
        }
        fetch(URL, reqObj)
        .then(resp => resp.json())
        .then(data => {
            this.props.loginUser(data.user.data.attributes)
        })
    };

    renderAttendanceStatus = userEvent => {
        if (userEvent.attending === "undeclared") {
            return (<div>
                <Header as="h3">Will you be attending this event?
                <Button onClick={this.confirmAttendance} value="no" name={userEvent.id} floated="right" size='tiny' color="red">No</Button>
                <Button onClick={this.confirmAttendance} style={{marginLeft: "10px"}} floated="right" value="yes" name={userEvent.id} size='tiny' color="green">Yes</Button>
                </Header>
                
            </div>)
        } else {
            return (<div>
                <Header as="h3">Attendance Status: You {userEvent.attending === "yes" ? "will" : "won't"} be attending this event.<Button onClick={this.confirmAttendance} value="undeclared" floated="right" size='mini' name={userEvent.id} style={{display: 'inline-block'}} color="yellow">Edit</Button></Header>
                </div>)
        } 
    }

    renderEvents = (sortedEvents) => {
        return sortedEvents.map(event => {
            const eventLink = `/ensembles/${event.ensemble_id}/events/${event.id}`;
            const adminedEvent = this.props.events.find(adminedEvent => adminedEvent.id === event.id);
            const editEventLink = `${eventLink}/edit`;
            const userEvent = this.props.user.user_events.find(user_event => user_event.event_id === event.id);
            const ensembleName = (this.props.user.ensembles.find(ensemble => ensemble.id === event.ensemble_id)).name;
            return (
                <div key={event.id}>
                    <div style={{border: "10px ridge red", display: "inline-block", width: "100%", height: "260px", padding: "5px", textAlign: "left"}}>
                        <Header as="h2"><NavLink className="App-link" to={eventLink} exact>{event.title}</NavLink></Header>
                        <Header as="h2">Ensemble: {ensembleName}</Header>
                        <Header as='h3'>Starts: {event.start_time}</Header>
                        {adminedEvent ?
                        <Header as='h3'> 
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editEventLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEvent(event.id)}>Delete</span>
                        </span>
                        </Header>
                        :
                        null}
                        <Header as='h3'>Ends: {event.end_time}</Header>
                        <hr style={{backgroundColor: "red", height: "2px"}} />
                        {this.renderAttendanceStatus(userEvent)}
                        
                    </div>
                </div>   
            )
        })
    };

    sortedEvents = () => {
        const events = this.props.user.events;
        const date = new Date();
        const futureEvents = events.filter(event => new Date(event.end_time) > date); 
        const sortedEvents = futureEvents.slice().sort((a, b) => {
            const dateA = new Date(a.start_time);
            const dateB = new Date(b.start_time);
            return dateA - dateB
        })
        return sortedEvents
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
        const eventLink = `/ensembles/${event.resource.ensemble_id}/events/${event.resource.id}`;
        this.setState({
            redirect: eventLink
        })
    };
     
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        };
        const sortedEvents = this.sortedEvents();
        const localizer = momentLocalizer(moment);
        return (
            <div className="events-page">
                <div style={{margin: "5px", marginTop: "10px", marginBottom: "20px"}}>
                    <Header id="ensembles-header" as='h1'>My Events</Header>
                </div>
                <div style={{border: "10px ridge red", width: "80%", margin: "auto"}}>
                    <Calendar style={{width: "50%", verticalAlign: "top", height: "460px", display: "inline-flex"}} localizer={localizer} onDoubleClickEvent={this.navToEvent} events={this.setDates()} startAccessor="start" endAccessor="end" scrollToTime={new Date(1970, 1, 1, 8)}></Calendar>
                    <div style={{width: "50%", display: "inline-block", height: "500px", overflow: "auto"}}>{this.renderEvents(sortedEvents)}</div>
                </div>
            </div>                 
        )
    };
};

const mapStateToProps = state => {
    return { user: state.user,
    events: state.events }
};

const mapDispatchToProps = {
    loginUser,
    loadEvents
}; 

export default connect(mapStateToProps, mapDispatchToProps)(Events)
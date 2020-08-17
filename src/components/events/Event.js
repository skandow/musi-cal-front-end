import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom'
import { Header } from 'semantic-ui-react'
import { loginUser } from '../../actions/user'
import { loadEvents } from '../../actions/events'
import EventMap from './EventMap'


class Event extends Component {
    state = {
        redirect: null
    }

    deleteEvent = id => {
        if (window.confirm("Are you sure you want to delete this event?")) {
        const URL = "http://localhost:3001/events/" + id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: `/ensembles/${this.props.event.ensemble_id}/events`
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
     
    render() {
        console.log(this.props.event.lat, this.props.event.lng)
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const {title, start_time, end_time, place, description, mandatory } = this.props.event
        const adminedEvent = this.props.events.find(adminedEvent => adminedEvent.id === this.props.event.id)
        const editEventLink = `/ensembles/${this.props.event.ensemble_id}/events/${this.props.event.id}/edit`
        const plannedAttendanceLink = `/ensembles/${this.props.event.ensemble_id}/events/${this.props.event.id}/planned_attendance` 
        const ensembleName = (this.props.user.ensembles.find(ensemble => ensemble.id === this.props.event.ensemble_id)).name
        return (
            <div className="event-profile">
                <div style={{border: "10px ridge red", display: "inline-block", height: "300px", width: "80%", textAlign: "left"}}>
                    <div style={{width: "40%", display: "inline-block"}}>
                        <EventMap lat={this.props.event.lat} lng={this.props.event.lng}></EventMap>
                    </div>
                    <div style={{width: "60%", display: "inline-block", verticalAlign: "top", borderLeft: "10px ridge red", height: "100%", overflow: "auto"}}>
                    <Header as='h1'>{title} - {ensembleName}
                    {adminedEvent ?
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editEventLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEvent(this.props.event.id)}>Delete</span>
                        </span>
                    :
                    null}</Header>
                    <Header as='h2'>Location: {place}</Header>
                    <Header as='h2'>Start Time: {start_time} </Header>
                    <Header as='h2'>End Time: {end_time}</Header>
                    <Header as='h2'>Mandatory?: {mandatory ? "Yes" : "No"}
                    {adminedEvent ?
                        <NavLink style={{float: "right"}} className="App-link" to={plannedAttendanceLink} exact>See this event's planned attendance roster.</NavLink>
                    :
                    null}</Header>
                    </div>
                </div>
                <div>
                    <Header as="h1" textAlign="left" style={{marginLeft: "150px"}}>Description:</Header>
                    <div style={{border: "10px ridge red", display: "inline-block", height: "300px", width: "80%", textAlign: "left", padding: "2px"}}>
                        {description}
                    </div>
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user,
    events: state.events }
}

const mapDispatchToProps = {
    loginUser,
    loadEvents
} 

export default connect(mapStateToProps, mapDispatchToProps)(Event)
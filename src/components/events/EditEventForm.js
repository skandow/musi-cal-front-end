import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'

class EditEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.event.title,
            start_time: new Date(this.props.event.start_time),
            end_time: new Date(this.props.event.end_time),
            place: this.props.event.place,
            description: this.props.event.description,
            mandatory: this.props.event.mandatory,
            errorMessage: '',
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleStartChange = date => {
        const dateNow = new Date()
        if (date < dateNow) {
            this.setState({
                errorMessage: "The start time must be in the future.",
                start_time: null
            })
        } else {
        this.setState({
            errorMessage: "",
            start_time: date
        })}
    }

    handleEndChange = date => {
        this.setState({
            end_time: date,
            errorMessage: ""
        })}

    mandatoryOrNot = () => {
        this.setState({
            mandatory: !this.state.mandatory
        })
    }

    componentWillUnmount() {
        this.setState({
            title: '',
            start_time: '',
            end_time: '',
            place: '',
            description: '',
            mandatory: false,
        })
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
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const URL = "http://localhost:3001/events/" + this.props.event.id
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "2-digit"}
        const start_date = new Date(this.state.start_time)
        const end_date = new Date(this.state.end_time)
            if (end_date < start_date) {
                this.setState({
                    errorMessage: "The end time must be after the start date."
                })
            } else {
        let title = this.state.title === '' ? this.props.event.title : this.state.title 
        let start_time = this.state.start_time === this.props.event.start_time ? this.props.event.start_time : this.state.start_time.toLocaleDateString("en-US", options)
        let end_time = this.state.end_time === this.props.event.end_time ? this.props.event.end_time : this.state.end_time.toLocaleDateString("en-US", options)
        let place = this.state.place === '' ? this.props.event.place : this.state.place    
        let description = this.state.description === '' ? this.props.event.description : this.state.description
            const payload = { event: {
            title: title,
            start_time: start_time,
            end_time: end_time,
            place: place,
            description: description,
            mandatory: this.state.mandatory
        }}
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch(URL, reqObj)
        .then((resp) => resp.json())
        .then(data => {
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEvents(data.user.data.attributes.admined_events)
            this.setState({
                redirect: `/ensembles/${this.props.event.ensemble_id}/events/${this.props.event.id}`
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    } }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        const checked = this.state.mandatory
        return (
            <div className="new-event">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Edit This Event</h3>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                :
                null}
                <div className="field">
                    <label>Title of Event:</label>
                    <input onChange={this.handleChange} type="text" name="title" value={this.state.title} />
                </div>
                <div className="field">
                    <label>Start Time:</label>
                    <DatePicker onChange={this.handleStartChange} name="start_time" showTimeSelect selected={this.state.start_time} value={this.state.start_time} dateFormat="MM/dd/yyyy h:mm aa"/>
                </div>
                <div className="field">
                    <label>End Time:</label>
                    <DatePicker onChange={this.handleEndChange} name="end_time" showTimeSelect selected={this.state.end_time} value={this.state.end_time} dateFormat="MM/dd/yyyy h:mm aa"/>
                </div> 
                <div className="field">
                    <label>Location:</label>
                    <input onChange={this.handleChange} type="text" name="place" value={this.state.place} />
                </div>
                <div className="field">
                    <label>Description:</label>
                    <textarea onChange={this.handleChange} type="text" rows="10" name="description" value={this.state.description} ></textarea>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input onChange={this.mandatoryOrNot} checked={checked} type="checkbox" />
                        <label>Is This Event Mandatory?</label>
                    </div>
                </div>
                <Button type="submit" color="green">Submit</Button>
                <button type="button" className="ui button red delete" style={{float: "right"}} onClick={() => this.deleteEvent(this.props.event.id)}>Delete This Event</button>
            </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser,
    loadEnsembles,
    loadMembers,
    loadEvents
}
  
export default connect(null, mapDispatchToProps)(EditEventForm)
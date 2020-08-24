import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'
import Search from './Search'

class NewEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            start_time: null,
            end_time: null,
            place: '',
            lat: null,
            lng: null,
            description: '',
            mandatory: false,
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

    handlePlaceSelection = (address, lat, lng) => {
        this.setState({
            place: address,
            lat: lat,
            lng: lng
        })
    }

    handleEndChange = date => {
        this.setState({
            end_time: date,
        })
    }

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
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "2-digit"}
        
        if ((this.state.start_time) && (this.state.end_time)) {
            const start_date = new Date(this.state.start_time)
            const end_date = new Date(this.state.end_time)
            if (end_date < start_date) {
                this.setState({
                    errorMessage: "The end time must be after the start date."
                })
            } else {
            if ((this.state.title) && (this.state.place) && (this.state.description)) {
            const payload = { event: {
            ensemble_id: this.props.ensemble.id,
            title: this.state.title,
            start_time: this.state.start_time.toLocaleDateString("en-US", options),
            end_time: this.state.end_time.toLocaleDateString("en-US", options),
            place: this.state.place,
            lat: this.state.lat,
            lng: this.state.lng,
            description: this.state.description,
            mandatory: this.state.mandatory
        }}
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch("https://musi-cal-back-end.herokuapp.com/events", reqObj)
        .then((resp) => resp.json())
        .then(data => {
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
            this.props.loadEvents(data.user.data.attributes.admined_events)
            this.setState({
                redirect: `/ensembles/${this.props.ensemble.id}/events`
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    } else this.setState({
        errorMessage: "No fields can be left blank."
    })}
    } else {
        this.setState({
            errorMessage: "No fields can be left blank."
    })}}
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="new-event">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Create Your Event</h3>
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
                    <input onChange={this.handleChange} type="text" name="title" value={this.state.title} placeholder="i.e. 'Community Orchestra Rehearsal', 'Christmas Concert'" />
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
                    <Search handlePlaceSelection={this.handlePlaceSelection}></Search>
                </div>
                <div className="field">
                    <label>Description:</label>
                    <textarea onChange={this.handleChange} type="text" rows="10" name="description" value={this.state.description} placeholder="Give a description of the event here."></textarea>
                </div>
                <div className="field">
                    <div className="ui checkbox">
                        <input onChange={this.mandatoryOrNot} type="checkbox" />
                        <label>Is This Event Mandatory?</label>
                    </div>
                </div>
                <Grid>
                    <Grid.Column textAlign="center">
                            <Button type="submit" color="green">Submit</Button>
                    </Grid.Column>
                </Grid>
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
  
export default connect(null, mapDispatchToProps)(NewEventForm)
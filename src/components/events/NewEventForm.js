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

class NewEventForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            start_time: null,
            end_time: null,
            place: '',
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

    handleEndChange = date => {
        if (date < this.state.start_time) {
            this.setState({
                errorMessage: "The end time must be after the start time."
            })
        } else {
        this.setState({
            end_time: date,
            errorMessage: ""
        })}
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
        
        if ((this.state.title) && (this.state.start_time) && (this.state.end_time) && (this.state.place) && (this.state.description)) {
            const payload = { event: {
            ensemble_id: this.props.ensemble.id,
            title: this.state.title,
            start_time: this.state.start_time.toLocaleDateString("en-US", options),
            end_time: this.state.end_time.toLocaleDateString("en-US", options),
            place: this.state.place,
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
        
        fetch("http://localhost:3001/events", reqObj)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
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
    })
    }
    
    render() {
        console.log(this.state.start_time)
        console.log(this.state.end_time)
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
                    <input onChange={this.handleChange} type="text" name="place" value={this.state.place} placeholder="i.e. 'Shell Auditorium'" />
                </div>
                <div className="field">
                    <label>Description:</label>
                    <textarea onChange={this.handleChange} type="text" rows="10" name="description" value={this.state.description} placeholder="Give a description of the ensemble here."></textarea>
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
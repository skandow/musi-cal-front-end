import React, { Component } from 'react'
import { Form, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'

class EditEnsembleForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.ensemble.name,
            email_contact: this.props.ensemble.email_contact,
            phone_number: this.props.ensemble.phone_number,
            website: this.props.ensemble.website,
            description: this.props.ensemble.description,
            image_url: this.props.ensemble.image_url,
            errorMessage: '',
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            email_contact: '',
            phone_number: '',
            website: '',
            description: '',
            image_url: '',
        })
    }

    deleteEnsemble = id => {
        const URL = "http://localhost:3001/ensembles/" + id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: "/admin"
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
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const URL = "http://localhost:3001/ensembles/" + this.props.ensemble.id
        const token = localStorage.getItem("token")
        let name = this.state.name === '' ? this.props.ensemble.name : this.state.name 
        let email_contact = this.state.email_contact === '' ? this.props.ensemble.email_contact : this.state.email_contact
        let phone_number = this.state.phone_number === '' ? this.props.ensemble.phone_number : this.state.phone_number
        let website = this.state.website === '' ? this.props.ensemble.website : this.state.website    
        let description = this.state.description === '' ? this.props.ensemble.description : this.state.dsecription
        let image_url = this.state.image_url === '' ? this.props.ensemble.image_url : this.state.image_url
        const payload = { ensemble: {
            name: name,
            email_contact: email_contact,
            website: website,
            phone_number: phone_number,
            description:description,
            image_url: image_url
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
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.setState({
                redirect: `/ensembles/${this.props.ensemble.id}`
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="edit-ensemble">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Edit This Ensemble</h3>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                :
                null}
                <div className="field">
                    <label>Name:</label>
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="i.e. 'Community Orchestra'" />
                </div>
                <div className="field">
                    <label>Website:</label>
                    <input onChange={this.handleChange} type="text" name="website" value={this.state.website} placeholder="enter 'none' if no website exists for this ensemble" />
                </div>
                <div className="field">
                    <label>Email Contact:</label>
                    <input onChange={this.handleChange} type="text" name="email_contact" value={this.state.email_contact} placeholder="community_orchestra@example.com" />
                </div> 
                <div className="field">
                    <label>Phone Number:</label>
                    <input onChange={this.handleChange} type="text" name="phone_number" value={this.state.phone_number} placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="field">
                    <label>Image_Url:</label>
                    <input onChange={this.handleChange} type="text" name="image_url" value={this.state.image_url} placeholder="image_url"/>
                </div>
                <div className="field">
                    <label>Description:</label>
                    <textarea onChange={this.handleChange} type="text" rows="10" name="description" value={this.state.description} placeholder="Give a description of the ensemble here."></textarea>
                </div>
                <Button type="submit" color="green">Update</Button>
                <button type="button" className="ui button red delete" style={{float: "right"}} onClick={() => this.deleteEnsemble(this.props.ensemble.id)}>Delete This Ensemble</button>
            </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser,
    loadEnsembles,
    loadMembers
}
  
export default connect(null, mapDispatchToProps)(EditEnsembleForm)
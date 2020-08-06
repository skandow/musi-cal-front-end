import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'

class NewEnsembleForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email_contact: '',
            phone_number: '',
            website: '',
            description: '',
            image_url: '',
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
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        if ((this.state.name) && (this.state.email_contact) && (this.state.phone_number) && (this.state.website) && (this.state.description) && (this.state.image_url)) {
            const payload = { ensemble: {
            name: this.state.name,
            email_contact: this.state.email_contact,
            website: this.state.website,
            phone_number: this.state.phone_number,
            description: this.state.description,
            image_url: this.state.image_url
        }}
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch("http://localhost:3001/ensembles", reqObj)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.setState({
                redirect: "/admin"
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
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="new-ensemble">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Create Your Ensemble</h3>
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
    loadEnsembles
}
  
export default connect(null, mapDispatchToProps)(NewEnsembleForm)
import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'
import { loadMembers } from '../../actions/members'

class NewMemberForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            admin: false,
            performing_roles: '',
            administrative_roles: '',
            show_performing_roles: false,
            show_administrative_roles: false,
            errorMessage: '',
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    renderField = event => {
        console.log(event.target.name)
        this.setState({
            [event.target.name]: !this.state[event.target.name]
        })
    }

    adminOrNot = () => {
        this.setState({
            admin: !this.state.admin
        })
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            admin: false,
            performing_roles: '',
            administrative_roles: '',
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem("token")
        let performing_roles = this.state.performing_roles === '' ? 'none' : this.state.performing_roles
        let administrative_roles = this.state.administrative_roles === '' ? 'none' : this.state.administrative_roles
        if (this.state.email) {
            const payload = { 
                email: this.state.email, 
                membership: {
                ensemble_id: this.props.ensemble.id,
                admin: this.state.admin,
                performing_roles: performing_roles,
                administrative_roles: administrative_roles}
        }
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch("http://localhost:3001/memberships", reqObj)
        .then((resp) => resp.json())
        .then(data => {
            console.log(data)
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
            this.setState({
                redirect: `/ensembles/${this.props.ensemble.id}/members`
            })
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })}
    else this.setState({
        errorMessage: "The email field can't be left blank."
    })
}
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="new-member">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Please Enter the Following Information to Add a Member to This Ensemble</h3>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                :
                null}
                <div className="field">
                    <label>Member Email:</label>
                    <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="This should be the email associated with the user's profile on 'Musi-Cal'" />
                </div>
                <Button fluid name="show_performing_roles" onClick={this.renderField} type="button" color="grey">{this.state.show_performing_roles ? "Hide Performing Role Field" : "Show Performing Role Field" }</Button>
                <div>
                    {this.state.show_performing_roles ?
                    <div className="field">
                    <label>Performing Roles:</label>
                    <input onChange={this.handleChange} type="text" name="performing_roles" value={this.state.performing_roles} placeholder="i.e. 'second trumpet', 'section viola', 'guest soloist'" />
                    </div>
                    :
                    null} 
                </div>
                <br></br>
                <Button fluid name="show_administrative_roles" onClick={this.renderField} type="button" color="grey">{this.state.show_administrative_roles ? "Hide Administrative Role Field" : "Show Administrative Role Field" }</Button>
                <div>
                {this.state.show_administrative_roles ?
                <div className="field">
                    <label>Administrative Roles:</label>
                    <input onChange={this.handleChange} type="text" name="administrative_roles" value={this.state.administrative_roles} placeholder="i.e. 'personnel manager', 'band secretary', 'artistic director'" />
                </div>
                :
                null}
                </div>
                <br></br> 
                <div className="field">
                    <div className="ui checkbox">
                        <input onChange={this.adminOrNot} type="checkbox" />
                        <label>Give Admin Privileges To This Member</label>
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
    loadMembers
}
  
export default connect(null, mapDispatchToProps)(NewMemberForm)
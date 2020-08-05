import React, { Component } from 'react'
import { Form, Grid, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions/user'

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            phone_number: '',
            primary_instrument_or_voice_part: '',
            secondary_instrument: '',
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
            email: '',
            password: '',
            phone_number: '',
            primary_instrument_or_voice_part: '',
            secondary_instrument: '',
            image_url: '',
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        if ((this.state.name) && (this.state.password) && (this.state.email) && (this.state.phone_number) && (this.state.primary_instrument_or_voice_part) && (this.state.image_url)) {
            let secondary_instrument = this.state.secondary_instrument === '' ? 'none' : this.state.secondary_instrument
            const payload = { user: {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            phone_number: this.state.phone_number,
            primary_instrument_or_voice_part: this.state.primary_instrument_or_voice_part,
            secondary_instrument: secondary_instrument,
            image_url: this.state.image_url
        }}
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        fetch("http://localhost:3001/api/v1/users", reqObj)
        .then((resp) => {
            if(resp.status === 406) {
                throw Error("E-mail must be unique")
            } else {
                this.setState({
                    redirect: '/'
                })
                return resp.json()
            }
            })
        .then(data => {
            localStorage.setItem("token", data.jwt)
            this.props.loginUser(data.user.data.attributes)
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
            <div className="signup">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Create Your Account</h3>
                {this.state.errorMessage ? 
                <div className="ui error message">
                    <div className="content">
                        <p>{this.state.errorMessage}</p>
                    </div>
                </div>
                :
                null}
                <div className="field">
                    <label>Name</label>
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.name} placeholder="i.e. 'John Doe'" />
                </div>
                <div className="field">
                    <label>Email address:</label>
                    <input onChange={this.handleChange} type="text" name="email" value={this.state.email} placeholder="example@example.com" />
                </div>
                <div className="field">
                    <label>Password:</label>
                    <input onChange={this.handleChange} type="password" name="password" value={this.state.password} />
                </div> 
                <div className="field">
                    <label>Phone Number:</label>
                    <input onChange={this.handleChange} type="text" name="phone_number" value={this.state.phone_number} placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="field">
                    <label>Primary Instrument or Voice Part:</label>
                    <input onChange={this.handleChange} type="text" name="primary_instrument_or_voice_part" value={this.state.primary_instrument_or_voice_part} placeholder="examples: 'trumpet', 'mezzo-soprano'" />
                </div>
                <div className="field">
                    <label>Secondary Instrument:</label>
                    <input onChange={this.handleChange} type="text" name="secondary_instrument" value={this.state.secondary_instrument} />
                </div>
                <div className="field">
                    <label>Image Url:</label>
                    <input onChange={this.handleChange} type="text" name="image_url" value={this.state.image_url} placeholder="image_url" />
                </div>
                <Grid>
                    <Grid.Column textAlign="center">
                            <Button type="submit" color="red">Submit</Button>
                    </Grid.Column>
                </Grid>
            </Form>
            </div>
        )
    }
}

const mapDispatchToProps = {
    loginUser
}
  
export default connect(null, mapDispatchToProps)(SignUp)
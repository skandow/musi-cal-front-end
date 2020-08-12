import React, {Component} from 'react'
import { Header, Form, Button, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions/user'
import { loadEnsembles } from '../../actions/ensembles'
import { loadMembers } from '../../actions/members'
import { loadEvents } from '../../actions/events'


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errorMessage: false,
            redirect: null
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        const payload = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(payload)
        this.setState({
            email: '',
            password: ''
        })
        const reqObj = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }
        
        fetch("http://localhost:3001/api/v1/login", reqObj)
        .then((resp) => {
            if(resp.status === 401) {
                throw Error("The email or password is incorrect")
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
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
            this.props.loadMembers(data.user.data.attributes.admined_members)
            this.props.loadEvents(data.user.data.attributes.admined_events)
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
            <div className="login-container" >
                <div className="login-header" style={{border: "5px solid green", width: "80%", margin: "auto", marginBottom: "5px", padding: "10px", backgroundColor: "PowderBlue"}}>
                    <Header textAlign="center" as='h1'>Welcome to Musi-Cal!</Header>
                    <Header textAlign="center" as='h2'>A One-Stop Site for Musicians to Organize Rehearsals, Performances, & Other Events</Header>
                </div>
                <Form error onSubmit={this.handleSubmit} style={{width: "25%", margin: "auto", padding: "20px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
                    <Header textAlign="center" as='h3'>Please Sign In</Header>
                    <div>{this.state.errorMessage ? 
                        <div className="ui error message">
                            <div className="content">
                                <p>{this.state.errorMessage}</p>
                            </div>
                        </div>
                    :
                        null}
                    </div>
                    <Form.Field>
                        <label>Email</label>
                        <input value={this.state.email} name="email" onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input value={this.state.password} name="password" onChange={this.handleChange} type="password" />
                    </Form.Field>
                    <Grid>
                        <Grid.Column textAlign="center">
                            <Button type="submit" color="green">Log In</Button>
                            <br></br>
                            <br></br>
                            <Button color="blue"><NavLink style={{color: "white"}} to="/sign_up" exact>Sign Up To Create An Account</NavLink></Button>
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
  
export default connect(null, mapDispatchToProps)(Login)
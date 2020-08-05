import React, {Component} from 'react'
import { Header, Form, Button, Grid } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { loginUser } from '../../actions/user'


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
                throw Error("The username or password is incorrect")
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
            console.log("A user has logged in")
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    }

    render() {
        return (
            <div className="login-container" >
                <Header textAlign="center" as='h1'>Welcome to Music-Cal!</Header>
                <Header textAlign="center" as='h2'>A One-Stop Site for Musicians to Organize Rehearsals, Performances, & Other Events</Header>
                <Form onSubmit={this.handleSubmit} style={{width: "25%", margin: "auto", padding: "20px", border: "2px solid red"}}>
                    <Header textAlign="center" as='h3'>Please Sign In</Header>
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
                            <Button type="submit" color="red">Log In</Button>
                            <br></br>
                            <br></br>
                            <NavLink className="App-link" to="/sign_up" exact>Sign Up To Create An Account</NavLink>
                        </Grid.Column>
                    </Grid>
                </Form>
                <br></br>
                <br></br>
                
            </div>
        ) 

    }
}

const mapDispatchToProps = {
    loginUser
}
  
export default connect(null, mapDispatchToProps)(Login)
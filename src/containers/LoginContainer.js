import React, {Component} from 'react'
import { Header } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom';


class LoginContainer extends Component {
    render() {
        return (
            <div className="login-container">
                <Header as='h1'>Welcome to Music-Cal!</Header>
                <Header as='h2'>A One-Stop Site for Musicians to Organize Rehearsals, Performances, & Other Events</Header>
                <NavLink className="App-link ui button" to="/login" exact>Log In</NavLink> 
                <br></br>
                <br></br>
                <NavLink className="App-link ui button" to="/sign_up" exact>Sign Up To Create An Account</NavLink>
            </div>
        ) 

    }
}

export default LoginContainer
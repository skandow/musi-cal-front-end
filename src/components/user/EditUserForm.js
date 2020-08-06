import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { editUser, logoutUser } from '../../actions/user'
import { clearEnsembles } from '../../actions/ensembles'

class EditUserForm extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            phone_number: '',
            primary_instrument_or_voice_part: '',
            secondary_instrument: '',
            image_url: '',
            errorMessage: '',
            redirect: null
        }
    }

    componentDidMount() {
        this.setState({
            name: this.props.user.name,
            email: this.props.user.email,
            phone_number: this.props.user.phone_number,
            primary_instrument_or_voice_part: this.props.user.primary_instrument_or_voice_part,
            secondary_instrument: this.props.user.secondary_instrument,
            image_url: this.props.user.image_url,
            errorMessage: '',
            redirect: null
        })
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const URL = "http://localhost:3001/api/v1/users/" + this.props.user.id
        const token = localStorage.getItem("token")
        let name = this.state.name === '' ? this.props.user.name : this.state.name 
        let email = this.state.email === '' ? this.props.user.email : this.state.email
        let phone_number = this.state.phone_number === '' ? this.props.user.phone_number : this.state.phone_number
        let primary_instrument_or_voice_part = this.state.primary_instrument_or_voice_part === '' ? this.props.user.primary_instrument_or_voice_part : this.state.primary_instrument_or_voice_part    
        let secondary_instrument = this.state.secondary_instrument === '' ? this.props.user.secondary_instrument : this.state.secondary_instrument
        let image_url = this.state.image_url === '' ? this.props.user.image_url : this.state.image_url
        const payload = {
            name: name,
            email: email,
            phone_number: phone_number,
            primary_instrument_or_voice_part: primary_instrument_or_voice_part,
            secondary_instrument: secondary_instrument,
            image_url: image_url
        }
        const reqObj = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        }
        
        fetch(URL, reqObj)
        .then(resp => {
            if(resp.status === 406) {
                throw Error("E-mail must be unique")
            } else {
                this.setState({
                    redirect: '/'
                })
                return resp.json()
            }})
        .then(data => {
            this.props.editUser(data.data.attributes);
        })
        .catch(error => {
            this.setState({
                errorMessage: error.message
            })
        })
    }

    deleteUser = () => {
        const URL = "http://localhost:3001/api/v1/users/" + this.props.user.id 
        const token = localStorage.getItem("token")
        localStorage.removeItem('token')
        this.setState({
            redirect: "/"
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
            this.props.logoutUser()
            this.props.clearEnsembles()
        })
    }
    
    render() {
        console.log(this.state.redirect)
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="edit">
                <Form error onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
            
                <h3 style={{textAlign: "center"}}>Edit Your Profile</h3>
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
                    <input onChange={this.handleChange} type="text" name="name" value={this.state.name}/>
                </div>
                <div className="field">
                    <label>Email address</label>
                    <input onChange={this.handleChange} type="text" name="email" value={this.state.email}/>
                </div>
                <div className="field">
                    <label>Phone Number</label>
                    <input onChange={this.handleChange} type="text" name="phone_number" value={this.state.phone_number} placeholder="(xxx) xxx-xxxx" />
                </div>
                <div className="field">
                    <label>Primary Instrument or Voice Part</label>
                    <input onChange={this.handleChange} type="text" name="primary_instrument_or_voice_part" value={this.state.primary_instrument_or_voice_part} placeholder="examples: 'trumpet', 'mezzo-soprano'" />
                </div>
                <div className="field">
                    <label>Secondary Instrument</label>
                    <input onChange={this.handleChange} type="text" name="secondary_instrument" value={this.state.secondary_instrument} />
                </div>
                <div className="field">
                    <label>Image Url</label>
                    <input onChange={this.handleChange} type="text" name="image_url" value={this.state.image_url} placeholder="image_url" />
                </div>
                <button type="submit" className="ui green button">Submit</button>
                <button type="button" className="ui button red delete" style={{float: "right"}} onClick={this.deleteUser}>Delete This Profile</button>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

const mapDispatchToProps = {
    editUser,
    logoutUser,
    clearEnsembles
}
  
export default connect(mapStateToProps, mapDispatchToProps)(EditUserForm)
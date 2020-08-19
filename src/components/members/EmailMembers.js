import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, Grid } from 'semantic-ui-react'
import { Redirect } from 'react-router-dom'
import emailjs from 'emailjs-com'


class EmailMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subject: '',
            body: '',
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
            subject: '',
            body: ''
        })
    }

    sendEmail = (templateId, variables) => {
        emailjs.send("default_service", templateId, variables, "user_1GnGr1Ktl736HBQuOWgwF")
    }
    
    handleSubmit = event => {
        event.preventDefault()
        const templateId = "musi_cal_email"
        const lineBrokenEmail = this.state.body.replace(/(?:\r\n|\r|\n)/g, '<br>')
        const variables = {
            ensemble: this.props.ensemble.name,
            message_html: lineBrokenEmail,
            subject: this.state.subject,
            from: this.props.user.email,
            emails: this.props.emails
        }
        this.sendEmail(templateId, variables)
        this.setState({
                redirect: `/ensembles/${this.props.ensemble.id}/members`
            })
        }
    
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <div className="email-form">
                <Form onSubmit={this.handleSubmit} style={{width: "50%", textAlign: "left", marginLeft: "auto", marginRight: "auto", marginTop: "10px", padding: "50px", border: "5px inset red", backgroundColor: "PowderBlue"}}>
                <h3 style={{textAlign: "center"}}>Please Enter the Content of Your Email</h3>
                <div className="field">
                    <label>Subject:</label>
                    <input onChange={this.handleChange} type="text" name="subject" value={this.state.subject} />
                </div>
                <div className="field">
                    <label>Body:</label>
                    <textarea onChange={this.handleChange} type="text" rows="10" name="body" value={this.state.body} placeholder="Write your email here."></textarea>
                </div>
                <Grid>
                    <Grid.Column textAlign="center">
                            <Button type="submit" color="green">Submit Email</Button>
                    </Grid.Column>
                </Grid>
            </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}
  
export default connect(mapStateToProps)(EmailMembers)
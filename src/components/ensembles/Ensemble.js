import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

class Ensemble extends Component {
     
    render() {
        
        const {name, email_contact, website, phone_number, description, image_url } = this.props.ensemble
        return (
            <div className="ensemble-profile">
                <Image src={image_url} floated='left' style={{border: "10px ridge blue", margin: "0", height: "300px", width: "25%"}}/>
                <div style={{border: "10px ridge blue", display: "inline-block", float: "left", height: "300px", width: "75%", textAlign: "left", padding: "2px"}}>
                    <Header as='h1'>{name}</Header>
                    <Header as='h2'>Website: {website}</Header>
                    <Header as='h2'>Email Contact: {email_contact} </Header>
                    <Header as='h2'>Phone Number: {phone_number}</Header>
                    <Header as='h2'>See Upcoming Ensemble Events</Header>
                </div>
                <div>
                    <Header as="h1" textAlign="left">Description:</Header>
                    <div style={{border: "10px ridge blue", display: "inline-block", float: "left", height: "300px", width: "100%", textAlign: "left", padding: "2px"}}>
                        {description}
                    </div>
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Ensemble)
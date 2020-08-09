import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

class Event extends Component {
     
    render() {
        
        const {title, start_time, end_time, place, description, mandatory } = this.props.event
        return (
            <div className="event-profile">
                <div style={{border: "10px ridge red", display: "inline-block", height: "300px", width: "80%", textAlign: "left", padding: "2px"}}>
                    <Header as='h1'>{title}</Header>
                    <Header as='h2'>Location: {place}</Header>
                    <Header as='h2'>Start Time: {start_time} </Header>
                    <Header as='h2'>End Time: {end_time}</Header>
                    <Header as='h2'>Mandatory?: {mandatory ? "Yes" : "No"}</Header>
                </div>
                <div>
                    <Header as="h1" textAlign="left" style={{marginLeft: "150px"}}>Description:</Header>
                    <div style={{border: "10px ridge red", display: "inline-block", height: "300px", width: "80%", textAlign: "left", padding: "2px"}}>
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

export default connect(mapStateToProps)(Event)
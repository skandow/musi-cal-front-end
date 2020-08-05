import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

class Profile extends Component {

    threeClosestEvents = () => {
        const events = this.props.user.events 
        const sortedEvents = events.slice().sort((a, b) => {
            const dateA = new Date(a.start_time)
            const dateB = new Date(b.start_time)
            return dateA - dateB
        })
        return sortedEvents.slice(0, 3)
    } 

    renderThreeClosestEvents = threeClosestEvents => {
        return threeClosestEvents.map(event => {

            return (
                <div style={{border: "2px solid green", margin: "2px", textAlign: "left"}}>
                    <Header as='h2'>{event.title}</Header>
                    <Header as='h3'>Starts: {event.start_time}</Header>
                    <Header as='h3'>Ends: {event.end_time}</Header>
                </div>
            )
        })
    }
     
    render() {
        console.log(this.props.user.events)
        const threeClosestEvents = this.threeClosestEvents()
        console.log(threeClosestEvents)
        const {id, name, email, phone_number, primary_instrument_or_voice_part, secondary_instrument, image_url } = this.props.user
        return (
            <div className="user-profile">
                <Image src={image_url} floated='left' style={{border: "2px solid green", margin: "0", height: "300px", width: "25%"}}/>
                <div style={{border: "2px solid green", display: "inline-block", float: "left", height: "300px", width: "75%", textAlign: "left", padding: "2px"}}>
                    <Header as='h1'>{name}</Header>
                    <Header as='h2'>Email: {email}</Header>
                    <Header as='h2'>Phone Number: {phone_number}</Header>
                    <Header as='h2'>Primary Instrument or Voice Part: {primary_instrument_or_voice_part}</Header>
                    <Header as='h2'>Secondary Instrument: {secondary_instrument}</Header>
                </div>
                <div>
                    <Header as="h1" textAlign="left">Upcoming Events:</Header>
                    <div>
                        {this.renderThreeClosestEvents(threeClosestEvents)}
                    </div>
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Profile)
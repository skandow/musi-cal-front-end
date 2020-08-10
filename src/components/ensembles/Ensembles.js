import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header } from 'semantic-ui-react'

class Ensembles extends Component {

    renderEnsembles = () => {
        return this.props.user.ensembles.map(ensemble => {
            const profileLink = `ensembles/${ensemble.id}`
            const eventsLink = `${profileLink}/events`
            return (
                <div key={ensemble.id}>
                    <Image src={ensemble.image_url} style={{border: "10px ridge blue", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge blue", width: "55%", display: "inline-block", height: "300px", padding: "5px", textAlign: "left"}}>
                        <Header as="h1"><NavLink to={profileLink} exact>{ensemble.name} Profile</NavLink></Header>
                        <Header as='h2'>{ensemble.website}</Header>
                        <Header as='h2'>Email Contact: {ensemble.email_contact} </Header>
                        <Header as='h2'>Phone Number: {ensemble.phone_number}</Header>
                        <Header as='h2'><NavLink to ={eventsLink} exact>See Upcoming Ensemble Events</NavLink></Header>
                    </div>
                </div>
            )
        })
    }
     
    render() {
        return (
            <div className="ensembles-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Header id="ensembles-header" as='h1'>My Ensembles</Header>
                </div>
                <div>
                    {this.renderEnsembles()}
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user }
}

export default connect(mapStateToProps)(Ensembles)
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header, Button } from 'semantic-ui-react'

class MyAdmin extends Component {
    state = {
        redirect: null
    }

    renderAdminedEnsembles = () => {
        return this.props.ensembles.map(ensemble => {
            const profileLink = `ensembles/${ensemble.id}`
            return (
                <div key={ensemble.id}>
                    <Image src={ensemble.image_url} floated='left' style={{border: "10px ridge blue", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge blue", display: "inline-block", width: "75%", height: "300px", padding: "5px", textAlign: "left"}}>
                    <Header as="h1"><NavLink to={profileLink} exact>{ensemble.name} Profile</NavLink></Header>
                        <Header as='h2'>{ensemble.website}</Header>
                        <Header as='h2'>{ensemble.phone_number}</Header>
                    </div>
                </div>
            )
        })
    }

    goToNewEnsembleForm = () => {
        console.log("This button was clicked")
        this.setState({
            redirect: '/ensembles/new'
        })
    }
     
    render() {
        return (
            <div className="admin-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Button floated="left" color="green" style={{display: "inline-block"}}><NavLink style={{color: "white"}} to='ensembles/new' exact>Create a New Music Ensemble</NavLink></Button>
                    <Header id="admin-header" as='h1'>My Admin Page</Header>
                </div>
                <div>
                    {this.renderAdminedEnsembles()}
                </div>
            </div>                 
        )
    }
}

const mapStateToProps = state => {
    return { user: state.user,
    ensembles: state.ensembles }
}

export default connect(mapStateToProps)(MyAdmin)
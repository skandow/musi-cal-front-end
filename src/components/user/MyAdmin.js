import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header, Button } from 'semantic-ui-react'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'

class MyAdmin extends Component {
    state = {
        redirect: null
    }

    deleteEnsemble = id => {
        const URL = "http://localhost:3001/ensembles/" + id 
        const token = localStorage.getItem("token")
        this.setState({
            redirect: "/admin"
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
            this.props.loginUser(data.user.data.attributes)
            this.props.loadEnsembles(data.user.data.attributes.admin_for)
        })
    }

    renderAdminedEnsembles = () => {
        return this.props.ensembles.map(ensemble => {
            const profileLink = `ensembles/${ensemble.id}`
            const editLink = `ensembles/${ensemble.id}/edit`
            const membersLink = `ensembles/${ensemble.id}/members`
            return (
                <div key={ensemble.id}>
                    <Image src={ensemble.image_url} floated='left' style={{border: "10px ridge blue", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge blue", display: "inline-block", width: "75%", height: "300px", padding: "5px", textAlign: "left"}}>
                    <Header as="h1"><NavLink className="App-link" to={profileLink} exact>{ensemble.name} Profile</NavLink>
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(ensemble.id)}>Delete</span>
                        </span>
                    </Header>
                    <Header as="h1"><NavLink className="App-link" to={membersLink} exact>{ensemble.name} Members</NavLink>
                        {/* <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(ensemble.id)}>Delete</span>
                        </span> */}
                    </Header>
                    <Header as='h2'>{ensemble.website}</Header>
                    <Header as='h2'>{ensemble.phone_number}</Header>
                    </div>
                </div>
            )
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

const mapDispatchToProps = {
    loginUser,
    loadEnsembles
}

export default connect(mapStateToProps, mapDispatchToProps)(MyAdmin)
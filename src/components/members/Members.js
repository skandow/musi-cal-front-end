import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { Image, Header, Button } from 'semantic-ui-react'
import { loadEnsembles } from '../../actions/ensembles'
import { loginUser } from '../../actions/user'

class Members extends Component {
    state = {
        redirect: null
    }

    // deleteEnsemble = id => {
    //     const URL = "http://localhost:3001/ensembles/" + id 
    //     const token = localStorage.getItem("token")
    //     this.setState({
    //         redirect: "/admin"
    //     })
    //     const reqObj = {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         }
    //     }
    //     fetch(URL, reqObj)
    //     .then(resp => resp.json())
    //     .then(data => {
    //         this.props.loginUser(data.user.data.attributes)
    //         this.props.loadEnsembles(data.user.data.attributes.admin_for)
    //     })
    // }

    renderMembers = () => {
        return this.props.members.map(member => {
            // const profileLink = `ensembles/${ensemble.id}`
            // const editLink = `ensembles/${ensemble.id}/edit`
            return (
                <div key={member.id}>
                    <Image src={member.image_url} floated='left' style={{border: "10px ridge green", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge green", display: "inline-block", width: "75%", height: "300px", padding: "5px", textAlign: "left"}}>
                    <Header as="h1"> {member.user}
                        {/* <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteEnsemble(ensemble.id)}>Delete</span>
                        </span> */}
                    </Header>
                    <Header as='h2'>Email: {member.email}</Header>
                    <Header as='h2'>Phone Number: {member.phone_number}</Header>
                    <Header as='h2'>Performing Roles: {member.performing_roles}</Header>
                    <Header as='h2'>Administrative Roles: {member.administrative_roles}</Header>
                    </div>
                </div>
            )
        })
    }
     
    render() {
        console.log(this.props.members, this.props.ensemble)
        return (
            <div className="members-page">
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Button floated="left" color="green" style={{display: "inline-block"}}><NavLink style={{color: "white"}} to='ensembles/new' exact>Add a Member to This Ensemble</NavLink></Button>
                    <Header id="admin-header" as='h1'>{this.props.ensemble.name} Members</Header>
                </div>
                <div>
                    {this.renderMembers()}
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

export default connect(mapStateToProps, mapDispatchToProps)(Members)
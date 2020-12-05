import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { Image, Header, Button, Menu, Input } from 'semantic-ui-react';
import { loadEnsembles } from '../../actions/ensembles';
import { loginUser } from '../../actions/user';
import { loadMembers } from '../../actions/members';

class Members extends Component {
    state = {
        redirect: null,
        showSearchBar: false,
        name_search: '',
        performing_role_search: '',
        administrative_role_search: ''
    };

    deleteMember = id => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            const URL = "https://musi-cal-back-end.herokuapp.com/memberships/" + id ;
            const token = localStorage.getItem("token");
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
                this.props.loadMembers(data.user.data.attributes.admined_members)
            })
        }
    };

    onChange = event => {
        this.setState({
            [event.target.name]: event.target.value 
        })
    };

    renderSearchBar = () => {
        this.setState({
            showSearchBar: !this.state.showSearchBar
        })
    };

    renderMembers = () => {
        let filteredMembers = this.props.members;
        if (this.state.name_search) {
            filteredMembers = filteredMembers.filter(member => member.user.toLowerCase().includes(this.state.name_search.toLowerCase()))
        };
        if (this.state.performing_role_search) {
            filteredMembers = filteredMembers.filter(member => member.performing_roles.toLowerCase().includes(this.state.performing_role_search.toLowerCase()))
        };
        if (this.state.administrative_role_search) {
            filteredMembers = filteredMembers.filter(member => member.administrative_roles.toLowerCase().includes(this.state.administrative_role_search.toLowerCase()))
        };
        return filteredMembers.map(member => {
            const editLink = `/ensembles/${member.ensemble_id}/members/${member.id}/edit`;
            return (
                <div key={member.id}>
                    <Image src={member.image_url} style={{border: "10px ridge green", display: "inline-block", margin: "0", height: "300px", width: "25%"}}/>
                    <div style={{border: "10px ridge green", display: "inline-block", width: "75%", height: "300px", padding: "5px", textAlign: "left"}}>
                    <Header as="h1"> {member.user}
                        <span style={{float: "right"}}>
                            <NavLink className="App-link" to={editLink} exact>Edit</NavLink> |
                            <span className="delete" style={{color: "red", cursor: "pointer"}} onClick={() => this.deleteMember(member.id)}>Delete</span>
                        </span>
                    </Header>
                    <Header as='h2'>Email: {member.email}</Header>
                    <Header as='h2'>Phone Number: {member.phone_number}</Header>
                    <Header as='h2'>Performing Roles: {member.performing_roles}</Header>
                    <Header as='h2'>Administrative Roles: {member.administrative_roles}</Header>
                    </div>
                </div>
            )
        })
    };
     
    render() {
        const newMemberFormLink = `/ensembles/${this.props.ensemble.id}/members/new`;
        return (
            <div className="members-page">
                <div>
                    {this.state.showSearchBar ?
                    <Menu style={{border: "5px groove green"}} fluid widths={4} inverted color="blue">
                        <Menu.Item style={{textAlign: "right", width: "10%"}}>
                            Search By
                        </Menu.Item>
                        <Menu.Item style={{border: "5px outset white", padding: "10px"}} className="search" position='right'>
                            Name: <Input onChange={this.onChange} style={{padding: "5px", width: "80%"}} name="name_search" className="icon" icon="search" />
                        </Menu.Item>
                        <Menu.Item style={{border: "5px outset white"}} className="search">
                            Performing Role: <Input onChange={this.onChange} style={{padding: "5px", width: "80%"}} name="performing_role_search" className="icon" icon="search" />
                        </Menu.Item>
                        <Menu.Item style={{border: "5px outset white"}} className="search">
                            Administrative Role: <Input onChange={this.onChange} style={{padding: "5px", width: "80%"}} name="administrative_role_search" className="icon" icon="search" />
                        </Menu.Item>
                    </Menu>
                    :
                    null}
                </div>
                <div style={{margin: "5px", marginBottom: "20px"}}>
                    <Button floated="left" color="green" style={{display: "inline-block"}}><NavLink style={{color: "white"}} to={newMemberFormLink} exact>Add a Member to This Ensemble</NavLink></Button>
                    <Header id="admin-header" style={{display: "inline-block", margin: "auto"}} as='h1'>{this.props.ensemble.name} Members</Header>
                    <Button floated="right" onClick={this.renderSearchBar} color="blue" style={{display: "inline-block"}}>{this.state.showSearchBar ? "Hide Search Bar" : "Search for a Member"}</Button>
                </div>
                <div style={{width: "80%", margin: "auto"}}>
                    {this.renderMembers()}
                </div>
            </div>                 
        )
    };
};

const mapStateToProps = state => {
    return { user: state.user,
    ensembles: state.ensembles }
};

const mapDispatchToProps = {
    loginUser,
    loadEnsembles,
    loadMembers
};

export default connect(mapStateToProps, mapDispatchToProps)(Members)
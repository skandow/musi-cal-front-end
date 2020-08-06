import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/user'
import { Menu } from 'semantic-ui-react'

const UserNavBar = props => {

  const handleLogOut = () => {
    props.logoutUser();
    localStorage.removeItem('token')
  }

  return (
    <div>
        <Menu style={{border: "5px groove green"}} fluid widths={8} inverted color="red">
            <Menu.Item>
                Musi-Cal
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link position='right'>
                <NavLink style={{color: "black"}} to="/" exact>My Profile</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link>
                <NavLink style={{color: "black"}} to="/profile/edit" exact>Edit My Profile</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link>
                <NavLink style={{color: "black"}} to="/ensembles" exact>My Ensembles</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link>
                <NavLink style={{color: "black"}} to="/notes/new" exact>My Events</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link>
                <NavLink style={{color: "black"}} to="/admin" exact>My Admin Page</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "5px outset white"}} link>
                <NavLink to="/" exact onClick={handleLogOut}>Log Out</NavLink>
            </Menu.Item>
            
        </Menu>
    </div>
  );
};

const mapDispatchToProps = {
    logoutUser
}

export default connect(null, mapDispatchToProps)(UserNavBar)
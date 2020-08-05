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
        <Menu style={{border: "5px solid green"}} fluid widths={10} inverted color="red">
            <Menu.Item>
                Musi-Cal
            </Menu.Item>
            <Menu.Item style={{border: "1px solid white"}} link position='right'>
                <NavLink to="/" exact>My Profile</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "1px solid white"}} link>
                <NavLink to="/profile/edit" exact>Edit My Profile</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "1px solid white"}} link>
                <NavLink to="/notes" exact>My Notes</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "1px solid white"}} link>
                <NavLink to="/notes/new" exact>Create a New Note</NavLink>
            </Menu.Item>
            <Menu.Item style={{border: "1px solid white"}} link>
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
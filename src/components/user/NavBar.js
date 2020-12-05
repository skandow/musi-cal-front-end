import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user';
import { clearEnsembles } from '../../actions/ensembles';
import { clearEvents } from '../../actions/events';
import { clearMembers } from '../../actions/members';
import { Menu } from 'semantic-ui-react';

const UserNavBar = props => {

  const handleLogOut = () => {
    props.logoutUser();
    props.clearEnsembles();
    props.clearEvents();
    props.clearMembers();
    localStorage.removeItem('token')
  };

  return (
    <div>
        <Menu style={{border: "5px groove green"}} fluid widths={8} inverted color="red">
            <Menu.Item>
                Musi-Cal
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link position='right'>
                <NavLink className="nav-menu-link" to="/" exact>My Profile</NavLink>
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link>
                <NavLink className="nav-menu-link" to="/profile/edit" exact>Edit My Profile</NavLink>
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link>
                <NavLink className="nav-menu-link" to="/ensembles" exact>My Ensembles</NavLink>
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link>
                <NavLink className="nav-menu-link" to="/my_events" exact>My Events</NavLink>
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link>
                <NavLink className="nav-menu-link" to="/admin" exact>My Admin Page</NavLink>
            </Menu.Item>
            <Menu.Item className="nav-menu-item" link>
                <NavLink to="/" exact onClick={handleLogOut}>Log Out</NavLink>
            </Menu.Item>
            
        </Menu>
    </div>
  );
};

const mapDispatchToProps = {
    logoutUser,
    clearEnsembles,
    clearEvents,
    clearMembers
}

export default connect(null, mapDispatchToProps)(UserNavBar)
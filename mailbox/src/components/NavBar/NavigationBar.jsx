import React from 'react'
import { Navbar,Button,Col ,Nav} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import classes from './NavBar.module.css'
import { authActions } from '../store/AuthSlice';

function NavigationBar() {
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.userEmail);
    const userName = userEmail && userEmail.split("@")[0];


    const logoutHandler =()=>{
        dispatch(authActions.logout());
    }
  return (
    <div>
    <Navbar bg="dark" data-bs-theme="dark">
      {userEmail && (
        <>
          <Col className="col-4">
            <h4 className={classes.userName}>User: {userName}</h4>
          </Col>
          <Col className="col-7">
            <Navbar.Brand className="m-4">
              <NavLink
                to="/compose-mail"
                activeClassName={classes.activeLink}
                className={classes.navlink}
              >
                Compose-Mail
              </NavLink>
            </Navbar.Brand>
            <Navbar.Brand className="m-4">
              <NavLink
                to="/inbox"
                activeClassName={classes.activeLink}
                className={classes.navlink}
              >
                Inbox
              </NavLink>
            </Navbar.Brand>
            <Navbar.Brand className="m-4">
              <NavLink
                to="/sentbox"
                activeClassName={classes.activeLink}
                className={classes.navlink}
              >
                SentBox
              </NavLink>
            </Navbar.Brand>
          </Col>
          <Col className="col-1">
            <Button onClick={logoutHandler} variant="danger">
              Logout
            </Button>
          </Col>
        </>
      )}
    </Navbar>
  </div>
  )
}

export default NavigationBar
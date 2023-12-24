import React from 'react'
import { Navbar,Button,Col ,Nav} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {NavLink} from 'react-router-dom'
import classes from './NavBar.module.css'
import { authActions } from '../store/AuthSlice';

function NavigationBar() {
    const dispatch = useDispatch();
    const userEmail = useSelector(state => state.auth.userEmail);
    const inboxMails = useSelector((state)=> state.mails.inboxMails);
    const userName = userEmail && userEmail.split("@")[0];

    let countUnReadMails = 0;
    for( let mail of inboxMails){
      if(!mail.isRead){
        countUnReadMails ++ ;
      }
    }
    
    const logoutHandler =()=>{
        dispatch(authActions.logout());
    }

  return (
    <>
    {!userEmail && (
      <div className={classes.navbar}>
        <NavLink
          to="/login"
          activeClassName={classes.activeLink}
          className={classes.navlink}
        >
          Login
        </NavLink>
        <NavLink
          to="/signup"
          activeClassName={classes.activeLink}
          className={classes.navlink}
        >
          Signup
        </NavLink>
      </div>
    )}
    {userEmail && (
      <div className={classes.navbar}>
        <h4 style={{marginBottom:"30px"}} >User:{userName}</h4>
        <NavLink
          to="/compose-mail"
          activeClassName={classes.activeLink}
          className={classes.navlink}
        >
          Compose
        </NavLink>
        <NavLink
          to="/inbox"
          activeClassName={classes.activeLink}
          className={classes.navlink}
        >
          Inbox - {countUnReadMails}
        </NavLink>
        <NavLink
          to="/sentbox"
          activeClassName={classes.activeLink}
          className={classes.navlink}
        >
          SentBox
        </NavLink>
        <Button onClick={logoutHandler} variant="outline-light">
          Logout
        </Button>
      </div>
    )}
  </>
  )
}

export default NavigationBar
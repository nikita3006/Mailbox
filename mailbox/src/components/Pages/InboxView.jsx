import React, { useEffect, useState } from 'react'
import classes from './InboxView.module.css';
import { useParams,NavLink, useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/MailSlice';

function InboxView() {

    const history = useHistory();
    const dispatch = useDispatch();

    const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";

    const userEmail = localStorage.getItem('email');
    const userName = userEmail && userEmail.split("@")[0]
    const {id} = useParams();


    const inboxMails = useSelector(state => state.mails.inboxMails);
    const mail = inboxMails.find(i => i.id === id);

    const fromMail = mail && `<${mail.fromMail}>`;
	  const backSymbol = "<-";

    const deleteMail = ()=>{
      history.replace('/inbox');
      dispatch(mailActions.removeInboxMail(mail));
      fetch(`${firebaseUrl}/${userName}/inbox/${mail.id}.json`,{
        method: "DELETE",

      })
    }


  return (
    <>
			{mail && 
				<div className={classes.box}>
					<NavLink to="/inbox" className={classes.navlink}>
						<Button style={{marginBottom:"20px", padding:"5px"}}> {backSymbol}Go Back</Button>
					</NavLink>
					<h4>Subject: {mail.subject}</h4>
					<span style={{fontSize:"20px", fontWeight:"bold"}}>From: {mail.from}</span>{" "}
					<span style={{fontSize:"16px"}}>{fromMail}</span>	
					<h6 style={{marginTop: "10px"}}>
						Time: {mail.time.hours}:{mail.time.minutes} {" "}
						{mail.date.day}-{mail.date.month}-{mail.date.year} 
					</h6>
					<p style={{marginTop:"20px"}}>{mail.content}</p>

					{/* <NavLink to="/inbox" className={classes.navlink}> */}
						<Button 
							variant="danger" 
							onClick={deleteMail}
							style={{marginBottom:"20px", padding:"5px"}}
						> 
							Delete
						</Button>
					{/* </NavLink> */}
				</div>
			}
		</>
  )
}

export default InboxView
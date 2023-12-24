import React, { useEffect, useState } from 'react'
import { useParams,NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from "react-bootstrap";
import classes from "./InboxView.module.css";

function SentboxView() {
    const userEmail = localStorage.getItem('email');
    const userName = userEmail.split("@")[0];
    const {id} = useParams();

    const [mail,setMails]=useState({});
    
    useEffect(()=>{
        const getData = async ()=>{
            const response = await fetch(`https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box/${userName}/sentbox/${id}.json`)
            const data = await response.json();
            setMails(data);
        }
        getData();
    },[id,userName])

    const toMail = `<${mail.toMail}>`;

	const backSymbol = "<-";

  return (
    <div className={classes.box}>
			<NavLink to="/sentbox" className={classes.navlink}>
				<Button style={{marginBottom:"20px", padding:"5px"}}> {backSymbol}Go Back</Button>
			</NavLink>
			<h4>Subject: {mail.subject}</h4>
			<span style={{fontSize:"20px", fontWeight:"bold"}}>to: {mail.to}</span>{" "}
			<span style={{fontSize:"16px"}}>{toMail}</span>	
			<p style={{marginTop:"20px"}}>{mail.content}</p>
	</div>
  )
}

export default SentboxView
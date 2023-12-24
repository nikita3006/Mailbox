import React, { useEffect, useState } from 'react'
import classes from './InboxView.module.css';
import { useParams,NavLink} from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from "react-bootstrap";

function InboxView() {

    const userEmail = localStorage.getItem('email');
    const userName = userEmail.split("@")[0]
    const {id} = useParams();

    const [mail,setMail]= useState({});


    useEffect(()=>{
        const getData = async ()=>{
            const response = await fetch(`https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box/${userName}/inbox/${id}.json`)
            const data = await response.json();
            setMail(data);
        }
        getData();
    },[id,userName])
    
    console.log(mail,'in total');
    const fromMail = `<${mail.fromMail}>`;
    const backSymbol = "<-"


  return (
    <div className={classes.box}>
			<NavLink to="/inbox" className={classes.navlink}>
				<Button style={{marginBottom:"20px", padding:"5px"}}> {backSymbol} Go Back</Button>
			</NavLink>
			<h4>Subject: {mail.subject}</h4>
			<span style={{fontSize:"20px", fontWeight:"bold"}}>From: {mail.from}</span>{" "}
			<span style={{fontSize:"16px"}}>{fromMail}</span>	
			<p style={{marginTop:"20px"}}>{mail.content}</p>
	</div>
  )
}

export default InboxView
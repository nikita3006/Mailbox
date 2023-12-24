import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Inbox.module.css";


function Inbox() {

  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";
  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0];

  const [mails,setMails] = useState([]);

  let countUnReadMails = 0;
  for(let mail of mails){
    if(!mail.isRead){
      countUnReadMails ++;
    }
  }

  useEffect(()=>{
    const getDetails = async()=>{
      const response = await fetch(`${firebaseUrl}/${userName}/inbox.json`)
      const data = await response.json();
      const loadedMails = [];
      for (let key in data){
        let mail = {id:key,...data[key]};
        loadedMails.push(mail);
      }
      setMails(loadedMails);
    }
    getDetails();
  },[userName]);
  
  const openMail = async (mail)=>{
    const updatedMail = {...mail,isRead: true};
    const mailIndex= mails.findIndex(i => i.id === mail.id);
    const updatedMails = [...mails];
    updatedMails[mailIndex]= updatedMail;
    setMails(updatedMails);

    const response = await fetch(`${firebaseUrl}/${userName}/inbox/${mail.id}.json`,{
      method:"PUT",
      body : JSON.stringify(updatedMail),
    })

  }


  return (
    <div className={classes.inbox}>
      <h3 className={classes.inboxHeading}>
        Inbox({countUnReadMails  ? `${countUnReadMails}-unread mails` : 'No UnRead Mails' })
      </h3>
      {mails.map((mail) => (
        <NavLink className={classes.navlink} key={mail.id} to={`/inbox/${mail.id}`}>
            <Row 
              onClick={openMail.bind(null,mail)}
              key={mail.id}
              className={ mail.isRead ? classes.openMail : classes.notOpenedMail }
            >
              <Col className="col-3"></Col>
              <Col className="fw-bold col-2">{mail.from}</Col>
              <Col className="col-7">
                <div className={classes.content} >
                  <strong>{mail.subject} - </strong> {mail.content}
                </div>
              </Col>
            </Row>
        </NavLink>
      ))}
      <NavLink className={classes.navlink} to="compose-mail">
          <Button className={classes.composeBtn} variant="success" >
            Compose
          </Button>
      </NavLink>
    </div>
  )
}

export default Inbox
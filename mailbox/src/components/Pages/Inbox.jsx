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

    const intervalId = setInterval(getDetails, 2000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
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

  const deleteMail =async (mail)=>{
    const updatedMails = mails.filter((i)=> i.id !== mail.id);
    setMails(updatedMails);

    const response = await fetch(`${firebaseUrl}/${userName}/inbox/${mail.id}.json`,{
      method: "DELETE",
    })

  }


  return (
    <div className={classes.inbox}>
      <h3 className={classes.inboxHeading}>
        Inbox({countUnReadMails  ? `${countUnReadMails}-unread mails` : 'No UnRead Mails' })
      </h3>
      {mails.map((mail) => (
        <Row key={mail.id} className={
          mail.isRead ? classes.openedMail : classes.notOpenedMail
        }>
          <Col className="col-11">
            <NavLink className={classes.navlink} to={`/inbox/${mail.id}`}>
              <Row onClick={openMail.bind(null, mail)}>
                <Col className="col-1"></Col>
                <Col className="fw-bold col-2">{mail.from}</Col>
                <Col className="col-9">
                  <div className={classes.content}>
                    <strong>{mail.subject} - </strong> {mail.content}
                  </div>
                </Col>
              </Row>
            </NavLink>
          </Col>
          <Col className="col-1">
            <Button
              onClick={deleteMail.bind(null, mail)}
              style={{ padding: "0px 5px" }}
              variant="danger"
            >
              Delete
            </Button>
          </Col>
        </Row>
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
import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Inbox.module.css";


function Inbox() {

  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";
  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0];

  const [mails,setMails] = useState([]);

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
  console.log(mails,'in inbox mails');
  return (
    <div className={classes.inbox}>
      <h3 className={classes.inboxHeading}>Inbox</h3>
      {mails.map((mail) => (
        <NavLink className={classes.navlink} key={mail.id} to={`/inbox/${mail.id}`}>
          <Container fluid>
            <Row key={mail.id} className={classes.mail} >
              <Col className="col-4"></Col>
              <Col className="fw-bold col-2" >{mail.from}</Col>
              <Col className="col-5"><strong>{mail.subject} - </strong> {mail.content}</Col>
            </Row>
          </Container>
        </NavLink>
      ))}
      <Button className={classes.composeBtn} variant="success">
          <NavLink className={classes.navlink} to="compose-mail">
            Compose
          </NavLink>
      </Button>
    </div>
  )
}

export default Inbox
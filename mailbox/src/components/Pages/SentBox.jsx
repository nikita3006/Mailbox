import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Inbox.module.css";
import { Row, Col, Button } from "react-bootstrap";

function SentBox() {

  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0]

  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";

  const [mails,setMails]= useState([]);

  useEffect(()=>{
    const getDetails = async ()=>{
      const response = await fetch(`${firebaseUrl}/${userName}/sentbox.json`);
      const data = await response.json();
      const loadedMails = []

      for(let key in data){
        let mail = {id : key , ...data[key]}
        loadedMails.push(mail);
      }
      setMails(loadedMails);
    }
    getDetails();
  },[userName])

  const deleteMail = async(mail)=>{
    const updatedMails =mails.filter((i)=> i.id !== mail.id)
    setMails(updatedMails);

    const response = await fetch(`${firebaseUrl}/${userName}/sentbox/${mail.id}.json`,{
      method: "DELETE"
    })

  }
  return (
    <div className={classes.inbox}>
    <h3 className={classes.inboxHeading}> SentBox</h3>
    {mails.map((mail) => (
      <Row key={mail.id} className={ classes.openedMail }>
        <Col className="col-11">
          <NavLink className={classes.navlink} to={`/sentbox/${mail.id}`}>
            <Row>
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
    <NavLink className={classes.navlink} to="/compose-mail">
      <Button className={classes.composeBtn} variant="success">
        Compose
      </Button>
    </NavLink>
  </div>
  )
}

export default SentBox
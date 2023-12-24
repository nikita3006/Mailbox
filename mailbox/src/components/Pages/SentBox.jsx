import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Inbox.module.css";
import { Row, Col, Button ,Container} from "react-bootstrap";

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
    const intervalId = setInterval(getDetails, 2000);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
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
      <Container key={mail.id} fluid>
          <Row className={ classes.openedMail }>
            <Col className="col-11">
              <NavLink className={classes.navlink} to={`/sentbox/${mail.id}`}>
                <Row>
                  <Col className="fw-bold col-2">{mail.to}</Col>
                  <Col className="col-8">
                    <div className={classes.content}>
                      <strong>{mail.subject} - </strong> {mail.content}
                    </div>
                  </Col>
                  <Col className="col-2">
                    <strong>
                      {mail.time.hours}:{mail.time.minutes} {" "}
                      {mail.date.day}-{mail.date.month}-{mail.date.year} 
                    </strong>
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
        </Container>
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
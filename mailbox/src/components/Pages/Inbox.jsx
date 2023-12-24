import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button } from "react-bootstrap";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/MailSlice';


function Inbox() {
  const dispatch = useDispatch();
  const mails = useSelector(state => state.mails.inboxMails);
  

  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";
  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0];

  // const [mails,setMails] = useState([]);

  // let countUnReadMails = 0;
  // for(let mail of mails){
  //   if(!mail.isRead){
  //     countUnReadMails ++;
  //   }
  // }

  // useEffect(()=>{
  //   const getDetails = async()=>{
  //     const response = await fetch(`${firebaseUrl}/${userName}/inbox.json`)
  //     const data = await response.json();
  //     const loadedMails = [];
  //     for (let key in data){
  //       let mail = {id:key,...data[key]};
  //       loadedMails.push(mail);
  //     }
  //     setMails(loadedMails);
  //   }
  //   getDetails();

  //   const intervalId = setInterval(getDetails, 2000);

  //   // Cleanup the interval when the component unmounts
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // },[userName]);
  
  const openMail = async (mail)=>{
   dispatch(mailActions.updatedInboxMail(mail));

    const response = await fetch(`${firebaseUrl}/${userName}/inbox/${mail.id}.json`,{
      method:"PUT",
      body : JSON.stringify({...mail,isRead : true}),
    })

  }

  const deleteMail =async (mail)=>{
    dispatch(mailActions.removeInboxMail(mail));

    const response = await fetch(`${firebaseUrl}/${userName}/inbox/${mail.id}.json`,{
      method: "DELETE",
    })

  }


  return (
    <div className={classes.inbox}>
       <h3 className={classes.inboxHeading}>Inbox</h3>
      {mails.map((mail) => (
        <Container fluid key={mail.id}>
          <Row key={mail.id} className={
            mail.isRead ? classes.openedMail : classes.notOpenedMail
          }>
            <Col className="col-11">
              <NavLink className={classes.navlink} to={`/inbox/${mail.id}`}>
                <Row onClick={openMail.bind(null, mail)}>
                  <Col className="fw-bold col-2">{mail.from}</Col>
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
      <NavLink className={classes.navlink} to="compose-mail">
          <Button className={classes.composeBtn} variant="success" >
            Compose
          </Button>
      </NavLink>
    </div>
  )
}

export default Inbox
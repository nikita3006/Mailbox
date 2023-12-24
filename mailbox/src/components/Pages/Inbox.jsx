import React, { useEffect, useState } from 'react'
import { Row, Col, Container, Button ,Spinner} from "react-bootstrap";
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import classes from "./Inbox.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/MailSlice';
import useHttp from '../Hooks/useHttp';


function Inbox() {
  const dispatch = useDispatch();
  const sendRequest = useHttp();
  const [isLoading, setIsLoading] = useState(null);
  const mails = useSelector(state => state.mails.inboxMails);
  

  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0];

  
  const openMail = async(mail) => {
    try {
      dispatch(mailActions.updatedInboxMail(mail));
      await sendRequest({
        endPoint: `${userName}/inbox/${mail.id}`,
        method: "PUT",
        body: {...mail, isRead: true}
      });
    } catch (error) {
      console.log(error,"openMail inbox");
    }  
  }

    const deleteMail = async (mail) => {
      try {
        setIsLoading(mail.id);
        await sendRequest({
          endPoint: `${userName}/inbox/${mail.id}`,
          method: "DELETE",
        })
        setIsLoading(null);
        dispatch(mailActions.removeInboxMail(mail));
      } catch (error) {
        console.log(error,"inbox delete");
      }
    };


  return (
    <div className={classes.inbox}>
       <h3 className={classes.inboxHeading}>Inbox</h3>
       {!mails.length && <h5 className={classes.inboxHeading}>No Mails</h5>}
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
                 {(isLoading === mail.id) ?   
                  <span>
                    <Spinner as="span" animation="border" size="sm" role="status" 
                      aria-hidden="true"
                    />
                  </span>
                  : 
                  'Delete'
                }
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
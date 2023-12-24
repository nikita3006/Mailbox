import React, { useEffect, useState } from 'react';
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";
import classes from "./Inbox.module.css";
import { Row, Col, Button ,Container,Spinner} from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { mailActions } from '../store/MailSlice';
import useHttp from '../Hooks/useHttp';

function SentBox() {

  const userEmail = localStorage.getItem('email');
  const userName = userEmail.split("@")[0]
  const dispatch = useDispatch();
  const mails = useSelector(state => state.mails.sentBoxMails);
  const [isLoading, setIsLoading] = useState(null);

  const sendRequest = useHttp();

  const deleteMail = async(mail)=>{
    try {
      setIsLoading(mail.id);
      await sendRequest({
        endPoint : `${userName}/sentbox/${mail.id}`,
        method : 'DELETE'
      })
      setIsLoading(null);
      dispatch(mailActions.removeSentboxMail(mail));
    } catch (error) {
      alert(error);
    }
   
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
    <NavLink className={classes.navlink} to="/compose-mail">
      <Button className={classes.composeBtn} variant="success">
        Compose
      </Button>
    </NavLink>
  </div>
  )
}

export default SentBox
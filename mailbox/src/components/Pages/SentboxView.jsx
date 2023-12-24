import React, { useEffect, useState } from 'react'
import { useParams,NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from "react-bootstrap";
import classes from "./InboxView.module.css";
import { useSelector } from 'react-redux';

function SentboxView() {
    const { id } = useParams();

    const sentboxMails = useSelector((state) => state.mails.sentBoxMails);
    const mail = sentboxMails.find((i) => i.id === id);

    const toMail = mail && `<${mail.toMail}>`;
    const backSymbol = "<-";

  return (
    <>
    {mail && (
      <div className={classes.box}>
        <NavLink to="/sentbox" className={classes.navlink}>
          <Button style={{ marginBottom: "20px", padding: "5px" }}>
            {" "}
            {backSymbol}Go Back
          </Button>
        </NavLink>
        <h4>Subject: {mail.subject}</h4>
        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
          to: {mail.to}
        </span>{" "}
        <span style={{ fontSize: "16px" }}>{toMail}</span>
                  <h6 style={{marginTop: "10px"}}>
                      Time: {mail.time.hours}:{mail.time.minutes} {" "}
                      {mail.date.day}-{mail.date.month}-{mail.date.year} 
                  </h6>
        <p style={{ marginTop: "20px" }}>{mail.content}</p>
      </div>
    )}
  </>
  )
}

export default SentboxView
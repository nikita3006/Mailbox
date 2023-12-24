import React, { useState, useRef } from "react";
import { Button, Card, Form, FloatingLabel, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import ReactQuill from "react-quill"; // Import React Quill

function ComposeMail() {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userName = userEmail && userEmail.split("@")[0];
  
  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";
  
  const [editorHtml, setEditorHtml] = useState("");
  
  const toEmailRef = useRef();
  const subjectRef = useRef();
  
  const onEditorChange = (html) => {
    console.log(html,'inonchange');
    setEditorHtml(html);
    
  };
  
  const SubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const receiverEmail = toEmailRef.current.value;
      const receiverName = receiverEmail.split("@")[0];
      const subject = subjectRef.current.value;
      const editorHtmlwithoutTags = editorHtml.replace(/<[^>]*>/g, "");

      const sentMessage = {
        toEmail : receiverEmail,
        to: receiverName,
        subject: subjectRef.current.value,
        content: editorHtmlwithoutTags,
      };
      // console.log(sentMessage,'in compose mail')
  
      // Sending data to the outbox
      const sentResponse = await fetch(`${firebaseUrl}/${userName}/sentbox.json`, {
        method: "POST",
        body: JSON.stringify(sentMessage),
      });
  
        toEmailRef.current.value = "";
        subjectRef.current.value = "";
      setEditorHtml("");
  
      // Sending data to the inbox of the user
      const receiverMessage = {
        from: userName,
        fromMail: userEmail,
        subject: subject,
        content: editorHtmlwithoutTags,
        isRead: false,
      };
  
      const receiverResponse = await fetch(`${firebaseUrl}/${receiverName}/inbox.json`, {
        method: "POST",
        body: JSON.stringify(receiverMessage),
      });
  
      const receiverData = await receiverResponse.json();
      receiverData && alert("Mail sent succesfully")
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <Form onSubmit={SubmitHandler}>
      <Card
        style={{
          width: "90%",
          padding: "2rem",
          marginLeft: "5rem",
          marginTop: "2rem",
        }}
       className="fw-bold"
      >
        <Card.Title style={{ fontFamily: "Arial", fontWeight: "bolder" }}>
          Compose Email
        </Card.Title>
        <FloatingLabel label="To:">
          <FormControl type="email" placeholder="To" ref={toEmailRef}style={{marginBottom:"5px"}} />
        </FloatingLabel>
        <FloatingLabel label="Subject">
          <FormControl type="text" placeholder="Subject" ref={subjectRef} style={{marginBottom:"5px"}}/>
        </FloatingLabel>
        <Card.Body>
          <strong>Compose email</strong>
          <ReactQuill value={editorHtml} onChange={onEditorChange} theme="snow" placeholder="Enter Your Email" style={{height:'80px'}}/>

        </Card.Body>
        <Button type="submit" style={{marginTop: '40px'}}>
          Send
        </Button>
      </Card>
    </Form>
  );
}

export default ComposeMail;

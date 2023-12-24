import React, { useState, useRef } from "react";
import { Button, Card, Form, FloatingLabel, FormControl } from "react-bootstrap";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css"; // Import React Quill styles
import ReactQuill from "react-quill"; // Import React Quill

function ComposeMail() {
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userName = userEmail && userEmail.split("@")[0];

  const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/";

  const [editorHtml, setEditorHtml] = useState("");

  const toEmailRef = useRef();
  const subjectRef = useRef();

  const onEditorChange = (html) => {
    setEditorHtml(html);
  };

  const SubmitHandler = (event) => {
    event.preventDefault();

    const receiverEmail = toEmailRef.current.value;
    const receiverName = receiverEmail.split("")[0];
    const sentMessage = {
      to: toEmailRef.current.value,
      subject: subjectRef.current.value,
      content: editorHtml,
    };
    // sending data to the outbox
    fetch(`${firebaseUrl}/${userName}/sentbox.json`, {
      method: "POST",
      body: JSON.stringify(sentMessage),
    })
      .then((response) => {
        console.log(response);
        toEmailRef.current.value = "";
        subjectRef.current.value = "";
        setEditorHtml("");
      })
      .catch((error) => {
        console.log(error);
      });

    // Sending data to the inbox of the user
    const receiverMessage = {
      from: userEmail,
      subject: subjectRef.current.value,
      content: editorHtml,
      read: false,
    };
    fetch(`${firebaseUrl}/${receiverName}/inbox.json`, {
      method: "POST",
      body: JSON.stringify(receiverMessage),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data");
      });
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
      >
        <Card.Title style={{ fontFamily: "Arial", fontWeight: "bolder" }}>
          Compose Email
        </Card.Title>
        <FloatingLabel label="To:">
          <FormControl type="email" placeholder="To" ref={toEmailRef} />
        </FloatingLabel>
        <FloatingLabel label="Subject">
          <FormControl type="text" placeholder="Subject" ref={subjectRef} />
        </FloatingLabel>
        <Card.Body
          style={{
            backgroundColor: "black",
            color: "white",
            textAlign: "left",
          }}
        >
          Compose email
          <ReactQuill value={editorHtml} onChange={onEditorChange} />
        </Card.Body>
        <Button variant="success" type="submit">
          Send
        </Button>
      </Card>
    </Form>
  );
}

export default ComposeMail;

import React, { useRef, useState } from "react";
import { Button, Form, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../store/AuthSlice";

function LoginPage() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  const showPassHandler = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (event) => {
    try {
      event.preventDefault();
      const enteredMail = emailInputRef.current.value;
      const enteredPass = passInputRef.current.value;
      if (enteredMail === "" || enteredPass === "") {
        alert("Must fill both Email and Password");
      } else {
        emailInputRef.current.value = "";
        passInputRef.current.value = "";
      }
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredMail,
            password: enteredPass,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
      const data = await response.json();
      dispatch(authActions.login({token: data.idToken, email: data.email}))
      data && alert("Login Successfull !!");
      data && history.replace('/inbox');
      console.log(data, "in login");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className={classes.box}>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3">
          <Form.Label className={classes.label} >Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className={classes.label}>Password</Form.Label>
          <div className="input-group">
            <Form.Control
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              ref={passInputRef}
              required
            />
            <Button className="input-group-append" onClick={showPassHandler}>
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </Button>
          </div>
        </Form.Group>
        <Button type="submit" variant="primary">
          Log in
        </Button>
        <Nav>
          <NavLink to="signup" className={classes.navlink}>
            Have an Account?
          </NavLink>
        </Nav>
      </Form>
    </section>
  );
}

export default LoginPage;

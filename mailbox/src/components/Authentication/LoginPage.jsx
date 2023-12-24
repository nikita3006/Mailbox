import React, { useRef, useState } from "react";
import classes from "./Auth.module.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { authActions } from "../store/AuthSlice";
import useHttp from "../Hooks/useHttp";
import LoginForm from "./LoginForm";

function LoginPage() {
  const emailInputRef = useRef();
  const passInputRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory()
  const dispatch = useDispatch()

  const sendRequest = useHttp();

  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async(email,password) => {
    try {
      setIsLoading(true);   
      const data = await sendRequest({
        url : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
        method : "POST",
        body :  { email,  password, returnSecureToken: true}
      });
      console.log(data,"login");
      // authCtx.login(data.idToken,data.email);
      history.replace('/store');
      dispatch(authActions.login({token:data.idToken,email:data.email}))
      setIsLoading(false);

    } catch (error) {
      setIsLoading(false);
      alert(error);
    }
  }

  return (
    <section className={classes.box}>
      <h1>Login</h1>
      <LoginForm isLoading={isLoading} submitHandler={submitHandler} />
    </section>
  );
}

export default LoginPage;

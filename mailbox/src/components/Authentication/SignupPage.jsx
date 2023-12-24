import React, { useRef, useState } from 'react'
import classes from './Auth.module.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useHttp from '../Hooks/useHttp';
import SignUpForm from './SignupForm';


function SignupPage() {
   
    const history = useHistory()
    
    const [isLoading, setIsLoading] = useState(false);
    const sendRequest = useHttp();

    const submitHandler = async(email,password) => {
        try {
          setIsLoading(true);
          const data = await sendRequest({
            url : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc",
            method : "POST",
            body :  { email,  password, returnSecureToken: true}
            });
            console.log(data,"success signup")
            setIsLoading(true); 
            history.replace('/login');
            alert("Accouct Created Succesfully!")
        } 
        catch (error) {
            setIsLoading(false);
            alert(error);
        }
        };


  return (
    <section className={classes.box}>
        <h1>Sign Up</h1>
        <SignUpForm submitHandler={submitHandler} isLoading={isLoading} />
    </section>
  )
}

export default SignupPage
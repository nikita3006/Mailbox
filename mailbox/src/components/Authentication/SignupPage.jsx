import React, { useRef, useState } from 'react'
import { Button, Form, Nav } from 'react-bootstrap'
import {NavLink} from "react-router-dom";
import classes from './Auth.module.css';
import { BsEye, BsEyeSlash } from "react-icons/bs";

function SignupPage() {
    const emailInputRef = useRef()
    const passInputRef  = useRef()
    const confPassInputRef = useRef();
    
    const [showPass,setShowPassword]= useState(false);
    const [showConfPass, setShowConfPass]= useState(false);

    const showPassHandler = ()=>{
        setShowPassword(!showPass);
    }
    const showConfPassHandler = ()=>{
        setShowConfPass(!showConfPass);
    }

    const submitHandler = async (event)=>{
        try {
            event.preventDefault()
            const enteredMail = emailInputRef.current.value;
            const enteredPass = passInputRef.current.value;
            const enteredConfPass = confPassInputRef.current.value;
            if(enteredPass !== enteredConfPass){
                alert("Password and Confirm password must watch ");
            }
            else{
                emailInputRef.current.value = '';
                passInputRef.current.value = '';
                confPassInputRef.current.value = '';
            }
            const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBNqXOohJ5C1pTxxgYtTbpbxZc1ncW9fc',{
                method: "POST",
                body : JSON.stringify({
                    email: enteredMail,
                    password : enteredPass,
                    returnSecureToken : true,
                }),
                headers:{
                    'Content-Type': 'application/json',
                },
            })
            if(!response.ok){
                const errorData = await response.json();
                throw new Error(errorData.error.message);
            }
            const data = await response.json();
            data && alert("Account Created");
            console.log(data,'in signup')
        } catch (error) {
            alert(error);
        }
    }
  return (
    <section className={classes.box}>
        <h1>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group className='mb-3'>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' placeholder='Email' ref={emailInputRef} required autoComplete='new-email' />
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Password</Form.Label>
                <div className='input-group'>
                    <Form.Control type={showPass ? 'text' : 'password'} placeholder='Password' required ref={passInputRef} autoComplete='new-pass'/>
                    <Button className='input-group-append' onClick={showPassHandler}>{showPass ? <BsEyeSlash/> : <BsEye/>}</Button>
                </div>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Label>Confirm Password</Form.Label>
                <div className='input-group'>
                    <Form.Control type={showConfPass ? 'text' : 'password'} placeholder='Confirm Password' required ref={confPassInputRef} autoComplete='new-confpass'/>
                    <Button className='input-group-append' onClick={showConfPassHandler}>{showConfPass ? <BsEyeSlash/> : <BsEye/>}</Button>
                </div>
            </Form.Group>
            <Button type='submit' variant='success pl-2'>Create Account</Button>
            <Nav>
                <NavLink to="login" style={{color: 'white', paddingTop: '1rem'}}>
                    Have an Account?
                </NavLink>
            </Nav>
        </Form>
    </section>
  )
}

export default SignupPage
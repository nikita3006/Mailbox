import { Switch,Route,Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./components/Authentication/LoginPage";
import SignupPage from "./components/Authentication/SignupPage";
import classes from "./App.module.css";
import NavigationBar from "./components/NavBar/NavigationBar";
import ComposeMail from "./components/Pages/ComposeMail";
import SentBox from "./components/Pages/SentBox";
import Inbox from "./components/Pages/Inbox";
import InboxView from "./components/Pages/InboxView";
import SentboxView from "./components/Pages/SentboxView";
import { useEffect,useCallback } from "react";
import { mailActions } from "./components/store/MailSlice";
import useHttp from "./components/Hooks/useHttp";




function App() {  
  const sendRequest = useHttp();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  // const firebaseUrl = "https://mailbox-25oct-default-rtdb.firebaseio.com/mail-box";

  const  userEmail = localStorage.getItem('email');
  const userName = userEmail && userEmail.split("@")[0];

  const fetchData =useCallback(async(type) => {
    const data = await sendRequest({endPoint: `${userName}/${type}`});
    // console.log(data, "refresh pp")
    const loadedMails = [];
    for (let key in data) {
      let mail = { id: key, ...data[key] };
      loadedMails.push(mail);
    }
    if (type === "inbox") {
      dispatch(mailActions.replaceInboxMail(loadedMails))
    }
    else {
      dispatch(mailActions.replaceSentboxMail(loadedMails))
    }
  },[dispatch, sendRequest,userName]);

  
  useEffect(()=> {
    if (!isLoggedIn) {
      return
    }
    
    fetchData("inbox");
    fetchData("sentbox");
    const intervalId = setInterval(() => {
      fetchData("inbox");
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };

  },[isLoggedIn, fetchData, userName]);

  return (
    <div className={classes.box}>
      <NavigationBar />
      <div style={{width:"1400px"}}>
        <Switch>
          <Route exact path="/login">
            {isLoggedIn && <Redirect to="inbox" />}
            {!isLoggedIn && <LoginPage />}
          </Route>
          <Route exact path="/signup">
            {isLoggedIn && <Redirect to="inbox" />}
            {!isLoggedIn && <SignupPage />}
          </Route>
          <Route exact path="/compose-mail">
            {isLoggedIn && <ComposeMail />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
          <Route exact path="/inbox">
            {isLoggedIn && <Inbox />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
          <Route exact path="/inbox/:id">
            {isLoggedIn && <InboxView />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
          <Route exact path="/sentbox">
            {isLoggedIn && <SentBox />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
          <Route exact path="/sentbox/:id">
            {isLoggedIn && <SentboxView />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
          <Route exact path="*">
            {isLoggedIn && <Redirect to="/inbox" />}
            {!isLoggedIn && <Redirect to="login" />}
          </Route>
        </Switch>
      </div>
  </div>
  )
}

export default App

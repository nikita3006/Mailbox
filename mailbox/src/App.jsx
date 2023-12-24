import { Switch,Route,Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./components/Authentication/LoginPage";
import SignupPage from "./components/Authentication/SignupPage";
import NavigationBar from "./components/NavBar/NavigationBar";
import ComposeMail from "./components/Pages/ComposeMail";
import SentBox from "./components/Pages/SentBox";
import Inbox from "./components/Pages/Inbox";
import InboxView from "./components/Pages/InboxView";
import SentboxView from "./components/Pages/SentboxView";




function App() {  
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return (
    <>
      <NavigationBar/>
      <Switch>        
        <Route exact path='/login'>
          {isLoggedIn && <Redirect to='inbox'/>}
          {!isLoggedIn && <LoginPage/>}
        </Route>
        <Route exact path='/signup'>
          {isLoggedIn && <Redirect to = 'inbox'/>}
          {!isLoggedIn && <SignupPage/>}
        </Route>
        <Route exact path='/compose-mail'>
          {isLoggedIn && <ComposeMail />}
          {!isLoggedIn && <Redirect to='login' />}
        </Route>
        <Route exact path="/inbox">
          {isLoggedIn && <Inbox/>}
          {!isLoggedIn && <Redirect to="login"/>}
        </Route>
        <Route exact path="/inbox/:id">
          {isLoggedIn && <InboxView/>}
          {!isLoggedIn && <Redirect to="login"/>}
        </Route>
        <Route exact path="/sentbox">
          {isLoggedIn && <SentBox/>}
          {!isLoggedIn && <Redirect to="login"/>}
        </Route>
        <Route exact path="/sentbox/:id">
          {isLoggedIn && <SentboxView/>}
          {!isLoggedIn && <Redirect to="login"/>}
        </Route>
        <Route exact path="*">
          {isLoggedIn && <Redirect to="/inbox"/>}
          {!isLoggedIn && <Redirect to="login"/>}
        </Route>
      </Switch>
    </>
  )
}

export default App

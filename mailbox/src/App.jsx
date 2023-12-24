import { Switch,Route } from "react-router-dom";
import LoginPage from "./components/Authentication/LoginPage";
import SignupPage from "./components/Authentication/SignupPage";

function App() {

  return (
      <Switch>        
        <Route exact path='/login'>
            <LoginPage/>
        </Route>
        <Route exact path='/signup'>
            <SignupPage/>
        </Route>
      </Switch>

  )
}

export default App

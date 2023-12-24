import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from 'react-redux'
import Reduxstore from './components/store/ReduxStore.jsx';
console.warn = function () {};


ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={Reduxstore}>
      <App />
    </Provider>
  </BrowserRouter>
)

import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const Authentication = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/auth/login" replace />} />
        <Route path = "login" element = {<LoginPage />} />
        <Route path = "register" element = {<RegisterPage />} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Authentication.propTypes = {};

export default Authentication
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
  const authTokens = (localStorage.getItem('authTokens') ? (JSON.parse(localStorage.getItem('authTokens'))): null)

  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/auth/login" replace />} />
        <Route path = "login" element = {authTokens != null ? <Navigate to = "/manga" replace /> : <LoginPage />} />
        <Route path = "register" element = {authTokens != null ? <Navigate to = "/manga" replace /> : <RegisterPage />} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Authentication.propTypes = {};

export default Authentication
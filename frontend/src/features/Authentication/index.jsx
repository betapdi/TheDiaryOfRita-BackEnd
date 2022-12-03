import React from 'react'
import { useSelector } from 'react-redux';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

const Authentication = (props) => {
  const user = useSelector(state => state.userData);

  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<Navigate to = "/auth/login" replace />} />
        <Route path = "login" element = {user.userData != null ? <Navigate to = "/manga" replace /> : <LoginPage />} />
        <Route path = "register" element = {user.userData != null ? <Navigate to = "/manga" replace /> : <RegisterPage />} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Authentication.propTypes = {};

export default Authentication
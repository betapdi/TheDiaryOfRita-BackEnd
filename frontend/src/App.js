import React, { Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter, Navigate, Route, Routes
} from "react-router-dom";
import './App.css';
import Header from './components/Header';

import Banner from './components/Banner';
import Authentication from './features/Authentication';

import { useDispatch } from 'react-redux';
import { auth } from './firebase/firebase-config';
import { getUserData } from './features/Authentication/userSlice';
const Manga = React.lazy(() => import('./features/Manga'));

function App() {
  const dispatch = useDispatch()
  const [hasToken, setHasToken] = useState(false)

  useEffect(() => {
    const unregisterAuthObserver = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        //user logout, handle here!

        setHasToken(true);
        return;
      }

      const token = await user.getIdToken();
      dispatch(getUserData())
      console.log('User token: ', token);
      setHasToken(true);
    });

    return () => unregisterAuthObserver();
  }, [])
  
  return (
    <div className= "manga-app">
      <Suspense fallback = {<div>Loading...</div>}>
        {hasToken &&
          <BrowserRouter>
            <Header />
            <Banner/>
            <Routes>
              <Route path = "/" element = {<Navigate to = "/manga" replace />} />
              <Route path = "manga/*" element = {<Manga />} />
              <Route path = "auth/*" element = {<Authentication />} />
            </Routes>
          </BrowserRouter>
        }
      </Suspense>
    </div>
  );
}

export default App;

// List of installed modules in this app:
// npm install firebase
// npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
// npm install jwt-decode
// npm install axios
// npm install query-string
// npm install @reduxjs/toolkit
// npm install react-redux
// npm install react-router-dom@6
// npm install formik
// npm install reactstrap
// npm install sass
// npm install yup
// npm install react-select
// npm install bootstrap (remember add bootstrap css file when using reactstrap) (import 'bootstrap/dist/css/bootstrap.css')
// Search files quick: ctrl + P (vscode)


import React from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation,
  } from "react-router-dom";
import AddMangaPage from './pages/AddManga';
import MainPage from './pages/Main';

const Manga = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<MainPage/>} />
        <Route path = "addManga" element = {<AddMangaPage/>} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Manga.propTypes = {};

export default Manga
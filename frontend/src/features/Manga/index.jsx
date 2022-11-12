import React from 'react';
import {
  Route, Routes
} from "react-router-dom";
import AddChapterPage from './pages/AddChapter';
import AddMangaPage from './pages/AddManga';
import MainPage from './pages/Main';

const Manga = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<MainPage/>} />
        <Route path = "addManga" element = {<AddMangaPage/>} />
        <Route path = "addChapter" element = {<AddChapterPage/>} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Manga.propTypes = {};

export default Manga
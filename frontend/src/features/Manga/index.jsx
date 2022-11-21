import React from 'react';
import {
  Route, Routes
} from "react-router-dom";
import AddChapterPage from './pages/AddChapter';
import AddMangaPage from './pages/AddManga';
import AddMultipleChapterPage from './pages/AddMultipleChapter';
import MainPage from './pages/Main';
import MangaPage from './pages/MangaPage';
import FavouritesPage from './pages/FavouritesPage'

const Manga = (props) => {
  return (
    <div>
      <Routes>
        <Route exact path = '/' element = {<MainPage/>} />
        <Route path = "addManga" element = {<AddMangaPage/>} />
        <Route path = "addChapter" element = {<AddChapterPage/>} />
        <Route path = "addMultipleChapter" element = {<AddMultipleChapterPage/>} />
        <Route path = "favourites" element = {<FavouritesPage/>} />
        <Route path = ":mangaId" element = {<MangaPage/>} />
        <Route path = "*" element = {<p>NONE</p>} />
      </Routes>
    </div>
  )
}

Manga.propTypes = {};

export default Manga
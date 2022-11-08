import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import mangaApi from '../../../../api/mangaApi'

const MainPage = () => {
  const [mangaList, setMangaList] = useState([])
  const mangas = useSelector(state => state.mangas)
  console.log('List of mangas: ', mangas)

  const viewImage = (file, index) => {
    let reader = new FileReader();
    let image = document.getElementById("manga_cover_" + index); 
    reader.onload = (e) => {
      image.src = e.target.result;
    }
    reader.readAsDataURL(file);
 }

  useEffect(() =>  {
    const previewAllImage = () => {
      mangas.map((manga, index) => {
        viewImage(manga.cover_image, index);
      })
    } 

    previewAllImage();
  }, [mangas])

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await mangaApi.getAll()
      } catch (error) {
        console.log("Failed to fetch manga list: ", error)
      }
    }

    fetchMangaList()
  }, [])

  return (
    <div className = "main-page">
      {mangas.map((manga, index) => (
        <div key={index}>
          {manga.mangaName}
          {manga.description}
          <img id={"manga_cover_" + index} />
        </div>
      ))}
    </div>
  )
}

export default MainPage
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mangaApi from '../../../../api/mangaApi'
import { getCategoryList } from '../../slices/categorySlice'

const MainPage = () => {
  const dispatch = useDispatch()
  
  //Fetch needed data
  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await mangaApi.getAll()
        console.log(response)
      } catch (error) {
        console.log("Failed to fetch manga list: ", error)
      }
    }

    fetchMangaList()
  }, [])

  const mangas = useSelector(state => state.mangaList)
  console.log('List of mangas: ', mangas)

  useEffect(() =>  {
    const viewImage = (file, index) => {
      let reader = new FileReader();
      let image = document.getElementById("manga_cover_" + index); 
      reader.onload = (e) => {
        image.src = e.target.result;
      }
      reader.readAsDataURL(file);
    }

    const previewAllImage = () => {
      mangas.map((manga, index) => {
        viewImage(manga.cover_image, index);
      })
    } 

    previewAllImage();
  }, [mangas])

  return (
    <div className = "main-page">
      {mangas.map((manga, index) => (
        <div key={index}>
          {manga.mangaName}
          {manga.description}
          <img id={"manga_cover_" + index} width={"500px"} height={"500px"}/>
        </div>
      ))}
    </div>
  )
}

export default MainPage
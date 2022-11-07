import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import mangaApi from '../../../../api/mangaApi'

const MainPage = () => {
  const [mangaList, setMangaList] = useState([])

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

  const mangas = useSelector(state => state.mangas)
  console.log('List of mangas: ', mangas)

  return (
    <div className = "main-page">
      {mangas.map((manga, index) => (
        <div key={index}>
          {manga.mangaName} 
          {manga.description}
        </div>
      ))}
    </div>
  )
}

export default MainPage
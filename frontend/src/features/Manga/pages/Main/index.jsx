import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import mangaApi from '../../../../api/mangaApi'
import { getAllManga } from '../../slices/mangaListSlice'

const MainPage = () => {
  const dispatch = useDispatch()
  
  //Fetch needed data
  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const response = await mangaApi.getAll()
        dispatch(getAllManga());
        // console.log(response)
      } catch (error) {
        console.log("Failed to fetch manga list: ", error)
      }
    }

    fetchMangaList()
  }, [])

  const mangas = useSelector(state => state.mangaList)
  // console.log('List of mangas: ', mangas)
  // console.log(process.env.REACT_APP_SERVER_URL)

  return (
    <div className = "main-page">
      {mangas.map((manga, index) => (
        <div key={index}>
          {manga.label}
          {manga.index}
          <img id={"manga_cover_" + index} width={"500px"} height={"500px"} 
            src={process.env.REACT_APP_SERVER_URL + manga.cover}
          />
        </div>
      ))}
    </div>
  )
}

export default MainPage
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMangaData } from '../../slices/mangaSlice'

const MangaPage = (props) => {
  const dispatch = useDispatch()
  const { mangaId } = useParams()

  useEffect(() => {
    dispatch(getMangaData(mangaId))
  }, [])

  const manga = useSelector(state => state.manga)
  console.log(manga);

  return (
    <div className = "manga-page">
      {manga != null ? 
        <>
          {manga.name}
          {manga.description}
          <img width={"500px"} height={"500px"} src={process.env.REACT_APP_SERVER_URL + manga.cover}
          />
        </>
        : <h1>NONE</h1>
      }
    </div>
  )
}

export default MangaPage
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

  return (
    <div className = "manga-page">
      {manga != null ? 
        <h1>HEHE</h1>
        : <h1>NONE</h1>
      }
    </div>
  )
}

export default MangaPage
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import Banner from '../../../../components/Banner'
import SlideShow from '../../../../components/SlideShow'
import AddMangaForm from '../../components/AddMangaForm'
import { addManga } from '../../mangaSlice'

const AddMangaPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

    const action = addManga(values)
    // console.log({action})
    dispatch(action)
    navigate('/')
  }

  return (
    <div className = "add-manga-page">
      <AddMangaForm onSubmit = {handleSubmit}/>
    </div>
  )
}

export default AddMangaPage
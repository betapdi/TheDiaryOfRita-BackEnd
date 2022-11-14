import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import AddChapterForm from '../../components/AddChapterForm'
import { addChapter } from '../../slices/chapterSlice'

const AddChapterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

    const action = addChapter(values)
    dispatch(action)
    navigate('/')
  }

  return (
    <div className = "add-manga-page">
      <AddChapterForm onSubmit = {handleSubmit}/>
    </div>
  )
}

export default AddChapterPage
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddMultipleChapterForm from '../../components/AddMultipleChapterForm'
import { addMultipleChapters } from '../../slices/chapterSlice'


const AddMultipleChapterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

    dispatch(addMultipleChapters(values))
    navigate('/')
  }

  return (
    <div className = "add-manga-page">
      <AddMultipleChapterForm onSubmit = {handleSubmit}/>
    </div>
  )
}

export default AddMultipleChapterPage
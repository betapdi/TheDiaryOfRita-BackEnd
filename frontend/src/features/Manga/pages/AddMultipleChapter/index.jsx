import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AddMultipleChapterForm from '../../components/AddMultipleChapterForm'


const AddMultipleChapterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

    // const action = addChapter(values)
    // dispatch(action)
    // TODO: write addmultiplechapter action and replace old action 

    navigate('/')
  }

  return (
    <div className = "add-manga-page">
      <AddMultipleChapterForm onSubmit = {handleSubmit}/>
    </div>
  )
}

export default AddMultipleChapterPage
import React from 'react'
import { useDispatch } from 'react-redux'
import { } from '../../userSlice'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

  }

  return (
    <RegisterForm onSubmit = {handleSubmit}/>
  )
}

export default RegisterPage
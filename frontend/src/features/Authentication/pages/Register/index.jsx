import React from 'react'
import { } from '../../userSlice'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'
import userApi from '../../../../api/userApi'

const RegisterPage = () => {
  const navigate = useNavigate()
  
  const handleSubmit = async (values) => {
    console.log('Form submit: ', values)

    const response = await userApi.register(values)
    console.log(response)
  }

  return (
    <RegisterForm onSubmit = {handleSubmit}/>
  )
}

export default RegisterPage
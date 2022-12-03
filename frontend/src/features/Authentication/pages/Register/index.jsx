import React from 'react'
import { } from '../../userSlice'
import { useNavigate } from 'react-router-dom'
import RegisterForm from '../../components/RegisterForm'
import userApi from '../../../../api/userApi'
import { useDispatch } from 'react-redux'
import { createUser } from '../../userSlice'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = async (values) => {
    console.log('Form submit: ', values)

    try {
      dispatch(createUser(values));
    } catch (e) {
      console.log(e.message);
    }

  }

  return (
    <RegisterForm onSubmit = {handleSubmit}/>
  )
}

export default RegisterPage
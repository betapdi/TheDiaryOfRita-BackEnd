import React from 'react'
import { useDispatch } from 'react-redux'
import userApi from '../../../../api/userApi'
import LoginForm from '../../components/LoginForm'
import { loginUser } from '../../userSlice'

const LoginPage = () => {
  const dispatch = useDispatch()
  
  const handleSubmit = (values) => {
    console.log('Form submit: ', values)

    const action = loginUser(values)
    dispatch(action)
  }

  return (
    <LoginForm onSubmit = {handleSubmit}/>
  )
}

export default LoginPage
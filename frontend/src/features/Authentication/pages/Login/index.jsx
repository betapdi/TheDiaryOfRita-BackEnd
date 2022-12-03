import React from 'react'
import { useDispatch } from 'react-redux'
import userApi from '../../../../api/userApi'
import LoginForm from '../../components/LoginForm'
import { googleLogin, loginUser } from '../../userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import GoogleIcon from '@mui/icons-material/Google';

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = (values) => {
    dispatch(loginUser(values));
    navigate('/')
  }

  const handleLoginGoogle = async () => {
    dispatch(googleLogin());
    navigate('/')
  }

  return (
    <>
      <LoginForm onSubmit = {handleSubmit}/>
      <Button onClick = {handleLoginGoogle}>
        <GoogleIcon/>
      </Button>
    </>
  )
}

export default LoginPage
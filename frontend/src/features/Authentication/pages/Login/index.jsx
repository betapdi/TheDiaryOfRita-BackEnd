import React from 'react'
import { useDispatch } from 'react-redux'
import userApi from '../../../../api/userApi'
import LoginForm from '../../components/LoginForm'
import { facebookLogin, googleLogin, loginUser } from '../../userSlice'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';

const LoginPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const handleSubmit = async (values) => {
    dispatch(loginUser(values));
  }

  const handleLoginGoogle = async () => {
    dispatch(googleLogin());
  }

  const handleLoginFacebook = async() => {
    dispatch(facebookLogin());
  }

  return (
    <>
      <LoginForm onSubmit = {handleSubmit}/>
      <Button onClick = {handleLoginGoogle}>
        <GoogleIcon/>
      </Button>

      <Button onClick = {handleLoginFacebook}>
        <FacebookIcon/>
      </Button>
    </>
  )
}

export default LoginPage
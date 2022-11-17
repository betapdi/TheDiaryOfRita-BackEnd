import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import './Header.scss'
import 'bootstrap/dist/css/bootstrap.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../../features/Authentication/userSlice'

const Header = () => {
  const dispatch = useDispatch()
  
  const handleLogout = () => {
    dispatch(logoutUser())
  }

  const userState = useSelector(state => state.userData)
  
  return (
    <header className = "header">
      <Container>
        <Row className = "justify-content-between">
          <Col xs = "auto">
            <Link to = "/" className = "header__title header__link">
              MyWjbuList
            </Link>
          </Col>

          <Col xs = "auto">
            {userState.user == null 
              ? <span>
                <Link to = '/auth'>Login</Link> |
                <Link to = '/auth/register'>Register</Link> 
              </span>
              : <p onClick = {handleLogout}>Logout</p>
            }
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
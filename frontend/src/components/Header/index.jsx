import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite';
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
            {userState.userData == null 
              ? <span>
                <Link to = '/auth'>Login</Link> |
                <Link to = '/auth/register'>Register</Link> 
              </span>
              
              : <span>
                  <Link to = '/manga/favourites'><FavoriteIcon style={{color: "black"}}/></Link> |
                  <span onClick = {handleLogout}>Logout</span>
                </span>
            }
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
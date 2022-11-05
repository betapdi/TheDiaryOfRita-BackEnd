import React from 'react'
import { Container, Row, Col, Button } from 'reactstrap'
import './Header.scss'
import 'bootstrap/dist/css/bootstrap.css'

const Header = () => {
  return (
    <header className = "header">
      <Container>
        <Row className = "justify-content-between">
          <Col xs = "auto">
            <a href = "/" className = "header__title header__link">
              MyWjbuList
            </a>
          </Col>

          <Col xs = "auto">
            Login
          </Col>
        </Row>
      </Container>
    </header>
  )
}

export default Header
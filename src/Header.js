import React from "react"
import {Navbar, Nav, Container} from "react-bootstrap"

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#">Super Queue App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto"></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header

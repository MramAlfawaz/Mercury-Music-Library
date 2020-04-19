import React, { Component } from 'react'
import {Navbar, Nav, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom'

export default class Nave extends Component {
    render() {
        return (
            <div>
            <Navbar bg="dark" variant="dark">
                <Nav className="mr-auto">
                    <Navbar.Brand>Mercury</Navbar.Brand>
                   

                    <Nav.Link as={Link} to="/home">HOME</Nav.Link>
                    <Nav.Link as={Link} to="/songs">SONGS</Nav.Link>
                    <Nav.Link as={Link} to="/albums">ALBUMS</Nav.Link>
                    
                </Nav>
                <Nav>
                       <Nav.Link as={Link} to="/profile">Profile</Nav.Link>

                        <Button as={Link} to="/signin" variant="outline-light" > SIGNIN</Button>
                        <Button as={Link} to="/signup" variant="outline-light" className="ml-3"> SIGNUP </Button> 

                  <Button variant="outline-light" > logOut</Button> 
                    </Nav>
               
            </Navbar>
        </div>
        )
    }
}

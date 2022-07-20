import React from 'react'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import logo from '../logo.png'

function Job() {
    const dataCollection = [
        {
            id: 1,
            title: 'Dev'
        }, {
            id: 2,
            title: 'Lead'
        }, {
            id: 3,
            title: 'Management'
        }
    ];
    function handleLogout() {
        localStorage.clear();
        window.location.href = '/';
    }
    return (
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={logo}
                            width="50"
                            height="50"
                            className="d-inline-block align-top"
                        />{' '}
                    </Navbar.Brand>
                    <Nav className="container-fluid">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/about">About Us</Nav.Link>
                        <Nav.Link href="/job">Jobs</Nav.Link>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                        <Nav.Item className="ms-auto">
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Container>
            </Navbar>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>Job Page</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Welcome</Card.Subtitle>
                        <Card.Text>
                            this is the jobs page !!
                            Please go through our current openings below
                        </Card.Text>
                        {
                            dataCollection.map((item) =>
                                <Card.Link key={item.id}>{item.title}</Card.Link>
                            )
                        }

                    </Card.Body>
                </Card>
            </div>
        </>
    );
}

export default Job
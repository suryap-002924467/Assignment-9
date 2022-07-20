import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../logo.png'
import Card from 'react-bootstrap/Card';

function Profile() {
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
						<Card.Title>Contact Page</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">Welcome</Card.Subtitle>
						<Card.Text>
							this is the contact page !!
						</Card.Text>
						<Card.Link href="/">About</Card.Link>
						<Card.Link href="/">Contact-US</Card.Link>
					</Card.Body>
				</Card>
			</div>
		</>
	);
}

export default Profile
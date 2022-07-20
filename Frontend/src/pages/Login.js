import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('user-info')) {
			navigate("/home")
		}
	}, [])
	async function login() {
		console.warn(email, password)
		let item = { email, password }
		try {
			let result = await fetch("http://localhost:7000/user/login", {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
					"Accept": "application/json"
				},
				body: JSON.stringify(item)
			})
			result = await result.json()
			localStorage.setItem("user-info", JSON.stringify(result))
		} catch (error) {
			console.log(error)
		}
		navigate("/home")
	}
	// <h1>Login Page</h1>
	// <div className='col-sm-6 offset-sm-3'></div>
	// <input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} className="form-control" />
	// <br />
	// <input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} className="form-control" />
	// <br />
	// <button onClick={login} className="btn btn-primary">Login</button>
	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
			<Card className="text-center">
				<Card.Header>Welcome</Card.Header>
				<Card.Body>
					<Card.Title></Card.Title>
					<Card.Text>
						<input type="text" placeholder='email' onChange={(e) => setEmail(e.target.value)} className="form-control" />
						<br />
						<input type="password" placeholder='password' onChange={(e) => setPassword(e.target.value)} className="form-control" />
					</Card.Text>
					<Button onClick={login} variant="primary">Let's Go</Button>
				</Card.Body>
				<Card.Footer className="text-muted">Please Login</Card.Footer>
			</Card>

		</div >
	)
}

export default Login
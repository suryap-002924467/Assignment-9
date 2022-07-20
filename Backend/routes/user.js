const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const User = require('../model/user')

//Getting All Users
router.get('/getAll', async (req, res) => {
	try {
		const users = await User.find()
		res.json(users)
	} catch (err) {
		res.status(500).json({ message: err.message })
	}
})

//Validate Email
function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (re.test(email)) {
		//Email valid. Procees to test if it's from the right domain (Second argument is to check that the string ENDS with this domain, and that it doesn't just contain it)
		if (email.indexOf("@northeastern.edu", email.length - "@northeastern.edu".length) !== -1) {
			//VALID
			return true
		}
	}
	return false;
}

//Validate Password
function validatePassword(p) {
	if (p == "") {
		return "Your password cannot be empty";
	}
	if (p.length < 8) {
		return "Your password must be at least 8 characters";
	}
	if (p.search(/[a-z]/i) < 0) {
		"Your password must contain at least one letter.";
	}
	if (p.search(/[0-9]/) < 0) {
		return "Your password must contain at least one digit.";
	}
	return "1";
}

// Encrypt user password
async function encryptPassword(password) {
	try {
		const hashedPassword = await bcrypt.hash(password, 10)
		return [hashedPassword, null]
	} catch (error) {
		return [null, error]
	}
}

// Create user entry in DB
async function createUser(user) {
	try {
		const newUser = await user.save()
		return [newUser, 201, null]
	} catch (error) {
		return [null, 500, error]
	}
}

// Get user by ID
// async function getUser(req, res, next) {
// 	let user;
// 	try {
// 		user = await User.findOne({ 'email': req.body.email })
// 		if (user == null) return res.status(404).json({ message: "Cannot find user" })
// 	} catch (error) {
// 		return res.status(500).json({ message: error.message })
// 	}
// 	res.user = user
// 	next()
// }

// Authenticate User Credentials
async function authenticate(req, res, next) {
	let user;
	try {
		user = await User.findOne({ 'email': req.body.email })
		if (user == null) return res.status(400).send('Cannot find user')
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
	try {
		if (await bcrypt.compare(req.body.password, user.password)) {
			res.status(200)
		} else {
			return res.status(400).send('Invalid Credentials')
		}
	} catch (error) {
		return res.status(500).json({ message: error.message })
	}
	res.user = user
	next()
}

// Creating User
router.post('/create', async (req, res) => {
	if (!validateEmail(req.body.email)) return res.status(400).json({ message: "Invalid Email" })
	if (validatePassword(req.body.password) != 1) return res.status(400).json({ message: validatePassword(req.body.password) })
	const [hashedPassword, error] = await encryptPassword(req.body.password)
	if (hashedPassword == null) res.status(500).json({ message: error.message })
	const user = new User({
		email: req.body.email,
		password: hashedPassword
	})
	const [newUser, status, error2] = await createUser(user)
	if (newUser == null) res.status(status).json({ message: error2.message })
	res.status(status).json(newUser)
})

//Updating User
router.post('/update', authenticate, async (req, res) => {
	try {
		if (req.body.newEmail == null) return res.status(400).json({ message: "please Enter newEmail" })
		if (req.body.newPassword == null) return res.status(400).json({ message: "please Enter newPassword" })
		const [hashedPassword, error] = await encryptPassword(req.body.newPassword)
		if (error != null) return res.status(400).json({ message: "password not acceptable" })
		res.user.email = req.body.newEmail
		res.user.password = hashedPassword
		const newUser = await res.user.save()
		res.status(200).json(newUser)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
})

//Deleting User
router.delete('/delete', authenticate, async (req, res) => {
	try {
		await res.user.remove()
		res.status(200).json({ message: "Deleted User" })
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

router.post('/login', authenticate, async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    let user;
	try {
		user = await User.findOne({ 'email': req.body.email })
 		if (user == null) return res.status(404).json({ message: "Cannot find user" })
        res.json(user)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
})

module.exports = router

require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Person = require('./models/person')

/**
 * whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address. If a correct file is found, express will return it. 
 * Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/notes will be handled by the backend's code.
 */
app.use(express.static('build')) //Frontend files

//This middleware allow to call request from different domain
//Cross-Origin Resource Sharing (CORS)
//In our case localhost:3000/... -> localhost:3001/...
const cors = require('cors')
app.use(cors())

app.use(bodyParser.json())

//Morgan middleware
const morgan = require('morgan')
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let people = [
	{
		"name": "Arto Hellas",
		"number": "040-123456",
		"id": 1
	},
	{
		"name": "Ada Lovelace",
		"number": "39-44-5323523",
		"id": 2
	},
	{
		"name": "Dan Abramov",
		"number": "12-43-234345",
		"id": 3
	},
	{
		"name": "Mary Poppendieck",
		"number": "39-23-6423122",
		"id": 4
	},
	{
		"name": "Miso",
		"number": "Puchy",
		"id": 5
	},
	{
		"name": "Majco",
		"number": "Vajco",
		"id": 6
	},
	{
		"name": "Maria",
		"number": "Plackova",
		"id": 7
	},
	{
		"name": "Alex",
		"number": "Man",
		"id": 8
	},
	{
		"name": "rudo",
		"number": "12",
		"id": 13
	}
]

app.get('/api/people', (req, res) => {
	Person.find({}).then(ludia => {
		res.json(ludia.map(per => per.toJSON())) //The toJSON method we defined transforms object into a string just to be safe.
	})
	// res.json(people)
})

app.get('/info', (req, res) => {
	const peopleCount = people.length
	res.send(`
		<p>Phonebook has info for ${peopleCount} people</p>
		<p>${new Date()}</p>
	`)
})

app.get('/api/people/:id', (req, res) => {
	Person.findById(req.params.id).then(per => {
		res.json(per.toJSON())
	})
	// const id = Number(req.params.id)
	// const person = people.find(p => p.id === id)
	// if(person) {
	// 	res.json(person)
	// } else {
	// 	res.status(400).end()
	// }
})

app.delete('/api/people/:id', (req, res) => {
	const id = Number(req.params.id)
	people = people.filter(p => p.id !== id)
	res.status(204).end()
})

const getRandInt = (max = 100000) => {
	return Math.floor(Math.random() * Math.floor(max))
}

app.post('/api/people', (req, res) => {
	let body = req.body
	let isNewPersonIncorrect = false
	const templateObj = {
		name: body.name,
		number: body.number
	}
	Object.keys(templateObj).forEach(prop => {
		isNewPersonIncorrect = isNewPersonIncorrect || !prop.length || !templateObj[prop]
	})
	if(isNewPersonIncorrect) {
		return res.status(400).json({error: "Person's information are missing."})
	}

	const person = new Person({
		name: body.name,
		number: body.number
	})

	person.save().then(savedPerson => {
		res.json(savedPerson.toJSON())
	})

	// if(people.find(p => p.name === templateObj.name)) {
	// 	return res.status(409).json({error: "The name has already exists in the Phonebook."})
	// }
})

//This middleware is used for catching requests made to non-existent routes.
//Kedze tu nemam handler na PUT tak to skonci tu
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

//const PORT = process.env.PORT || 3001//Heroku port or 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

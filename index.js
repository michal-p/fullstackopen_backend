const express = require('express')
const app = express()

//This middleware allow to call request from different domain
//Cross-Origin Resource Sharing (CORS)
//In our case localhost:3000/... -> localhost:3001/...
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())

//Morgan middleware
const morgan = require('morgan')
morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
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

app.get('/api/persons', (req, res) => {
	res.json(persons)
})

app.get('/info', (req, res) => {
	const personsCount = persons.length
	res.send(`
		<p>Phonebook has info for ${personsCount} people</p>
		<p>${new Date()}</p>
	`)
})

app.get('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	const person = persons.find(p => p.id === id)
	if(person) {
		res.json(person)
	} else {
		res.status(400).end()
	}
})

app.delete('/api/persons/:id', (req, res) => {
	const id = Number(req.params.id)
	persons = persons.filter(p => p.id !== id)
	res.status(204).end()
})

const getRandInt = (max = 100000) => {
	return Math.floor(Math.random() * Math.floor(max))
}

app.post('/api/persons', (req, res) => {
	let newPerson = req.body
	let isNewPersonIncorrect = false
	const templateObj = {
		name: newPerson.name,
		number: newPerson.number
	}
	Object.keys(templateObj).forEach(prop => {
		isNewPersonIncorrect = isNewPersonIncorrect || !prop.length || !templateObj[prop]
	})
	if(isNewPersonIncorrect) {
		return res.status(400).json({error: "Person's information are missing."})
	}

	if(persons.find(p => p.name === templateObj.name)) {
		return res.status(409).json({error: "The name has already exists in the Phonebook."})
	}

	newPerson.id = getRandInt()
	persons = persons.concat(newPerson)
	res.json(newPerson)
})

//This middleware is used for catching requests made to non-existent routes.
//Kedze tu nemam handler na PUT tak to skonci tu
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001//Heroku port or 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

const express = require('express')
const app = express()

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

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})

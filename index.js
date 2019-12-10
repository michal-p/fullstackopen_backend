require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const Person = require('./models/person')
//This middleware allow to call request from different domain
//Cross-Origin Resource Sharing (CORS)
//In our case localhost:3000/... -> localhost:3001/...
const cors = require('cors')
//Morgan middleware to your application for logging
//Middleware is a function that receives three parameters:request, response, next
//The next function yields control to the next middleware.
const morgan = require('morgan')

/**
 * whenever express gets an HTTP GET request it will first check if the build directory contains a file corresponding to the request's address. If a correct file is found, express will return it. 
 * Now HTTP GET requests to the address www.serversaddress.com/index.html or www.serversaddress.com will show the React frontend. GET requests to the address www.serversaddress.com/notes will be handled by the backend's code.
 */
app.use(express.static('build')) //Frontend files
app.use(bodyParser.json())
app.use(cors())
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

app.get('/api/people', (request, response, next) => {
	Person.find({})
	.then(ludia => {
		response.json(ludia.map(per => per.toJSON())) //The toJSON method we defined transforms object into a string just to be safe.
	})
	.catch(error => next(error))
})

app.get('/info', (request, response, next) => {
	Person.find({})
	.then(ludia => {
		response.send(`
			<p>Phonebook has info for ${ludia.length} people</p>
			<p>${new Date()}</p>
		`)
	})
	.catch(error => next(error))
})

app.get('/api/people/:id', (request, response, next) => {
	Person.findById(request.params.id)
		.then(per => {
			if(per) {
				response.json(per.toJSON())
			} else {
				response.status(404).end()
			}
		})
		.catch(error => {
			return next(error)
		})
})

app.delete('/api/people/:id', (request, response, next) => {
	Person.findByIdAndRemove(request.params.id)
		.then(result => {
			response.status(204).end()
		})
		.catch(error => next(error))
})

const getRandInt = (max = 100000) => {
	return Math.floor(Math.random() * Math.floor(max))
}

app.put('/api/people/:id', (request, response, next) => {
	const body = request.body
	
	const person = {
		name: body.name,
		number: body.number
	}

	//We added the optional { new: true }parameter, which will cause our event handler to be called with the new modified document instead of the original.
	Person.findByIdAndUpdate(request.params.id, person, {new: true})
		.then(updatePerson => {
			response.json(updatePerson.toJSON())
		})
		.catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
	let body = request.body

	const person = new Person({
		name: body.name,
		number: body.number
	})
	
	Person.findOne({name: person.name})
		.then(per => {
			if(per) {
				response.status(409)
					.json({error: "The name has already exists in the Phonebook."})
			} else {
				person.save()
					//object returned by Mongoose
					.then(newPerson => newPerson.toJSON())
					//formatted
					.then(newPersonFormatted => response.json(newPersonFormatted)) 
					.catch(error => next(error))
			}
		})
		.catch(error => next(error))
})

//This middleware is used for catching requests made to non-existent routes.
//Kedze tu nemam handler na PUT tak to skonci tu
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handler which needs to come at the very end, after the unknown endpoints handler.
//Our custom error handler to catch wrong type of ids
const errorHandler = (error, request, response, next) => {
	console.error("Deafault custom error Handler: ", error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
	//If we do not catch, here we are passing error to default error handler
  next(error)
}

// default custom Express error handler
app.use(errorHandler)

//const PORT = process.env.PORT || 3001//Heroku port or 3001
const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const peopleRouter = require('./controllers/people')
//Morgan middleware to your application for logging
//Middleware is a function that receives three parameters:request, response, next
//The next function yields control to the next middleware.
const morgan = require('morgan')

app.use(cors())
app.use(express.static('build')) //Frontend files
app.use(bodyParser.json())
morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
app.use('/api/people', peopleRouter)



//This middleware is used for catching requests made to non-existent routes.
//Kedze tu nemam handler na PUT tak to skonci tu
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

// error handler which needs to come at the very end, after the unknown endpoints handler.
//Our custom error handler to catch wrong type of ids
const errorHandler = (error, request, response, next) => {
  console.error('Deafault custom error Handler: ', error.message)

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
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
//Morgan middleware to your application for logging
//Middleware is a function that receives three parameters:request, response, next
//The next function yields control to the next middleware.
const morgan = require('morgan')

morgan.token('body', (req) => {
  return JSON.stringify(req.body)
})

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

//This middleware is used for catching requests made to non-existent routes.
//Kedze tu nemam handler na PUT tak to skonci tu
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

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

module.exports = {
  requestLogger,
  unknownEndpoint,
	errorHandler,
	morgan
}
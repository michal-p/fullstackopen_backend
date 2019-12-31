const peopleRouter = require('express').Router()
const Person = require('../models/person')

peopleRouter.get('/', (request, response, next) => {
  Person.find({})
    .then(ludia => {
      //The toJSON method we defined transforms object into a string just to be safe.
      response.json(ludia.map(per => per.toJSON()))
    })
    .catch(error => next(error))
})

peopleRouter.get('/info', (request, response, next) => {
  Person.find({})
    .then(ludia => {
      response.send(`
        <p>Phonebook has info for ${ludia.length} people</p>
        <p>${new Date()}</p>
      `)
    })
    .catch(error => next(error))
})

peopleRouter.get('/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(per => {
      if(per) {
        response.json(per.toJSON())
      } else response.status(404).end()
    })
    .catch(error => next(error))
})

peopleRouter.delete('/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => response.status(204).end())
    .catch(error => next(error))
})

peopleRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const person = {
    name: body.name,
    number: body.number
  }

  //We added the optional { new: true }parameter, which will cause our event handler to be called with the new modifieddocument instead of the original.
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatePerson => {
      response.json(updatePerson.toJSON())
    })
    .catch(error => next(error))
})

peopleRouter.post('/', (request, response, next) => {
  let body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    //object returned by Mongoose
    .then(newPerson => newPerson.toJSON())
    //formatted
    .then(newPersonFormatted => response.json(newPersonFormatted))
    .catch(error => next(error))
})

module.exports = peopleRouter
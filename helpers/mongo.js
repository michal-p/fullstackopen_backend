const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const dbName = 'phonebook-app'

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url =
	`mongodb+srv://michal-p:${password}@fullstackphonebook-ohxuc.mongodb.net/${dbName}?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number
})

const People = mongoose.model('Person', phonebookSchema)

const person = new People({
  name: name,
  number: number
})

if(process.argv.length < 4) {
	People.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
		})
		mongoose.connection.close()
	})
} else {
	person.save().then(response => {
		console.log(`added ${response.name} number ${response.number}`)
		mongoose.connection.close()
	})
}

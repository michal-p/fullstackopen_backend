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

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

const phonebook = new Phonebook({
  name: name,
  number: number
})

if(process.argv.length < 4) {
	Phonebook.find({}).then(result => {
		result.forEach(person => {
			console.log(`added ${person.name} number ${person.number}`)
		})
		mongoose.connection.close()
	})
} else {
	phonebook.save().then(response => {
		console.log(`added ${response.name} number ${response.number}`)
		mongoose.connection.close()
	})
}

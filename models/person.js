const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)


const url = process.env.MONGODB_URI

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const phonebookSchema = new mongoose.Schema({
	name: {
    type: String,
    minlength: 5,
		required: [true, 'User name min length 5 characters required']
	},
	number: {
    type: Number,
    validate: {
      validator: function (v) {
        return String(v).length === 1
      },
      message: props => `${props.value} is not a valid phone number`
    },
		required: [true, 'User phone number required']
	}
})

phonebookSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', phonebookSchema)
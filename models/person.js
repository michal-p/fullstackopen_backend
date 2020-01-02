const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
mongoose.set('useFindAndModify', false)

const phonebookSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: [true, 'User name min length 5 characters required']
  },
  number: {
    type: Number,
    unique: true,
    validate: {
      validator: function (v) {
        return String(v).length >= 8
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

phonebookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Person', phonebookSchema)
const mongoose = require('mongoose');

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('connecting to', url)


mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB', result)
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })


const phoneSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true
    },
    number: {
        type: String,
        minLength: 8,
        validate: {
            validator: function (v) {
                return /^\d{2,3}-\d+$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number. The format must be XX-XXXXXX or XXX-XXXXX`
        },
        required: [true, 'User Phone is required'],
    }
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model('Person', phoneSchema)
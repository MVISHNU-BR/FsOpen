const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))
morgan.token('body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const randonId = () => {
    const id = Math.floor(Math.random(0, 99999) * 10000);
    return id.toString();
}

app.get('/', (request, response) => {
    const date = new Date()
    response.send(`
        <p>Phonebook has info for ${persons.length} people
        <p>${date}</p>
        `)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
})

const testName = (name) => {
    return persons.find(person => person.name.toLowerCase() === name.toLowerCase())
}

app.post('/api/persons', (request, response) => {
    const body = request.body;
    console.log(body)

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or Number are missing',
        })
    }
    if (testName(body.name)) {
        console.log(testName(body.name))
        return response.status(400).json({
            error: 'name must be unique'
        })

    }

    const person = {
        name: body.name,
        number: body.number,
        id: randonId()
    }

    persons = persons.concat(person)
    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id);
    response.status(204).end()
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
const mongoose = require('mongoose');

if (process.env.length < 3) {
    console.log('no password')
    process.exit
}

const password = process.argv[2]

const url = `mongodb+srv://mahajneesh:${password}@clusterfsopen.nrmrijo.mongodb.net/phoneBook?retryWrites=true&w=majority&appName=ClusterFsOpen`


mongoose.set('strictQuery', false);
mongoose.connect(url)

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Person = mongoose.model('Person', phoneSchema);

const person = new Person({
    name: process.argv[3],
    number: process.argv[4]
})

if (process.argv[3] || process.argv[4]) {
    person.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`);
        mongoose.connection.close();
    })
} else {
    Person.find({}).then(persons => {
        console.log('phoneBook:')
        persons.forEach(person => {
            console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close();
    })
}
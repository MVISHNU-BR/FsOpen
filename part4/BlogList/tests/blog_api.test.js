const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


test('return correct quantity of blog posts (0)', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
        .then(response => {
            expect(response.body.length).toBe(0);
        })
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})
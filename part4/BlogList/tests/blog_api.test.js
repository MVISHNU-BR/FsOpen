const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


test('return correct quantity of blog posts (if blogs db initiate with no blogs) (0)', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(8);
}, 100000)


test('if blogposts have a id propriety', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    response.body.forEach(blog => {
        expect(blog.id).toBeDefined()
    });

}, 100000)



afterAll(async () => {
    await mongoose.connection.close()
})
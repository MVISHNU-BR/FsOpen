const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);


test('return correct quantity of blog posts (if blogs db initiate with no blogs) (0)', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/);

    expect(response.body.length).toBe(11);
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

test('post blog on api/blogs', async () => {
    const blog = {
        "title": "007 new Movies",
        "author": "John Due",
        "url": "oo7newMovies",
        "likes": 3
    }

    const blogsBefore = (await api.get('/api/blogs').expect(200));
    const numberOfBlogs = blogsBefore.body.length;

    const response = await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAfter = (await api.get('/api/blogs').expect(200));
    const numberOfBlogsAfterPost = blogsAfter.body.length

    expect(numberOfBlogsAfterPost).toBe(numberOfBlogs + 1);
    expect(response.body.title).toBe(blog.title);
    expect(response.body.author).toBe(blog.author);
    expect(response.body.url).toBe(blog.url);
    expect(response.body.likes).toBe(blog.likes);

})



afterAll(async () => {
    await mongoose.connection.close()
})
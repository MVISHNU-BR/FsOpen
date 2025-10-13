const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
// const blogsHelper = require('./list_helper.test')
const Note = require('../models/blog');

const listWithSixBlog = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
    }
]
beforeEach(async () => {
    await Note.deleteMany({})
    await Note.insertMany(listWithSixBlog)
})

describe('when there is initially some blogs are returned', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    })

    test('blogs are returned with same quantity of db', async () => {

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(listWithSixBlog.length);

    })

    test('if blogposts have a id propriety', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach(blog => {
            expect(blog.id).toBeDefined()
        });
    }, 100000)
})

describe('when a blog are posted', () => {
    test('post blog on api/blogs', async () => {
        const blog = {
            "title": "007 new Movies",
            "author": "John Due",
            "url": "oo7newMovies",
            "likes": 3
        }

        const numberOfBlogs = listWithSixBlog.length;

        const response = await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

        const blogsAfter = (await api.get('/api/blogs').expect(200));
        const numberOfBlogsAfterPost = blogsAfter.body.length

        expect(numberOfBlogsAfterPost).toBe(numberOfBlogs + 1);
        expect(response.body.title).toBe(blog.title);
        expect(response.body.author).toBe(blog.author);
        expect(response.body.url).toBe(blog.url);
        expect(response.body.likes).toBe(blog.likes);
    })

    test("post a blogpost with no likes", async () => {
        const blogPost = {
            "title": "007 new Movies for 2029",
            "author": "John",
            "url": "oo7newMovies",
        }

        const response = await api
            .post('/api/blogs')
            .send(blogPost)
            .expect(201)

        expect(response.body.likes).toBe(0);

    })

    test("post a blogpost with no title and url expect to return 400", async () => {
        const blogPost = {
            "author": "John",
            "likes": 3
        }

        const response = await api
            .post('/api/blogs')
            .send(blogPost)
            .expect(400)

        expect(response.body.error).toBe("No Title or URL send.")
    })
})

describe('When a Blog are edited or deleted', () => {
    test('A blog post are deleted with sucsess', async () => {

        const BlogToDelete = await api.get('/api/blogs');
        await api
            .delete(`/api/blogs/${BlogToDelete.body[0].id}`)
            .expect(204)
    })
    test('if a blogpost are updated', async () => {

        const infoToUpdate = {
            "author": "Walter Due",
            "likes": 33,
            "title": "test",
            "url": "another test url"
        }
        const bloptToUpdate = await api.get('/api/blogs');
        await api
            .put(`/api/blogs/${bloptToUpdate.body[0].id}`)
            .send(infoToUpdate)
            .expect(200)
    })


})


afterAll(async () => {
    await mongoose.connection.close()
})
const blogsRouter = require('express').Router();
const Blog = require('../models/blog')


blogsRouter.get('/test', async (request, response, next) => {
    try {
        response.send('Hello world!')
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs);
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {
    const newBlog = {
        ...request.body,
        likes: request.body.likes ?? -0
    }
    try {
        const blog = new Blog(newBlog);
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter;
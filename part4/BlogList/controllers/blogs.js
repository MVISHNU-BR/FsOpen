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

    if (!newBlog.title || !newBlog.url) {
        return response.status(400).json({ error: 'No Title or URL send.' });
    }

    try {
        const blog = new Blog(newBlog);
        const savedBlog = await blog.save();
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception)
    }
})


blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndDelete(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }

})

module.exports = blogsRouter;
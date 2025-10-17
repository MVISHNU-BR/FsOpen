const blogsRouter = require('express').Router();
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken');

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith("Bearer ")) {
        return authorization.replace('Bearer ', '')
    }
    return null
}


blogsRouter.get('/test', async (request, response, next) => {
    try {
        response.send('Hello world!')
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
        response.json(blogs);
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.post('/', async (request, response, next) => {

    const decodedToken = jwt.verify(request.token,
        process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "token invalid" })
    }

    const user = await User.findById(decodedToken.id)

    const newBlog = {
        ...request.body,
        likes: request.body.likes ?? 0,
        user: user._id
    }

    if (!newBlog.title || !newBlog.url) {
        return response.status(400).json({ error: 'No Title or URL send.' });
    }

    try {
        const blog = new Blog(newBlog);
        const savedBlog = await blog.save();
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog);
    } catch (exception) {
        next(exception)
    }
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, {
            new: true
        })
        if (updatedBlog) {
            response.status(200).json(updatedBlog)
        } else {
            response.status(404).end()
        }
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
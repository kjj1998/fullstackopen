const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = new Blog({ ...request.body, user })
    const result = await blog.save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()

    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: 'invalid user' })
    }

    await blog.deleteOne()
    user.blogs = user.blogs.filter(blogId => blogId !== request.params.id)
    await user.save()

    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true, context: 'query' }
    )

    response.status(202).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
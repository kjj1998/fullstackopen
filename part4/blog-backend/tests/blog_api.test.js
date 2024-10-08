const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there are initially some blogs in the database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('unique identifier property of blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    blogs.map(blog => assert.strictEqual('id' in blog, true))
  })

  describe('creating a new blog', () => {
    test('new blog post is successfully created', async () => {
      const newBlogPost = {
        title: 'Is Design Dead?',
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/designDead.html',
        likes: 15,
      }

      await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

      const titles = blogsAtEnd.map(n => n.title)
      assert(titles.includes('Is Design Dead?'))
    })

    test('if likes property is missing, it will default to 0 after creation', async () => {
      const newBlogPost = {
        title: 'Testing Strategies in a Microservice Architecture',
        author: 'Toby Clemson',
        url: 'https://martinfowler.com/articles/microservice-testing/'
      }

      const response = await api
        .post('/api/blogs')
        .send(newBlogPost)

      assert.strictEqual(response.body.likes, 0)
    })
  })

  describe('return error 400 Bad Request if', async () => {
    test('title is missing from blog post', async () => {
      const newBlogPostWithoutTitle = {
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/refactoring-dependencies.html'
      }

      await api
        .post('/api/blogs')
        .send(newBlogPostWithoutTitle)
        .expect(400)
    })

    test('url is missing from blog post', async () => {
      const newBlogPostWithoutUrl = {
        author: 'Martin Fowler',
        title: 'Refactoring Dependencies'
      }

      await api
        .post('/api/blogs')
        .send(newBlogPostWithoutUrl)
        .expect(400)
    })

    test('url and title is missing from blog post', async () => {
      const newBlogPostWithoutTitleAndUrl = {
        author: 'Martin Fowler',
      }

      await api
        .post('/api/blogs')
        .send(newBlogPostWithoutTitleAndUrl)
        .expect(400)
    })
  })

  test('existing blog is successfully deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('existing blog can be successfully updated', async () => {
    const existingBlogs = await helper.blogsInDb()
    const blogToUpdate = existingBlogs[0]
    blogToUpdate.title = 'Updated title'

    const response = await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(202)

    assert.strictEqual(response.body.title, 'Updated title')
  })
})

after(async () => {
  await mongoose.connection.close()
})
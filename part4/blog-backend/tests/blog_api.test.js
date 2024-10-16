const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const saltRounds = 10
const bcrypt = require('bcrypt')

const api = supertest(app)

describe('when there are initially some blogs in the database', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    const userObjects = await Promise.all(
      helper.initialUsers
        .map(async user => new User({
          username: user.username,
          name: user.name,
          passwordHash: await bcrypt.hash(user.password, saltRounds)
        }))
    )
    const usersPromiseArray = userObjects.map(user => user.save())
    await Promise.all(usersPromiseArray)

    const user = await User.findOne()

    const blogObjects = helper.initialBlogs
      .map(blog => new Blog({ ...blog, user: user._id.toString() }))
    const blogsPromiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(blogsPromiseArray)
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

      const firstUser = helper.initialUsers[0]
      const response = await api
        .post('/api/login')
        .send({ username: firstUser.username, password: firstUser.password })
      const body = await response.body

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${body.token}`)
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

      const firstUser = helper.initialUsers[0]
      const authResponse = await api
        .post('/api/login')
        .send({ username: firstUser.username, password: firstUser.password })
      const authBody = await authResponse.body

      const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authBody.token}`)
        .send(newBlogPost)

      assert.strictEqual(response.body.likes, 0)
    })

    test('fails when token is not proviced', async () => {
      const newBlogPost = {
        title: 'Testing Strategies in a Microservice Architecture',
        author: 'Toby Clemson',
        url: 'https://martinfowler.com/articles/microservice-testing/'
      }

      await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(401)
    })
  })

  describe('return error 400 Bad Request if', async () => {
    test('title is missing from blog post', async () => {
      const newBlogPostWithoutTitle = {
        author: 'Martin Fowler',
        url: 'https://martinfowler.com/articles/refactoring-dependencies.html'
      }

      const firstUser = helper.initialUsers[0]
      const authResponse = await api
        .post('/api/login')
        .send({ username: firstUser.username, password: firstUser.password })
      const authBody = await authResponse.body

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authBody.token}`)
        .send(newBlogPostWithoutTitle)
        .expect(400)
    })

    test('url is missing from blog post', async () => {
      const newBlogPostWithoutUrl = {
        author: 'Martin Fowler',
        title: 'Refactoring Dependencies'
      }

      const firstUser = helper.initialUsers[0]
      const authResponse = await api
        .post('/api/login')
        .send({ username: firstUser.username, password: firstUser.password })
      const authBody = await authResponse.body

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authBody.token}`)
        .send(newBlogPostWithoutUrl)
        .expect(400)
    })

    test('url and title is missing from blog post', async () => {
      const newBlogPostWithoutTitleAndUrl = {
        author: 'Martin Fowler',
      }

      const firstUser = helper.initialUsers[0]
      const authResponse = await api
        .post('/api/login')
        .send({ username: firstUser.username, password: firstUser.password })
      const authBody = await authResponse.body

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${authBody.token}`)
        .send(newBlogPostWithoutTitleAndUrl)
        .expect(400)
    })
  })

  test('existing blog is successfully deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    const firstUser = helper.initialUsers[0]
    const authResponse = await api
      .post('/api/login')
      .send({ username: firstUser.username, password: firstUser.password })
    const authBody = await authResponse.body

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${authBody.token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })

  test('existing blog can be successfully updated', async () => {
    const existingBlogs = await helper.blogsInDb()
    const blogToUpdate = existingBlogs[0]

    const firstUser = helper.initialUsers[0]
    const authResponse = await api
      .post('/api/login')
      .send({ username: firstUser.username, password: firstUser.password })
    const authBody = await authResponse.body

    blogToUpdate.title = 'Updated title'

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set('Authorization', `Bearer ${authBody.token}`)
      .send(blogToUpdate)
      .expect(202)

    assert.strictEqual(response.body.title, 'Updated title')
  })
})

after(async () => {
  await mongoose.connection.close()
})
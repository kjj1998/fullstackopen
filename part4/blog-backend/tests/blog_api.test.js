const { test, after, beforeEach, describe } = require('node:test')
const assert = require('assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  blogs.map(blog => assert.strictEqual('id' in blog, true))
})

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

after(async () => {
  await mongoose.connection.close()
})
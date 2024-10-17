// const { test, after, beforeEach, describe } = require('node:test')
// const assert = require('assert')
// const User = require('../models/user')
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../app')
// const helper = require('./test_helper')
// const bcrypt = require('bcrypt')

// const api = supertest(app)

// // describe('when there are some users in the app', () => {
// //   beforeEach(async () => {
// //     await User.deleteMany({})

// //     const userObjects = await Promise.all(helper.initialUsers2.map(async (user) => new User({
// //       username: user.username,
// //       name: user.name,
// //       passwordHash: await bcrypt.hash(user.password, 10)
// //     })))

// //     const promiseArray = userObjects.map(user => user.save())
// //     await Promise.all(promiseArray)
// //   })

// //   test('users are returned as json', async () => {
// //     await api
// //       .get('/api/users')
// //       .expect(200)
// //       .expect('Content-Type', /application\/json/)
// //   })

// //   test('new user is successfully registered', async () => {
// //     const initialUsers = await helper.usersInDb()

// //     const newUser = {
// //       username: 'jcena',
// //       name: 'John Cena',
// //       password: 'secret'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(201)
// //       .expect('Content-Type', /application\/json/)

// //     const currentUsers = await helper.usersInDb()

// //     assert.strictEqual(initialUsers.length + 1, currentUsers.length)

// //     const usernames = currentUsers.map(user => user.username)
// //     assert(usernames.includes('jcena'))
// //   })

// //   test('no username is given', async() => {
// //     const newUser = {
// //       name: 'John Cena',
// //       password: 'secret'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /json/)
// //       .expect({ error: 'username is invalid' })
// //   })

// //   test('username is less than 3 characters', async() => {
// //     const newUser = {
// //       name: 'John Cena',
// //       password: 'secret',
// //       username: 'jc'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /json/)
// //       .expect({ error: 'username is invalid' })
// //   })

// //   test('no password given', async() => {
// //     const newUser = {
// //       name: 'Cody Rhodes',
// //       username: 'cr'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /application\/json/)
// //   })

// //   test('password is less than 3 characters', async () => {
// //     const newUser = {
// //       name: 'Cody Rhodes',
// //       username: 'cr',
// //       password: 'sc'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /application\/json/)
// //   })

// //   test('username not unique', async () => {
// //     const newUser = {
// //       username: 'jcena',
// //       name: 'John Cena',
// //       password: 'secret'
// //     }

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(201)
// //       .expect('Content-Type', /application\/json/)

// //     await api
// //       .post('/api/users')
// //       .send(newUser)
// //       .expect(400)
// //       .expect('Content-Type', /application\/json/)
// //   })
// // })

// after(async () => {
//   await mongoose.connection.close()
// })
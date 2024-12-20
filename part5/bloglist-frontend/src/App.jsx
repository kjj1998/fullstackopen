import { useState, useEffect, useRef } from 'react'

import blogService from './services/blogs'
import loginService from './services/login'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setUsername('')
      setPassword('')

      setMessage(`logged in as ${user.name}`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    try {
      setUser(null)
      blogService.removeToken()
      window.localStorage.removeItem('loggedBlogAppUser')

      setMessage('Logged out')
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    } catch (exception) {
      setMessage('Something went wrong')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    }
  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username <input data-testid='username' type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input data-testid='password' type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const createBlog = async (blogObject) => {
    try {
      const savedBlog = await blogService.post(blogObject)
      setBlogs(blogs.concat(savedBlog))

      setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)

      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      setMessage('error when adding blog')
      setMessageType('error')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
    }
  }

  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={message} type={messageType} />
        {loginForm()}
      </div>
    )
  }

  console.log(user)
  console.log(blogs)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messageType} />

      {user === null ?
        <div>
          <h2>log in to application</h2>
          {loginForm()}
        </div>
        :
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <Togglable buttonLabel='new blog post' ref={blogFormRef}>
            <BlogForm createBlog={createBlog}/>
          </Togglable>
          {
            blogs
              .sort((a, b) => { return b.likes - a.likes })
              .map(blog => <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} loggedInUser={user.username}/>)
          }
        </div>}
    </div>
  )
}

export default App
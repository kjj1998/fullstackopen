import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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

      setMessage(`Logged out`)
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
          username <input type='text' value={username} name='Username' onChange={({ target }) => setUsername(target.value)}/>
        </div>
        <div>
          password <input type='password' value={password} name='Password' onChange={({ target }) => setPassword(target.value)}/>
        </div>
        <button type='submit'>login</button>
      </form>
    )
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    try {
      const savedBlog = await blogService.post({ title, author, url })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs(blogs.concat(savedBlog))

      setMessage(`a new blog ${title} by ${author} added`)
      setMessageType('success')
      setTimeout(() => {
        setMessage(null)
        setMessageType(null)
      }, 3000)
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
          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <div>title:<input type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/></div>
            <div>author:<input type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/></div>
            <div>url:<input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/></div>
            <button type='submit'>create</button>
          </form>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}   
        </div>
      }
    </div>
  )
}

export default App
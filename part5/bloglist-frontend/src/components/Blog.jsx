import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, blogs, loggedInUser }) => {
  const [display, setDisplay] = useState(false)
  const [likes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleDisplay = () => {
    setDisplay(!display)
  }

  const handleLike = async () => {
    await blogService.put({
      id: blog.id,
      user: blog.user.id,
      likes: likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })
    setLikes(likes + 1)
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const idToDelete = blog.id
      console.log(blogs)
      await blogService.remove(idToDelete)
      setBlogs(blogs.filter(blog => blog.id !== idToDelete))
    }
  }

  const displayAllDetails = () => {
    if (display) {
      return (
        <div>
          <div>{blog.url}</div>
          <div>likes {likes} <button onClick={handleLike}>like</button></div>
          <div>{blog.user.name}</div>
          {blog.user.username === loggedInUser && <div><button onClick={handleDelete}>remove</button></div>}
        </div>
      )
    }
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={toggleDisplay}>{display ? 'hide' : 'view'}</button>
      {displayAllDetails()}
    </div>
  )
}

export default Blog
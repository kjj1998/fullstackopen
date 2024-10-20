import { useState } from "react"

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState(false)

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

  const displayAllDetails = () => {
    if (display) {
      return (
        <div>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.user.name}</div>
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
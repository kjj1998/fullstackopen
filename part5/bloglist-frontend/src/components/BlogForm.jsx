import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    await createBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleCreateBlog}>
        <div>title:<input placeholder='write title here' type='text' value={title} name='Title' onChange={({ target }) => setTitle(target.value)}/></div>
        <div>author:<input placeholder='write author here' type='text' value={author} name='Author' onChange={({ target }) => setAuthor(target.value)}/></div>
        <div>url:<input placeholder='write url here' type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)}/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default BlogForm
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'You’re NOT gonna need it!',
  author: 'Ron Jeffries',
  likes: 14,
  user: {
    username: 'hellas',
    name: 'Artos Hellas'
  },
  url: 'https://ronjeffries.com/xprog/articles/practices/pracnotneed/'
}
const blogs = [blog]
const mockSetBlogs = vi.fn()
const loggedInUser = 'hellas'

test('renders content', () => {
  const { container } = render(<Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} loggedInUser={loggedInUser}/>)

  const element = container.querySelector('#blog')

  expect(element).toBeDefined()
})

test('renders the blog\'s title and author, but does not render its URL or number of likes by default', () => {
  const { container } = render(<Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} loggedInUser={loggedInUser}/>)
  const element = container.querySelector('#blog')

  expect(element).toHaveTextContent(`${blog.title} ${blog.author}`)
  expect(element).not.toHaveTextContent(`${blog.url}`)
  expect(element).not.toHaveTextContent(`${blog.likes}`)
})

test('renders the blog\'s URL and number of likes when the view button is clicked', async () => {
  const { container } = render(<Blog blog={blog} blogs={blogs} setBlogs={mockSetBlogs} loggedInUser={loggedInUser}/>)
  const element = container.querySelector('#blog')

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(element).toHaveTextContent(`${blog.url}`)
  expect(element).toHaveTextContent(`${blog.likes}`)
})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { describe, vi, test, expect } from 'vitest'

describe('blog form', () => {
  test('form calls the event handler with the correct details', async () => {
    const title = 'Things I don\'t know as of 2018'
    const author = 'Dan Abramov'
    const url = 'https://overreacted.io/things-i-dont-know-as-of-2018/'

    const mockCreateBlog = vi.fn()

    render(<BlogForm createBlog={mockCreateBlog} />)

    const user = userEvent.setup()
    const createBlogPostButton = screen.getByText('create')
    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')

    await user.type(titleInput, title)
    await user.type(authorInput, author)
    await user.type(urlInput, url)
    await user.click(createBlogPostButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
  })
})
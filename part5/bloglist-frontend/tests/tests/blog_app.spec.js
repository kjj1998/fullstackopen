const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'hellas',
        name: 'Artos Hellas',
        password: 'secret'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('hellas')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('logged in as Artos Hellas')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await page.getByTestId('username').fill('jcena')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId('username').fill('hellas')
      await page.getByTestId('password').fill('secret')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('logged in as Artos Hellas')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new blog post' }).click()
      await page.getByPlaceholder('write title here').fill('How Discord Reduced Websocket Traffic by 40%')
      await page.getByPlaceholder('write author here').fill('Austin Whyte')
      await page.getByPlaceholder('write url here').fill('https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent#heading-3')

      await page.getByRole('button', { name: 'create' }).click()
      await expect(page.getByText('How Discord Reduced Websocket Traffic by 40% Austin Whyte')).toBeVisible()
    })
  })
})
const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog, logout } = require('./helper')

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
    await request.post('http://localhost:5173/api/users', {
      data: {
        username: 'mlukkainen',
        name: 'Matt Lukainen',
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
      await loginWith(page, 'hellas', 'secret')

      await expect(page.getByText('logged in as Artos Hellas')).toBeVisible()
    })

    test('fails with incorrect credentials', async ({ page }) => {
      await loginWith(page, 'jcena', 'secret')

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'hellas', 'secret')

      await expect(page.getByText('logged in as Artos Hellas')).toBeVisible()
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(
        page,
        'How Discord Reduced Websocket Traffic by 40%',
        'Austin Whyte',
        'https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent#heading-3'
      )

      await expect(page.getByText('How Discord Reduced Websocket Traffic by 40% Austin Whyte')).toBeVisible()
    })

    test('a blog can be liked', async ({ page }) => {
      await createBlog(
        page,
        'How Discord Reduced Websocket Traffic by 40%',
        'Austin Whyte',
        'https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent#heading-3'
      )

      await page.getByRole('button', { name: 'view' }).click()
      await page.getByRole('button', { name: 'like' }).click()
      await expect(page.getByText('likes 1')).toBeVisible()
    })

    test('a blog can be deleted', async ({ page }) => {
      await createBlog(
        page,
        'How Discord Reduced Websocket Traffic by 40%',
        'Austin Whyte',
        'https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent#heading-3'
      )

      await page.getByRole('button', { name: 'view' }).click()
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', { name: 'remove' }).click()

      await expect(page.getByText('How Discord Reduced Websocket Traffic by 40% Austin Whyte')).not.toBeVisible()
    })

    test('only the user that created the blog can see the blog\'s delete button', async ({ page }) => {
      await createBlog(
        page,
        'How to Measure Design System at Scale',
        'Vietanh Nguyen',
        'https://www.uber.com/en-SG/blog/design-system-at-scale/?uclick_id=6bac30ae-d9b5-44dc-a1f2-716de79933e7'
      )

      await logout(page)
      await loginWith(page, 'mlukkainen', 'secret')

      await page.getByRole('button', { name: 'view' }).click()
      await expect(page.getByRole('button', { name: 'remove' })).not.toBeVisible()
    })

    test('tests are arranged in order according to their likes, with the most likes first', async ({ page }) => {
      await createBlog(
        page,
        'How to Measure Design System at Scale',
        'Vietanh Nguyen',
        'https://www.uber.com/en-SG/blog/design-system-at-scale/?uclick_id=6bac30ae-d9b5-44dc-a1f2-716de79933e7'
      )
      await createBlog(
        page,
        'How Airbnb Smoothly Upgrades React',
        'Andre Wiggins',
        'https://medium.com/airbnb-engineering/how-airbnb-smoothly-upgrades-react-b1d772a565fd'
      )
      await createBlog(
        page,
        'How Discord Reduced Websocket Traffic by 40%',
        'Austin Whyte',
        'https://discord.com/blog/how-discord-reduced-websocket-traffic-by-40-percent#heading-3'
      )

      const blog1 = page.locator('.blog').filter({ hasText: 'How to Measure Design System at Scale Vietanh Nguyen' })
      const blog2 = page.locator('.blog').filter({ hasText: 'How Airbnb Smoothly Upgrades React Andre Wiggins' })
      const blog3 = page.locator('.blog').filter({ hasText: 'How Discord Reduced Websocket Traffic by 40% Austin Whyte' })

      await blog1.getByRole('button', { name: 'view' }).click()
      await blog2.getByRole('button', { name: 'view' }).click()
      await blog3.getByRole('button', { name: 'view' }).click()

      await blog3.getByRole('button', { name: 'like' }).click()
      await page.waitForLoadState('networkidle')
      await blog3.getByRole('button', { name: 'like' }).click()
      await page.waitForLoadState('networkidle')
      await blog2.getByRole('button', { name: 'like' }).click()
      await page.waitForLoadState('networkidle')

      await expect(blog3).toContainText('likes 2')
      await expect(blog2).toContainText('likes 1')
      await expect(blog1).toContainText('likes 0')
    })
  })
})
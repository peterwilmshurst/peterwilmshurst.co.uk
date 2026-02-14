import { expect, test } from '@playwright/test'

test('loads the home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Wilmshurst_')
  await expect(page.locator('#app')).toBeVisible()
})

test('renders the terminal portfolio ui', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByText('portfolio ~/terminal')).toBeVisible()
  await expect(page.getByPlaceholder('type a question, e.g. what skills do you have?')).toBeVisible()
  await expect(page.getByLabel('ASCII logo')).toContainText('|_______||___|  |_||_______|  |___|')
})

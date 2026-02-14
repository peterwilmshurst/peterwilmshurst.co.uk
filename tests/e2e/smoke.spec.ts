import { expect, test } from '@playwright/test'

test('loads the home page', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle('Wilmshurst_')
  await expect(page.locator('#app')).toBeVisible()
})

test('renders the logo svg', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('svg[data-name="Wilmshurst_"]')).toBeVisible()
})

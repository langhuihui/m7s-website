import { test, expect } from '@playwright/test';

test('homepage has the correct title and features', async ({ page }) => {
  await page.goto('/');

  // Check the title
  await expect(page).toHaveTitle(/VitePress 2.0 Project/);

  // Check hero section
  await expect(page.locator('.VPHero .name')).toContainText('VitePress 2.0');
  await expect(page.locator('.VPHero .text')).toContainText('Modern Documentation Site');

  // Check for features
  const features = page.locator('.VPFeature');
  await expect(features).toHaveCount(3);

  // Check for Get Started link
  const getStartedLink = page.getByRole('link', { name: 'Get Started' });
  await expect(getStartedLink).toBeVisible();

  // Navigate to the guide page
  await getStartedLink.click();
  await expect(page).toHaveURL(/\/guide\//);
  await expect(page.locator('h1')).toContainText('Introduction');
});

test('navigation works correctly', async ({ page }) => {
  await page.goto('/');

  // Click on Guide in the navigation
  await page.getByRole('link', { name: 'Guide', exact: true }).first().click();
  await expect(page).toHaveURL(/\/guide\//);

  // Check for the getting started link in the sidebar
  const gettingStartedLink = page.getByRole('link', { name: 'Getting Started' });
  await expect(gettingStartedLink).toBeVisible();

  // Navigate to Getting Started page
  await gettingStartedLink.click();
  await expect(page).toHaveURL(/\/guide\/getting-started/);
  await expect(page.locator('h1')).toContainText('Getting Started');
}); 
import { test, expect } from '@playwright/test';

test('golinge homepage title test', async ({ page }) => {
  await page.goto('http://localhost:3000/golinge');

  await expect(page.locator('text=Go Linge !')).toBeVisible();
});

test('start immediately test', async ({ page }) => {
  await page.goto('http://localhost:3000/golinge');

  // Start time selector
  await page.locator('#startTime').fill('12:13');

  // Duration selector
  await page.locator('#duration').fill('04:05');

  // Delay selector
  await page.locator('#delay').fill('0');

  await expect(page.locator('text=Fin du programme à 16:18')).toBeVisible(); //FIXME: i18n
});

test('start in one hour test', async ({ page }) => {
  await page.goto('http://localhost:3000/golinge');

  // Start time selector
  await page.locator('#startTime').fill('12:13');

  // Duration selector
  await page.locator('#duration').fill('01:02');

  // Delay selector
  await page.locator('#delay').fill('1');

  await expect(page.locator('text=Fin du programme à 14:15')).toBeVisible(); //FIXME: i18n
});

test('end tomorrow test', async ({ page }) => {
  await page.goto('http://localhost:3000/golinge');

  // Start time selector
  await page.locator('#startTime').fill('21:30');

  // Duration selector
  await page.locator('#duration').fill('01:01');

  // Delay selector
  await page.locator('#delay').fill('2');

  await expect(page.locator('text=Fin du programme demain à 00:31')).toBeVisible(); //FIXME: i18n
});

test('client side startup test', async ({ page }) => {
  await page.goto('http://localhost:3000/golinge');

  // At the startup, client side code should run once to compute the end time with default values
  await expect(page.locator('#endTime')).toHaveText(new RegExp(/Fin du programme à [0-2][0-9]:[0-5][0-9]$/), { 'useInnerText': true })
});

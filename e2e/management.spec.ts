import { test, expect } from '@playwright/test';
import {
  action,
  begin,
  walk,
  recruit,
  returnTown,
  rest,
  search,
  battleMenu,
  drainMessages,
  seedRandom,
} from './helpers';

test('six-member company overflow, reserve swaps, supplies and healing persist', async ({
  page,
}) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await seedRandom(page);
  await begin(page);
  await expect(page.locator('[data-action="developer"]')).toHaveCount(0);
  for (let encounter = 0; encounter < 6; encounter++) {
    await walk(page, 'forest-gate');
    await expect(page.locator('#map-name')).toHaveText('Russetwalk');
    await recruit(page);
    await returnTown(page, 'forest');
    await rest(page);
    await walk(page, 'supplies');
    await action(page, 'borrow');
    for (let purchase = 0; purchase < 3; purchase++) {
      const ribbon = page.locator('[data-action="buy"][data-id="invitations"]');
      if (await ribbon.isDisabled()) break;
      await ribbon.press('Enter');
    }
    await action(page, 'close');
  }
  await page.keyboard.press('c');
  await expect(page.locator('.companion-card')).toHaveCount(7);
  await expect(page.getByRole('heading', { name: 'Home roost · 1' })).toBeVisible();
  await page.locator('[data-action="roost"][data-index="1"]').press('Enter');
  await expect(page.getByRole('heading', { name: 'Home roost · 2' })).toBeVisible();
  await page.locator('[data-action="retrieve"]').first().press('Enter');
  await expect(page.getByRole('heading', { name: 'Home roost · 1' })).toBeVisible();
  await page.locator('[data-action="lead"]').first().press('Enter');
  await action(page, 'close');
  await walk(page, 'supplies');
  const wrap = page.locator('[data-action="buy"][data-id="salves"]');
  if (await wrap.isEnabled()) await wrap.press('Enter');
  await expect(page.locator('#panel')).toContainText('MOSS & SUNDRIES');
  await action(page, 'close');
  await rest(page);
  await page.keyboard.press('c');
  const health = await page.locator('.companion-card small').allTextContents();
  for (const line of health.filter((t) => t.startsWith('Vitality'))) {
    const numbers = line.match(/\d+/g)!;
    expect(numbers[0]).toBe(numbers[1]);
  }
  await action(page, 'close');
  await page.reload();
  await action(page, 'begin');
  await page.keyboard.press('c');
  await expect(page.locator('.companion-card')).toHaveCount(7);
  expect(errors).toEqual([]);
});

test('a defeated company returns home rested without losing its journal', async ({ page }) => {
  await seedRandom(page);
  await begin(page);
  await walk(page, 'forest-gate');
  await expect(page.locator('#map-name')).toHaveText('Russetwalk');
  await search(page);
  for (let turn = 0; turn < 100; turn++) {
    if (await page.locator('[data-action="battle-finish"]').isVisible()) break;
    await battleMenu(page, 'pack');
    await action(page, 'battle-observe');
    await drainMessages(page);
  }
  await expect(page.locator('#panel h2')).toHaveText('Company defeated');
  await action(page, 'battle-finish');
  await expect(page.locator('#map-name')).toHaveText('Latchleaf');
  await expect(page.locator('#panel h2')).toHaveText('A breather, not a setback.');
  await action(page, 'close');
  await page.keyboard.press('c');
  await expect(page.locator('.companion-card')).toContainText('40 / 40');
  await action(page, 'close');
  await page.keyboard.press('j');
  await expect(page.locator('.journal-entry').filter({ hasText: 'Field recorded' })).toHaveCount(2);
});

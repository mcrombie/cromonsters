import { test, expect } from '@playwright/test';
import { action, begin, walk, drainMessages, search, battleMenu, seedRandom } from './helpers';
test('directional movement, held walking and compact menu', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await begin(page);
  const canvas = page.locator('#game-canvas canvas');
  await expect(canvas).toHaveAttribute('width', '320');
  await expect(canvas).toHaveAttribute('height', '240');
  await page.locator('#game-canvas').focus();
  for (const [key, facing, x, y] of [
    ['ArrowRight', 'east', '13', '10'],
    ['ArrowUp', 'north', '13', '9'],
    ['ArrowLeft', 'west', '12', '9'],
    ['ArrowDown', 'south', '12', '10'],
  ]) {
    await page.keyboard.press(key);
    await expect(canvas).toHaveAttribute('data-facing', facing);
    await expect(canvas).toHaveAttribute('data-tile-x', x);
    await expect(canvas).toHaveAttribute('data-tile-y', y);
    await expect(canvas).toHaveAttribute('data-moving', 'false');
    await page.screenshot({ path: 'artifacts/revision/facing-' + facing + '.png' });
  }
  await page.keyboard.down('ArrowLeft');
  await page.waitForTimeout(530);
  await page.keyboard.up('ArrowLeft');
  await expect(canvas).toHaveAttribute('data-moving', 'false');
  expect(Number(await canvas.getAttribute('data-tile-x'))).toBeLessThan(11);
  await page.keyboard.press('Escape');
  await expect(page.locator('#panel h2')).toHaveText('FIELD MENU');
  await page.screenshot({ path: 'artifacts/revision/menu.png' });
  await action(page, 'area');
  await page.locator('[data-action="walk"][data-id="rest"]:visible').press('Enter');
  await expect(page.locator('#panel h2')).toHaveText('Everyone takes a breath.');
  await action(page, 'close');
  await expect(canvas).toHaveAttribute('data-facing', 'east');
  await page.keyboard.press('ArrowUp');
  await expect(canvas).toHaveAttribute('data-moving', 'false');
  await page.keyboard.press('ArrowUp');
  await expect(canvas).toHaveAttribute('data-moving', 'false');
  await expect(canvas).toHaveAttribute('data-facing', 'north');
});
test('battle commands, back, ordered messages and persistent uses', async ({ page }) => {
  await seedRandom(page);
  await begin(page);
  await walk(page, 'forest-gate');
  await expect(page.locator('#map-name')).toHaveText('Russetwalk');
  await search(page);
  await expect(page.locator('.battle-root button')).toHaveText(['FIGHT', 'PACK', 'COMPANY', 'RUN']);
  await page.screenshot({ path: 'artifacts/revision/battle-root.png' });
  await battleMenu(page, 'fight');
  await expect(page.locator('[data-action="battle-move"]').first()).toContainText('22 / 22');
  await page.screenshot({ path: 'artifacts/revision/battle-fight.png' });
  await page.keyboard.press('x');
  await expect(page.locator('.battle-root')).toBeVisible();
  await battleMenu(page, 'fight');
  await page.locator('[data-action="battle-move"]').first().press('Enter');
  await expect(page.locator('[data-action="battle-next"]')).toBeVisible();
  await expect(page.locator('.battle-root')).toHaveCount(0);
  await drainMessages(page);
  await battleMenu(page, 'fight');
  await expect(page.locator('[data-action="battle-move"]').first()).toContainText('21 / 22');
  await page.keyboard.press('x');
  await battleMenu(page, 'pack');
  await expect(page.locator('[data-action="battle-invite"]')).not.toContainText('100%');
  await page.keyboard.press('m');
  await expect(page.locator('#panel-mute')).toContainText('Sound off');
  await page.keyboard.press('x');
  for (let i = 0; i < 3; i++) {
    await action(page, 'battle-flee');
    await drainMessages(page);
    if (await page.locator('[data-action="battle-finish"]').isVisible()) break;
  }
  await expect(page.locator('#panel h2')).toHaveText('Escaped safely');
  await action(page, 'battle-finish');
  await page.reload();
  await action(page, 'begin');
  await expect(page.locator('#map-name')).toHaveText('Russetwalk');
});
test('menu interruption clears held movement without stale key errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await begin(page);
  const canvas = page.locator('#game-canvas canvas');
  await expect(page.locator('#game-canvas')).toBeFocused();
  await page.keyboard.down('ArrowRight');
  await page.keyboard.press('Escape');
  await expect(page.locator('#panel h2')).toHaveText('FIELD MENU');
  await page.keyboard.press('Escape');
  await expect(canvas).toHaveAttribute('data-moving', 'false');
  const x = await canvas.getAttribute('data-tile-x');
  await page.keyboard.down('ArrowRight');
  await page.waitForTimeout(220);
  await expect(canvas).toHaveAttribute('data-tile-x', x!);
  await page.keyboard.up('ArrowRight');
  await page.keyboard.press('ArrowRight');
  await expect(canvas).toHaveAttribute('data-tile-x', String(Number(x) + 1));
  await expect(page.locator('#game-canvas')).toBeFocused();
  expect(errors).toEqual([]);
});

import { test, expect } from '@playwright/test';
import {
  action,
  begin,
  walk,
  habitat,
  recruit,
  returnTown,
  rest,
  drainMessages,
  fightOnce,
  seedRandom,
} from './helpers';

test('fresh player completes the Fourfold Ramble with keyboard actions', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await seedRandom(page);
  await page.goto('/');
  await page.screenshot({ path: 'artifacts/revision/title.png', fullPage: true });
  await begin(page);
  await page.screenshot({ path: 'artifacts/revision/latchleaf.png', fullPage: true });
  await habitat(page, 'forest');
  await recruit(page);
  await returnTown(page, 'forest');
  await rest(page);
  await habitat(page, 'meadow');
  await recruit(page);
  await walk(page, 'peer');
  await action(page, 'peer-start');
  await drainMessages(page);
  await page.screenshot({ path: 'artifacts/revision/battle.png', fullPage: true });
  for (let turn = 0; turn < 25; turn++) {
    if (await page.locator('[data-action="battle-finish"]').isVisible()) break;
    await fightOnce(page);
  }
  await expect(page.locator('#panel h2')).toHaveText('Battle won');
  await action(page, 'battle-finish');
  await returnTown(page, 'meadow');
  await rest(page);
  await habitat(page, 'wetland');
  await returnTown(page, 'wetland');
  await habitat(page, 'inlet');
  await page.screenshot({ path: 'artifacts/revision/inlet.png', fullPage: true });
  await returnTown(page, 'inlet');
  await walk(page, 'rowan');
  await expect(page.getByRole('heading', { name: 'Proof of Concept Complete' })).toBeVisible();
  await page.screenshot({ path: 'artifacts/revision/completion.png', fullPage: true });
  await action(page, 'close');
  await page.reload();
  await action(page, 'begin');
  await action(page, 'menu');
  await action(page, 'trial');
  await expect(page.locator('#panel .trial-row')).toHaveCount(5);
  await expect(page.locator('#panel .trial-row')).toContainText([
    '4/4',
    '4/4',
    '6/6',
    '2/2',
    '1/1',
  ]);
  await action(page, 'close');
  await page.keyboard.press('j');
  await expect(page.locator('.journal-entry')).toHaveCount(30);
  await page.screenshot({ path: 'artifacts/revision/journal.png', fullPage: true });
  expect(errors).toEqual([]);
});

test('all thirty pixel portraits render and complete a developer battle', async ({ page }) => {
  test.setTimeout(240000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(m.text());
  });
  await seedRandom(page);
  await page.goto('/?dev=1');
  await action(page, 'developer');
  for (let n = 1; n <= 30; n++) {
    const id = String(n).padStart(3, '0');
    await page.locator('#dev-species').selectOption(id);
    await expect(page.locator('.species-heading img')).toHaveJSProperty('naturalWidth', 80);
    await page.locator('#dev-level').fill(n === 30 ? '12' : '4');
    await action(page, 'dev-battle');
    await drainMessages(page);
    await expect(page.locator('.combatant img')).toHaveCount(2);
    for (let turn = 0; turn < 50; turn++) {
      if (await page.locator('[data-action="battle-finish"]').isVisible()) break;
      await fightOnce(page);
    }
    await expect(page.locator('[data-action="battle-finish"]')).toBeVisible();
    await action(page, 'battle-finish');
    await expect(page.locator('#dev-species')).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('small viewport and keyboard-only starter selection', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('[data-action="begin"]').focus();
  await page.keyboard.press('Enter');
  for (let i = 0; i < 3; i++) await page.keyboard.press('Enter');
  await expect(page.locator('.starter-card')).toHaveCount(3);
  await page.keyboard.press('ArrowRight');
  await page.keyboard.press('Enter');
  await expect(page.locator('#panel')).not.toBeVisible();
  await page.screenshot({ path: 'artifacts/revision/mobile.png', fullPage: true });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)).toBe(
    false,
  );
  await page.keyboard.press('c');
  await expect(page.locator('.companion-card')).toContainText('Pipistitch');
  await page.keyboard.press('Escape');
  await page.keyboard.press('j');
  await expect(page.locator('.journal-entry')).toHaveCount(30);
  await page.keyboard.press('Escape');
  await page.keyboard.press('m');
  await page.keyboard.press('Escape');
  await action(page, 'controls');
  await expect(page.locator('#panel-mute')).toHaveText('Sound off · M');
});

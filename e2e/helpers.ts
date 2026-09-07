import { expect, type Page } from '@playwright/test';
export async function action(page: Page, name: string) {
  await page
    .locator('[data-action="' + name + '"]:visible')
    .first()
    .press('Enter');
}
export async function begin(page: Page, starter = '003') {
  await page.goto('/');
  await action(page, 'begin');
  for (let i = 0; i < 3; i++) await action(page, 'intro-next');
  await page.locator('[data-action="starter"][data-id="' + starter + '"]').press('Enter');
  await expect(page.locator('#panel')).not.toBeVisible();
  await expect(page.locator('#game-canvas canvas')).toHaveAttribute('data-moving', 'false');
}
export async function walk(page: Page, id: string) {
  await action(page, 'menu');
  await action(page, 'area');
  await page.locator('#panel [data-action="walk"][data-id="' + id + '"]').press('Enter');
}
export async function drainMessages(page: Page) {
  for (let i = 0; i < 40; i++) {
    if (!(await page.locator('[data-action="battle-next"]').isVisible())) return;
    await action(page, 'battle-next');
  }
  throw new Error('Battle messages did not terminate');
}
export async function battleMenu(page: Page, menu: string) {
  await page.locator('[data-action="battle-menu"][data-id="' + menu + '"]').press('Enter');
}
export async function fightOnce(page: Page) {
  await battleMenu(page, 'fight');
  await page.locator('[data-action="battle-move"]:not(:disabled)').first().press('Enter');
  await drainMessages(page);
}
export async function search(page: Page) {
  await action(page, 'menu');
  await action(page, 'area');
  await action(page, 'search');
  await drainMessages(page);
}
export async function recruit(page: Page) {
  await search(page);
  for (let i = 0; i < 30; i++) {
    if (await page.locator('[data-action="battle-finish"]').isVisible()) break;
    const health = (await page.locator('.enemy-status .hp-value').innerText()).match(/\d+/g)!;
    if (Number(health[0]) / Number(health[1]) > 0.58) {
      await fightOnce(page);
      continue;
    }
    await battleMenu(page, 'pack');
    await expect(page.locator('[data-action="battle-invite"]')).toBeEnabled();
    await action(page, 'battle-invite');
    await drainMessages(page);
  }
  await expect(page.locator('#panel h2')).toHaveText('Companion recruited');
  await action(page, 'battle-finish');
}
export async function habitat(page: Page, id: string) {
  await walk(page, id + '-gate');
  await expect(page.locator('#map-name')).toHaveText(
    {
      forest: 'Russetwalk',
      meadow: 'Bellwether Field',
      wetland: 'Sluicefen',
      inlet: 'Farcurrent Strand',
    }[id]!,
  );
  await walk(page, id + '-discovery');
  await expect(page.locator('#panel')).toBeVisible();
  await action(page, 'close');
}
export async function returnTown(page: Page, id: string) {
  await walk(page, id + '-return');
  await expect(page.locator('#map-name')).toHaveText('Latchleaf');
}
export async function rest(page: Page) {
  await walk(page, 'rest');
  await expect(page.locator('#panel h2')).toHaveText('Everyone takes a breath.');
  await action(page, 'close');
}
export async function seedRandom(page: Page) {
  await page.addInitScript(() => {
    let n = 17;
    Math.random = () => {
      n = (n * 16807) % 2147483647;
      return n / 2147483647;
    };
  });
}

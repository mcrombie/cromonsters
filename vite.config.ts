import { defineConfig } from 'vitest/config';
export default defineConfig({
  base: './',
  server: { watch: { ignored: ['**/artifacts/**', '**/.tools/**', '**/.render-tool/**'] } },
  test: { include: ['tests/**/*.test.ts'] },
  build: {
    rollupOptions: { output: { manualChunks: { phaser: ['phaser'] } } },
    chunkSizeWarningLimit: 1600,
  },
});

import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: { input: { world: 'index.html', classic: 'klassisk.html' } },
    sourcemap: false,
  },
});

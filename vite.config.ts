import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  plugins: [
  ],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    lib: {
      entry: 'src/main.ts',
      name: 'pixel-drawer',
      fileName: (format) => `pixel-drawer.${format}.js`,
      formats: [ 'umd', 'es' ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

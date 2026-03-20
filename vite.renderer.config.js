import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  root: path.resolve(__dirname, 'src', 'renderer'),
  plugins: [react()],
  base: './',
  build: {
    outDir: path.resolve(__dirname, 'dist', 'renderer'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
  },
  define: {
    __DEV__: mode !== 'production',
  },
}));

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['firebase/auth'],
    },
  },
  resolve: {
    alias: {
      'firebase/auth': 'firebase/auth',
    },
  },
}); 
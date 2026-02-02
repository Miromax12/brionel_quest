
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    allowedHosts: [
      'brionel-quest.onrender.com'
    ]
  },
  preview: {
    allowedHosts: [
      'brionel-quest.onrender.com'
    ]
  }
});

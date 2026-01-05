import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Docs: https://rsbuild.rs/config/
export default defineConfig({
  plugins: [pluginReact()],
  server: {
        port: 3000,
        strictPort: true,
        proxy: {
            '/api': {
                target: process.env.PUBLIC_API_URL,
                changeOrigin: true,
            },
        },
    },
});

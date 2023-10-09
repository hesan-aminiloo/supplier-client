/** @type {import('vite').UserConfig} */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import eslint from 'vite-plugin-eslint';
import svgr from '@svgr/rollup';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    eslint({ failOnError: false }),
    svgr({
      typescript: true,
      memo: true,
      icon: true,
      expandProps: 'start',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        includePaths: [path.resolve(__dirname, 'src', 'style')],
      },
    },
  },
  server: {
    port: 3000,
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
});

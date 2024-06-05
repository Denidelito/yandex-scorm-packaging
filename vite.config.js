import { defineConfig } from 'vite';
import { resolve } from 'path';
import path from 'path'

export default defineConfig({
    root: resolve(__dirname, 'src'),
    build: {
        outDir: '../dist'
    },
    publicDir: 'public',
});


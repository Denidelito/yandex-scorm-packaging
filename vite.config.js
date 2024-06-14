import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default defineConfig({
    root: resolve(__dirname, 'src'),
    base:  './',
    build: {
        outDir: '../dist'
    },
    publicDir: 'public',
    plugins: [
        createSvgIconsPlugin({
            iconDirs: [resolve(process.cwd(), 'src/assets/icons/')],
            symbolId: 'icon-[name]',
        }),
        vue()
    ],
    server: {
        historyApiFallback: true,
    },
});


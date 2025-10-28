import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: 'pages',
    publicDir: 'public',
    server: {open: '/homepage/' },
    build: {
        rollupOptions: {
            input: {
                homepage: './homepage/index.html',
            },
        },
        outDir: '../dist',
        emptyOutDir: true,
    },
});
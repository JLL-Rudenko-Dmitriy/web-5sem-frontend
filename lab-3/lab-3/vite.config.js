import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: 'pages',
    publicDir: 'public',
    base: './',
    server: {open: '/homepage/' },
    build: {
        rollupOptions: {
            input: {
              homepage: 'homepage/index.html',
              catalog: 'catalog/index.html',
              blog:    'blog/index.html',
              about:   'about/index.html',
            },
        },
        outDir: '../dist',
        emptyOutDir: true,
    },
});
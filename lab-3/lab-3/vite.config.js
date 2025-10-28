import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
    root: 'pages',
    plugins: [
        viteStaticCopy({
          targets: [
            { src: '../images/**/*', dest: 'images' },
            { src: '../styles/**/*', dest: 'styles' },
            { src: '../assets/**/*', dest: 'assets'}
          ]
        })
    ],
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
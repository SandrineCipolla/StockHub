import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: parseInt(process.env.VITE_SERVER_PORT) || 3000,
        host: process.env.VITE_SERVER_NAME || 'localhost',
    },
    resolve: {
        alias: {
            // Ajout du polyfill pour crypto
            crypto: 'crypto-browserify',
            stream: 'stream-browserify',
            buffer: 'buffer',
        },
    },
    optimizeDeps: {
        include: ['crypto-browserify', 'stream-browserify', 'buffer'],
    },
    define: {
        // Correction pour assurer la compatibilité avec Node.js modules
        global: 'window',
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    },
});

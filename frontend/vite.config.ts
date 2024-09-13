import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from "node:path";


export default defineConfig({
    plugins: [react()],
    server: {
        port: parseInt(process.env.VITE_SERVER_PORT),
        host: process.env.VITE_SERVER_NAME,
    },
    build: {
        rollupOptions: {
            input: path.resolve(__dirname, 'index.html'),
        },
    },
})

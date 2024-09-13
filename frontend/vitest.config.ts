import { defineConfig } from 'vitest/config';
import { configDefaults } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/setupTests.ts',
        css: false,
        include: ['tests/**/*.test.(ts|tsx)'],
        exclude: [...configDefaults.exclude, 'tests/e2e/**'],
        coverage: {
            provider: 'v8',
            enabled: process.env.COVERAGE === 'true',
            reportsDirectory: './coverage',
            include: ['src/**/*.ts'],
            exclude: ['tests/**', 'src/**/*.d.ts'],
        },
    },
});
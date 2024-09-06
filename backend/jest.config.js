module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'],
    testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
};

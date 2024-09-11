module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.(ts|tsx)$': ['ts-jest', {
            tsconfig: 'tsconfig.json',
        }],
    },
    setupFiles: ['dotenv/config'],
    testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
    testPathIgnorePatterns: ['<rootDir>/tests/integration'],
};

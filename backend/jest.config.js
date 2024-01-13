module.exports =   {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    //setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    testMatch: ['<rootDir>/tests/**/*.test.(ts|tsx)'],
    globals: {
        'ts-jest': {
        tsconfig: 'tsconfig.json',
        },
    },
};

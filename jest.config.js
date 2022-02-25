module.exports = {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js', 'json', 'node'],
    testRegex: '(\\.|/)(test|spec)\\.ts$',
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/*/.{ts,js}', '!src/*/.d.ts']
};
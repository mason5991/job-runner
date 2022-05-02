module.exports = {
  verbose: true,
  coverageDirectory: './reports/jest/coverage',
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['/build/', '/node_modules/'],
  // roots: ['tests/jest'],
  testMatch: ['<rootDir>/tests/jest/**/*.test.ts'],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "ts-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: {
        // allow js in typescript
        allowJs: true,
      },
    },
  },
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**"
  ],
  setupFiles: ['./tests/env.js','./tests/config.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: 'reports/jest',
        filename: 'jest-report.html',
        expand: true,
      },
    ],
  ],
  testResultsProcessor: "jest-sonar-reporter"
};

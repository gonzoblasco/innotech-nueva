// jest.config.js - CORREGIDO
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // FIX: moduleNameMapping -> moduleNameMapper
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx}',
    'components/**/*.{js,jsx}',
    'hooks/**/*.{js,jsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testMatch: ['<rootDir>/__tests__/**/*.{js,jsx}', '<rootDir>/**/*.{test,spec}.{js,jsx}'],
  moduleFileExtensions: ['js', 'jsx', 'json'],
}

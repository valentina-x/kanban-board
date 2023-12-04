/* eslint-disable */
module.exports = {
  // Other Jest configurations...
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'mjs'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx|mjs)$': [
      'babel-jest',
      { presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-modules'] },
    ],
    '^.+\\.scss$': 'jest-transform-stub', // Add this line for SCSS files
  },
  moduleNameMapper: {
    '\\.(css|less|scss)$': 'identity-obj-proxy',
  },
};

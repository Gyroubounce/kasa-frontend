/* eslint-disable @typescript-eslint/no-require-imports */

/** @type {import('jest').Config} */
const path = require("path");

const config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^next/image$": path.resolve(__dirname, "__mocks__/next/image.js"),
  },
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": ["babel-jest", { configFile: "./babel-jest.config.js" }],
  },
};

module.exports = config;

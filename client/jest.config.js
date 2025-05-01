export default {
    testEnvironment: "jsdom", // Required for React component testing
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"], // Setup file for Jest
    moduleFileExtensions: ["js", "jsx"], // Recognize .js and .jsx files
    transform: {
      "^.+\\.(js|jsx)$": "babel-jest", // Transform JS/JSX files with babel-jest
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy", // Mock CSS imports
    },
  };
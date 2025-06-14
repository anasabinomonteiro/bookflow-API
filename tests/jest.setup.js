// jest.setup.js
// Global test setup
jest.setTimeout(30000); // 30 second timeout for database operations

// Mock console.error to keep test output clean
global.console = {
    ...console,
    error: jest.fn()
};
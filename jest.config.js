module.exports = {
    preset: "ts-jest",
    testMatch: ["**/tests/**/*.(spec|test).(js|jsx|ts|tsx)"],
    collectCoverage: true,
    coverageDirectory: "<rootDir>/tests/coverage",
    collectCoverageFrom: ["src/**/*.(js|jsx|ts|tsx)"],
};

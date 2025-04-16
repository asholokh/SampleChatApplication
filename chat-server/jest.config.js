/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: "node",
  roots: ["./src"],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};
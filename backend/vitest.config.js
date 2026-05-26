import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    globals: true,
    include: ["src/**/*.test.js"],
    clearMocks: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.js"],
      exclude: [
        "src/server.js",
        "src/scripts/**",
        "src/tests/**",
      ],
    },
  },
});

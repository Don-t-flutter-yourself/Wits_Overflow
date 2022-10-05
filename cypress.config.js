const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'cmov3k',
  component: {
    env: {
      FOO: "bar",
    },
    e2e: {
      baseUrl: "http://localhost:3000",
    },
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});

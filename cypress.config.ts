import { defineConfig } from "cypress";
import allureWriter from "@shelex/cypress-allure-plugin/writer";

module.exports = defineConfig({
  projectId: "7zfq8n",
  e2e: {
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    baseUrl: "https://opensource-demo.orangehrmlive.com/web/index.php",
    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    },
    env: {
      download_dir: "./cypress/downloads",
      allure: true,
      allureResultsPath: "task-results",
      screenshotsFolder: "task-results",
      snapshotOnly: true,
    },
    reporterOptions: {
      types: ["@shelex/cypress-allure-plugin"],
      embeddedScreenshots: true,
      inlineAwssets: true,
    },
    videosFolder: "task-results",
    screenshotOnRunFailure: true,
  },
});

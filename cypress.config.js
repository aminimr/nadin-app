import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

export default defineConfig({
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    e2e: {
      setupNodeEvents(on) {
        on('file:preprocessor', vitePreprocessor())
      },
    },
  },
});

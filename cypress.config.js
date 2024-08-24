import {defineConfig} from 'cypress';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    e2e: {
        specPattern: 'cypress/e2e/*.cy.js',
        baseUrl: process.env.TASK_URL,
        defaultCommandTimeout: 10000,
        viewportWidth: 1280,
        viewportHeight: 1024,
        setupNodeEvents(on, config) {

        },
    },
});

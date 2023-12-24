# STAR

## End to End Testing (with [Playwright](https://playwright.dev/))

From the `tests-e2e` folder:

1. Create an `.env` file using the `.env.example`

2. Add your **Google Account** **Email** and **Password** to the `.env` file

   ```sh
   # /tests-e2e/.env

   # Your Google Account Credentials
   GOOGLE_EMAIL=
   GOOGLE_PASSWORD=
   ```

3. Install the Dependencies `npm install`

4. Install the Playwright Browsers `npx playwright install`

5. Run the End to End tests with `npm start`, this will:

   - migrate the database
   - run the client and server
   - then run the End to End tests

6. The first time running the End to End tests, a `tests-e2e/tests/auth/storage-state.json` will be generated, which stores your Authentication details for future test runs (assuming the credentials have not expired).

7. A Browser should appear and automatically log in to your provided Google Account and then log in the STAR Application. The subsequent tests are run in a headless Browser which will not be visible.

8. Test Reports are generated and stored in `tests-e2e/test-reports/`.

9. Other commands exist should you need them:

   - `npm run test:headed` to run the End to End tests and visually observe the interaction with the Application
   - `npm run test:interactive` to run the End to End tests in UI Mode
   - `npm run test:debug` to run the End to End tests in Debug Mode

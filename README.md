# STAR

## Setup Instructions

## 1. Database

- Login to your PostgreSQL Database:

  - `psql -U postgres` (or use your own postgres user)

- Enter your password (if any)

- Create a new Database:

  - `CREATE DATABASE star_development;`

- Quit from the PostgreSQL client

  - `\q`

## 2. Express Server API

- Make a copy of the `/server/.env.example` file, and rename it to `.env`

- Add the Environment Variables and Secrets

```sh
# the ENVironment that Node is running in:
NODE_ENV=development # development | test | production

# the Port the Express Server runs on:
SERVER_PORT=4000

# the Database Connection details:
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=(your own postgres user)
DATABASE_PASSWORD=(your own postgres password)
DATABASE_NAME=star_development

# the Google Authentication details:
GOOGLE_CLIENT_ID=(your own google client id)
GOOGLE_CLIENT_SECRET=(your own google client secret)
GOOGLE_REDIRECT_URI=http://localhost:4000/api/auth/google/authorizationcode

# the customJWT Signing Secret:
JWT_SECRET=(some random long string)
```

- Open a Terminal and change to the `server` directory

  - `cd server`

- Install the Dependencies

  - `npm install`

- Migrate the Database

  - `npm run database:migration`

- Run the Express Server in Development Mode

  - `npm run dev`

- Visit http://localhost:4000/api to check the Server

## 3. React Client

- Make a copy of the `/client/.env.example` file, and rename it to `.env`

- Add the Environment Variables

```sh
# the URL of the Express API Server:
VITE_SERVER_URL=http://localhost:4000

# the Google Client ID used for Authentication:
VITE_GOOGLE_CLIENT_ID=(your own google client id)
```

- Open another Terminal and change to the `client` directory

  - `cd client`

- Install the Dependencies

  - `npm install`

- Run the React Client in Development Mode

  - `npm run dev`

- Visit http://localhost:3000 to check the Client

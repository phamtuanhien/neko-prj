## Prerequisites

Node.js: 18.x

Npm: 8.x

Docker: 20.x

## Running prj locally

Step 1: Set up env

```console
$ cp ./env/.env.example ./env/.env
```

Step 2: Install dependencies

```console
$ npm ci
```

Step 3: Start Postgres and seed db

```console
$ docker compose up -d
$ npm run typeorm:run-migrations
```

Step 4: Start the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## How to test api

```console
$ # POST /auth/signup
$ curl -X POST http://localhost:3333/api/auth/signup -d '{"email": "youremail@test.com", "password": "YourPass1!", "name": "Your Name"}' -H "Content-Type: application/json"

$ # POST /auth/signin
$ curl -X POST http://localhost:3333/api/auth/signin -d '{"email": "tuanhien.4dev@test.com", "password": "Tu4nhi3nloveyou!"}' -H "Content-Type: application/json"

$ # GET /auth/me
$ curl -X GET http://localhost:3333/api/auth/me -H "Authorization: Bearer your_access_token"

$ # GET /nfts
$ curl -X GET http://localhost:3333/api/nfts -H "Authorization: Bearer your_access_token"
```

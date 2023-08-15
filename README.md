# Compass Hackathon 2023

- Platform: [NestJS](https://nestjs.com)
- ORM: [TypeORM](https://typeorm.io)

## Quick start

### Install Postgres (Docker)

```
# Install Docker (option)
https://docs.docker.com/get-docker/

# Run Postgres container
docker run --name compass-hackathon-2023-postgres \
  -e POSTGRES_USER=compass-hackathon-2023 \
  -e POSTGRES_PASSWORD=compass-hackathon-2023 \
  -e POSTGRES_DB=compass-hackathon-2023 \
  -p 54321:5432 \
  -d postgres

# Install DBeaver (option)
https://dbeaver.io
```

### Start development

> Please check your Node version >= 16.0 & NPM >= 7.0, recommend to use [nvm](https://github.com/nvm-sh/nvm).

```bash
# install dependencies
npm install

# setup your local env
cp .env.example .env

# start development mode
npm run start:dev

# endpoint
http://localhost:8000
```

## Run tests

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

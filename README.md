# Node MariaDB Sample API
Example API using MariaDB as datasource

# Setup

- Install dependencies:
```bash
yarn install
```

- Start the MariaDB service (docker-compose required):
```
docker compose up
```

- Create a file named `environment.yaml` at root level:
```yaml
NODE_ENV: 'HML'
PORT: 3000

DB_PORT: 3306
DB_USER: 'root'
DB_PASSWORD: 'rootpassword'
DB_POOL_CONNECTION_LIMIT: 5
DB_NAME: 'test'
DB_HOST: 'localhost'
```

- Run database migrations:
```bash
yarn migration:run 
```
- Start application in development mode:
```bash
yarn start:dev
```

Then, you will be able to access the local server at http://localhost:3000.

## Sample Requests

- Create database register:
```bash
curl POST http://localhost:3000/cards
```

- List all registers:
```bash
curl http://localhost:3000/cards
```

## Unit Tests
Use the script `test` to run all unit tests: 
```bash
yarn test
```

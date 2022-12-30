# Node MariaDB Sample API
Example API using MariaDB as datasource

# Setup

- Install dependencies:
```
yarn install
```

- Start the MariaDB service (docker-compose required):
```
docker compose up
```
> You will need to create the table `cards_entity` on the database manualy, with the field "ID" (it must be of type VARCHAR).

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

- Run the application
```
yarn start:dev
```

Then, you will be able to access the local server at http://localhost:3000.

## Sample Requests

- Create database register:
```
curl POST http://localhost:3000/cards
```

- List all registers:
```
curl http://localhost:3000/cards
```

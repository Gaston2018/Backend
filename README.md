# Task Manager API

Simple TODO application with a Node.js/Express REST API and a plain HTML + JS frontend.

## Requirements

- [Docker](https://docs.docker.com/get-docker/) (to run with Docker)
- [Node.js 20+](https://nodejs.org/) (to run locally)

---

## Running with Docker (recommended)

```bash
# 1. Build the image
docker build -t task-manager-api .

# 2. Run the container
docker run -p 3000:3000 task-manager-api
```

Open your browser at **http://localhost:3000**

---

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start
```

Open your browser at **http://localhost:3000**

---

## Running tests

```bash
npm test
```

Coverage report is generated in the `coverage/` directory.

---

## API Reference

| Method | Endpoint       | Description          | Body                                      |
|--------|----------------|----------------------|-------------------------------------------|
| GET    | `/tasks`       | List all tasks       | -                                         |
| POST   | `/tasks`       | Create a task        | `{ "title": "...", "description": "..." }` |
| PUT    | `/tasks/:id`   | Update a task        | `{ "title": "...", "completed": true }`   |
| DELETE | `/tasks/:id`   | Delete a task        | -                                         |

### Example requests

```bash
# List tasks
curl http://localhost:3000/tasks

# Create a task
curl -X POST http://localhost:3000/tasks \
  -H 'Content-Type: application/json' \
  -d '{"title": "Buy groceries", "description": "Milk and eggs"}'

# Mark as completed
curl -X PUT http://localhost:3000/tasks/1 \
  -H 'Content-Type: application/json' \
  -d '{"completed": true}'

# Delete a task
curl -X DELETE http://localhost:3000/tasks/1
```

---

## Project Structure

```
.
├── public/
│   └── index.html        # Frontend (HTML + JS)
├── src/
│   ├── app.js            # Express app setup
│   ├── server.js         # HTTP server entry point
│   ├── controllers/
│   │   └── taskController.js
│   ├── routes/
│   │   └── tasks.js
│   └── store/
│       └── taskStore.js  # In-memory data store
├── tests/
│   └── tasks.test.js     # Jest + Supertest tests
├── .gitlab-ci.yml        # CI pipeline
├── Dockerfile
├── sonar-project.properties
└── package.json
```

---

## CI/CD Pipeline

The GitLab CI pipeline runs three stages:

1. **install** - Installs npm dependencies and caches `node_modules`
2. **test** - Runs Jest tests and generates a coverage report
3. **analyze** - Runs SonarQube analysis (requires `SONAR_HOST_URL` and `SONAR_TOKEN` CI/CD variables)

> **Note:** The SonarQube stage is skipped automatically if the variables are not configured.

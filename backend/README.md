# Developer Dash API

This is the Node.js/Express.js backend for the Developer Dash project. It provides a RESTful API to manage Users, Projects, and Tasks.

## Tech Stack
- Node.js
- Express.js
- TypeScript
- Zod (for validation)
- In-memory data store

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```
   The server will start on `http://localhost:5000`.

## API Endpoints

### Standardized Response Format
- **Success**: `{ "success": true, "data": {} }`
- **Error**: `{ "success": false, "message": "Error description" }`

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get a user by ID
- `POST /api/users` - Create a new user
  - Body: `{ "name": "John Doe", "email": "john@example.com" }`
- `PUT /api/users/:id` - Update a user
  - Body: `{ "name": "John Doe Updated" }`
- `DELETE /api/users/:id` - Delete a user

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a project by ID
- `POST /api/projects` - Create a new project
  - Body: `{ "name": "Project Alpha", "description": "First project" }`
- `PUT /api/projects/:id` - Update a project
  - Body: `{ "name": "Project Alpha V2" }`
- `DELETE /api/projects/:id` - Delete a project

### Tasks
- `GET /api/tasks` - Get all tasks
- `GET /api/tasks/:id` - Get a task by ID
- `POST /api/tasks` - Create a new task
  - Body: `{ "title": "Setup database", "status": "todo" }`
- `PUT /api/tasks/:id` - Update a task
  - Body: `{ "title": "Setup database schemas" }`
- `PATCH /api/tasks/:id/status` - Update task status
  - Body: `{ "status": "in-progress" }` (valid values: 'todo', 'in-progress', 'done')
- `DELETE /api/tasks/:id` - Delete a task

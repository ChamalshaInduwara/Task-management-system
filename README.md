# Task Management System

A full-stack task management application with a Next.js frontend and an Express/MongoDB backend.

## Prerequisites

- Node.js 20.9 or later
- npm
- MongoDB running locally, or a MongoDB Atlas connection string

## Project Structure

- `backend/` - Express API and Mongoose data layer
- `frontend/` - Next.js user interface

## Setup

1. Clone the repository and open a terminal in the project directory.
2. Install backend dependencies:

   ```bash
   cd backend
   npm install
   ```

3. Create `backend/.env` with your MongoDB connection details:

   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/task-management
   PORT=5000
   ```

   For MongoDB Atlas, replace `MONGO_URI` with your Atlas connection string.

4. Install frontend dependencies:

   ```bash
   cd ../frontend
   npm install
   ```

5. Create `frontend/.env.local`:

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

## Run Locally

Start the backend and frontend in separate terminals.

### Backend

```bash
cd backend
npm run dev
```

The API runs at [http://localhost:5000](http://localhost:5000). The root endpoint should return `Task Management API is running`.

### Frontend

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Backend

- `npm run dev` - Start the API with Nodemon for automatic restarts
- `npm start` - Start the API with Node.js

### Frontend

- `npm run dev` - Start the Next.js development server
- `npm run build` - Create a production build
- `npm start` - Start the production server after building
- `npm run lint` - Run ESLint

## API Routes

The task API is available under `/api/tasks`:

- `GET /api/tasks` - List tasks
- `GET /api/tasks/:id` - Get one task
- `POST /api/tasks` - Create a task
- `PUT /api/tasks/:id` - Update a task
- `DELETE /api/tasks/:id` - Delete a task

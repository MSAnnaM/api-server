# Task Pro Backend - README

## Introduction

Welcome to the backend service of Task Pro, a task management application designed to help users organize and prioritize their tasks efficiently. This README will guide you through setting up, running, and maintaining the backend service.

## Features

- **User Management**: Registration, authentication, and profile management.
- **Board Management**: Create, update, and delete boards.
- **Column Management**: Add, update, and delete columns within boards.
- **Card Management**: Add, update, delete, and move task cards within columns.
- **Priority and Deadline Handling**: Assign priorities and deadlines to tasks.
- **Theme Management**: Handle user preferences for different themes (Light, Violet, Dark).
- **API Documentation**: Swagger documentation for all API endpoints.

## Technologies Used

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **Swagger**
- **dotenv**
- **morgan**
- **cors**

## Prerequisites and running the Application

- **Node.js**: Ensure you have Node.js installed.
- **MongoDB**: Ensure you have MongoDB installed and running.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/msannam/api-server.git
   cd api-server
   ```
2. **Install dependencies:**

```bash
npm install
```

3. **Start the server:**

```bash
npm run start
```

## API Documentation

Access the API documentation at [https://api-server-c4rg.onrender.com/api-docs](https://api-server-c4rg.onrender.com/api-docs) for detailed information on each endpoint.

## API Endpoints

### User Management:

- `POST /api/users/register`: Register a new user.
- `POST /api/users/login`: Authenticate a user and get a token.
- `POST /api/users/logout`: Logout the authenticated user.
- `GET /api/users/current`: Get the logged-in user's profile.
- `PATCH /api/users/current/theme`: Update the logged-in user's theme.
- `PATCH /api/users/update`: Update the logged-in user's profile.
- `POST /api/users/help`: Send a help request via email.

### Board Management:

- `GET /api/boards`: Get all boards for the logged-in user.
- `POST /api/boards`: Create a new board.
- `PUT /api/boards/:boardId`: Update a board by ID.
- `DELETE /api/boards/:boardId`: Delete a board by ID.

### Column Management:

- `GET /api/columns/:boardId`: Get all columns for a specific board.
- `POST /api/columns`: Create a new column.
- `PUT /api/columns/:columnId`: Update a column by ID.
- `DELETE /api/columns/:columnId`: Delete a column by ID.

### Card Management:

- `GET /api/cards/:columnId`: Get all cards for a specific column.
- `POST /api/cards/:columnId`: Create a new card in a column.
- `PUT /api/cards/:cardId`: Update a card by ID.
- `PATCH /api/cards/:cardId`: Update the column ID of a card.
- `DELETE /api/cards/:cardId`: Delete a card by ID.

## Conclusion

The Task Pro backend service is designed to provide a robust and secure API for managing tasks.

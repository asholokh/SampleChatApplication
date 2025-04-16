# Realtime Chat Server Application

## Overview
This project is a simple realtime chat application server built using **TypeScript**, **Express.js**, and **Jest** for testing. 
It includes a REST API for managing chat messages and file-based storage for persisting data.

---

## Instructions

### Prerequisites
- **Node.js** (v20 or later)
- **npm** (v7 or later)

### **Install Dependencies**
Run the following command to install all required dependencies:
```bash
npm install
```

### Run the Application
   To start the application, use:
```bash
npm start
```
This will start the REST and WebSocket server, which serves the chat messages.

### Run Tests
To execute the test suite, run:
```bash
npm test
```

### Build the Application
To compile the TypeScript code into JavaScript, use:
```bash
npm run build
```
The compiled files will be located in the dist directory.

---

## Server configuration
### Environment Variables
- `WEBSOCKET_PORT` - The Websocket server is configured to run on port 4000 by default. You can change the port by modifying this environment variable in the `.env` file.

## Architectural Choices
### File-Based Storage
The application uses a JSON file (messages.json) to store chat messages. This approach is simple and suitable for this prototype.
For the production version, a more robust solution like a database would be used.
### WebSocket
WebSocket is used for realtime communication, allowing clients to send and receive messages instantly without polling the server.
### REST API
A RESTful API is implemented using Express.js to expose endpoints for retrieving chat messages.
This can be replaced with WebSocket exchange but will require additional complexity in the exchange protocol.
### TypeScript
TypeScript is used for type safety and better maintainability of the code comparing to pure JS.
### Testing with Jest
Unit tests are written using Jest to ensure the correctness of the file storage and REST API logic.

---

## Possible Improvements
### Code Refactoring:
More abstraction can be introduced for the messages storage and retrieval logic, so that the switch from FileStoreage to the DB storage would be simpler.
When codebase is growing, having the tests in the separate directory would be more convenient.
### Switch to Database Storage:  
Replace file-based storage with a database (e.g., MongoDB, PostgreSQL) for better scalability and performance.
### Error Handling:  
Improve error handling and logging for better debugging and user experience.
### Authentication:  
Add user authentication and authorization to secure the application.
### Dockerization:  
Create a Dockerfile to containerize the application for easier deployment.

# Realtime Chat Client Application

## Overview
This is a React-based chat application built with TypeScript. It uses WebSockets for real-time communication and follows a modular architecture for scalability and maintainability.

---

## Instructions
### Prerequisites
Node.js (v20 or higher)
Yarn (preferred) or npm
### Running the Application
 - Install dependencies:  `yarn install`
 - Start the development server: `yarn start`
### Building the Application
 - Build the production-ready application: `yarn build` 
 - The build artifacts will be available in the build directory. 

---

## Configuration
The application uses a centralized configuration file (`src/config.ts`) to manage constants such as API URLs, WebSocket URLs, and idle timeout values. 
This ensures that configuration values are easy to manage and modify. Example configuration:
```typescript
export const CONFIG = {
API_URL: "http://localhost:4000",
WEBSOCKET_URL: "ws://localhost:4000",
IDLE_TIMEOUT: 30000, // 30 seconds
};
```

## Architectural Choices
### Component-Based Design: 
The application is built using React functional components, making it modular and reusable.
### Context API: 
The ChatContext is used for state management, providing a lightweight alternative to Redux for managing global state.
### Custom Hooks: 
Hooks like `useWebSocket` encapsulate reusable logic, improving code readability and maintainability.
### TypeScript: 
Strong typing ensures better code quality and reduces runtime errors.
### WebSocket Integration: 
Real-time communication is implemented using WebSockets for instant message delivery.

---

## Possible Improvements
### Better WebSocket socket connections management
Implement a more robust WebSocket connection management system to handle reconnections and error states.
### Error Handling: 
Add more robust error handling for WebSocket connections and API calls.
### Unit Tests: 
Increase test coverage, especially for custom hooks and context logic.
## Dynamic Configuration: 
Fetch configuration values from a server or environment variables at runtime for more flexibility.
### Offline Support: 
Implement offline message queuing to handle network disruptions.

## Tradeoffs
### Context API vs Redux: 
The Context API is simpler but may not scale well for very large applications.
### WebSocket Idle Timeout: 
Automatically reloading the page on inactivity is simple but may disrupt the user experience.
### Static Configuration: 
Using a static configuration file is straightforward but limits runtime flexibility.
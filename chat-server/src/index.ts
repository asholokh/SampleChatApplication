import { startServer } from './WebSocketServer';

startServer().catch(err => {
    console.log("Server failed to start:", err);
})
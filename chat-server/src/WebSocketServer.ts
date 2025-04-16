import http from 'http';
import { WebSocketServer } from 'ws';
import { ChatMessage } from './types';
import { loadMessages, saveMessages } from './FileStorage';
import { createRestServer } from './RestServer';

const webSocketServer = http.createServer();
const wss = new WebSocketServer({ server: webSocketServer });

let messages: ChatMessage[] = [];

const PORT = process.env.WEBSOCKET_PORT || 4000;

wss.on('connection', (ws) => {
    console.log('Client connected');

    ws.on('message', async (data) => {
        console.log("Received message:", data.toString());
        try {
            const msg: ChatMessage = JSON.parse(data.toString());
            messages.push(msg);
            await saveMessages(messages);

            // Broadcast to all clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                    client.send(JSON.stringify(msg));
                }
            });
        } catch (err) {
            console.error('Error receiving message', err);
        }
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });
});

export async function startServer() {
    messages = await loadMessages();

    const restServer = createRestServer(messages);
    webSocketServer.on('request', restServer);

    webSocketServer.listen(PORT, () => {
        console.log('Chat server running on port 4000');
    });
}
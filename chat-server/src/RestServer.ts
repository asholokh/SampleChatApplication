import express from 'express';
import cors from 'cors';
import { ChatMessage } from './types';

export function createRestServer(messages: ChatMessage[]) {
    const app = express();
    app.use(cors());

    app.get('/messages', (req, res) => {
        res.json(messages);
    });

    return app;
}
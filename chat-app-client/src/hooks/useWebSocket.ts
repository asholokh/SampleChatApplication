import {useEffect, useRef, useState} from 'react';
import { useChat } from "../context/ChatContext";
import { ChatMessage } from "../types/types.ts";
import { Configuration } from "@/Config.ts";

export const useWebSocket = (url: string): WebSocket | null => {
    const { addMessage, username, initializeMessages } = useChat();
    const socketRef = useRef<WebSocket | null>(null);
    const [, setIsConnected] = useState(false);
    const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetIdleTimeout = () => {
        if (idleTimeoutRef.current) {
            clearTimeout(idleTimeoutRef.current);
        }
        idleTimeoutRef.current = setTimeout(() => {
            if (socketRef.current) {
                console.log('WebSocket closed due to inactivity');
                socketRef.current.close();
                window.location.reload();
            }
        }, Configuration.IDLE_TIMEOUT); // 30 seconds (30000 ms)
    };

    useEffect(() => {
        if (!username) return;

        const socket = new WebSocket(url);
        socketRef.current = socket;

        socket.onopen = async () => {
            console.log('WebSocket connection opened');
            setIsConnected(true);
            resetIdleTimeout();
        };

        socket.onmessage = (event: MessageEvent) => {
            const data: ChatMessage = JSON.parse(event.data);
            addMessage(data);
            resetIdleTimeout();
        };

        socket.onerror = (error: Event) => {
            console.error('WebSocket error:', error);
        };

        socket.onclose = () => {
            console.log('WebSocket connection closed');
            setIsConnected(false);
        };

        return () => {
            // Do nothing
        };
    }, [url, addMessage, username, initializeMessages]);

    return socketRef.current;
};
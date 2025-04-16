import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import {useChat} from '../context/ChatContext';

const MessageInput: React.FC<{ socket: WebSocket | null }> = ({socket}) => {
    const [content, setContent] = useState('');
    const {username} = useChat();

    const handleSend = () => {
        if (socket && content.trim()) {
            const message = {
                id: uuidv4(),
                username,
                content,
                timestamp: Date.now(),
            };
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(message));
            } else {
                console.warn("Socket is not ready yet");
            }
            setContent('');
        }
    };

    return (
        <div className="p-4 flex flex-col gap-2">
            <textarea
                className="border border-gray-300 rounded p-2 resize-none h-24"
                placeholder="Type your message here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button
                onClick={handleSend}
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;
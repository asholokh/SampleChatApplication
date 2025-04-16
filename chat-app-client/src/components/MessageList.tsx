import React from "react";
import { useChat } from "../context/ChatContext";

const MessageList: React.FC = () => {
    const { messages } = useChat();

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 border-b border-gray-200">
            {messages.map(msg => (
                <div key={msg.id} className="bg-gray-100 p-3 rounded">
                    <span className="font-semibold text-blue-600">{msg.username}</span>: {msg.content}
                </div>
            ))}
        </div>
    );
};

export default MessageList;
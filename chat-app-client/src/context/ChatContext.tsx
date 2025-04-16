import React, { createContext, useContext, useState} from "react";
import { ChatMessage } from "../types/types.ts";

interface ChatContextType {
    username: string;
    setUsername: (username: string) => void;
    messages: ChatMessage[];
    addMessage: (message: ChatMessage) => void;
    initializeMessages: (messages: ChatMessage[]) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [username, setUsername] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const addMessage = (newMessage: ChatMessage) => {
        setMessages((prevMessages) => {
            const exists = prevMessages.some((message) => message.id === newMessage.id);
            if (!exists) {
                return [...prevMessages, newMessage];
            }
            return prevMessages;
        });
    };

    const initializeMessages = (initialMessages: ChatMessage[]) => {
        setMessages(initialMessages);
    };

    return (
        <ChatContext.Provider value={{ username, setUsername, messages, addMessage, initializeMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error("useChat must be used within a ChatProvider");
    }
    return context;
};
import React from "react";
import MessageInput from "./MessageInput";
import MessageList from "./MessageList";
import { useWebSocket } from "../hooks/useWebSocket";
import {Configuration} from "@/Config.ts";

const Chat: React.FC = () => {
    const socket = useWebSocket(Configuration.WEBSOCKET_URL); //Update if needed

    return (
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-[600px]">
            <MessageList />
            <MessageInput socket={socket} />
        </div>
    );
};

export default Chat;

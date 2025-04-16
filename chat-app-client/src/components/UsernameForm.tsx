import React, {useState} from "react";
import {useChat} from "../context/ChatContext";
import {ChatMessage} from "@/types/types.ts";
import {Configuration} from "@/Config.ts";

const UsernameForm: React.FC = () => {
    const {setUsername, initializeMessages} = useChat();
    const [value, setValue] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            setUsername(value.trim());

            try {
                console.log("Fetching messages");
                const response = await fetch(Configuration.API_URL + '/messages'); // Replace with your server's endpoint
                if (response.ok) {
                    const messages: ChatMessage[] = await response.json();
                    initializeMessages(messages);
                } else {
                    console.error('Failed to fetch messages:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <input
                type="text"
                className="border border-gray-300 rounded px-4 py-2"
                placeholder="Enter your user name"
                value={value}
                onChange={e => setValue(e.target.value)}/>
            <button
                type="submit"
                className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
                Join chat
            </button>
        </form>
    );
};

export default UsernameForm;
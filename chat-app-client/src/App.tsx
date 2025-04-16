import React from "react";
import { useChat, ChatProvider } from './context/ChatContext';
import UsernameForm from "./components/UsernameForm";
import Chat from "./components/Chat.tsx";

const AppContent: React.FC = () => {
    const { username } = useChat();
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2x1">
                {username ? <Chat /> : <UsernameForm />}
            </div>
        </div>
    );
};

const App: React.FC = () => (
    <ChatProvider>
        <AppContent />
    </ChatProvider>
);
export default App;

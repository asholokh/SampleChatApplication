import { ChatMessage } from "./types";
import fs from "fs/promises";
import path from "path";

const filePath = path.join(__dirname, '../messages.json');

export async function loadMessages(): Promise<ChatMessage[]> {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error("Failed to load messages, returning empty array. ", error);
        return [];
    }
}

export async function saveMessages(messages: ChatMessage[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(messages, null, 2));
}
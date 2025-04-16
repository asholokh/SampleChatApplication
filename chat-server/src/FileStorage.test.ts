import { loadMessages, saveMessages } from './FileStorage';
import fs from 'fs/promises';
import path from 'path';
import { ChatMessage } from './types';

jest.mock('fs/promises');

const filePath = path.join(__dirname, '../messages.json');

describe('FileStorage', () => {
    const mockMessages: ChatMessage[] = [
        { id: '1', username: 'user1', content: 'Hello', timestamp: 1234567890 },
        { id: '2', username: 'user2', content: 'Hi', timestamp: 1234567891 },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('loadMessages', () => {
        it('should load messages from the file', async () => {
            (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockMessages));

            const messages = await loadMessages();

            expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
            expect(messages).toEqual(mockMessages);
        });

        it('should return an empty array if the file does not exist', async () => {
            (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

            const messages = await loadMessages();

            expect(fs.readFile).toHaveBeenCalledWith(filePath, 'utf-8');
            expect(messages).toEqual([]);
        });
    });

    describe('saveMessages', () => {
        it('should save messages to the file', async () => {
            (fs.writeFile as jest.Mock).mockResolvedValue(undefined);

            await saveMessages(mockMessages);

            expect(fs.writeFile).toHaveBeenCalledWith(filePath, JSON.stringify(mockMessages, null, 2));
        });

        it('should throw an error if saving fails', async () => {
            (fs.writeFile as jest.Mock).mockRejectedValue(new Error('Write error'));

            await expect(saveMessages(mockMessages)).rejects.toThrow('Write error');
        });
    });
});
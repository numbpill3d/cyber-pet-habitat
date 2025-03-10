import React, { useState } from 'react';
import { getResponse } from '../utils/ai';

const ChatInterface = ({ petName }) => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput.trim()) {
            const newChatEntry = { sender: 'player', message: userInput };
            setChatHistory([...chatHistory, newChatEntry]);
            generatePetResponse(userInput);
            setUserInput('');
        }
    };

    const generatePetResponse = async (input) => {
        const petResponse = await getResponse(input);
        const newChatEntry = { sender: 'pet', message: petResponse };
        setChatHistory((prev) => [...prev, newChatEntry]);
    };

    return (
        <div className="chat-interface">
            <div className="chat-history">
                {chatHistory.map((entry, index) => (
                    <div key={index} className={entry.sender}>
                        <strong>{entry.sender === 'player' ? 'You' : petName}:</strong> {entry.message}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="chat-input">
                <input
                    type="text"
                    value={userInput}
                    onChange={handleInputChange}
                    placeholder={`Talk to ${petName}...`}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default ChatInterface;
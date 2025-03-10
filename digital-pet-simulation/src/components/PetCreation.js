import React, { useState } from 'react';
import { calculatePetType } from '../utils/quiz';

const PetCreation = () => {
    const [answers, setAnswers] = useState([]);
    const [petType, setPetType] = useState(null);

    const questions = [
        {
            question: "What's your favorite environment?",
            options: ["Forest", "Desert", "Ocean", "Mountain"]
        },
        {
            question: "What do you prefer to do in your free time?",
            options: ["Reading", "Playing sports", "Exploring", "Crafting"]
        },
        {
            question: "Choose a color:",
            options: ["Red", "Blue", "Green", "Yellow"]
        },
        {
            question: "What's your ideal pet size?",
            options: ["Small", "Medium", "Large", "Giant"]
        }
    ];

    const handleAnswer = (questionIndex, answerIndex) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = answerIndex;
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const type = calculatePetType(answers);
        setPetType(type);
    };

    return (
        <div className="pet-creation">
            <h1>Create Your Pet</h1>
            {petType === null ? (
                <div>
                    {questions.map((q, index) => (
                        <div key={index}>
                            <h2>{q.question}</h2>
                            {q.options.map((option, i) => (
                                <button key={i} onClick={() => handleAnswer(index, i)}>
                                    {option}
                                </button>
                            ))}
                        </div>
                    ))}
                    <button onClick={handleSubmit}>Submit</button>
                </div>
            ) : (
                <div>
                    <h2>Your pet type is: {petType}</h2>
                    <p>Congratulations on creating your pet!</p>
                </div>
            )}
        </div>
    );
};

export default PetCreation;
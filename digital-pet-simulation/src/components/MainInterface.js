import React, { useState, useEffect } from 'react';
import ChatInterface from './ChatInterface';
import StatsPanel from './StatsPanel';
import EnvironmentCustomization from './EnvironmentCustomization';
import IsometricView from './IsometricView';

const MainInterface = () => {
    const [pet, setPet] = useState({
        name: 'Fluffy',
        type: 'Cat',
        stats: {
            hunger: 100,
            happiness: 100,
            energy: 100,
            intelligence: 50,
            growthLevel: 1,
        },
        mood: 'happy',
        environment: {},
    });

    const [showChat, setShowChat] = useState(true);
    const [showStats, setShowStats] = useState(true);
    const [showEnvironment, setShowEnvironment] = useState(true);

    useEffect(() => {
        // Load pet data from local storage or initialize a new pet
        const savedPet = JSON.parse(localStorage.getItem('petData'));
        if (savedPet) {
            setPet(savedPet);
        }
    }, []);

    const handlePetInteraction = (action) => {
        // Handle interactions like feeding, playing, or resting
        switch (action) {
            case 'feed':
                setPet((prevPet) => ({
                    ...prevPet,
                    stats: { ...prevPet.stats, hunger: Math.min(prevPet.stats.hunger + 20, 100) },
                }));
                break;
            case 'play':
                setPet((prevPet) => ({
                    ...prevPet,
                    stats: { ...prevPet.stats, happiness: Math.min(prevPet.stats.happiness + 20, 100) },
                }));
                break;
            case 'rest':
                setPet((prevPet) => ({
                    ...prevPet,
                    stats: { ...prevPet.stats, energy: Math.min(prevPet.stats.energy + 20, 100) },
                }));
                break;
            default:
                break;
        }
    };

    return (
        <div className="main-interface">
            <div className="pet-display">
                <img src={`assets/gifs/${pet.type.toLowerCase()}.gif`} alt={pet.name} />
            </div>
            {showChat && <ChatInterface pet={pet} />}
            {showStats && <StatsPanel stats={pet.stats} />}
            {showEnvironment && <EnvironmentCustomization environment={pet.environment} />}
            <button onClick={() => handlePetInteraction('feed')}>Feed</button>
            <button onClick={() => handlePetInteraction('play')}>Play</button>
            <button onClick={() => handlePetInteraction('rest')}>Rest</button>
            <IsometricView environment={pet.environment} />
        </div>
    );
};

export default MainInterface;
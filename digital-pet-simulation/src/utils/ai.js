const generateResponse = (input) => {
    // Placeholder for AI response generation logic
    const responses = {
        happy: [
            "I'm feeling great! Let's play!",
            "Yay! I'm so happy to see you!",
            "What fun things shall we do today?",
        ],
        sad: [
            "I'm feeling a bit down... Can you cheer me up?",
            "I miss you when you're not here.",
            "Let's do something fun together!",
        ],
        hungry: [
            "I'm really hungry! Can you feed me?",
            "I could use a snack right now.",
            "Food would make me feel better!",
        ],
        tired: [
            "I'm feeling sleepy... Can we take a nap?",
            "I need some rest to regain my energy.",
            "Let's relax for a bit.",
        ],
    };

    // Simple logic to determine response based on input
    if (input.includes("happy")) {
        return responses.happy[Math.floor(Math.random() * responses.happy.length)];
    } else if (input.includes("sad")) {
        return responses.sad[Math.floor(Math.random() * responses.sad.length)];
    } else if (input.includes("hungry")) {
        return responses.hungry[Math.floor(Math.random() * responses.hungry.length)];
    } else if (input.includes("tired")) {
        return responses.tired[Math.floor(Math.random() * responses.tired.length)];
    } else {
        return "I'm not sure how to respond to that.";
    }
};

const saveInteraction = (interaction) => {
    // Save interaction to local storage for memory management
    let interactions = JSON.parse(localStorage.getItem('petInteractions')) || [];
    interactions.push(interaction);
    localStorage.setItem('petInteractions', JSON.stringify(interactions));
};

const getPastInteractions = () => {
    // Retrieve past interactions from local storage
    return JSON.parse(localStorage.getItem('petInteractions')) || [];
};

export { generateResponse, saveInteraction, getPastInteractions };
const petTypes = [
    { name: "Fluffy", traits: { playfulness: 5, intelligence: 3, energy: 4 } },
    { name: "Scaly", traits: { playfulness: 3, intelligence: 5, energy: 2 } },
    { name: "Furry", traits: { playfulness: 4, intelligence: 4, energy: 3 } },
    { name: "Feathery", traits: { playfulness: 2, intelligence: 4, energy: 5 } },
    { name: "Slimy", traits: { playfulness: 4, intelligence: 2, energy: 5 } },
];

const quizQuestions = [
    {
        question: "What do you enjoy doing in your free time?",
        options: [
            { answer: "Playing games", type: 0 }, // Fluffy
            { answer: "Reading books", type: 1 }, // Scaly
            { answer: "Going for walks", type: 2 }, // Furry
            { answer: "Watching birds", type: 3 }, // Feathery
            { answer: "Exploring nature", type: 4 }, // Slimy
        ],
    },
    {
        question: "What is your favorite color?",
        options: [
            { answer: "Bright and cheerful", type: 0 },
            { answer: "Calm and cool", type: 1 },
            { answer: "Earthy tones", type: 2 },
            { answer: "Vibrant and lively", type: 3 },
            { answer: "Mysterious shades", type: 4 },
        ],
    },
    {
        question: "How do you prefer to spend time with friends?",
        options: [
            { answer: "Playing together", type: 0 },
            { answer: "Having deep conversations", type: 1 },
            { answer: "Going on adventures", type: 2 },
            { answer: "Enjoying quiet moments", type: 3 },
            { answer: "Trying new things", type: 4 },
        ],
    },
    {
        question: "What kind of pet do you prefer?",
        options: [
            { answer: "A playful companion", type: 0 },
            { answer: "A wise friend", type: 1 },
            { answer: "An active buddy", type: 2 },
            { answer: "A graceful partner", type: 3 },
            { answer: "A curious explorer", type: 4 },
        ],
    },
];

function calculatePetType(answers) {
    const scores = Array(petTypes.length).fill(0);

    answers.forEach(answer => {
        scores[answer.type]++;
    });

    const maxScoreIndex = scores.indexOf(Math.max(...scores));
    return petTypes[maxScoreIndex];
}

export { quizQuestions, calculatePetType };
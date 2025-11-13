// Pet types and their characteristics
const petTypes = [
    { name: "Fluffy", type: "cat", emoji: "🐱", traits: { playfulness: 5, intelligence: 3, energy: 4 } },
    { name: "Scaly", type: "lizard", emoji: "🦎", traits: { playfulness: 3, intelligence: 5, energy: 2 } },
    { name: "Furry", type: "dog", emoji: "🐶", traits: { playfulness: 4, intelligence: 4, energy: 3 } },
    { name: "Feathery", type: "bird", emoji: "🐦", traits: { playfulness: 2, intelligence: 4, energy: 5 } },
    { name: "Slimy", type: "frog", emoji: "🐸", traits: { playfulness: 4, intelligence: 2, energy: 5 } },
];

// Quiz questions
const quizQuestions = [
    {
        question: "What do you enjoy doing in your free time?",
        options: [
            { answer: "Playing games", type: 0 },
            { answer: "Reading books", type: 1 },
            { answer: "Going for walks", type: 2 },
            { answer: "Watching birds", type: 3 },
            { answer: "Exploring nature", type: 4 }
        ]
    },
    {
        question: "What is your favorite color?",
        options: [
            { answer: "Bright and cheerful", type: 0 },
            { answer: "Calm and cool", type: 1 },
            { answer: "Earthy tones", type: 2 },
            { answer: "Vibrant and lively", type: 3 },
            { answer: "Mysterious shades", type: 4 }
        ]
    },
    {
        question: "How do you prefer to spend time with friends?",
        options: [
            { answer: "Playing together", type: 0 },
            { answer: "Having deep conversations", type: 1 },
            { answer: "Going on adventures", type: 2 },
            { answer: "Enjoying quiet moments", type: 3 },
            { answer: "Trying new things", type: 4 }
        ]
    },
    {
        question: "What kind of pet do you prefer?",
        options: [
            { answer: "A playful companion", type: 0 },
            { answer: "A wise friend", type: 1 },
            { answer: "An active buddy", type: 2 },
            { answer: "A graceful partner", type: 3 },
            { answer: "A curious explorer", type: 4 }
        ]
    }
];

// Game state
let currentPet = null;
let quizAnswers = [];
let statsInterval = null;
let lastUpdateTime = Date.now();

// Initialize game
function init() {
    loadGameData();
    setupEventListeners();
}

function setupEventListeners() {
    document.getElementById('enter-button').addEventListener('click', startQuiz);
    document.getElementById('view-button').addEventListener('click', showView);
    document.getElementById('data-button').addEventListener('click', showData);
    document.getElementById('submit-quiz').addEventListener('click', submitQuiz);
    document.getElementById('send-chat').addEventListener('click', sendChat);
    document.getElementById('chat-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChat();
    });
}

function startQuiz() {
    if (currentPet) {
        // If pet exists, go directly to game
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('game-screen').style.display = 'flex';
        updateDisplay();
        startStatsDecay();
    } else {
        // Start new game with quiz
        document.getElementById('start-screen').style.display = 'none';
        document.getElementById('quiz-screen').style.display = 'flex';
        renderQuiz();
    }
}

function renderQuiz() {
    const quizContainer = document.getElementById('quiz-questions');
    quizContainer.innerHTML = '';

    quizQuestions.forEach((q, qIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerHTML = `<h3>${q.question}</h3>`;

        q.options.forEach((option, oIndex) => {
            const button = document.createElement('button');
            button.textContent = option.answer;
            button.onclick = () => selectAnswer(qIndex, option.type, button);
            button.dataset.questionIndex = qIndex;
            questionDiv.appendChild(button);
        });

        quizContainer.appendChild(questionDiv);
    });
}

function selectAnswer(questionIndex, type, button) {
    // Remove previous selection for this question
    const buttons = document.querySelectorAll(`button[data-question-index="${questionIndex}"]`);
    buttons.forEach(btn => btn.classList.remove('selected'));

    // Mark this button as selected
    button.classList.add('selected');

    // Store answer
    quizAnswers[questionIndex] = type;
}

function submitQuiz() {
    if (quizAnswers.length < quizQuestions.length) {
        alert('Please answer all questions!');
        return;
    }

    // Calculate pet type
    const scores = Array(petTypes.length).fill(0);
    quizAnswers.forEach(answer => scores[answer]++);
    const maxScoreIndex = scores.indexOf(Math.max(...scores));

    // Create pet
    currentPet = {
        ...petTypes[maxScoreIndex],
        stats: {
            hunger: 100,
            happiness: 100,
            energy: 100,
            intelligence: 50,
            cleanliness: 100,
            growthLevel: 1,
            age: 0
        },
        mood: 'happy',
        environment: {
            background: 'grass',
            items: []
        },
        createdAt: Date.now(),
        lastUpdate: Date.now()
    };

    saveGameData();

    // Show game screen
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    updateDisplay();
    startStatsDecay();
}

function updateDisplay() {
    if (!currentPet) return;

    // Update pet display
    document.getElementById('pet-image').textContent = currentPet.emoji;
    document.getElementById('pet-image').style.fontSize = '120px';
    document.getElementById('pet-image').alt = currentPet.name;

    // Update stats
    updateStats();

    // Update mood based on stats
    updateMood();
}

function updateStats() {
    if (!currentPet) return;

    document.getElementById('hunger-stat').textContent = Math.round(currentPet.stats.hunger);
    document.getElementById('happiness-stat').textContent = Math.round(currentPet.stats.happiness);
    document.getElementById('energy-stat').textContent = Math.round(currentPet.stats.energy);
    document.getElementById('intelligence-stat').textContent = Math.round(currentPet.stats.intelligence);
    document.getElementById('growth-level').textContent = currentPet.stats.growthLevel;

    // Color code stats
    const stats = ['hunger', 'happiness', 'energy'];
    stats.forEach(stat => {
        const element = document.getElementById(`${stat}-stat`);
        const value = currentPet.stats[stat];
        if (value < 30) {
            element.style.color = 'red';
        } else if (value < 60) {
            element.style.color = 'orange';
        } else {
            element.style.color = 'green';
        }
    });
}

function updateMood() {
    if (!currentPet) return;

    const avg = (currentPet.stats.hunger + currentPet.stats.happiness + currentPet.stats.energy) / 3;

    if (avg > 70) {
        currentPet.mood = 'happy';
    } else if (avg > 40) {
        currentPet.mood = 'okay';
    } else {
        currentPet.mood = 'sad';
    }
}

function startStatsDecay() {
    if (statsInterval) clearInterval(statsInterval);

    statsInterval = setInterval(() => {
        if (!currentPet) return;

        const now = Date.now();
        const timeDiff = (now - currentPet.lastUpdate) / 1000; // seconds
        currentPet.lastUpdate = now;

        // Decay rates per second
        currentPet.stats.hunger = Math.max(0, currentPet.stats.hunger - (0.5 * timeDiff));
        currentPet.stats.happiness = Math.max(0, currentPet.stats.happiness - (0.3 * timeDiff));
        currentPet.stats.energy = Math.max(0, currentPet.stats.energy - (0.2 * timeDiff));
        currentPet.stats.cleanliness = Math.max(0, currentPet.stats.cleanliness - (0.1 * timeDiff));

        // Age increases
        currentPet.stats.age += timeDiff;

        // Growth level based on age
        currentPet.stats.growthLevel = Math.min(10, Math.floor(currentPet.stats.age / 300) + 1);

        updateDisplay();
        saveGameData();

        // Check for critical stats
        if (currentPet.stats.hunger < 20 || currentPet.stats.happiness < 20) {
            showNotification('Your pet needs attention!');
        }
    }, 1000);
}

function handlePetInteraction(action) {
    if (!currentPet) return;

    switch (action) {
        case 'feed':
            currentPet.stats.hunger = Math.min(100, currentPet.stats.hunger + 25);
            showNotification(`${currentPet.name} enjoyed the food! 🍎`);
            break;
        case 'play':
            currentPet.stats.happiness = Math.min(100, currentPet.stats.happiness + 25);
            currentPet.stats.energy = Math.max(0, currentPet.stats.energy - 10);
            showNotification(`${currentPet.name} had fun playing! 🎾`);
            break;
        case 'sleep':
            currentPet.stats.energy = Math.min(100, currentPet.stats.energy + 30);
            currentPet.stats.happiness = Math.max(0, currentPet.stats.happiness - 5);
            showNotification(`${currentPet.name} feels refreshed! 😴`);
            break;
        case 'clean':
            currentPet.stats.cleanliness = 100;
            currentPet.stats.happiness = Math.min(100, currentPet.stats.happiness + 10);
            showNotification(`${currentPet.name} is squeaky clean! 🧼`);
            break;
        case 'train':
            currentPet.stats.intelligence = Math.min(100, currentPet.stats.intelligence + 5);
            currentPet.stats.energy = Math.max(0, currentPet.stats.energy - 15);
            showNotification(`${currentPet.name} learned something new! 📚`);
            break;
    }

    updateDisplay();
    saveGameData();
}

function sendChat() {
    const input = document.getElementById('chat-input').value.trim();
    if (!input) return;

    const chatLog = document.getElementById('chat-log');

    // Add user message
    const userMsg = document.createElement('p');
    userMsg.innerHTML = `<strong>You:</strong> ${input}`;
    userMsg.className = 'user-message';
    chatLog.appendChild(userMsg);

    // Generate pet response
    setTimeout(() => {
        const response = generatePetResponse(input);
        const petMsg = document.createElement('p');
        petMsg.innerHTML = `<strong>${currentPet.emoji} ${currentPet.name}:</strong> ${response}`;
        petMsg.className = 'pet-message';
        chatLog.appendChild(petMsg);
        chatLog.scrollTop = chatLog.scrollHeight;
    }, 500);

    document.getElementById('chat-input').value = '';
    chatLog.scrollTop = chatLog.scrollHeight;
}

function generatePetResponse(input) {
    if (!currentPet) return "...";

    const lowerInput = input.toLowerCase();

    // Check stats and respond accordingly
    if (currentPet.stats.hunger < 30) {
        return "I'm really hungry! Could you feed me? 🍽️";
    }
    if (currentPet.stats.energy < 30) {
        return "I'm so tired... I need to rest. 😴";
    }
    if (currentPet.stats.happiness < 30) {
        return "I'm feeling sad... Can we play together? 🥺";
    }

    // Respond to greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        const greetings = [
            "Hello! I'm happy to see you! 😊",
            "Hi there! Want to play?",
            "Hey! How are you today?"
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    // Respond to questions about feelings
    if (lowerInput.includes('how are you') || lowerInput.includes('how do you feel')) {
        if (currentPet.mood === 'happy') {
            return "I'm feeling great! Life is wonderful! 🌟";
        } else if (currentPet.mood === 'okay') {
            return "I'm doing okay, could be better though.";
        } else {
            return "I'm not feeling so good right now... 😢";
        }
    }

    // Respond to play requests
    if (lowerInput.includes('play')) {
        return "Yes! I love playing! Click the Play button! 🎮";
    }

    // Respond to food mentions
    if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('hungry')) {
        return "Food sounds great! I love eating! 🍎";
    }

    // Respond to love/affection
    if (lowerInput.includes('love') || lowerInput.includes('cute')) {
        return "Aww, I love you too! You're the best! ❤️";
    }

    // Default responses based on mood
    const happyResponses = [
        "That's interesting! Tell me more!",
        "I'm listening! 👂",
        "Sounds fun! What else?",
        "I enjoy spending time with you! 😊"
    ];

    const neutralResponses = [
        "Hmm, I see...",
        "Okay, got it!",
        "Interesting...",
        "I understand."
    ];

    const sadResponses = [
        "Sorry, I'm not feeling great right now...",
        "Can you take care of me first?",
        "I need some attention... 🥺"
    ];

    if (currentPet.mood === 'happy') {
        return happyResponses[Math.floor(Math.random() * happyResponses.length)];
    } else if (currentPet.mood === 'okay') {
        return neutralResponses[Math.floor(Math.random() * neutralResponses.length)];
    } else {
        return sadResponses[Math.floor(Math.random() * sadResponses.length)];
    }
}

function showNotification(message) {
    const chatLog = document.getElementById('chat-log');
    const notification = document.createElement('p');
    notification.innerHTML = `<em>${message}</em>`;
    notification.className = 'notification';
    chatLog.appendChild(notification);
    chatLog.scrollTop = chatLog.scrollHeight;
}

function showView() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('3d-view-screen').style.display = 'flex';
    init3DView();
}

function init3DView() {
    const canvas = document.getElementById('3d-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;

    // Simple isometric view
    ctx.fillStyle = '#8bc34a';
    ctx.fillRect(0, 400, 800, 200);

    ctx.fillStyle = '#87ceeb';
    ctx.fillRect(0, 0, 800, 400);

    // Draw pet
    ctx.font = '80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(currentPet ? currentPet.emoji : '❓', 400, 350);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.textContent = 'Back to Start';
    backBtn.style.position = 'absolute';
    backBtn.style.top = '20px';
    backBtn.style.left = '20px';
    backBtn.onclick = () => {
        document.getElementById('3d-view-screen').style.display = 'none';
        document.getElementById('start-screen').style.display = 'flex';
    };
    document.getElementById('3d-view-screen').appendChild(backBtn);
}

function showData() {
    if (!currentPet) {
        alert('No pet data available. Please create a pet first!');
        return;
    }

    const ageMinutes = Math.floor(currentPet.stats.age / 60);
    const ageSeconds = Math.floor(currentPet.stats.age % 60);

    const data = `
Pet Data:
---------
Name: ${currentPet.name}
Type: ${currentPet.type}
Emoji: ${currentPet.emoji}
Age: ${ageMinutes}m ${ageSeconds}s
Growth Level: ${currentPet.stats.growthLevel}
Mood: ${currentPet.mood}

Stats:
- Hunger: ${Math.round(currentPet.stats.hunger)}
- Happiness: ${Math.round(currentPet.stats.happiness)}
- Energy: ${Math.round(currentPet.stats.energy)}
- Intelligence: ${Math.round(currentPet.stats.intelligence)}
- Cleanliness: ${Math.round(currentPet.stats.cleanliness)}

Traits:
- Playfulness: ${currentPet.traits.playfulness}
- Intelligence: ${currentPet.traits.intelligence}
- Energy: ${currentPet.traits.energy}

Created: ${new Date(currentPet.createdAt).toLocaleString()}
    `;

    alert(data);
}

function saveGameData() {
    if (currentPet) {
        localStorage.setItem('cyberPetData', JSON.stringify(currentPet));
    }
}

function loadGameData() {
    const saved = localStorage.getItem('cyberPetData');
    if (saved) {
        try {
            currentPet = JSON.parse(saved);
            currentPet.lastUpdate = Date.now();

            // Update start button text
            const enterBtn = document.getElementById('enter-button');
            enterBtn.textContent = `Continue with ${currentPet.name}`;

            // Add reset button
            const startScreen = document.getElementById('start-screen');
            let resetBtn = document.getElementById('reset-button');
            if (!resetBtn) {
                resetBtn = document.createElement('button');
                resetBtn.id = 'reset-button';
                resetBtn.textContent = 'Start New Pet';
                resetBtn.onclick = resetGame;
                startScreen.appendChild(resetBtn);
            }
        } catch (e) {
            console.error('Failed to load game data:', e);
        }
    }
}

function resetGame() {
    if (confirm('Are you sure you want to start a new pet? Your current pet will be lost.')) {
        localStorage.removeItem('cyberPetData');
        currentPet = null;
        quizAnswers = [];
        if (statsInterval) clearInterval(statsInterval);
        location.reload();
    }
}

function backToMenu() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('start-screen').style.display = 'flex';
    if (statsInterval) clearInterval(statsInterval);
}

// Initialize on page load
window.addEventListener('load', init);

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizContainer = document.getElementById('quiz-container');
    const gameContainer = document.getElementById('game-container');
    const enterButton = document.getElementById('enter-button');
    const viewButton = document.getElementById('view-button');
    const dataButton = document.getElementById('data-button');
    const submitQuizButton = document.getElementById('submit-quiz-button');
    const petStatus = document.getElementById('pet-status');
    const controls = document.getElementById('controls');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat-button');
    const chatLog = document.getElementById('chat-log');

    let pet = {
        name: 'Cyber Pet',
        hunger: 50,
        happiness: 50
    };

    function updatePetStatus() {
        petStatus.innerHTML = `
            <p>Name: ${pet.name}</p>
            <p>Hunger: ${pet.hunger}</p>
            <p>Happiness: ${pet.happiness}</p>
        `;
    }

    function feedPet() {
        pet.hunger = Math.max(0, pet.hunger - 10);
        updatePetStatus();
    }

    function playWithPet() {
        pet.happiness = Math.min(100, pet.happiness + 10);
        updatePetStatus();
    }

    function addChatMessage(message, sender) {
        const messageElement = document.createElement('p');
        messageElement.textContent = `${sender}: ${message}`;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight;
    }

    function handleChatInput() {
        const message = chatInput.value;
        if (message.trim() !== '') {
            addChatMessage(message, 'Player');
            chatInput.value = '';
            // Simulate pet response
            setTimeout(() => {
                addChatMessage('Hello!', 'Cyber Pet');
            }, 1000);
        }
    }

    controls.innerHTML = `
        <button onclick="feedPet()">Feed</button>
        <button onclick="playWithPet()">Play</button>
    `;

    enterButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        quizContainer.style.display = 'block';
    });

    submitQuizButton.addEventListener('click', () => {
        quizContainer.style.display = 'none';
        gameContainer.style.display = 'block';
        updatePetStatus();
    });

    viewButton.addEventListener('click', () => {
        alert('Isometric 3D view coming soon!');
    });

    dataButton.addEventListener('click', () => {
        alert('Pet stats and logs coming soon!');
    });

    sendChatButton.addEventListener('click', handleChatInput);
    chatInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleChatInput();
        }
    });

    updatePetStatus();
});

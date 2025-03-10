document.getElementById('enter-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'flex';
});

document.getElementById('view-button').addEventListener('click', () => {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('3d-view-screen').style.display = 'flex';
    init3DView();
});

document.getElementById('data-button').addEventListener('click', () => {
    // Handle data button click
});

document.getElementById('submit-quiz').addEventListener('click', () => {
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'flex';
    // Determine pet type based on quiz answers
});

document.getElementById('send-chat').addEventListener('click', () => {
    const chatInput = document.getElementById('chat-input').value;
    document.getElementById('chat-log').innerHTML += `<p>You: ${chatInput}</p>`;
    document.getElementById('chat-input').value = '';
    // Handle AI response
});

function init3DView() {
    // Initialize Three.js 3D view
}

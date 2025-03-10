import React from 'react';
import './StartScreen.css'; // Assuming you have a separate CSS file for styling

const StartScreen = ({ onEnter, onView, onData }) => {
    return (
        <div className="start-screen">
            <div className="title">
                <h1>Digital Pet Simulation</h1>
                <img src="/assets/gifs/animated-title.gif" alt="Animated Title" />
            </div>
            <div className="button-container">
                <button className="start-button" onClick={onEnter}>Enter</button>
                <button className="view-button" onClick={onView}>View</button>
                <button className="data-button" onClick={onData}>Data</button>
            </div>
        </div>
    );
};

export default StartScreen;
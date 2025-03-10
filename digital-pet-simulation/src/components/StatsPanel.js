import React from 'react';

const StatsPanel = ({ petStats }) => {
    return (
        <div className="stats-panel">
            <h2>Pet Stats</h2>
            <ul>
                <li><strong>Hunger:</strong> {petStats.hunger}</li>
                <li><strong>Happiness:</strong> {petStats.happiness}</li>
                <li><strong>Energy:</strong> {petStats.energy}</li>
                <li><strong>Intelligence:</strong> {petStats.intelligence}</li>
                <li><strong>Growth Level:</strong> {petStats.growthLevel}</li>
            </ul>
        </div>
    );
};

export default StatsPanel;
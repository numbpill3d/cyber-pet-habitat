import React, { useState } from 'react';

const EnvironmentCustomization = () => {
    const [decorations, setDecorations] = useState([]);
    const [selectedDecoration, setSelectedDecoration] = useState('');

    const handleAddDecoration = () => {
        if (selectedDecoration) {
            setDecorations([...decorations, selectedDecoration]);
            setSelectedDecoration('');
        }
    };

    const handleRemoveDecoration = (decoration) => {
        setDecorations(decorations.filter(item => item !== decoration));
    };

    return (
        <div className="environment-customization">
            <h2>Customize Your Pet's Environment</h2>
            <div className="decoration-selection">
                <label htmlFor="decoration">Choose a decoration:</label>
                <select
                    id="decoration"
                    value={selectedDecoration}
                    onChange={(e) => setSelectedDecoration(e.target.value)}
                >
                    <option value="">Select...</option>
                    <option value="plant">Plant</option>
                    <option value="toy">Toy</option>
                    <option value="bed">Bed</option>
                    <option value="wallpaper">Wallpaper</option>
                </select>
                <button onClick={handleAddDecoration}>Add Decoration</button>
            </div>
            <div className="current-decorations">
                <h3>Current Decorations:</h3>
                <ul>
                    {decorations.map((decoration, index) => (
                        <li key={index}>
                            {decoration}
                            <button onClick={() => handleRemoveDecoration(decoration)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EnvironmentCustomization;
import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import PetCreation from './components/PetCreation';
import MainInterface from './components/MainInterface';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
    const [petData, setPetData] = useState(null);

    const handlePetCreation = (data) => {
        setPetData(data);
    };

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <StartScreen />
                </Route>
                <Route path="/create-pet">
                    <PetCreation onPetCreated={handlePetCreation} />
                </Route>
                <Route path="/game">
                    <MainInterface petData={petData} />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
import React, { createContext, useState, useContext } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
    const [gameId, setGameId] = useState(null);
    const [shipsGrid, setShipsGrid] = useState([]);

    return (
        <GameContext.Provider value={{ shipsGrid, setShipsGrid, gameId, setGameId }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => useContext(GameContext);

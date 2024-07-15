import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {useSocket} from "./SocketContext";
import {useUser} from "@clerk/clerk-react";
import {useGame} from "./GameContext";

const RandomMatchMaking = () => {
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(true);
    const socket = useSocket();
    const user = useUser().user
    const { setGameId } = useGame();

    if(socket) {
        socket.emit('randomGame', { userId: user.id })

        socket.on('gameReady', (data) => {
            console.log('Game is starting');
            setGameId(data.gameId);
            navigate('/prematch');
        });
    }

    return (
        <>
            {showElements && (
                <div className="RandomMatchMakingScreen">
                    <h3>Waiting For the opponent...</h3>
                </div>
            )}
        </>
    );
};

export default RandomMatchMaking
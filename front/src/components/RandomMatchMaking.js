import React, { useState, useEffect } from 'react';
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

    useEffect(() => {
        if(socket) {
            socket.emit('randomGame', { userId: user.emailAddresses[0].emailAddress })

            socket.on('gameReady', (data) => {
                console.log('Game is starting, place the fleet. Game ID: '+ data.gameId);
                setGameId(data.gameId);

                navigate(`/pre-match/${data.gameId}`);
            });
        }

        return () => {
            if (socket) {
                socket.off('gameReady');
            }
        };
    }, [socket, user, setGameId, navigate]);

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
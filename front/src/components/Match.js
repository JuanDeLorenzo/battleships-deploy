import "./Match.css"
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSocket} from "./SocketContext";
import {useUser} from "@clerk/clerk-react";
import {useGame} from "./GameContext";

const Match = () => {
    const navigate = useNavigate();
    const socket = useSocket()
    const { user } = useUser()
    const { shipsGrid, gameId } = useGame();

    const [clickedCells, setClickedCells] = useState({});
    const [yourTurn, setYourTurn] = useState(false);
    const [opponentDisconnected, setOpponentDisconnected] = useState(false);
    const [matchFinished, setMatchFinished] = useState(false)
    const [victory, setVictory] = useState(false)

    const attackBoard = Array(10).fill().map((_, i) =>
        Array(10).fill().map((_, j) => `${i + 1}-${j + 1}`)
    );

    useEffect(() => {
        // Listen for turn updates
        socket.on('turnUpdate', (data) => {
            setYourTurn(data.yourTurn);
        });

        // Listen for move results
        socket.on('shotResult', (data) => {
            const { shot, result } = data;
            const [row, col] = shot;
            const newClickedCells = { ...clickedCells };
            newClickedCells[`${row}-${col}`] = { clicked: true, colored: result === 'H' ? 'red' : 'cyan' };
            setClickedCells(newClickedCells);
        });

        // Listen for game end
        socket.on('gameEnd', (data) => {
            setMatchFinished(true);
            setVictory(data.winner === user.id);
        });

        socket.on('opponentDisconnect', () => {
            setOpponentDisconnected(true);
        });

        return () => {
            socket.off('shipsGrid');
            socket.off('turnUpdate');
            socket.off('moveResult');
            socket.off('gameEnd');
            socket.off('opponentDisconnect');
        };
    }, [socket, user.id, clickedCells]);

    function handleCellClick(position) {
        if(!yourTurn){
            return;
        }

        const [row, col] = position;
        const cellKey = `${row}-${col}`;

        if (clickedCells[cellKey]?.clicked) {
            return;
        }

        socket.emit('shot', { gameId: gameId, userId: user.id, shot: position });

        setYourTurn(false)
    }

    function handleContinueClick() {
        navigate('/')
    }

    return(<div className="matchScreen">
        {/*<div className="opponentTag">Opponent Tag Placeholder</div>*/}
        <div className="turnBanner">{yourTurn? 'Your turn!': 'Opponent´s turn'}</div>
        <div className="matchFinished">
            {opponentDisconnected ? (
                <div className="finishedGameSign">
                    <div className="winOrLoseMessage">Opponent disconnected</div>
                    <div className="continueButton" onClick={handleContinueClick}>Continue</div>
                </div>
            ) : matchFinished? <div className="finishedGameSign">
                <div className="winOrLoseMessage">{victory? 'You won!' : 'You lose'}</div>
                <div className="continueButton" onClick={handleContinueClick}> Continue </div>
            </div> : <div className="boardSet">
                <div className="defenseBoard">
                    <div className="numericOrdinates">
                        <div className="alphabeticOrdinates">
                            <div className="coordinateSet">
                                {shipsGrid.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => {
                                        const cellValue = shipsGrid[rowIndex][colIndex];
                                        const cellClass = cellValue === 'S' ? 'ship' : (cellValue === 'E' ? 'empty' : '');

                                        return (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className={`coordinate ${cellClass}`}
                                            ></div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="attackBoard">
                    <div className="numericOrdinates">
                        <div className="alphabeticOrdinates">
                            <div className="coordinateSet">
                                {attackBoard.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellClick([rowIndex,colIndex])}
                                            style={{backgroundColor: clickedCells[`${rowIndex}-${colIndex}`]?.clicked? clickedCells[`${rowIndex}-${colIndex}`]?.colored : ''}}
                                            className={`coordinate ${clickedCells[`${rowIndex}-${colIndex}`]}`}
                                        >
                                            {cell}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>


    </div>)
}

export default Match
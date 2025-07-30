import "./Match.css"
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useSocket} from "./SocketContext";
import {useUser} from "@clerk/clerk-react";
import {useGame} from "./GameContext";

const Match = () => {
    const navigate = useNavigate();
    const { gameId: urlGameId } = useParams();
    const socket = useSocket()
    const { user } = useUser()
    const { shipsGrid, gameId, setGameId, setShipsGrid } = useGame();

    const [clickedCells, setClickedCells] = useState({});
    const [yourTurn, setYourTurn] = useState(false);
    const [opponentDisconnected, setOpponentDisconnected] = useState(false);
    const [matchFinished, setMatchFinished] = useState(false)
    const [victory, setVictory] = useState(false)
    const [opponentAbandoned, setOpponentAbandoned] = useState(false);

    // Usar gameId de la URL si está disponible, sino del contexto
    const currentGameId = urlGameId || gameId;

    // Function to map opponent board to clickedCells format
    const mapOpponentBoardToClickedCells = (opponentBoard) => {
        const mappedClickedCells = {};
        
        opponentBoard.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell === 'H' || cell === 'M') {
                    const cellKey = `${rowIndex}-${colIndex}`;
                    mappedClickedCells[cellKey] = {
                        clicked: true,
                        colored: cell === 'H' ? 'red' : 'cyan'
                    };
                }
            });
        });
        
        return mappedClickedCells;
    };

    // Function to map myBoard to shipsGrid format
    const mapMyBoardToShipsGrid = (myBoard) => {
        return myBoard.map(row => 
            row.map(cell => {
                // Keep H (Hit) and M (Miss) as they are for shot display
                if (cell === 'H' || cell === 'M') return cell;
                // Keep S (Ship) and E (Empty) as they are
                return cell;
            })
        );
    };

    const attackBoard = Array(10).fill().map((_, i) =>
        Array(10).fill().map((_, j) => `${i + 1}-${j + 1}`)
    );

    useEffect(() => {
        if (urlGameId && !gameId) {
            setGameId(urlGameId);

            if(!socket.connected) {
                socket.connect();
            }

            if (socket && user) {
                console.log('Attempting to reconnect to game:', urlGameId);
                
                socket.emit('reconnectToGame', {
                    userId: user.emailAddresses[0].emailAddress,
                    gameId: urlGameId 
                });
            }
        }

        socket.on('gameReconnected', (data) => {
            setShipsGrid(mapMyBoardToShipsGrid(data.myBoard));
            setClickedCells(mapOpponentBoardToClickedCells(data.opponentBoard));
            setYourTurn(data.currentTurn);
        });

        // Listen for turn updates
        socket.on('turnUpdate', (data) => {
            setYourTurn(data.yourTurn);
        });

        socket.on('reconnectFailed', (data) => {
            console.log('Reconexión fallida:', data.message);
            navigate('/', { replace: true });
        });

        // Listen for move results
        socket.on('shotResult', (data) => {
            const { shot, result, shooter } = data;
            const [row, col] = shot;
            const cellKey = `${row}-${col}`;
            console.log('my board' + shipsGrid)
            
            // Check if this was my shot (if it was my turn before the shot)
            if (shooter === user.emailAddresses[0].emailAddress) {
                // My shot - paint the opponent's board (attack board)
                const newClickedCells = { ...clickedCells };
                newClickedCells[cellKey] = { clicked: true, colored: result === 'H' ? 'red' : 'cyan' };
                setClickedCells(newClickedCells);
            } else {
                // Opponent's shot - paint my board (defense board)
                setShipsGrid(prevShipsGrid => {
                    const newShipsGrid = prevShipsGrid.map(row => [...row]);

                    if (result === 'H') {
                        newShipsGrid[row][col] = 'H'; // Hit
                    } else {
                        newShipsGrid[row][col] = 'M'; // Miss
                    }

                    return newShipsGrid;
                });
            }
        });

        // Listen for game end
        socket.on('gameEnd', (data) => {
            setMatchFinished(true);
            setVictory(data.winner === user.emailAddresses[0].emailAddress);
        });

        socket.on('opponentDisconnect', () => {
            setOpponentDisconnected(true);
        });

        socket.on('opponentAbandoned', () => {
            setOpponentDisconnected(false);
            setOpponentAbandoned(true);
        });

        socket.on('opponentReconnected', () => {
            setOpponentDisconnected(false);
        });

        return () => {
            socket.off('shipsGrid');
            socket.off('turnUpdate');
            socket.off('gameEnd');
            socket.off('opponentDisconnect');
            socket.off('gameReconnected');
            socket.off('reconnectFailed');
        };
    }, [socket, user, clickedCells, currentGameId, navigate, setGameId, urlGameId, gameId, yourTurn, shipsGrid]);

    function handleCellClick(position) {
        if(!yourTurn){
            return;
        }

        const [row, col] = position;
        const cellKey = `${row}-${col}`;

        if (clickedCells[cellKey]?.clicked) {
            return;
        }

        socket.emit('shot', { gameId: currentGameId, userId: user.emailAddresses[0].emailAddress, shot: position });

        setYourTurn(false)
    }

    function handleContinueClick() {
        navigate('/')
    }

    return(<div className="matchScreen">
        <div className="turnBanner">{yourTurn? 'Your turn!': 'Opponent´s turn'}</div>
        <div className="matchFinished">
            {opponentDisconnected ? (
                <div className="finishedGameSign">
                    <div className="winOrLoseMessage">Waiting for opponent to reconnect...</div>
                    <div className="loadingSpinner"></div>
                </div>
            ) : opponentAbandoned ? (
                <div className="finishedGameSign">
                    <div className="winOrLoseMessage">Your opponent has left the game</div>
                    <div className="continueButton" onClick={handleContinueClick}> Continue </div>
                </div>
            ) : matchFinished? <div className="finishedGameSign">
                <div className="winOrLoseMessage">{victory? 'You won!' : 'You lose'}</div>
                <div className="continueButton" onClick={handleContinueClick}> Continue </div>
            </div> : <div className="boardSet">
                <div className="boardContainer">
                    <div className="boardLabel">My Board</div>
                    <div className="defenseBoard">
                        <div className="numericOrdinates">
                            <div className="numericLabels">
                                <div className="numberContainerSize"></div>
                                <div className="numberContainerSize">1</div>
                                <div className="numberContainerSize">2</div>
                                <div className="numberContainerSize">3</div>
                                <div className="numberContainerSize">4</div>
                                <div className="numberContainerSize">5</div>
                                <div className="numberContainerSize">6</div>
                                <div className="numberContainerSize">7</div>
                                <div className="numberContainerSize">8</div>
                                <div className="numberContainerSize">9</div>
                                <div className="numberContainerSize">10</div>
                            </div>
                        </div>
                        <div className="horizontalElements">
                            <div className="alphabeticOrdinates">
                                <div className="alphabeticLabels">
                                    <div>A</div>
                                    <div>B</div>
                                    <div>C</div>
                                    <div>D</div>
                                    <div>E</div>
                                    <div>F</div>
                                    <div>G</div>
                                    <div>H</div>
                                    <div>I</div>
                                    <div>J</div>
                                </div>
                            </div>
                            <div className="coordinateSet">
                                {shipsGrid.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => {
                                        const cellValue = shipsGrid[rowIndex][colIndex];
                                        let cellClass = '';
                                        let backgroundColor = '';
                                        
                                        if (cellValue === 'S') {
                                            cellClass = 'ship';
                                        } else if (cellValue === 'E') {
                                            cellClass = 'empty';
                                        } else if (cellValue === 'H') {
                                            backgroundColor = 'red';
                                        } else if (cellValue === 'M') {
                                            backgroundColor = 'cyan';
                                        }

                                        return (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className={`coordinate ${cellClass}`}
                                                style={{ backgroundColor: backgroundColor }}
                                            ></div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="boardContainer">
                    <div className="boardLabel">Opponent's Board</div>
                    <div className="attackBoard">
                        <div className="numericOrdinates">
                            <div className="numericLabels">
                                <div className="numberContainerSize"></div>
                                <div className="numberContainerSize">1</div>
                                <div className="numberContainerSize">2</div>
                                <div className="numberContainerSize">3</div>
                                <div className="numberContainerSize">4</div>
                                <div className="numberContainerSize">5</div>
                                <div className="numberContainerSize">6</div>
                                <div className="numberContainerSize">7</div>
                                <div className="numberContainerSize">8</div>
                                <div className="numberContainerSize">9</div>
                                <div className="numberContainerSize">10</div>
                            </div>
                        </div>
                        <div className="horizontalElements">
                            <div className="alphabeticOrdinates">
                                <div className="alphabeticLabels">
                                    <div>A</div>
                                    <div>B</div>
                                    <div>C</div>
                                    <div>D</div>
                                    <div>E</div>
                                    <div>F</div>
                                    <div>G</div>
                                    <div>H</div>
                                    <div>I</div>
                                    <div>J</div>
                                </div>
                            </div>
                            <div className="coordinateSet">
                                {attackBoard.map((row, rowIndex) =>
                                    row.map((cell, colIndex) => (
                                        <div
                                            key={`${rowIndex}-${colIndex}`}
                                            onClick={() => handleCellClick([rowIndex,colIndex])}
                                            style={{backgroundColor: clickedCells[`${rowIndex}-${colIndex}`]?.clicked? clickedCells[`${rowIndex}-${colIndex}`]?.colored : ''}}
                                            className={`coordinate ${clickedCells[`${rowIndex}-${colIndex}`]}`}
                                        >
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
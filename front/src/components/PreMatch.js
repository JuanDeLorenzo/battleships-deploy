import "./PreMatch.css"
import {PreBoard} from "./elements/PreBoard";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "@clerk/clerk-react";
import {useSocket} from "./SocketContext";
import {useGame} from "./GameContext";

const PreMatch = () => {
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(true);
    const [opponentDisconnected, setOpponentDisconnected] = useState(false);
    const [waitingForOpponent, setWaitingForOpponent] = useState(false);
    const { user } = useUser()
    const socket = useSocket();
    const { setShipsGrid, gameId } = useGame();

    let ships = new Map(
        [
            ["Patroller", [[1,1], [2,1]]],
            ["Submarine", [[1,2], [2,2], [3,2]]],
            ["Destroyer", [[1,3], [2,3], [3,3]]],
            ["Battleship", [[1,4], [2,4], [3,4], [4,4]]],
            ["Carrier", [[1,5], [2,5], [3,5], [4,5], [5,5]]]
        ]
    )

    useEffect(() => {
        socket.on('shipsPlaced', () => {
            console.log('Game is starting');
            navigate('/match');
        });

        socket.on('opponentDisconnect', () => {
            setOpponentDisconnected(true);
        });

        return () => {
            socket.off('shipsPlaced');
            socket.off('opponentDisconnect');
        };
    }, [socket, navigate]);

    const handleConfirmShipsClick = () => {
        setShowElements(false);
        setWaitingForOpponent(true);
        const shipPositions = Array.from(ships.values()).flatMap(posList => posList);
        console.log(shipPositions)
        socket.emit('placeShips', { gameId, userId: user.id, shipPositions });
        // set ship grid as an [][] of 10x10 with 'E' for empty and 'S' for ship
        const shipsGrid = Array(10).fill().map(() => Array(10).fill('E'));
        for (const pos of shipPositions) {
            const [x, y] = pos;
            console.log(x-1, y-1)
            shipsGrid[y-1][x-1] = 'S';
        }
        console.log(shipsGrid)
        setShipsGrid(shipsGrid);
    };

    function handleContinueClick() {
        navigate('/')
    }
 
    return (<> {showElements? (<div className="prepareBoard" >
        <PreBoard ships={ships}></PreBoard>
        <div className="confirmShips" onClick={handleConfirmShipsClick}>Confirm</div>
    </div>) : waitingForOpponent ? (
        <div className="RandomMatchMakingScreen">
            <h3>Waiting for opponent to confirm...</h3>
        </div>) : null}
        {opponentDisconnected && (
                <div className="finishedGameSign">
                    <div className="winOrLoseMessage">Opponent disconnected</div>
                    <div className="continueButton" onClick={handleContinueClick}>Continue</div>
                </div>
        )}
    </>)
}

export default PreMatch
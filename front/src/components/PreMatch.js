import "./PreMatch.css"
import {PreBoard} from "./PreBoard";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useUser} from "@clerk/clerk-react";
import {useSocket} from "./SocketContext";
import {useGame} from "./GameContext";
import CountdownTimer from "./CountdownTimer";

const PreMatch = () => {
    const navigate = useNavigate();
    const [showElements, setShowElements] = useState(true);
    const [opponentPlacing, setOpponentPlacing] = useState(false);
    const [patrollerIsRotated, setPatrollerIsRotated] = useState(false);
    const [submarineIsRotated, setSubmarineIsRotated] = useState(false);
    const [destroyerIsRotated, setDestroyerIsRotated] = useState(false);
    const [battleshipIsRotated, setBattleshipIsRotated] = useState(false);
    const [carrierIsRotated, setCarrierIsRotated] = useState(false);
    const [timeOutAble, setTimeOutAble] = useState(true);
    const timeOutAbleRef = useRef(timeOutAble);

    useEffect(() => {
        timeOutAbleRef.current = timeOutAble;
    }, [timeOutAble]);

    const { user } = useUser()
    const socket = useSocket();
    const { setShipsGrid, gameId } = useGame();

    const [ships, setShips] = useState(
        new Map([
            ["Patroller", [[1, 1], [2, 1]]],
            ["Submarine", [[1, 2], [2, 2], [3, 2]]],
            ["Destroyer", [[1, 3], [2, 3], [3, 3]]],
            ["Battleship", [[1, 4], [2, 4], [3, 4], [4, 4]]],
            ["Carrier", [[1, 5], [2, 5], [3, 5], [4, 5], [5, 5]]]
        ])
    );

    useEffect(() => {

        socket.on('shipsPlaced', () => {
            console.log('Fleet in place, match is starting');
            navigate(`/match/${gameId}`);
        });

        socket.on('opponentDisconnect', () => {
            navigate('/')
        });

        socket.on('setShipsTimedOut', (message) =>{
            if(timeOutAbleRef.current){
                console.log(user.id + " " + message)
                handleRandomPlacement()
            }
        })

        return () => {
            socket.off('shipsPlaced');
            socket.off('opponentDisconnect');
        };
    }, [socket, navigate, gameId, user, setShipsGrid, gameId]);

    const handleConfirmShips = () => {
        setTimeOutAble(false);
        setShowElements(false);
        setOpponentPlacing(true)

        const shipPositions = Array.from(ships.values()).flatMap(posList => posList);

        const positionSet = new Set();
        for (const [x, y] of shipPositions) {
            if (x < 1 || x > 10 || y < 1 || y > 10) {
                alert(`Invalid position: (${x}, ${y}). Please replace ships.`);
                setShowElements(true);
                return;
            }

            const key = `${x},${y}`;
            if (positionSet.has(key)) {
                alert(`Duplicate position: (${x}, ${y}). Please replace ships.`);
                setShowElements(true);
                return;
            }
            positionSet.add(key);
        }

        console.log("Valid positions:", shipPositions);

        socket.emit('placeShips', { gameId: gameId, userId: user.emailAddresses[0].emailAddress, shipPositions });

        const shipsGrid = Array(10).fill().map(() => Array(10).fill('E'));
        for (const [x, y] of shipPositions) {
            shipsGrid[y - 1][x - 1] = 'S';
        }

        console.log("Ships grid:", shipsGrid);
        setShipsGrid(shipsGrid);
    }


    function handleRotatePatrollerClick () {
        const patrollerData =  ships.get("Patroller")
        console.log("Actual: " + ships.get("Patroller"))
        if(patrollerIsRotated === false){

            const pivot = patrollerData[0]
            const nextX2 = patrollerData[1][0] - 1
            const nextY2 = patrollerData[1][1] + 1

            ships.set("Patroller", [pivot, [nextX2,nextY2]])
            setPatrollerIsRotated(true)
            console.log("Next: " + ships.get("Patroller"))

        }else {

            const pivot = patrollerData[0]
            const nextX2 = patrollerData[1][0] + 1
            const nextY2 = patrollerData[1][1] - 1

            ships.set("Patroller", [pivot, [nextX2,nextY2]])
            setPatrollerIsRotated(false)
            console.log("Next: " + ships.get("Patroller"))
        }
    }

    function handleRotateSubmarineClick () {
        const submarineData =  ships.get("Submarine")
        console.log("Actual: " + ships.get("Submarine"))
        if(submarineIsRotated === false){

            const pivot = submarineData[0]
            const nextX2 = submarineData[1][0] - 1
            const nextY2 = submarineData[1][1] + 1
            const nextX3 = submarineData[2][0] - 2
            const nextY3 = submarineData[2][1] + 2


            ships.set("Submarine", [pivot, [nextX2,nextY2], [nextX3,nextY3]])
            setSubmarineIsRotated(true)
            console.log("Next: " + ships.get("Submarine"))

        }else {

            const pivot = submarineData[0]
            const nextX2 = submarineData[1][0] + 1
            const nextY2 = submarineData[1][1] - 1
            const nextX3 = submarineData[2][0] + 2
            const nextY3 = submarineData[2][1] - 2


            ships.set("Submarine", [pivot, [nextX2,nextY2], [nextX3,nextY3]])
            setSubmarineIsRotated(false)
            console.log("Next: " + ships.get("Submarine"))
        }
    }

    function handleRotateDestroyerClick () {
        const destroyerData =  ships.get("Destroyer")
        console.log("Actual: " + ships.get("Destroyer"))
        if(destroyerIsRotated === false){

            const pivot = destroyerData[0]
            const nextX2 = destroyerData[1][0] - 1
            const nextY2 = destroyerData[1][1] + 1
            const nextX3 = destroyerData[2][0] - 2
            const nextY3 = destroyerData[2][1] + 2


            ships.set("Destroyer", [pivot, [nextX2,nextY2], [nextX3,nextY3]])
            setDestroyerIsRotated(true)
            console.log("Next: " + ships.get("Destroyer"))

        }else {

            const pivot = destroyerData[0]
            const nextX2 = destroyerData[1][0] + 1
            const nextY2 = destroyerData[1][1] - 1
            const nextX3 = destroyerData[2][0] + 2
            const nextY3 = destroyerData[2][1] - 2


            ships.set("Destroyer", [pivot, [nextX2,nextY2], [nextX3,nextY3]])
            setDestroyerIsRotated(false)
            console.log("Next: " + ships.get("Destroyer"))
        }
    }

    function handleRotateBattleshipClick () {
        const battleshipData =  ships.get("Battleship")
        console.log("Actual: " + ships.get("Battleship"))
        if(battleshipIsRotated === false){

            const pivot = battleshipData[0]
            const nextX2 = battleshipData[1][0] - 1
            const nextY2 = battleshipData[1][1] + 1
            const nextX3 = battleshipData[2][0] - 2
            const nextY3 = battleshipData[2][1] + 2
            const nextX4 = battleshipData[3][0] - 3
            const nextY4 = battleshipData[3][1] + 3


            ships.set("Battleship", [pivot, [nextX2,nextY2], [nextX3,nextY3], [nextX4,nextY4]])
            setBattleshipIsRotated(true)
            console.log("Next: " + ships.get("Battleship"))

        }else {

            const pivot = battleshipData[0]
            const nextX2 = battleshipData[1][0] + 1
            const nextY2 = battleshipData[1][1] - 1
            const nextX3 = battleshipData[2][0] + 2
            const nextY3 = battleshipData[2][1] - 2
            const nextX4 = battleshipData[3][0] + 3
            const nextY4 = battleshipData[3][1] - 3


            ships.set("Battleship", [pivot, [nextX2,nextY2], [nextX3,nextY3], [nextX4,nextY4]])
            setBattleshipIsRotated(false)
            console.log("Next: " + ships.get("Battleship"))
        }
    }

    function handleRotateCarrierClick () {
        const carrierData =  ships.get("Carrier")
        console.log("Actual: " + ships.get("Carrier"))
        if(carrierIsRotated === false){

            const pivot = carrierData[0]
            const nextX2 = carrierData[1][0] - 1
            const nextY2 = carrierData[1][1] + 1
            const nextX3 = carrierData[2][0] - 2
            const nextY3 = carrierData[2][1] + 2
            const nextX4 = carrierData[3][0] - 3
            const nextY4 = carrierData[3][1] + 3
            const nextX5 = carrierData[4][0] - 4
            const nextY5 = carrierData[4][1] + 4

            ships.set("Carrier", [pivot, [nextX2,nextY2], [nextX3,nextY3], [nextX4,nextY4], [nextX5,nextY5]])
            setCarrierIsRotated(true)
            console.log("Next: " + ships.get("Carrier"))

        }else {

            const pivot = carrierData[0]
            const nextX2 = carrierData[1][0] + 1
            const nextY2 = carrierData[1][1] - 1
            const nextX3 = carrierData[2][0] + 2
            const nextY3 = carrierData[2][1] - 2
            const nextX4 = carrierData[4][0] + 3
            const nextY4 = carrierData[4][1] - 3
            const nextX5 = carrierData[4][0] + 4
            const nextY5 = carrierData[4][1] - 4

            ships.set("Carrier", [pivot, [nextX2,nextY2], [nextX3,nextY3], [nextX4,nextY4], [nextX5,nextY5]])
            setCarrierIsRotated(false)
            console.log("Next: " + ships.get("Carrier"))
        }
    }

    const handleRandomPlacement = () => {
        setTimeOutAble(false);
        const shipsGrid = Array(10).fill().map(() => Array(10).fill('E'));
        const newShipPositions = new Map();

        const canPlaceShip = (x, y, length, isHorizontal) => {
            if (isHorizontal) {
                if (x + length > 10) return false;
                for (let i = 0; i < length; i++) {
                    if (shipsGrid[y][x + i] !== 'E') {
                        console.log(`Overlap detected for horizontal ship at (${x + i}, ${y})`);
                        return false;
                    }
                }
            } else {
                if (y + length > 10) return false;
                for (let i = 0; i < length; i++) {
                    if (shipsGrid[y + i][x] !== 'E') {
                        console.log(`Overlap detected for vertical ship at (${x}, ${y + i})`);
                        return false;
                    }
                }
            }
            return true;
        };

        ships.forEach((positions, shipName) => {
            const length = positions.length;
            let placed = false;

            while (!placed) {
                const isHorizontal = Math.random() < 0.5;
                const x = Math.floor(Math.random() * 10);
                const y = Math.floor(Math.random() * 10);

                if (canPlaceShip(x, y, length, isHorizontal)) {
                    const shipCoords = [];
                    for (let i = 0; i < length; i++) {
                        if (isHorizontal) {
                            shipsGrid[y][x + i] = 'S';
                            shipCoords.push([x + i + 1, y + 1]);
                        } else {
                            shipsGrid[y + i][x] = 'S';
                            shipCoords.push([x + 1, y + i + 1]);
                        }
                    }
                    newShipPositions.set(shipName, shipCoords);
                    placed = true;
                }
            }
        });

        setShowElements(false);
        const shipPositions = Array.from(newShipPositions.values()).flatMap(posList => posList);
        console.log("Ship Positions:", shipPositions);
        console.log("Final Ships Grid:", shipsGrid);
        socket.emit('placeShips', { gameId: gameId, userId: user.id, shipPositions });
        setShipsGrid(shipsGrid);
    }

    return (<> {showElements? (<div className="prepareBoard" >
        <PreBoard ships={ships} patrollerIsRotated={patrollerIsRotated} submarineIsRotated={submarineIsRotated} destroyerIsRotated={destroyerIsRotated} battleshipIsRotated={battleshipIsRotated} carrierIsRotated={carrierIsRotated}></PreBoard>
        <div className="setupUserInterface">
            <div className="setupUserButtons">
                <div className="setupButton" onClick={handleRotatePatrollerClick}>Rotate Patroller</div>
                <div className="setupButton" onClick={handleRotateSubmarineClick}>Rotate Submarine</div>
                <div className="setupButton" onClick={handleRotateDestroyerClick}>Rotate Destroyer</div>
                <div className="setupButton" onClick={handleRotateBattleshipClick}>Rotate Battleship</div>
                <div className="setupButton" onClick={handleRotateCarrierClick}>Rotate Carrier</div>
                <div className="setupButton" onClick={handleConfirmShips}>Confirm</div>
                <div className="setupButton" onClick={handleRandomPlacement}>Random placement</div>
            </div>
            <div className="setupUserButtons">
                <CountdownTimer/>
            </div>
        </div>

    </div>): null}
        {opponentPlacing && (
            <div className="finishedGameSign">
                <div className="winOrLoseMessage">Waiting for opponent</div>
                <div className="loadingSpinner"></div>
            </div>
        )}
    </>)
}
export default PreMatch
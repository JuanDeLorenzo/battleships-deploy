import "./PreBoard.css";
import React from 'react'
import Draggable from "react-draggable";

export class PreBoard extends React.Component{
    constructor(props) {
        super(props);
    }


    handlePatrollerStop = (e, data) => {
        const { ships } = this.props;
        const patrollerData = ships.get("Patroller");

        let x1 = patrollerData[0][0];
        let nextX1 = data.x/60;
        let x2 = patrollerData[1][0];
        let nextX2 = 1 + data.x/60;
        let y1 = patrollerData[0][1];
        let nextY1 = data.y/60;
        let y2 = patrollerData[1][1];
        let nextY2 = data.y/60;

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2]]
        console.log(e);
        console.log(data);
        console.log("x1: " + x1);
        console.log("nextX1: " + nextX1);
        console.log("x2: " + x2);
        console.log("nextX2: " + nextX2);
        console.log("y1: " + y1);
        console.log("nextY1: " + nextY1);
        console.log("y2: " + y2);
        console.log("nextY2: " + nextY2);

        console.log('Datos específicos: ', patrollerData);

        this.props.ships.set('Patroller', nextPositions)
        this.setState({ isDragging: false });
    };

    handleSubmarineStop = (e, data) => {
        const { ships } = this.props;
        const submarineData = ships.get("Submarine");

        let x1 = submarineData[0][0];
        let nextX1 = data.x/60;
        let x2 = submarineData[1][0];
        let nextX2 = 1 + data.x/60;
        let x3 = submarineData[2][0];
        let nextX3 = 2 + data.x/60;
        let y1 = submarineData[0][1];
        let nextY1 = 1 + data.y/60;
        let y2 = submarineData[1][1];
        let nextY2 = 1 + data.y/60;
        let y3 = submarineData[2][1];
        let nextY3 = 1 + data.y/60;

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3]]

        console.log(e);
        console.log(data);
        console.log("x1: " + x1);
        console.log("nextX1: " + nextX1);
        console.log("x2: " + x2);
        console.log("nextX2: " + nextX2);
        console.log("x3: " + x3);
        console.log("nextX3: " + nextX3);
        console.log("y1: " + y1);
        console.log("nextY1: " + nextY1);
        console.log("y2: " + y2);
        console.log("nextY2: " + nextY2);
        console.log("y3: " + y3);
        console.log("nextY3: " + nextY3);

        console.log('Datos específicos: ', submarineData);

        this.props.ships.set('Submarine', nextPositions)
        this.setState({ isDragging: false });
    };

    handleDestroyerStop = (e, data) => {
        this.setState({ isDragging: false });
        const { ships } = this.props;
        const destroyerData = ships.get("Destroyer");

        let x1 = destroyerData[0][0];
        let nextX1 = data.x/60;
        let x2 = destroyerData[1][0];
        let nextX2 = 1 + data.x/60;
        let x3 = destroyerData[2][0];
        let nextX3 = 2 + data.x/60;
        let y1 = destroyerData[0][1];
        let nextY1 = 2 + data.y/60;
        let y2 = destroyerData[1][1];
        let nextY2 = 2 + data.y/60;
        let y3 = destroyerData[2][1];
        let nextY3 = 2 + data.y/60;

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3]]

        console.log(e);
        console.log(data);
        console.log("x1: " + x1);
        console.log("nextX1: " + nextX1);
        console.log("x2: " + x2);
        console.log("nextX2: " + nextX2);
        console.log("x3: " + x3);
        console.log("nextX3: " + nextX3);
        console.log("y1: " + y1);
        console.log("nextY1: " + nextY1);
        console.log("y2: " + y2);
        console.log("nextY2: " + nextY2);
        console.log("y3: " + y3);
        console.log("nextY3: " + nextY3);

        console.log('Datos específicos: ', destroyerData);

        this.props.ships.set('Destroyer', nextPositions)
    };

    handleBattleshipStop = (e, data) => {
        const { ships } = this.props;
        const battleshipData = ships.get("Battleship");

        let x1 = battleshipData[0][0];
        let nextX1 = data.x/60;
        let x2 = battleshipData[1][0];
        let nextX2 = 1 + data.x/60;
        let x3 = battleshipData[2][0];
        let nextX3 = 2 + data.x/60;
        let x4 = battleshipData[3][0];
        let nextX4 = 3 + data.x/60;
        let y1 = battleshipData[0][1];
        let nextY1 = 3 + data.y/60;
        let y2 = battleshipData[1][1];
        let nextY2 = 3 + data.y/60;
        let y3 = battleshipData[2][1];
        let nextY3 = 3 + data.y/60;
        let y4 = battleshipData[3][1];
        let nextY4 = 3 + data.y/60;

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3],[nextX4,nextY4]]

        console.log(e);
        console.log(data);
        console.log("x1: " + x1);
        console.log("nextX1: " + nextX1);
        console.log("x2: " + x2);
        console.log("nextX2: " + nextX2);
        console.log("x3: " + x3);
        console.log("nextX3: " + nextX3);
        console.log("x4: " + x4);
        console.log("nextX4: " + nextX4);
        console.log("y1: " + y1);
        console.log("nextY1: " + nextY1);
        console.log("y2: " + y2);
        console.log("nextY2: " + nextY2);
        console.log("y3: " + y3);
        console.log("nextY3: " + nextY3);
        console.log("y4: " + y4);
        console.log("nextY4: " +  nextY4);

        console.log('Datos específicos: ', battleshipData);

        this.props.ships.set('Battleship', nextPositions)
        this.setState({ isDragging: false });
    };

    handleCarrierStop = (e, data) => {
        const { ships } = this.props;
        const carrierData = ships.get("Carrier");

        let x1 = carrierData[0][0];
        let nextX1 = data.x/60;
        let x2 = carrierData[1][0];
        let nextX2 = 1 + data.x/60;
        let x3 = carrierData[2][0];
        let nextX3 = 2 + data.x/60;
        let x4 = carrierData[3][0];
        let nextX4 = 3 + data.x/60;
        let x5 = carrierData[4][0];
        let nextX5 = 4 + data.x/60;
        let y1 = carrierData[0][1];
        let nextY1 = 4 + data.y/60;
        let y2 = carrierData[1][1];
        let nextY2 = 4 + data.y/60;
        let y3 = carrierData[2][1];
        let nextY3 = 4 + data.y/60;
        let y4 = carrierData[3][1];
        let nextY4 = 4 + data.y/60;
        let y5 = carrierData[3][1];
        let nextY5 = 4 + data.y/60;

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3],[nextX4,nextY4],[nextX5,nextY5]]

        console.log(e);
        console.log(data);
        console.log("x1: " + x1);
        console.log("nextX1: " + nextX1);
        console.log("x2: " + x2);
        console.log("nextX2: " + nextX2);
        console.log("x3: " + x3);
        console.log("nextX3: " + nextX3);
        console.log("x4: " + x4);
        console.log("nextX4: " + nextX4);
        console.log("x5: " + x5);
        console.log("nextX5: " + nextX5);
        console.log("y1: " + y1);
        console.log("nextY1: " + nextY1);
        console.log("y2: " + y2);
        console.log("nextY2: " + nextY2);
        console.log("y3: " + y3);
        console.log("nextY3: " + nextY3);
        console.log("y4: " + y4);
        console.log("nextY4: " +  nextY4);
        console.log("y5: " + y5);
        console.log("nextY5: " +  nextY5);

        console.log('Datos específicos: ', carrierData);

        this.props.ships.set('Carrier', nextPositions)
        this.setState({ isDragging: false });
    };


render() {

    //let gridSize = this.props.patrollerHorizontal? [30,30] : [60,60]
    let gridSize = [60,60]
    let patrollerBoundaries = {top: 60, left: 60, right: 540, bottom: 600}
    const submarineBoundaries = {top: 0, left: 60, right: 480, bottom: 540}
    const destroyerBoundaries = {top: -60, left: 60, right: 480, bottom: 480}
    const battleshipBoundaries = {top: -120, left: 60, right: 420, bottom: 420}
    const carrierBoundaries = {top: -180, left: 60, right: 360, bottom: 360}


    return (
        <div className="board">
            <div className="numericOrdinatesPre">
                <div className="alphabeticOrdinatesPre">
                    <Draggable
                        axis="both"
                        handle=".handlePatroller"
                        defaultPosition={{x: 60, y: 60}}
                        position={null}
                        grid={gridSize}
                        bounds={patrollerBoundaries}
                        scale={1}
                        onStop={this.handlePatrollerStop}>
                        <div className="handlePatroller">Patroller</div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle=".handleSubmarine"
                        defaultPosition={{x: 60, y: 60}}
                        position={null}
                        grid={gridSize}
                        bounds={submarineBoundaries}
                        scale={1}
                        onStart={this.handleStart}
                        onStop={this.handleSubmarineStop}>
                        <div className="handleSubmarine">Submarine</div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle=".handleDestroyer"
                        defaultPosition={{x: 60, y: 60}}
                        position={null}
                        grid={gridSize}
                        bounds={destroyerBoundaries}
                        scale={1}
                        onStart={this.handleStart}
                        onStop={this.handleDestroyerStop}>
                        <div className="handleDestroyer">Destroyer</div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle=".handleBattleship"
                        defaultPosition={{x: 60, y: 60}}
                        position={null}
                        grid={gridSize}
                        bounds={battleshipBoundaries}
                        scale={1}
                        onStart={this.handleStart}
                        onStop={this.handleBattleshipStop}>
                        <div className="handleBattleship">Battleship</div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle=".handleCarrier"
                        defaultPosition={{x: 60, y: 60}}
                        position={null}
                        grid={gridSize}
                        scale={1}
                        bounds={carrierBoundaries}
                        onStart={this.handleStart}
                        onDrag={this.handleDrag}
                        onStop={this.handleCarrierStop}>
                        <div className="handleCarrier">Carrier</div>
                    </Draggable>
                </div>
            </div>
        </div>
    )
}
}
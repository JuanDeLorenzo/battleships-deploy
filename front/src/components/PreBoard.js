import "./PreBoard.css";
import React from 'react'
import Draggable from "react-draggable";

export class PreBoard extends React.Component{
    constructor(props) {
        super(props);
    }


    handlePatrollerStop = (e, data) => {
        const { ships } = this.props;
        const {patrollerIsRotated} = this.props;

        const patrollerData = ships.get("Patroller");

        let x1;
        let nextX1;
        let x2;
        let nextX2;
        let y1;
        let nextY1;
        let y2;
        let nextY2;

        if(patrollerIsRotated === false){
            x1 = patrollerData[0][0];
            nextX1 = 1 + data.x / 60;
            x2 = patrollerData[1][0];
            nextX2 = 2 + data.x / 60;
            y1 = patrollerData[0][1];
            nextY1 = 1 + data.y / 60;
            y2 = patrollerData[1][1];
            nextY2 = 1 + data.y / 60;
        } else {
            x1 = patrollerData[0][0];
            nextX1 = 1 + data.x / 60;
            x2 = patrollerData[1][0];
            nextX2 = 1 + data.x / 60;
            y1 = patrollerData[0][1];
            nextY1 = 1 + data.y / 60;
            y2 = patrollerData[1][1];
            nextY2 = 2 + data.y / 60;
        }

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2]]

        console.log(e);
        console.log(data);
        console.log("x1: " + (x1));
        console.log("nextX1: " + (nextX1));
        console.log("x2: " + (x2));
        console.log("nextX2: " + (nextX2));
        console.log("y1: " + (y1));
        console.log("nextY1: " + (nextY1));
        console.log("y2: " + (y2));
        console.log("nextY2: " + (nextY2));

        console.log('Technical data: ', patrollerData);

        this.props.ships.set('Patroller', nextPositions)

        console.log(patrollerIsRotated)
    };

    handleSubmarineStop = (e, data) => {
        const { ships } = this.props;
        const {submarineIsRotated} = this.props;

        const submarineData = ships.get("Submarine");

        let x1;
        let nextX1;
        let x2;
        let nextX2;
        let x3;
        let nextX3;
        let y1;
        let nextY1;
        let y2;
        let nextY2;
        let y3;
        let nextY3;

        if (submarineIsRotated === false){
            x1 = submarineData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = submarineData[1][0];
            nextX2 = 2 + data.x/60;
            x3 = submarineData[2][0];
            nextX3 = 3 + data.x/60;
            y1 = submarineData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = submarineData[1][1];
            nextY2 = 1 + data.y/60;
            y3 = submarineData[2][1];
            nextY3 = 1 + data.y/60;
        }else{
            x1 = submarineData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = submarineData[1][0];
            nextX2 = 1 + data.x/60;
            x3 = submarineData[2][0];
            nextX3 = 1 + data.x/60;
            y1 = submarineData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = submarineData[1][1];
            nextY2 = 2 + data.y/60;
            y3 = submarineData[2][1];
            nextY3 = 3 + data.y/60;
        }



        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3]]

        console.log(e);
        console.log(data);
        console.log("x1: " + (x1));
        console.log("nextX1: " + nextX1);
        console.log("x2: " + (x2));
        console.log("nextX2: " + nextX2);
        console.log("x3: " + (x3));
        console.log("nextX3: " + nextX3);
        console.log("y1: " + (y1));
        console.log("nextY1: " + nextY1);
        console.log("y2: " + (y2));
        console.log("nextY2: " + nextY2);
        console.log("y3: " + (y3));
        console.log("nextY3: " + nextY3);

        console.log('Technical data: ', submarineData);

        this.props.ships.set('Submarine', nextPositions)
        this.setState({ isDragging: false });
    };

    handleDestroyerStop = (e, data) => {
        const { ships } = this.props;
        const {destroyerIsRotated} = this.props;

        const destroyerData = ships.get("Destroyer");

        let x1;
        let nextX1;
        let x2;
        let nextX2;
        let x3;
        let nextX3;
        let y1;
        let nextY1;
        let y2;
        let nextY2;
        let y3;
        let nextY3;

        if (destroyerIsRotated === false){
            x1 = destroyerData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = destroyerData[1][0];
            nextX2 = 2 + data.x/60;
            x3 = destroyerData[2][0];
            nextX3 = 3 + data.x/60;
            y1 = destroyerData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = destroyerData[1][1];
            nextY2 = 1 + data.y/60;
            y3 = destroyerData[2][1];
            nextY3 = 1 + data.y/60;
        }else {
            x1 = destroyerData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = destroyerData[1][0];
            nextX2 = 1 + data.x/60;
            x3 = destroyerData[2][0];
            nextX3 = 1 + data.x/60;
            y1 = destroyerData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = destroyerData[1][1];
            nextY2 = 2 + data.y/60;
            y3 = destroyerData[2][1];
            nextY3 = 3 + data.y/60;
        }


        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3]]

        console.log(e);
        console.log(data);
        console.log("x1: " + (x1));
        console.log("nextX1: " + (nextX1));
        console.log("x2: " + (x2));
        console.log("nextX2: " + (nextX2));
        console.log("x3: " + (x3));
        console.log("nextX3: " + (nextX3));
        console.log("y1: " + (y1));
        console.log("nextY1: " + (nextY1));
        console.log("y2: " + (y2));
        console.log("nextY2: " + (nextY2));
        console.log("y3: " + (y3));
        console.log("nextY3: " + (nextY3));

        console.log('Technical data: ', destroyerData);

        this.props.ships.set('Destroyer', nextPositions)
    };

    handleBattleshipStop = (e, data) => {
        const { ships } = this.props;
        const {battleshipIsRotated} = this.props;
        const battleshipData = ships.get("Battleship");

        let x1;
        let nextX1;
        let x2;
        let nextX2;
        let x3;
        let nextX3;
        let x4;
        let nextX4;
        let y1;
        let nextY1;
        let y2;
        let nextY2;
        let y3;
        let nextY3;
        let y4;
        let nextY4;

        if (battleshipIsRotated === false){
            x1 = battleshipData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = battleshipData[1][0];
            nextX2 = 2 + data.x/60;
            x3 = battleshipData[2][0];
            nextX3 = 3 + data.x/60;
            x4 = battleshipData[3][0];
            nextX4 = 4 + data.x/60;
            y1 = battleshipData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = battleshipData[1][1];
            nextY2 = 1 + data.y/60;
            y3 = battleshipData[2][1];
            nextY3 = 1 + data.y/60;
            y4 = battleshipData[3][1];
            nextY4 = 1 + data.y/60;
        } else {
            x1 = battleshipData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = battleshipData[1][0];
            nextX2 = 1 + data.x/60;
            x3 = battleshipData[2][0];
            nextX3 = 1 + data.x/60;
            x4 = battleshipData[3][0];
            nextX4 = 1 + data.x/60;
            y1 = battleshipData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = battleshipData[1][1];
            nextY2 = 2 + data.y/60;
            y3 = battleshipData[2][1];
            nextY3 = 3 + data.y/60;
            y4 = battleshipData[3][1];
            nextY4 = 4 + data.y/60;
        }


        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3],[nextX4,nextY4]]

        console.log(e);
        console.log(data);
        console.log("x1: " + (x1));
        console.log("nextX1: " + (nextX1));
        console.log("x2: " + (x2));
        console.log("nextX2: " + (nextX2));
        console.log("x3: " + (x3));
        console.log("nextX3: " + (nextX3));
        console.log("x4: " + (x4));
        console.log("nextX4: " + (nextX4));
        console.log("y1: " + (y1));
        console.log("nextY1: " + (nextY1));
        console.log("y2: " + (y2));
        console.log("nextY2: " + (nextY2));
        console.log("y3: " + (y3));
        console.log("nextY3: " + (nextY3));
        console.log("y4: " + (y4));
        console.log("nextY4: " + (nextY4));

        console.log('Technical data: ', battleshipData);

        this.props.ships.set('Battleship', nextPositions)
        this.setState({ isDragging: false });
    };

    handleCarrierStop = (e, data) => {
        const { ships } = this.props;
        const {carrierIsRotated} = this.props;

        const carrierData = ships.get("Carrier");

        let x1;
        let nextX1;
        let x2;
        let nextX2;
        let x3;
        let nextX3;
        let x4;
        let nextX4;
        let x5;
        let nextX5;
        let y1;
        let nextY1;
        let y2;
        let nextY2;
        let y3;
        let nextY3;
        let y4;
        let nextY4;
        let y5;
        let nextY5;

        if (carrierIsRotated === false){
            x1 = carrierData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = carrierData[1][0];
            nextX2 = 2 + data.x/60;
            x3 = carrierData[2][0];
            nextX3 = 3 + data.x/60;
            x4 = carrierData[3][0];
            nextX4 = 4 + data.x/60;
            x5 = carrierData[4][0];
            nextX5 = 5 + data.x/60;
            y1 = carrierData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = carrierData[1][1];
            nextY2 = 1 + data.y/60;
            y3 = carrierData[2][1];
            nextY3 = 1 + data.y/60;
            y4 = carrierData[3][1];
            nextY4 = 1 + data.y/60;
            y5 = carrierData[3][1];
            nextY5 = 1 + data.y/60;
        }else{
            x1 = carrierData[0][0];
            nextX1 = 1 + data.x/60;
            x2 = carrierData[1][0];
            nextX2 = 1 + data.x/60;
            x3 = carrierData[2][0];
            nextX3 = 1 + data.x/60;
            x4 = carrierData[3][0];
            nextX4 = 1 + data.x/60;
            x5 = carrierData[4][0];
            nextX5 = 1 + data.x/60;
            y1 = carrierData[0][1];
            nextY1 = 1 + data.y/60;
            y2 = carrierData[1][1];
            nextY2 = 2 + data.y/60;
            y3 = carrierData[2][1];
            nextY3 = 3 + data.y/60;
            y4 = carrierData[3][1];
            nextY4 = 4 + data.y/60;
            y5 = carrierData[3][1];
            nextY5 = 5 + data.y/60;

        }

        const nextPositions = [[nextX1,nextY1],[nextX2,nextY2],[nextX3,nextY3],[nextX4,nextY4],[nextX5,nextY5]]

        console.log(e);
        console.log(data);
        console.log("x1: " + (x1));
        console.log("nextX1: " + (nextX1));
        console.log("x2: " + (x2));
        console.log("nextX2: " + (nextX2));
        console.log("x3: " + (x3));
        console.log("nextX3: " + (nextX3));
        console.log("x4: " + (x4));
        console.log("nextX4: " + (nextX4));
        console.log("x5: " + (x5));
        console.log("nextX5: " + (nextX5));
        console.log("y1: " + (y1));
        console.log("nextY1: " + (nextY1));
        console.log("y2: " + (y2));
        console.log("nextY2: " + (nextY2));
        console.log("y3: " + (y3));
        console.log("nextY3: " + (nextY3));
        console.log("y4: " + (y4));
        console.log("nextY4: " + (nextY4));
        console.log("y5: " + (y5));
        console.log("nextY5: " + (nextY5));

        console.log('Technical data: ', carrierData);

        this.props.ships.set('Carrier', nextPositions)
        this.setState({ isDragging: false });
    };

    boundariesManagement(){
        const {patrollerIsRotated} = this.props;
        const {submarineIsRotated} = this.props;
        const {destroyerIsRotated} = this.props;
        const {battleshipIsRotated} = this.props;
        const {carrierIsRotated} = this.props;

        let patrollerDisplacement = patrollerIsRotated ? 1 : 0;
        let submarineDisplacement = submarineIsRotated ? 1 : 0;
        let destroyerDisplacement = destroyerIsRotated ? 1 : 0;
        let battleshipDisplacement = battleshipIsRotated ? 1 : 0;
        let carrierDisplacement = carrierIsRotated ? 1 : 0;

        return [
            {
                top: 0,
                left: 0,
                right: (patrollerDisplacement * 60) + 480,
                bottom: (patrollerDisplacement * -60) + 540
            },
            {
                top: 0,
                left: 0,
                right: (submarineDisplacement * 120) + 420,
                bottom: (submarineDisplacement * -120) + 540
            },
            {
                top: 0,
                left: 0,
                right: (destroyerDisplacement * 120) + 420,
                bottom: (destroyerDisplacement * -120) + 540
            },
            {
                top: 0,
                left: 0,
                right: (battleshipDisplacement * 180) + 360,
                bottom: (battleshipDisplacement * -180) + 540
            },
            {
                top: 0,
                left: 0,
                right: (carrierDisplacement * 240) + 300,
                bottom: (carrierDisplacement * -240) + 540
            }
        ]
        /**
        return [
            {top: 0, left: 0, right: (patrollerDisplacement * 60) + 480, bottom: (patrollerDisplacement * -60) + 540},
            {
                top: (patrollerDisplacement * -60) + -60,
                left: 0,
                right: (submarineDisplacement * 120) + 420,
                bottom: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + 480
            },
            {
                top: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + -120,
                left: 0,
                right: (destroyerDisplacement * 120) + 420,
                bottom: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + (destroyerDisplacement * -120) + 420
            },
            {
                top: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + (destroyerDisplacement * -120) - 180,
                left: 0,
                right: (battleshipDisplacement * 180) + 360,
                bottom: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + (destroyerDisplacement * -120) + (battleshipDisplacement * -180) + 360
            },
            {
                top: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + (destroyerDisplacement * -120) + (battleshipDisplacement * -180) - 240,
                left: 0,
                right: (carrierDisplacement * 240) + 300,
                bottom: (patrollerDisplacement * -60) + (submarineDisplacement * -120) + (destroyerDisplacement * -120) + (battleshipDisplacement * -180) + (carrierDisplacement * -180) + 300
            }]
         **/
    }
render() {


    let gridSize = [60,60]

    let boundaries = this.boundariesManagement()

    let patrollerBoundaries = boundaries.at(0)
    let submarineBoundaries = boundaries.at(1)
    let destroyerBoundaries = boundaries.at(2)
    let battleshipBoundaries = boundaries.at(3)
    let carrierBoundaries = boundaries.at(4)


    return (
        <div className="board">
            <div className="numericOrdinatesPre">
                <div className="numericLabelsPre">
                    <div className="numberContainerSizePre"></div>
                    <div className="numberContainerSizePre">1</div>
                    <div className="numberContainerSizePre">2</div>
                    <div className="numberContainerSizePre">3</div>
                    <div className="numberContainerSizePre">4</div>
                    <div className="numberContainerSizePre">5</div>
                    <div className="numberContainerSizePre">6</div>
                    <div className="numberContainerSizePre">7</div>
                    <div className="numberContainerSizePre">8</div>
                    <div className="numberContainerSizePre">9</div>
                    <div className="numberContainerSizePre">10</div>
                </div>
            </div>
            <div className="horizontalElements">
                <div className="alphabeticOrdinatesPre">
                    <div className="alphabeticLabelsPre">
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
                <div className="ships">
                    <Draggable
                        axis="both"
                        handle={this.props.patrollerIsRotated ? ".handlePatrollerVertical" : ".handlePatroller"}
                        defaultPosition={{x: 0, y: 0}}
                        position={null}
                        grid={gridSize}
                        bounds={patrollerBoundaries}
                        scale={1}
                        onStop={this.handlePatrollerStop}>
                        <div className={`draggable-item ${this.props.patrollerIsRotated ? "handlePatrollerVertical" : "handlePatroller"}`}>
                            <span className="patrollerText">Patroller</span>
                        </div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle={this.props.submarineIsRotated ? ".handleSubmarineVertical" : ".handleSubmarine"}
                        defaultPosition={{x: 0, y: 60}}
                        position={null}
                        grid={gridSize}
                        bounds={submarineBoundaries}
                        scale={1}
                        onStop={this.handleSubmarineStop}>
                        <div className={`draggable-item ${this.props.submarineIsRotated ? "handleSubmarineVertical" : "handleSubmarine"}`}>
                            <span className="submarineText">Submarine</span>
                        </div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle={this.props.destroyerIsRotated ? ".handleDestroyerVertical" : ".handleDestroyer"}
                        defaultPosition={{x: 0, y: 120}}
                        position={null}
                        grid={gridSize}
                        bounds={destroyerBoundaries}
                        scale={1}
                        onStop={this.handleDestroyerStop}>
                        <div className={`draggable-item ${this.props.destroyerIsRotated ? "handleDestroyerVertical" : "handleDestroyer"}`}>
                            <span className="destroyerText">Destroyer</span>
                        </div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle={this.props.battleshipIsRotated ? ".handleBattleshipVertical" : ".handleBattleship"}
                        defaultPosition={{x: 0, y: 180}}
                        position={null}
                        grid={gridSize}
                        bounds={battleshipBoundaries}
                        scale={1}
                        onStop={this.handleBattleshipStop}>
                        <div className={`draggable-item ${this.props.battleshipIsRotated ? "handleBattleshipVertical" : "handleBattleship"}`}>
                            <span className="battleshipText">Battleship</span>
                        </div>
                    </Draggable>
                    <Draggable
                        axis="both"
                        handle={this.props.carrierIsRotated ? ".handleCarrierVertical" : ".handleCarrier"}
                        defaultPosition={{x: 0, y: 240}}
                        position={null}
                        grid={gridSize}
                        scale={1}
                        bounds={carrierBoundaries}
                        onStop={this.handleCarrierStop}>
                        <div className={`draggable-item ${this.props.carrierIsRotated ? "handleCarrierVertical" : "handleCarrier"}`}>
                            <span className="carrierText">Carrier</span>
                        </div>
                    </Draggable>
                </div>
            </div>

        </div>
    )
}
}